'use strict';

var partialsPath = site.base + 'theme/admin/js/partials/';
var modulePath = site.base + 'admin/modules/renderView/';
var routes = [
    
    //Admin
    ['/index', partialsPath + 'index/index.html', 'IndexCtrl'],
    
    // Modules
    ['/modules', partialsPath + 'index/modules.html', 'ModulesCtrl'],
    ['/modules/:id/index', partialsPath + 'modules/blank.html', 'ModulesIndexCtrl'],
    ['/modules/:id/create', partialsPath + 'modules/blank.html', 'ModulesCreateCtrl'],
    ['/modules/:id/view/:rowId', partialsPath + 'modules/blank.html', 'ModulesViewCtrl'],
    ['/modules/:id/edit/:rowId', partialsPath + 'modules/blank.html', 'ModulesEditCtrl'],
    ['/modules/:id/delete/:rowId', partialsPath + 'modules/blank.html', 'ModulesDeleteCtrl'],
    
    // Account
    ['/account/login', partialsPath + 'account/login.html', 'AccLoginCtrl'],
    
    // Lists
    ['/lists/index', partialsPath + 'lists/index.html', 'ListsIndexCtrl'],
    ['/lists/view/:id', partialsPath + 'lists/view.html', 'ListsViewCtrl'],
    ['/lists/edit/:id', partialsPath + 'lists/edit.html', 'ListsEditCtrl'],
    ['/lists/delete/:id', partialsPath + 'lists/delete.html', 'ListsDeleteCtrl'],
    ['/lists/create', partialsPath + 'lists/create.html', 'ListsCreateCtrl'],
    
    ['/lists/:id/newfield', partialsPath + 'lists/newfield.html', 'ListsCreateFieldCtrl'],
    ['/lists/:id/editfield/:fieldId', partialsPath + 'lists/editfield.html', 'ListsEditFieldCtrl'],
    ['/lists/:id/deletefield/:fieldId', partialsPath + 'lists/deletefield.html', 'ListsDeleteFieldCtrl'],
    
    
    
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


