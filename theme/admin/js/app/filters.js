'use strict';

/* Filters */

angular.module('myApp.filters', []).
        filter('interpolate', ['version', function(version) {
        return function(text) {
            return String(text).replace(/\%VERSION\%/mg, version);
        }
    }]).
        filter('urlify', function() {
    return function(text) {
        return text.replace(/(^\-+|[^a-zA-Z0-9\/_| -]+|\-+$)/g, '')
                .toLowerCase()
                .replace(/[\/_| -]+/g, '-');
    };
})
        .
        filter('safetitle', function() {
    return function(text) {
        return text.replace(/(^\-+|[^a-zA-Z0-9\/_| -]+|\-+$)/g, '')
                .toLowerCase()
                .replace(/[\/_| -]+/g, '');
    }
})
        .filter('checkmark', function() {
    return function(input) {
        return input ? '\u2713' : '\u2718';
    };
})
        .filter('label', function() {
    return function(input, type, text) {
        console.log(input);
        return input ? '<span class="label label-' + type + '">' + text + '</span>' : '';
    };
})
        .filter('type', function() {
    return function(input) {
        switch (input) {
            case '1' :
                return 'text';
            case '2' :
                return 'number';
            case '3' :
                return 'longtext';
            case '4' :
                return 'datetime';
            case '5' :
                return 'images';
            default :
                return 'unknown';
        }
    };
})

        .filter('images_view', function() {
    return function(input, replication, limit) {
        var replication = replication || 1;
        var limit = limit || 0;
        var images = $.parseJSON(input);
        if (images) {
            var html = '';

            for (var i = 0; i < (limit), i < images.length; i++) {
                var el = images[i];
                html += '<img style="max-width:120px;display:inline-block;margin:10px 0;" class="img-polaroid"  src="' + site.base + el[replication].full_path + '" />';
            }
            ;
            if ((images.length - limit) > 0) {
                html += '<p><small class="text-info">and ' + (images.length - limit) + ' more</small></p>';
            }
            return html;
        }
    };
})
        .filter('images_index', function() {
    return function(input) {
        var images = $.parseJSON(input);
        var html = '<a href="#">' + images.length + (images.length > 1 ? ' images' : ' image') + '</a>';
        return html;
    };
})


        ;
