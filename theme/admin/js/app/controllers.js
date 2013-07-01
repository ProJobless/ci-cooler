'use strict';

/* Controllers */

var app = angular.module('myApp.controllers', []);

app.controller('PagesIndexCtrl', ['$scope', '$http', function($scope, $http) {
        $http.get(site.base + 'admin/pages/get').success(function(data) {
            $scope.pages = data;
        });

        $scope.orderProp = 'number';
        $scope.limit = 10;
        $scope.query = '';
        $scope.format = 'M/d/yy h:mm:ss a';
    }]);

app.controller('PagesCreateCtrl', ['$scope', '$http', '$filter', '$route', function($scope, $http, $filter, $route) {
        $scope.page = {};
        $scope.page.title = '';
        $scope.$watch('page.title', function(value) {
            $scope.page.urlpath = $filter('urlify')(value);
        });

        $scope.save = function() {
            
            var data = {
                title: $scope.page.title,
                body: $scope.page.body,
                meta: $scope.page.meta,
                urlpath: $scope.page.urlpath
            };
            
            $.post(site.base + 'admin/pages/create', data, function(data) {
                $route.reload('#/index');
            });
        };
    }]);

app.controller('PagesViewCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
        $http.get(site.base + 'admin/pages/get/' + $routeParams.pageId).success(function(data) {
            $scope.page = data;
        });
    }]);

app.controller('PagesEditCtrl', ['$scope', '$routeParams', '$http', '$filter', function($scope, $routeParams, $http, $filter) {
        $http.get(site.base + 'admin/pages/get/' + $routeParams.pageId).success(function(data) {
            $scope.page = data;
            $scope.$watch('page.title', function(value) {
                $scope.page.urlpath = $filter('urlify')(value);
            });
        });


        $scope.save = function() {
            var data = {
                title: $scope.page.title,
                body: $scope.page.body,
                meta: $scope.page.meta,
                urlpath: $scope.page.urlpath
            };

            console.log(data);

            $.post(site.base + 'admin/pages/update/' + $routeParams.pageId, data, function(data) {
                if (data) {
                    alert('Page saved');
                }
            });

//            $http.post(site.base + 'admin/pages/update/' + $routeParams.pageId, 'title=page1&body=hellowold', {data: data})
//                    .success(function(data) {
//                console.log(data);
//                alert('save success');
//            });
        }
    }]);