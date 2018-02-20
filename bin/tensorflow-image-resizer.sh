#!/bin/bash

gunicorn -b 0.0.0.0:5051 --timeout 120 --access-logfile - --error-logfile  - tensorflow_image_resizer.web:app