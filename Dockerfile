FROM python:3.5.4

MAINTAINER Ronan Delacroix "ronan.delacroix@gmail.com"

EXPOSE 5051
VOLUME /data

WORKDIR /opt/app

RUN pip3 install --upgrade pip

RUN pip3 install --no-cache-dir "flask>=0.10" whitenoise gunicorn kubernetes werkzeug Pillow "tensorflow==1.4.0" "grpcio==1.7.0"

ENV PYTHONPATH=$PYTHONPATH:/opt/app

COPY requirements.txt /opt/app
RUN pip3 install --no-cache-dir -r requirements.txt

COPY . /opt/app

ENTRYPOINT ["gunicorn", "-b", "0.0.0.0:5051", "--timeout", "120", "--access-logfile", "-", "--error-logfile", "-"]

CMD ["tensorflow_image_resizer.web:app"]

