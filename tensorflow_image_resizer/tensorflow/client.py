#!/usr/bin/env python
# -*- coding: utf-8 -*-
# vim: ai ts=4 sts=4 et sw=4 nu
"""
(c) 2018 Ronan Delacroix
Tensor Flow Image Resizer
:Author: Ronan Delacroix
"""
import os
import sys
import operator
from collections import OrderedDict
import tensorflow as tf
from grpc.beta import implementations
from grpc import RpcError
from tensorflow_serving.apis import predict_pb2
from tensorflow_serving.apis import prediction_service_pb2


class TensorflowClient:
    """
    Tensorflow Image Prediction helper class
    """
    def __init__(self, host=None, port=None, model_name=None, model_signature_name=None, model_input_key=None):
        """
        Setup TF server and model data based on parameters, or env settings if left blank.
        """
        self.host = host or os.environ.get('TF_SERVER_NAME')
        self.port = port or os.environ.get('TF_SERVER_PORT')
        self.port = int(self.port)

        assert self.host and self.port

        self.model_name = model_name or os.environ.get('MODEL_NAME', 'inception')
        self.model_signature_name = model_signature_name or os.environ.get('MODEL_SIGNATURE_NAME', 'predict_images')
        self.model_input_key = model_input_key or os.environ.get('MODEL_INPUT_KEY', 'images')

        self.timeout = os.environ.get('TF_REQUEST_TIMEOUT', 60.0)

        self.channel = implementations.insecure_channel(self.host, self.port)
        self.stub = prediction_service_pb2.beta_create_PredictionService_stub(self.channel)

    def create_request(self, image_file):
        """
        Create tensorflow request
        :param image_file: image file handler
        :return: PredictRequest
        """
        request = predict_pb2.PredictRequest()
        request.model_spec.name = self.model_name
        request.model_spec.signature_name = self.model_signature_name
        request.inputs[self.model_input_key].CopyFrom(tf.contrib.util.make_tensor_proto(image_file.read(), shape=[1]))
        return request

    def parse_result(self, tf_result):
        """
        Parse the Tensorflow prediction result
        :param tf_result: PredictResponse - result of stub.Predict() function call
        :return: A dict with KV pairs of labels and scores
        """
        labels = tf_result.outputs['classes'].string_val
        probs = tf_result.outputs['scores'].float_val

        zipped = [(label.decode('utf-8'), prob) for label, prob in zip(labels, probs)]
        sorted_values = sorted(zipped, key=operator.itemgetter(1), reverse=True)

        return OrderedDict(sorted_values)

    def predict_image(self, image_filepath):
        """
        Make a Tensorflow prediction based on an image filename
        :param image_filepath: image file path
        :return: dict containing a set of labels and scores
        """
        with open(image_filepath, 'rb') as image_file:
            request = self.create_request(image_file)
            try:
                result = self.stub.Predict(request, self.timeout)  # 60 secs timeout
            except RpcError as e:
                print("Connection error while reaching TF server at %s:%d - %s" % (self.host, self.port, e), file=sys.stderr)
                raise

        return self.parse_result(result)
