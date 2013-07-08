'use strict';

var partialsPath = site.base + '/theme/admin/js/partials/';
var routes = [
    
    //Admin
    ['/index', partialsPath + 'index/index.html', 'IndexCtrl'],
    
    // Account
    ['/account/login', partialsPath + 'account/login.html', 'AccLoginCtrl'],
    
    // Pages
    ['/pages/index', partialsPath + 'pages/index.html', 'PagesIndexCtrl'],
    ['/pages/view/:pageId', partialsPath + 'pages/view.html', 'PagesViewCtrl'],
    ['/pages/edit/:pageId', partialsPath + 'pages/edit.html', 'PagesEditCtrl'],
    ['/pages/delete/:pageId', partialsPath + 'pages/delete.html', 'PagesDeleteCtrl'],
    ['/pages/create', partialsPath + 'pages/create.html', 'PagesCreateCtrl'],
    
    
    // Members
    ['/members/index', partialsPath + 'members/index.html', 'MembersIndexCtrl'],
    ['/members/create', partialsPath + 'members/create.html', 'MembersCreateCtrl'],
    ['/members/edit/:userId', partialsPath + 'members/edit.html', 'MembersEditCtrl'],
    ['/members/view/:userId', partialsPath + 'members/view.html', 'MembersViewCtrl'],
    ['/members/delete/:userId', partialsPath + 'members/delete.html', 'MembersDeleteCtrl']
    
];

// Declare app level module which depends on filters, and services
angular.module('myApp', ['ngSanitize', 'ngUpload', 'myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers']).
        config(['$routeProvider', function($routeProvider) {
        routes.forEach(function(route) {
            $routeProvider.when(route[0], {templateUrl: route[1], controller: route[2]});
        });
        $routeProvider.otherwise({redirectTo: '/index'});
    }]);


