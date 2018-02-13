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

# Flask setup
app = Flask('tensorflow-image-resizer',
            root_path=os.path.split(os.path.realpath(__file__))[0],
            template_folder='templates')
app.wsgi_app = WhiteNoise(app.wsgi_app, root='static/')
app_name = "Tensor Flow Image Resizer"


ALLOWED_EXTENSIONS = set(['bmp', 'png', 'jpg', 'jpeg', 'gif', 'tif', 'tiff'])

SIZES = [
    (2048, 2048),
    (1024, 1024),
    (512, 512),
    (256, 256),
    (128, 128),
    (64, 64),
    (32, 32),
]

FORMATS = [
    ('JPEG', '.jpg'),
    ('PNG', '.png')
]


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# Setup Tensorflow client from ENV settings
tf_client = TensorflowClient()


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

                t1 = time.time()
                original_prediction = tf_client.predict_image(fullpath)
                original_predict_duration = time.time() - t1

                src_img = Image.open(fullpath, 'r')

                results = []
                for size in SIZES:
                    new_filename = os.path.splitext(filename)[0]+'.' + '%d_%d' % size
                    new_fullpath = os.path.join(upload_folder, new_filename)
                    for format in FORMATS:

                        typed_fullpath = new_fullpath + format[1]

                        t1 = time.time()
                        resized_img = src_img.copy()
                        resized_img.thumbnail(size, Image.ANTIALIAS)
                        resized_img.save(typed_fullpath, format[0])
                        resize_duration = time.time() - t1

                        #url = 'http://{tf_api_host}:{tf_api_port}/tf_api/gan_client/prediction'.format(
                        #    tf_api_host=os.environ.get('TF_API_HOST', '0.0.0.0'),
                        #    tf_api_port=os.environ.get('TF_API_PORT', 5000))
                        #headers = {'Accept': 'application/json', 'Content-Type': 'multipart/form-data'}
                        #r = requests.post(url, files={'image': open(jpg_fullpath,'rb')}, headers=headers)
                        #result = r.json()
                        #print(result)

                        t2 = time.time()
                        prediction = tf_client.predict_image(typed_fullpath)
                        total_duration = time.time() - t1
                        predict_duration = time.time() - t2

                        results.append({
                            'size': size,
                            'format': format[0],
                            'filename': os.path.split(typed_fullpath)[1],
                            'filesize': os.path.getsize(typed_fullpath),
                            'prediction': prediction,
                            'processing_times': {
                                'resize': resize_duration,
                                'predict': predict_duration,
                                'total': total_duration,
                            }
                        })

                return json.dumps({'files': [
                    {
                        "name": filename,
                        "type": file.content_type,
                        "size": os.path.getsize(fullpath),
                        "prediction": original_prediction,
                        "predict_duration": original_predict_duration,
                        "predictions": results
                    }
                ]})
    finally:
        shutil.rmtree(upload_folder)
    return {}

