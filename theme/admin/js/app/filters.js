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
      return $.trim(text).replace(/\s+/gi,'-').toLowerCase();
    }
  })
  
;
