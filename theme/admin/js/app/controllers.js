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

app.controller('PagesCreateCtrl', ['$scope', '$http', '$filter', '$location', function($scope, $http, $filter, $location) {
        $scope.page = {created: $filter('date')(new Date(), 'yyyy-MM-dd')};
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
                $location.path('#/index');
            });
        };
    }]);

app.controller('PagesViewCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
        $http.get(site.base + 'admin/pages/get/' + $routeParams.pageId).success(function(data) {
            $scope.page = data;
        });
    }]);

app.controller('PagesDeleteCtrl', ['$scope', '$routeParams', '$http', '$location', function($scope, $routeParams, $http, $location) {

        $scope.page = {};

        $http.get(site.base + 'admin/pages/get/' + $routeParams.pageId).success(function(data) {
            $scope.page = data;
        });

        $scope.delete = function() {
            $.post(site.base + 'admin/pages/delete', {id: $scope.page.id}, function() {
                alert('page deleted');
                $scope.$apply(function() {
                    $location.path('/index');
                });
            });
        };


    }]);

app.controller('PagesEditCtrl', ['$scope', '$routeParams', '$http', '$filter', '$location', function($scope, $routeParams, $http, $filter, $location) {
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

            $.post(site.base + 'admin/pages/update/' + $routeParams.pageId, data, function(data) {
                if (data) {
                    $scope.$apply(function() {
                        $location.path("/index");
                    });
                }
            });

//            $http.post(site.base + 'admin/pages/update/' + $routeParams.pageId, 'title=page1&body=hellowold', {data: data})
//                    .success(function(data) {
//                console.log(data);
//                alert('save success');
//            });
        };

    }]);