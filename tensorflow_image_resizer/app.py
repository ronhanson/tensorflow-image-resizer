#!/usr/bin/env python
# -*- coding: utf-8 -*-
# vim: ai ts=4 sts=4 et sw=4 nu
"""
(c) 2018 Ronan Delacroix
Tensor Flow Image Resizer
:author: Ronan Delacroix
"""
import os
from flask import Flask, render_template
from whitenoise import WhiteNoise


# Flask setup
app = Flask('tensorflow-image-resizer',
            root_path=os.path.split(os.path.realpath(__file__))[0],
            template_folder='templates')
app.wsgi_app = WhiteNoise(app.wsgi_app, root='static/')
app_name = "Tensor Flow Image Resizer"


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

