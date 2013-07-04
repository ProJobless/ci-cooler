'use strict';

var partialsPath = site.base + '/application/views/admin/';

// Declare app level module which depends on filters, and services
angular.module('myApp', ['ngUpload','myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/index', {templateUrl: partialsPath + 'pages/index.html', controller: 'PagesIndexCtrl'});
    $routeProvider.when('/view/:pageId', {templateUrl: partialsPath + 'pages/view.html', controller: 'PagesViewCtrl'});
    $routeProvider.when('/edit/:pageId', {templateUrl: partialsPath + 'pages/edit.html', controller: 'PagesEditCtrl'});
    $routeProvider.when('/create', {templateUrl: partialsPath + 'pages/create.html', controller: 'PagesCreateCtrl'});
    $routeProvider.when('/delete/:pageId', {templateUrl: partialsPath + 'pages/delete.html', controller: 'PagesDeleteCtrl'});
    $routeProvider.otherwise({redirectTo: '/index'});
  }]);
