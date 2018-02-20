/*
@author Ronan Delacroix
*/

predict_data = {
  "files": [
    {
      "filename": "daph.jpg",
      "content_type": "image\/jpeg",
      "filesize": 51353,
      "server_names": ["default", "gpu"],
      "sizes": ["2048x2048", "1024x1024", "512x512", "256x256", "128x128"],
      "derivatives": {
        "Orig. 453x604": {
          "filename": "daph.jpg",
          "image_size": "453x604",
          "resized": "Reference",
          "average_duration": 0.86513543128967,
          "filesize_percent": 100,
          "average_precision": 100,
          "format": "JPEG",
          "predictions": {
            "default": {
              "precision": 100,
              "predict_duration": 1.006906747818,
              "results": {
                "stole": 6.3457064628601,
                "poncho": 6.1307721138,
                "sarong": 4.7486276626587,
                "feather boa, boa": 4.3989953994751,
                "bib": 4.0259637832642
              },
              "total_duration": 1.006906747818
            },
            "gpu": {
              "precision": 100,
              "predict_duration": 0.72336411476135,
              "results": {
                "stole": 6.3457064628601,
                "poncho": 6.1307721138,
                "sarong": 4.7486276626587,
                "feather boa, boa": 4.3989953994751,
                "bib": 4.0259637832642
              },
              "total_duration": 0.72336411476135
            }
          },
          "filesize": 51353,
          "resize_duration": 0
        },
        "2048x2048": {
          "filename": "daph.2048x2048.jpg",
          "image_size": "453x604",
          "resized": "2048x2048",
          "average_duration": 0.84529209136963,
          "filesize_percent": 87.689132085759,
          "average_precision": 100,
          "format": "JPEG",
          "predictions": {
            "default": {
              "precision": 100,
              "predict_duration": 0.85321688652039,
              "results": {
                "stole": 6.4791679382324,
                "poncho": 5.746889591217,
                "sarong": 4.8872017860413,
                "feather boa, boa": 4.7093043327332,
                "wig": 4.2504177093506
              },
              "total_duration": 0.87188076972961
            },
            "gpu": {
              "precision": 100,
              "predict_duration": 0.83736729621887,
              "results": {
                "stole": 6.4791679382324,
                "poncho": 5.746889591217,
                "sarong": 4.8872017860413,
                "feather boa, boa": 4.7093043327332,
                "wig": 4.2504177093506
              },
              "total_duration": 0.8560311794281
            }
          },
          "filesize": 45031,
          "resize_duration": 0.018663883209229
        },
        "1024x1024": {
          "filename": "daph.1024x1024.jpg",
          "image_size": "453x604",
          "resized": "1024x1024",
          "average_duration": 0.74363553524017,
          "filesize_percent": 87.689132085759,
          "average_precision": 100,
          "format": "JPEG",
          "predictions": {
            "default": {
              "precision": 100,
              "predict_duration": 0.76020073890686,
              "results": {
                "stole": 6.4791679382324,
                "poncho": 5.746889591217,
                "sarong": 4.8872017860413,
                "feather boa, boa": 4.7093043327332,
                "wig": 4.2504177093506
              },
              "total_duration": 0.77376317977905
            },
            "gpu": {
              "precision": 100,
              "predict_duration": 0.72707033157349,
              "results": {
                "stole": 6.4791679382324,
                "poncho": 5.746889591217,
                "sarong": 4.8872017860413,
                "feather boa, boa": 4.7093043327332,
                "wig": 4.2504177093506
              },
              "total_duration": 0.74063277244568
            }
          },
          "filesize": 45031,
          "resize_duration": 0.013562440872192
        },
        "512x512": {
          "filename": "daph.512x512.jpg",
          "image_size": "384x512",
          "resized": "512x512",
          "average_duration": 0.81032705307007,
          "filesize_percent": 56.649076003349,
          "average_precision": 100,
          "format": "JPEG",
          "predictions": {
            "default": {
              "precision": 100,
              "predict_duration": 0.81122994422913,
              "results": {
                "stole": 6.1926455497742,
                "poncho": 6.0581345558167,
                "sarong": 5.7648749351501,
                "pajama, pyjama, pj's, jammies": 4.7426805496216,
                "feather boa, boa": 4.2532725334167
              },
              "total_duration": 0.84041714668274
            },
            "gpu": {
              "precision": 100,
              "predict_duration": 0.80942416191101,
              "results": {
                "stole": 6.1926455497742,
                "poncho": 6.0581345558167,
                "sarong": 5.7648749351501,
                "pajama, pyjama, pj's, jammies": 4.7426805496216,
                "feather boa, boa": 4.2532725334167
              },
              "total_duration": 0.83861136436462
            }
          },
          "filesize": 29091,
          "resize_duration": 0.029187202453613
        },
        "256x256": {
          "filename": "daph.256x256.jpg",
          "image_size": "192x256",
          "resized": "256x256",
          "average_duration": 0.8101099729538,
          "filesize_percent": 19.340642221487,
          "average_precision": 100,
          "format": "JPEG",
          "predictions": {
            "default": {
              "precision": 100,
              "predict_duration": 0.82589173316956,
              "results": {
                "poncho": 5.0755324363708,
                "sarong": 4.9999623298645,
                "stole": 3.9344449043274,
                "feather boa, boa": 3.853298664093,
                "kimono": 3.8276813030243
              },
              "total_duration": 0.83770680427551
            },
            "gpu": {
              "precision": 100,
              "predict_duration": 0.79432821273804,
              "results": {
                "poncho": 5.0755324363708,
                "sarong": 4.9999623298645,
                "stole": 3.9344449043274,
                "feather boa, boa": 3.853298664093,
                "kimono": 3.8276813030243
              },
              "total_duration": 0.80614328384399
            }
          },
          "filesize": 9932,
          "resize_duration": 0.011815071105957
        },
        "128x128": {
          "filename": "daph.128x128.jpg",
          "image_size": "96x128",
          "resized": "128x128",
          "average_duration": 0.75039565563202,
          "filesize_percent": 6.9538293770568,
          "average_precision": 100,
          "format": "JPEG",
          "predictions": {
            "default": {
              "precision": 100,
              "predict_duration": 0.75632882118225,
              "results": {
                "overskirt": 5.0148344039917,
                "chain mail, ring mail, mail, chain armor, chain armour, ring armor, ring armour": 4.7831993103027,
                "Windsor tie": 4.5297050476074,
                "neck brace": 4.1424269676208,
                "maraca": 3.9481637477875
              },
              "total_duration": 0.76471924781799
            },
            "gpu": {
              "precision": 100,
              "predict_duration": 0.74446249008179,
              "results": {
                "overskirt": 5.0148344039917,
                "chain mail, ring mail, mail, chain armor, chain armour, ring armor, ring armour": 4.7831993103027,
                "Windsor tie": 4.5297050476074,
                "neck brace": 4.1424269676208,
                "maraca": 3.9481637477875
              },
              "total_duration": 0.75285291671753
            }
          },
          "filesize": 3571,
          "resize_duration": 0.0083904266357422
        }
      }
    }
  ]
};

