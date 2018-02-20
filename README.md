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

    gunicorn -b 0.0.0.0:5051 --access-logfile - --error-logfile - tensorflow-image-resizer.web:app

*or*

    bin/tensorflow-image-resizer.sh 


#### Docker Build and Run

    docker build . -t mwc-tensorflow-image-resizer:latest

    docker run -p 5051:5051 mwc-tensorflow-image-resizer:latest

Finally go to [http://localhost:5051/](http://localhost:5051/)


Env variables
-------------

#### Tensorflow server related

  - ***TF_SERVERS*** <**required**> - contains info about TF servers  : `TF_SERVERS="<server_name>:<server_host>:<server_port>"`
  You can input multiple TF servers (separated with semicolons if there are more than one). Example : `TF_SERVERS="My CPU TF Server:192.168.0.3:9000;Someone else GPU TF Server:192.168.1.148:8000"`.

#### Tensorflow Model related (optional)

  - ***MODEL_NAME*** <optional> - default : `'inception'` - Name of the TF Model to use.
  - ***MODEL_SIGNATURE_NAME*** <optional> - default : `'predict_images'` - Signature Name of the TF Model to use.
  - ***MODEL_INPUT_KEY*** <optional> - default : `'images'` - Input key of the TF Model to upload an image to.

Pay attention that your TF server should be accessible on the network of your docker container.


Run the full project with docker-compose
----------------------------------------

You can use docker-compose and the docker-compose.yaml file to run the full project, both TF server and the client at once.

Copy the docker-compose.yaml in a folder of your choice and simply type : 

    docker-compose up
    
Also, you only need to download the TF image inception model and place it in `/tmp/model-data`:

    > mkdir /tmp/model-data
    > cd /tmp/model-data
    # copy your exported model data here, so that it contains a folder named "1" like this :
    > tree
    .
    └── 1
        ├── saved_model.pb
        └── variables
            ├── variables.data-00000-of-00001
            └── variables.index



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
 
