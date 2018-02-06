#!/usr/bin/env python
# -*- coding: utf-8 -*-
# vim: ai ts=4 sts=4 et sw=4 nu
"""
(c) 2018 Ronan Delacroix
Tensor Flow Image Resizer
:author: Ronan Delacroix
"""
import os
from flask import Flask, render_template, request, redirect, flash, url_for
from whitenoise import WhiteNoise
from werkzeug.utils import secure_filename
import tempfile
import shutil
import json
import zipfile
from PIL import Image


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


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


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

                src_img = Image.open(fullpath, 'r')

                derivatives = []
                for size in SIZES:
                    new_filename = os.path.splitext(filename)[0]+'.' + '%d_%d' % size
                    new_fullpath = os.path.join(upload_folder, new_filename)
                    png_fullpath = new_fullpath + '.png'
                    jpg_fullpath = new_fullpath + '.jpg'
                    resized_img = src_img.copy()
                    resized_img.thumbnail(size, Image.ANTIALIAS)
                    resized_img.save(png_fullpath, "PNG")
                    resized_img.save(jpg_fullpath, "JPEG")

                    derivatives.append(png_fullpath)
                    derivatives.append(jpg_fullpath)

                    # call tensor flow here on derivatives

                    #with zipfile.ZipFile('/tmp/images.zip', 'w') as z:
                    #    for f in derivatives:
                    #        z.write(f)

                return json.dumps({'files': [
                    {
                        "name": filename,
                        "type": file.content_type,
                        "size": os.path.getsize(fullpath)
                    }
                ]})
    finally:
        shutil.rmtree(upload_folder)
    return {}

