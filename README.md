Tensorflow Image Resizer
========================

***Project sponsored by [Kontron](https://www.kontron.com)***

***Project Lead and [related articles](https://medium.com/@samnco) by [Samuel Cozannet](https://www.linkedin.com/in/scozannet/)***

***Code and programming by [Ronan Delacroix](https://www.linkedin.com/in/ronan-delacroix/)***


What is this ?
--------------

This small demo aims to provides a simple dummy web interface allowing to upload images and send them to Tensorflow for prediction. 

Also provides an API to upload your image and do Tensorflow prediction using kind of Rest/Json format.

The API actually sends the image to a Tensorflow server set for prediction. 
The API also resizes original images into different lower resolutions, make the same Tensorflow prediction and create metrics out of results. 
It returns statistics about timings, performances, accuracy and prediction precision.

The aim is to compare Tensorflow results and processing times when varying image sizes, and/or server kind (CPU, GPU, cores).

*This small project is not production grade and is made for Mobile World Congress as a demo.*

Read [https://medium.com/@samnco](https://medium.com/@samnco) to know more.

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

    docker run \
        --env TF_SERVERS="Default CPU Server:tf-serving-server-cpu:9000;GPU Server:tf-serving-server-gpu:9000" \ 
        -p 5051:5051 -t -i \
        mwc-tensorflow-image-resizer:latest

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


API Usage
---------

You can also use this project as an API endpoint to post your image from your own app.

Simply upload your image through a HTTP POST request on `/upload` url, using `file` input file field.

Here is an example :
 
    curl  -F "file=@/Users/ronan/Pictures/cat.jpg"   http://localhost:5051/upload

The result is presented as JSON.
Dummy result example follows:

    {
      "files": [
        {
          "filename": "moi.jpg",
          "filesize": 118707,
          "content_type": "image\/jpeg",
          "server_names": [
            "default",
            "gpu"
          ],
          "sizes": [
            "Orig. 550x636",
            "2048x2048",
            "1024x1024",
            "512x512",
            "256x256",
            "128x128"
          ],
          "derivatives": {
            "Orig. 550x636": {
              "average_duration": 6.6138181686401,
              "predictions": {
                "gpu": {
                  "results": {
                    "comic book": 8.89501953125,
                    "book jacket, dust cover, dust jacket, dust wrapper": 8.2884063720703,
                    "envelope": 4.5581865310669,
                    "tray": 3.6763899326324,
                    "packet": 3.4327256679535
                  },
                  "precision": 100,
                  "predict_duration": 0.99241065979004,
                  "total_duration": 0.99241065979004
                },
                "default": {
                  "results": {
                    "comic book": 8.89501953125,
                    "book jacket, dust cover, dust jacket, dust wrapper": 8.2884063720703,
                    "envelope": 4.5581865310669,
                    "tray": 3.6763899326324,
                    "packet": 3.4327256679535
                  },
                  "precision": 100,
                  "predict_duration": 12.23522567749,
                  "total_duration": 12.23522567749
                }
              },
              "resize_duration": 0,
              "format": "JPEG",
              "average_precision": 100,
              "filesize": 118707,
              "filename": "moi.jpg",
              "image_size": "550x636",
              "resized": "Reference",
              "filesize_percent": 100
            },
            "2048x2048": {
              "average_duration": 1.1133260726929,
              "predictions": {
                "gpu": {
                  "results": {
                    "comic book": 8.8598012924194,
                    "book jacket, dust cover, dust jacket, dust wrapper": 8.6930170059204,
                    "envelope": 4.5749850273132,
                    "tray": 3.6941545009613,
                    "puck, hockey puck": 3.4707596302032
                  },
                  "precision": 81.067491018236,
                  "predict_duration": 1.0252320766449,
                  "total_duration": 1.1765704154968
                },
                "default": {
                  "results": {
                    "comic book": 8.8598012924194,
                    "book jacket, dust cover, dust jacket, dust wrapper": 8.6930170059204,
                    "envelope": 4.5749850273132,
                    "tray": 3.6941545009613,
                    "puck, hockey puck": 3.4707596302032
                  },
                  "precision": 81.067491018236,
                  "predict_duration": 1.2014200687408,
                  "total_duration": 1.3527584075928
                }
              },
              "resize_duration": 0.15133833885193,
              "format": "JPEG",
              "average_precision": 81.067491018236,
              "filesize": 71679,
              "filename": "moi.2048x2048.jpg",
              "image_size": "550x636",
              "resized": "2048x2048",
              "filesize_percent": 60.383128206424
            },
            "1024x1024": {
              "average_duration": 0.89396262168884,
              "predictions": {
                "gpu": {
                  "results": {
                    "comic book": 8.8598012924194,
                    "book jacket, dust cover, dust jacket, dust wrapper": 8.6930170059204,
                    "envelope": 4.5749850273132,
                    "tray": 3.6941545009613,
                    "puck, hockey puck": 3.4707596302032
                  },
                  "precision": 81.067491018236,
                  "predict_duration": 0.83424687385559,
                  "total_duration": 0.85841846466064
                },
                "default": {
                  "results": {
                    "comic book": 8.8598012924194,
                    "book jacket, dust cover, dust jacket, dust wrapper": 8.6930170059204,
                    "envelope": 4.5749850273132,
                    "tray": 3.6941545009613,
                    "puck, hockey puck": 3.4707596302032
                  },
                  "precision": 81.067491018236,
                  "predict_duration": 0.95367836952209,
                  "total_duration": 0.97784996032715
                }
              },
              "resize_duration": 0.024171590805054,
              "format": "JPEG",
              "average_precision": 81.067491018236,
              "filesize": 71679,
              "filename": "moi.1024x1024.jpg",
              "image_size": "550x636",
              "resized": "1024x1024",
              "filesize_percent": 60.383128206424
            },
            "512x512": {
              "average_duration": 0.98880505561829,
              "predictions": {
                "gpu": {
                  "results": {
                    "comic book": 8.9899501800537,
                    "book jacket, dust cover, dust jacket, dust wrapper": 8.4078044891357,
                    "envelope": 4.4274864196777,
                    "tray": 3.9461207389832,
                    "puck, hockey puck": 3.2541999816895
                  },
                  "precision": 81.395449099462,
                  "predict_duration": 1.0694222450256,
                  "total_duration": 1.2666203975677
                },
                "default": {
                  "results": {
                    "comic book": 8.9899501800537,
                    "book jacket, dust cover, dust jacket, dust wrapper": 8.4078044891357,
                    "envelope": 4.4274864196777,
                    "tray": 3.9461207389832,
                    "puck, hockey puck": 3.2541999816895
                  },
                  "precision": 81.395449099462,
                  "predict_duration": 0.90818786621094,
                  "total_duration": 1.1053860187531
                }
              },
              "resize_duration": 0.19719815254211,
              "format": "JPEG",
              "average_precision": 81.395449099462,
              "filesize": 47200,
              "filename": "moi.512x512.jpg",
              "image_size": "442x512",
              "resized": "512x512",
              "filesize_percent": 39.761766365926
            },
            "256x256": {
              "average_duration": 1.4369288682938,
              "predictions": {
                "gpu": {
                  "results": {
                    "comic book": 9.7475137710571,
                    "book jacket, dust cover, dust jacket, dust wrapper": 8.5457496643066,
                    "jersey, T-shirt, tee shirt": 4.631067276001,
                    "tray": 4.5579609870911,
                    "envelope": 4.5538229942322
                  },
                  "precision": 87.314467556298,
                  "predict_duration": 0.88055467605591,
                  "total_duration": 0.90344023704529
                },
                "default": {
                  "results": {
                    "comic book": 9.7475137710571,
                    "book jacket, dust cover, dust jacket, dust wrapper": 8.5457496643066,
                    "jersey, T-shirt, tee shirt": 4.631067276001,
                    "tray": 4.5579609870911,
                    "envelope": 4.5538229942322
                  },
                  "precision": 87.314467556298,
                  "predict_duration": 1.9933030605316,
                  "total_duration": 2.016188621521
                }
              },
              "resize_duration": 0.02288556098938,
              "format": "JPEG",
              "average_precision": 87.314467556298,
              "filesize": 15173,
              "filename": "moi.256x256.jpg",
              "image_size": "221x256",
              "resized": "256x256",
              "filesize_percent": 12.781891548097
            },
            "128x128": {
              "average_duration": 0.8400958776474,
              "predictions": {
                "gpu": {
                  "results": {
                    "comic book": 9.6742382049561,
                    "book jacket, dust cover, dust jacket, dust wrapper": 7.1120657920837,
                    "jersey, T-shirt, tee shirt": 5.7149996757507,
                    "binder, ring-binder": 5.0224323272705,
                    "handkerchief, hankie, hanky, hankey": 4.6893925666809
                  },
                  "precision": 38.913513118862,
                  "predict_duration": 0.82929587364197,
                  "total_duration": 0.90497159957886
                },
                "default": {
                  "results": {
                    "comic book": 9.6742382049561,
                    "book jacket, dust cover, dust jacket, dust wrapper": 7.1120657920837,
                    "jersey, T-shirt, tee shirt": 5.7149996757507,
                    "binder, ring-binder": 5.0224323272705,
                    "handkerchief, hankie, hanky, hankey": 4.6893925666809
                  },
                  "precision": 38.913513118862,
                  "predict_duration": 0.85089588165283,
                  "total_duration": 0.92657160758972
                }
              },
              "resize_duration": 0.07567572593689,
              "format": "JPEG",
              "average_precision": 38.913513118862,
              "filesize": 4933,
              "filename": "moi.128x128.jpg",
              "image_size": "110x128",
              "resized": "128x128",
              "filesize_percent": 4.1556100314219
            }
          }
        }
      ]
    }


Compatibility
-------------

This API can be used on Linux or MacOS systems.

Mainly tested on Python 3.5 and 3.6.


Author and Licence
----------------

Project url : https://github.com/ronhanson/crypto-miner-webui

Copyright © 2018 [Ronan Delacroix](www.linkedin.com/in/ronan-delacroix)

This program is released under MIT Licence. Feel free to use it or part of it anywhere you want.
 