$(function () {
    'use strict';

    _.templateSettings = {
        interpolate: /\[\[(.+?)\]\]/g
    };

    function graph_predictions(element_id, file_data) {

        var image_list = file_data.derivatives;
        var values = _.values(image_list);
        var keys = _.keys(image_list);
        var average_precisions = _.pluck(values, 'average_precision');

        var trace1 = {
            x: average_precisions,
            y: keys,
            name: 'Prediction accuracy',
            orientation: 'h',
            marker: {
                color: 'rgba(55,128,191,0.6)',
                width: 1
            },
            type: 'bar'
        };

        var data = [trace1];

        var layout = {
            title: 'Prediction accuracy by image size',
            barmode: 'stack',
            yaxis: {
                autorange: 'reversed',
                showticklabels: true,
            },
            xaxis: {
                hoverformat: '.2f',
                ticksuffix: '%'
            },
            annotations: []
        };

        for ( var i = 0 ; i < average_precisions.length ; i++ ) {
            var result = {
                xref: 'x1',
                yref: 'y1',
                x: average_precisions[i]+5,
                y: keys[i],
                text: average_precisions[i].toFixed(1) + '%',
                font: {
                    family: 'Arial',
                    size: 12,
                    color: 'rgba(55,128,191,0.6)'
                },
                showarrow: false
            };

          layout.annotations.push(result);
        }

        Plotly.newPlot(element_id, data, layout);
    }

    function graph_average_timing(element_id, file_data) {

        var image_list = file_data.derivatives;
        var values = _.values(image_list);
        var keys = _.keys(image_list);
        var predict_timings = _.pluck(values, 'average_duration');
        var resize_timings = _.pluck(values, 'resize_duration');

        var trace1 = {
            x: predict_timings,
            y: keys,
            name: 'Prediction duration',
            orientation: 'h',
            marker: {
                color: 'rgba(55,128,191,0.6)',
                width: 1
            },
            type: 'bar'
        };

        var data = [trace1];

        var layout = {
            title: 'Prediction Duration by image size',
            barmode: 'stack',
            yaxis: {
                autorange: 'reversed',
            },
            xaxis: {
                hoverformat: '.2f',
                ticksuffix: ' sec'
            },
            legend: {
                x: 0.309,
                y: -0.52,
                font: {
                    size: 10
                }
            }
        };

        Plotly.newPlot(element_id, data, layout);
    }

    function graph_total(element_id, file_data) {
        var image_list = file_data.derivatives;
        var values = _.values(image_list);
        var keys = _.keys(image_list);
        var precisions = _.pluck(values, 'average_precision');
        var timings = _.pluck(values, 'average_duration');
        var filesizes = _.pluck(values, 'filesize_percent');


        var data = [];

        _.each(file_data.server_names, function(server_name) {
            var server_timings = [];
            _.each(file_data.derivatives, function(v, k) {
                server_timings.push(v.predictions[server_name].predict_duration);
            });
            data.push({
                x: keys,
                y: server_timings,
                name: server_name+' server predict duration',
                marker: {
                    size: 8
                },
                line: {
                    dash: 'solid',
                    width: 4
                },
                xaxis: 'sizes1',
                yaxis: 'y2',
                type: 'line'
            });
        });

        var trace1 = {
            x: keys,
            y: precisions,
            name: 'Prediction precision',
            marker: {
                size: 8
            },
            line: {
                dash: 'dashdot',
                width: 4
            },
            xaxis: 'size1',
            yaxis: 'y1',
            type: 'line'
        };
/*
        var trace2 = {
            x: keys,
            y: timings,
            name: 'Prediction duration',
            marker: {
                color: 'rgba(255,153,51, 1)',
                size: 8
            },
            line: {
                dash: 'solid',
                width: 4
            },
            xaxis: 'sizes1',
            yaxis: 'y2',
            type: 'line'
        };*/

        var trace3 = {
            x: keys,
            y: filesizes,
            name: 'File size',
            marker: {
                width: 2,
            },
            line: {
                dash: 'dot',
                width: 2
            },
            xaxis: 'sizes1',
            yaxis: 'y1',
            type: 'line'
        };
        data.push(trace3);
        data.push(trace1);


        var layout = {
            title: 'Prediction precision and timings',
            margin: {
                l: 80,
                r: 80,
                b: 50,
                t: 80,
                pad: 0
            },
            showlegend: true,
	        legend: {
                "orientation": "h"
            },
            yaxis1: {
                title: 'Result precision (%) / File size (%)',
                titlefont: {color: 'rgb(212,42,47)'},
                tickfont: {color: 'rgb(212,42,47)'},
                hoverformat: '.1f',
                ticksuffix: '%',
                range: [0.0, 140.0]
            },
            yaxis2: {
                title: 'Predict duration (s)',
                titlefont: {color: 'rgba(255,153,51,0.6)'},
                tickfont: {color: 'rgba(255,153,51,0.6)'},
                overlaying: 'y',
                side: 'right',
                hoverformat: '.2f',
                ticksuffix: ' sec'
            }
        };

        Plotly.newPlot(element_id, data, layout);
    }

    function graph_filesize(element_id, file_data) {
        var image_list = file_data.derivatives;
        var values = _.values(image_list);
        var filesizes = _.pluck(values, 'filesize');
        var precisions = _.pluck(values, 'average_precision');
        var timings = _.pluck(values, 'average_duration');

        var data = [];

        var trace1 = {
            x: filesizes,
            y: precisions,
            name: 'Predict precision',
            marker: {
                size: 8
            },
            line: {
                dash: 'solid',
                width: 4
            },
            xaxis: 'x1',
            yaxis: 'y1',
            type: 'line'
        };
        data.push(trace1);

        var trace2 = {
            x: filesizes,
            y: timings,
            name: 'Predict duration',
            marker: {
                width: 8,
            },
            line: {
                width: 4
            },
            xaxis: 'x1',
            yaxis: 'y2',
            type: 'line'
        };
        data.push(trace2);


        var layout = {
            title: 'Precision and timings related to filesize',
            margin: {
                l: 80,
                r: 80,
                b: 50,
                t: 80,
                pad: 0
            },
            showlegend: true,
            legend: {
                orientation: "h",
                x: -0.1,
                y: 1.1

            },
            xaxis1: {
                title: 'File size (Byte)'
            },
            yaxis1: {
                title: 'Result precision (%)',
                titlefont: {color: 'rgb(38,120,178, 0.6)'},
                tickfont: {color: 'rgb(38,120,178, 0.6)'},
                hoverformat: '.1f',
                ticksuffix: '%',
                range: [0.0, 140.0]
            },
            yaxis2: {
                title: 'Predict duration (s)',
                titlefont: {color: 'rgba(255,153,51,0.6)'},
                tickfont: {color: 'rgba(255,153,51,0.6)'},
                overlaying: 'y',
                side: 'right',
                hoverformat: '.2f',
                ticksuffix: ' sec'
            }
        };

        Plotly.newPlot(element_id, data, layout);
    }

    function graph_servers(element_id, file_data) {
        var image_list = file_data.derivatives;
        var values = _.values(image_list);
        var keys = file_data.server_names;


        var server_timings = [];
        _.each(file_data.server_names, function(server_name) {
            var duration = 0.0;
            _.each(image_list, function(v, k) {
                duration = duration + v.predictions[server_name].predict_duration;
            });
            server_timings.push(duration / _.keys(file_data.derivatives).length);
        });

        var trace1 = {
            x: server_timings,
            y: keys,
            name: 'Average duration',
            marker: {
                size: 8
            },
            line: {
                dash: 'solid',
                width: 4
            },
            orientation: 'h',
            type: 'bar'
        };

        var data = [trace1];

        var layout = {
            title: 'Average timings related to servers',
            barmode: 'stack',
            yaxis: {
                autorange: 'reversed',
            },
            xaxis: {
                hoverformat: '.2f',
                ticksuffix: ' sec'
            }
        };

        Plotly.newPlot(element_id, data, layout);
    }

    /*graph_total('graph0', predict_data.files[0]);
    graph_average_timing('graph1', predict_data.files[0]);
    graph_predictions('graph2', predict_data.files[0]);
    graph_filesize('graph3', predict_data.files[0]);
    graph_servers('graph4', predict_data.files[0]);*/

    function getReadableFileSizeString(fileSizeInBytes) {
        var i = -1;
        var byteUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
        do {
            fileSizeInBytes = fileSizeInBytes / 1024;
            i++;
        } while (fileSizeInBytes > 1024);

        return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
    }

    function process_result(files) {
        $("#results").html('');

        $.each(files, function (index, file) {

            graph_total('graph0', file);
            graph_average_timing('graph1', file);
            graph_predictions('graph2', file);
            graph_filesize('graph3', file);
            graph_servers('graph4', file);

        });
    }




    // Change this to the location of your server-side upload handler:
    var url = '/upload',
        uploadButton = $('<button/>')
            .addClass('upload-button')
            .prop('disabled', true)
            .text('Processing...')
            .on('click', function () {
                var $this = $(this),
                    data = $this.data();
                $this
                    .off('click')
                    .text('Abort')
                    .on('click', function () {
                        $this.remove();
                        data.abort();
                    });
                data.submit().always(function () {
                    $this.remove();
                });
            });
    $('#fileupload').fileupload({
        url: url,
        dataType: 'json',
        autoUpload: true,
        acceptFileTypes: /(\.|\/)(gif|jpe?g|png|bmp)$/i,
        maxFileSize: 99900000,
        disableImageResize: true,
        previewMaxWidth: 250,
        previewMaxHeight: 80
        //previewCrop: true
    }).on('fileuploadadd', function (e, data) {
        //$('#progress').addClass('done');
        $("#image-upload > span.upload-button").addClass('done');
        data.context = $('<div/>').appendTo('#files');
        $.each(data.files, function (index, file) {
            var node = $('<div/>')
                    .append($('<span/>').text(file.name));
            node.appendTo(data.context);
        });
    }).on('fileuploadprocessalways', function (e, data) {
        var index = data.index,
            file = data.files[index],
            node = $(data.context.children()[index]);
        if (file.preview) {
            node
                .prepend('<br>')
                .prepend(file.preview);
        }
        if (file.error) {
            node
                .append('<br>')
                .append($('<span class="text-danger"/>').text(file.error));
        }
        if (index + 1 === data.files.length) {
            data.context.find('button')
                .text('Upload')
                .prop('disabled', !!data.files.error);
        }
    }).on('fileuploadprogressall', function (e, data) {
        $('#loader').removeClass('hidden');
        $('#progress').removeClass('done');
        var progress = parseInt(data.loaded / data.total * 100, 10);
        $('#progress .progress-bar').css(
            'width',
            progress + '%'
        );
    }).on('fileuploaddone', function (e, data) {
        $('#loader').addClass('hidden');
        $('#output').removeClass('hidden');
        $('#progress').addClass('done');
        $('#results').html('<pre>'+JSON.stringify(data.result, null, '    ')+'</pre>');

        process_result(data.result.files);

    }).on('fileuploadfail', function (e, data) {
        $.each(data.files, function (index) {
            var error = $('<span class="text-danger"/>').text('File upload failed.');
            $(data.context.children()[index])
                .append('<br>')
                .append(error);
        });
    }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');
});

