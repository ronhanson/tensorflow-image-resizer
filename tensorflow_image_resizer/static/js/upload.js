/*
@author Ronan Delacroix
*/

$(function () {
    'use strict';

    _.templateSettings = {
        interpolate: /\[\[(.+?)\]\]/g
    };

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
        //$("#results").html('');
        $.each(files, function (index, file) {
            var file_tmpl = _.template($("#file_template").html());
            var resized_file_tmpl = _.template($("#resized_file_template").html());

            file.filesize = getReadableFileSizeString(file.filesize);
            var derivatives_html = $('<div/>');
            _.each(file.derivatives, function(resized_file) {
                resized_file.original_timing = file.processing_times.total;
                resized_file.processing_times.total_percent = resized_file.processing_times.total / resized_file.original_timing * 100.0;
                resized_file.processing_times.predict_percent = resized_file.processing_times.predict / resized_file.processing_times.total * 100.0;
                resized_file.processing_times.resize_percent = resized_file.processing_times.resize / resized_file.processing_times.total * 100.0;
                resized_file.filesize = getReadableFileSizeString(resized_file.filesize)
                derivatives_html.append(resized_file_tmpl(resized_file));
            });
            file.processed_derivatives = derivatives_html.html();
            var processed_html = file_tmpl(file);
            $("#results").append(processed_html);
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
        previewMaxWidth: 100,
        previewMaxHeight: 100,
        previewCrop: true
    }).on('fileuploadadd', function (e, data) {
        $("#image-upload > span.upload-button").addClass('done');
        data.context = $('<div/>').appendTo('#files');
        $.each(data.files, function (index, file) {
            var node = $('<p/>')
                    .append($('<span/>').text(file.name));
            if (!index) {
                node
                    .append('<br>')
                    .append(uploadButton.clone(true).data(data));
            }
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
        var progress = parseInt(data.loaded / data.total * 100, 10);
        $('#progress .progress-bar').css(
            'width',
            progress + '%'
        );
    }).on('fileuploaddone', function (e, data) {
        $('#results').html('<pre>'+JSON.stringify(data.result, null, '    ')+'</pre>');

        process_result(data.result.files);

        /*$.each(data.result.files, function (index, file) {
            if (file.url) {
                var link = $('<a>')
                    .attr('target', '_blank')
                    .prop('href', file.url);
                $(data.context.children()[index])
                    .wrap(link);
            } else if (file.error) {
                var error = $('<span class="text-danger"/>').text(file.error);
                $(data.context.children()[index])
                    .append('<br>')
                    .append(error);
            }
        });*/
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

