#!/usr/bin/env python
# -*- coding: utf-8 -*-
# vim: ai ts=4 sts=4 et sw=4 nu
"""
(c) 2018 Ronan Delacroix
Tensor Flow Image Resizer
:author: Ronan Delacroix
"""
import os
import sys
from flask import Flask, render_template, request, redirect, flash, url_for
from whitenoise import WhiteNoise
from werkzeug.utils import secure_filename
import tempfile
import shutil
import json
from PIL import Image
from .tensorflow.client import TensorflowClient
import time
import dpath
import numpy
from collections import OrderedDict

# Flask setup
app = Flask('tensorflow-image-resizer',
            root_path=os.path.split(os.path.realpath(__file__))[0],
            template_folder='templates')
app.wsgi_app = WhiteNoise(app.wsgi_app, root='static/')
app.secret_key = 'to4oetjz0Vo0ouSn0'
app_name = "Tensor Flow Image Resizer"


ALLOWED_EXTENSIONS = set(['bmp', 'png', 'jpg', 'jpeg', 'gif', 'tif', 'tiff'])

SIZES = [
    (2048, 2048),
    (1024, 1024),
    (512, 512),
    (256, 256),
    (128, 128),
]

FORMAT = ('JPEG', '.jpg')


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def prediction_compare(reference, prediction):
    comparisons = []
    for ref_klass, ref_score in reference.items():
        comparisons.append(prediction.get(ref_klass, 0.0) / ref_score * 100.0)
    return numpy.mean(comparisons)


def get_tensorflow_servers():
    """
    Retrieves tensorflow servers from env
    :return: a dict with name of server as key and TensorflowClient object as value.
    """
    # default-cpu:tf-server-1:9000;gpu v1:tf-server-2:9000;gpu v2:tf-server-3:9000
    env_servers = os.environ.get('TF_SERVERS', None)
    if not env_servers:
        raise Exception('No server given in TF_SERVERS env value.')

    env_servers = env_servers.split(';')
    servers = OrderedDict()
    for env_server in env_servers:
        server = env_server.split(':')
        if len(server) != 3:
            raise Exception('Server %s if not valid. 3 values separated with : should be given as "name:host:port"')
        servers[server[0]] = TensorflowClient(host=server[1], port=server[2])

    return servers


# Routes
@app.route('/')
def index():
    """
    Main index page
    """

    tmpl_dict = {
        'app_name': app_name,
    }
    return render_template('index.html', **tmpl_dict)


@app.route('/upload', methods=['POST'])
def upload():
    """
    Upload image
    """
    # Create TF client for each given TF server
    servers = get_tensorflow_servers()

    upload_folder = tempfile.mkdtemp()
    try:
        if request.method == 'POST':
            # check if the post request has the file part
            if 'file' not in request.files:
                flash('No file part')
                return redirect(request.url)
            file = request.files['file']
            # if user does not select file, browser also
            # submit a empty part without filename
            if file.filename == '':
                flash('No selected file')
                return redirect(request.url)

            if file and allowed_file(file.filename):

                filename = secure_filename(file.filename)
                fullpath = os.path.join(upload_folder, filename)
                file.save(fullpath)
                original_filesize = os.path.getsize(fullpath)

                src_img = Image.open(fullpath, 'r')
                print('TF Processing source/reference image  %dx%d - %s.' % (src_img.size[0], src_img.size[1], src_img.format))

                original_predictions = {}
                durations = []
                for tf_server_name, tf_server in servers.items():
                    # Make prediction on original image with each TF server
                    t1 = time.time()
                    prediction = tf_server.predict_image(fullpath)
                    predict_duration = time.time() - t1
                    durations.append(predict_duration)

                    original_predictions[tf_server_name] = {
                        'results': prediction,
                        'predict_duration': predict_duration,
                        'total_duration': predict_duration,
                        'precision': 100.0
                    }

                def ref_prediction_score(prediction, tf_server_name):
                    return prediction_compare(original_predictions[tf_server_name]['results'], prediction)

                results = OrderedDict()
                ref_key = 'Orig. %dx%d' % src_img.size
                results[ref_key] = {
                    "filename": os.path.split(fullpath)[1],
                    "resized": "Reference",
                    "image_size": "%dx%d" % src_img.size,
                    "format": src_img.format,
                    "filesize": original_filesize,
                    "filesize_percent": 100.0,
                    "predictions": original_predictions,
                    'resize_duration': 0.0,
                    'predictions': original_predictions,
                    'average_precision': 100.0,
                    'average_duration': numpy.average(durations)
                }

                for size in SIZES:
                    # For each define image size, compute a resized version of the image
                    print('TF Processing %dx%d ...' % size)
                    new_filename = os.path.splitext(filename)[0]+'.' + '%dx%d.jpg' % size
                    new_fullpath = os.path.join(upload_folder, new_filename)

                    t1 = time.time()
                    resized_img = src_img.copy()
                    resized_img.thumbnail(size, Image.ANTIALIAS)
                    resized_img.save(new_fullpath, 'JPEG')
                    resize_duration = time.time() - t1

                    predictions = {}
                    precisions = []
                    durations = []
                    for tf_server_name, tf_server in servers.items():
                        # Make prediction on resized image with each TF server
                        print('TF Processing %dx%d - %s.' % (size[0], size[1], tf_server_name))

                        t2 = time.time()
                        prediction_result = tf_server.predict_image(new_fullpath)
                        predict_duration = time.time() - t2

                        precision = ref_prediction_score(prediction_result, tf_server_name)

                        predictions[tf_server_name] = {
                            'results': prediction_result,
                            'predict_duration': predict_duration,
                            'total_duration': predict_duration+resize_duration,
                            'precision': precision
                        }
                        precisions.append(precision)
                        durations.append(predict_duration)

                    results["%dx%d" % size] = {
                        'filename': new_filename,
                        "resized": "%dx%d" % size,
                        'image_size': "%dx%d" % resized_img.size,
                        'format': 'JPEG',
                        'filesize': os.path.getsize(new_fullpath),
                        'filesize_percent': os.path.getsize(new_fullpath) / original_filesize * 100.0,
                        'resize_duration': resize_duration,
                        'predictions': predictions,
                        'average_precision': numpy.average(precisions),
                        'average_duration': numpy.average(durations)
                    }

                return json.dumps({'files': [
                    {
                        "filename": os.path.split(fullpath)[1],
                        "content_type": file.content_type,
                        "filesize": original_filesize,
                        "derivatives": results,
                        "sizes": list(results.keys()),
                        "server_names": list(servers.keys())
                    }
                ]})
                print('TF Processing Done')
    finally:
        shutil.rmtree(upload_folder)
    return {}

