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
});


;
