#!/bin/bash

gunicorn -b 0.0.0.0:5051 --access-logfile - --error-logfile - tensorflow_image_resizer:app