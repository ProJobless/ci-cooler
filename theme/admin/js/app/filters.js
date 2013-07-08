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

        text = text.replace(/[^a-zA-Z0-9-_\s]/g, "");
        if (/_|\s/.test(text)) {
            text = text.replace(/_|\s/g, "");
            // logic to notify user of replacement
        }
        return $.trim(text).replace(/\s+/gi, '-').toLowerCase();
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
});


;
