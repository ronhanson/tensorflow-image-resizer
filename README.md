Tensorflow Image Resizer
========================

***Project sponsored by [Kontron](https://www.kontron.com)***

***Project Lead and [related articles](https://medium.com/@samnco) by [Samuel Cozannet](https://www.linkedin.com/in/scozannet/)***

What is this ?
--------------

This small demo aims to provides a simple dummy web interface allowing to upload images and send them to tensorflow.

Also provides an API to upload your files and follow same process.

This small project is not production grade and is only made for Mobile World Congress to demo.


Run
---

#### Python script usage (dev mode)

    bin/tensorflow-image-resizer


#### Run using gunicorn

First set required ENV variable (see below), then :

    gunicorn -b 0.0.0.0:5051 --access-logfile - --error-logfile - tensorflow-image-resizer:app

*or*

    bin/tensorflow-image-resizer.sh 


#### Docker Build and Run

    docker build . -t mwc-tensorflow-image-resizer:latest

    docker run -p 5051:5051 mwc-tensorflow-image-resizer:latest

Finally go to [http://localhost:5051/](http://localhost:5051/)


Compatibility
-------------

This client can be used on Linux, OSX systems, or Windows.

This libraries are compatibles with Python 2.7+ and Python 3.X.

Mainly tested on 2.7 and 3.6.


Author and Licence
----------------

Project url : https://github.com/ronhanson/python-kontron-crypto-miner-webui

Copyright © 2018 [Ronan Delacroix](www.linkedin.com/in/ronan-delacroix)

This program is released under MIT Licence. Feel free to use it or part of it anywhere you want.
 
