/*
@author Ronan Delacroix
*/

$(function () {
    'use strict';

    _.templateSettings = {
        interpolate: /\[\[(.+?)\]\]/g
    };

    /*
        GRAPHS
     */
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
            margin: { pad: 5 },
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
            margin: { pad: 5 },
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

        var trace3 = {
            x: keys,
            y: filesizes,
            name: 'Bandwidth / Filesize',
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
                pad: 5
            },
            showlegend: true,
	        legend: {
                "orientation": "h"
            },
            yaxis1: {
                title: 'Result precision (%) / Bandwidth (%)',
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
            title: 'Precision and timings related to Bandwidth',
            margin: {
                l: 80,
                r: 80,
                b: 50,
                t: 80,
                pad: 5
            },
            showlegend: true,
            legend: {
                orientation: "h",
                x: -0.1,
                y: 1.1

            },
            xaxis1: {
                title: 'Bandwidth (Byte)'
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
            margin: { pad: 5 },
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

    /*
        Upload handler
     */
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

    /*
        Image File Upload button handler.
     */
    $('#fileupload').fileupload({
        url: '/upload',
        dataType: 'json',
        autoUpload: true,
        acceptFileTypes: /(\.|\/)(gif|jpe?g|png|bmp)$/i,
        maxFileSize: 99900000,
        disableImageResize: true,
        previewMaxWidth: 250,
        previewMaxHeight: 80
    }).on('fileuploadadd', function (e, data) {
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
            node.prepend('<br>').prepend(file.preview);
        }
        if (file.error) {
            node.append('<br>').append($('<span class="text-danger"/>').text(file.error));
        }$
    })
    .on('fileuploadprogressall', function (e, data) {
        $('#loader').removeClass('hidden');
        $('#progress').removeClass('done');
        var progress = parseInt(data.loaded / data.total * 100, 10);
        if (progress>=100) {
            $('#progress').addClass('done');
        }
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

    /*
        Test/Dev functions
     */

    function test() {
        graph_total('graph0', predict_data.files[0]);
        graph_average_timing('graph1', predict_data.files[0]);
        graph_predictions('graph2', predict_data.files[0]);
        graph_filesize('graph3', predict_data.files[0]);
        graph_servers('graph4', predict_data.files[0]);
    }
    //test();

});

