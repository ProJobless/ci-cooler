'use strict';

/* Controllers */

var app = angular.module('myApp.controllers', []);


///////////////
// Index
///////////////
app.controller('IndexCtrl', ['$scope', function($scope) {

    }]);

///////////////
// Account
///////////////

app.controller('AccLoginCtrl', ['$scope', function($scope) {

    }]);

///////////////
// Members
///////////////
app.controller('MembersIndexCtrl', ['$scope', function($scope) {
        $scope.working = true;
        $scope.members = [];
        $.get(site.base + 'admin/members/get', function(r) {

            $scope.$apply(function() {
                $scope.members = r;
                $scope.working = false;
            });
        });
    }]);

app.controller('MembersCreateCtrl', ['$scope', function($scope) {
        $scope.working = true;
        $scope.success = false;

        $scope.roles = [];
        $scope.member = {
            roles: []
        };

        //get roles
        $.get(site.base + 'admin/members/getroles', function(r) {
            $scope.$apply(function() {
                $scope.roles = r;
                $scope.working = false;
            });
        });

        $scope.save = function() {
            $scope.working = true;
            $.post(site.base + 'admin/members/set', $scope.member, function(r) {
                $scope.$apply(function() {
                    $scope.success = true;
                });
            }).complete(function() {
                $scope.$apply(function() {
                    $scope.working = true;
                });
            });
        };

    }]);

app.controller('MembersEditCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
        $scope.working = true;
        $scope.success = false;

        //get roles
        $.get(site.base + 'admin/members/getroles', function(r) {
            $scope.$apply(function() {
                $scope.roles = r;

                //get member
                $.get(site.base + 'admin/members/get/' + $routeParams.userId, function(r) {
                    $scope.$apply(function() {
                        $scope.member = r;
                        $scope.working = false;
                    });
                });
            });
        });



        $scope.save = function() {
            $scope.working = true;
            $.post(site.base + 'admin/members/set/' + $routeParams.userId, $scope.member, function(r) {
                $scope.$apply(function() {
                    $scope.success = true;
                });
            }).complete(function() {
                $scope.$apply(function() {
                    $scope.working = false;
                });
            });
        };

    }]);


app.controller('MembersViewCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
        $scope.working = true;

        //get roles
        $.get(site.base + 'admin/members/getroles', function(r) {
            $scope.$apply(function() {
                $scope.roles = r;

                //get member
                $.get(site.base + 'admin/members/get/' + $routeParams.userId, function(r) {
                    $scope.$apply(function() {
                        $scope.member = r;
                        $scope.working = false;
                    });
                });
            });
        });
    }]);



///////////////
// Pages
///////////////
app.controller('PagesIndexCtrl', ['$scope', '$http', function($scope, $http) {
        $http.get(site.base + 'admin/pages/get').success(function(data) {
            data.forEach(function(e, i) {
                //e.ispublished = !!+e.ispublished;
            });

            console.log(data);
            $scope.pages = data;
        });

        $scope.orderProp = 'number';
        $scope.limit = 10;
        $scope.query = '';
        $scope.format = 'M/d/yy h:mm:ss a';
    }]);

app.controller('PagesCreateCtrl', ['$scope', '$http', '$filter', '$location', function($scope, $http, $filter, $location) {

        $scope.working = false;

        $scope.page = {created: $filter('date')(new Date(), 'yyyy-MM-dd')};
        $scope.page.title = '';
        $scope.$watch('page.title', function(value) {
            $scope.page.urlpath = $filter('urlify')(value);
        });

        $scope.save = function(isDraft, callback) {

            if ($scope.page.title.length == 0)
                return;

            $scope.working = true;
            var isDraft = isDraft || 0;



            $scope.page.isdraft = isDraft;
            // check if the page already saved
            if ($scope.page.id) {
                // update only
                $.post(site.base + 'admin/pages/update/' + $scope.page.id, $scope.page, function(data) {
                    $scope.saved = true;

                    if (callback && typeof callback === "function") {
                        callback();
                    }
                });
            } else {
                // create the page
                $.post(site.base + 'admin/pages/create/', $scope.page, function(r) {
                    if (r) {
                        $scope.page.id = r.page.id;
                        $scope.saved = true;

                        if (callback && typeof callback === "function") {
                            callback();
                        }
                    }
                });
            }

        };

        $scope.create = function() {
            $scope.save(0, function() {
                $scope.$apply(function() {
                    $location.path('#/index');
                    $scope.working = false;
                });
            });
        };

        // auto save
        setInterval(function() {
            $scope.save(1, function() {
                $scope.$apply(function() {
                    $scope.working = false;
                    alert($scope.working + '');
                });
            });
        }, 3000);


        $scope.uploadComplete = function(content, completed) {
            $scope.completed = completed;
            $scope.response = content;
        };


    }]);

app.controller('PagesViewCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
        $http.get(site.base + 'admin/pages/get/' + $routeParams.pageId).success(function(data) {
            $scope.page = data;
        });
    }]);

app.controller('PagesDeleteCtrl', ['$scope', '$routeParams', '$http', '$location', function($scope, $routeParams, $http, $location) {
        $scope.working = false;

        $scope.page = {};
        $http.get(site.base + 'admin/pages/get/' + $routeParams.pageId).success(function(data) {
            $scope.page = data;
        });

        $scope.delete = function() {
            $.post(site.base + 'admin/pages/delete', {id: $scope.page.id}, function() {
                $scope.$apply(function() {
                    $location.path('/pages/index');
                });
            }).complete(function() {
                $scope.$apply(function() {
                    $scope.working = false;
                })
            });
        };


    }]);

app.controller('PagesEditCtrl', ['$scope', '$routeParams', '$http', '$filter', '$location', function($scope, $routeParams, $http, $filter, $location) {
        $scope.saved = false;
        $scope.working = false;

        $http.get(site.base + 'admin/pages/get/' + $routeParams.pageId).success(function(data) {
            data.ispublished = !!data.ispublished;
            $scope.page = data;
            $scope.$watch('page.title', function(value) {
                $scope.page.urlpath = $filter('urlify')(value);
            });
        });


        $scope.save = function() {
            $scope.working = true;

            $scope.page.isdraft = 0;
            $scope.page.ispublished = +$scope.page.ispublished;

            $.post(site.base + 'admin/pages/update/' + $routeParams.pageId, $scope.page, function(data) {

                if (data) {
                    $scope.$apply(function() {
                        $scope.saved = true;
                    });
                }
            }).complete(function() {
                $scope.$apply(function() {
                    $scope.working = false;
                })
            });
        };

    }]);