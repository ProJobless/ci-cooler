'use strict';

/* Controllers */

var app = angular.module('myApp.controllers', []);


///////////////
// Index
///////////////
app.controller('IndexCtrl', ['$scope', function($scope) {

    }]);

app.controller('ModulesCtrl', ['$scope', function($scope) {
        $scope.working = true;

        $.get(site.base + 'admin/modules/get', function(r) {
            $scope.modules = r;
            $scope.$apply(function() {
                $scope.working = false;
            })
        });
    }]);

app.controller('ModulesIndexCtrl', ['$scope', '$routeParams', '$route', '$compile', function($scope, $routeParams, $route, $compile) {
        $scope.working = true;
        $route.current.templateUrl = site.base + 'admin/modules/renderView/index/' + $routeParams.id;
        $.get($route.current.templateUrl, function(data) {


            $.get(site.base + 'admin/modules/get/' + $routeParams.id, function(r) {
                $scope.module = r;
                $scope.$apply(function() {
                    $('#view').html($compile(data)($scope));
                    $scope.working = false;
                });
            });
        });


    }]);

///////////////
// Account
///////////////

app.controller('AccLoginCtrl', ['$scope', function($scope) {

    }]);


///////////////
// Lists
///////////////

app.controller('ListsIndexCtrl', ['$scope', function($scope) {
        $scope.working = true;
        $.get(site.base + 'admin/lists/get', function(r) {
            $scope.$apply(function() {
                $scope.lists = r;
                $scope.working = false;
            });
        });
    }]);

app.controller('ListsViewCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
        $scope.working = true;
        //get member
        $.get(site.base + 'admin/lists/get/' + $routeParams.id, function(r) {
            $scope.$apply(function() {
                $scope.list = r;
                $scope.working = false;
            });
        });

    }]);

app.controller('ListsCreateCtrl', ['$scope', '$filter', '$routeParams', function($scope, $filter, $routeParams) {
        $scope.working = false;

        $scope.list = {created: $filter('date')(new Date(), 'yyyy-MM-dd'), title: ''};
        $scope.$watch('list.title', function(value) {
            $scope.list.internaltitle = $filter('urlify')(value);
        });

        $scope.save = function() {
            $scope.working = true;
            $.post(site.base + 'admin/lists/set/', $scope.list, function(r) {
                $scope.$apply(function() {
                    $scope.working = false;
                    $scope.saved = true;
                });
            });
        };

    }]);

app.controller('ListsEditCtrl', ['$scope', '$filter', '$routeParams', function($scope, $filter, $routeParams) {
        $scope.working = true;

        //get list
        $.get(site.base + 'admin/lists/get/' + $routeParams.id, function(r) {
            $scope.$apply(function() {
                $scope.list = r;

                $scope.$watch('list.title', function(value) {
                    $scope.list.internaltitle = $filter('urlify')(value);
                });

                $scope.working = false;
            });
        });

        $scope.save = function() {
            $scope.working = true;
            $.post(site.base + 'admin/lists/set/' + $routeParams.id, $scope.list, function(r) {
                $scope.$apply(function() {
                    $scope.working = false;
                    $scope.saved = true;
                });
            });
        };

    }]);

app.controller('ListsCreateFieldCtrl', ['$scope', '$routeParams', '$filter', function($scope, $routeParams, $filter) {
        $scope.working = true;
        $scope.field = {created: $filter('date')(new Date(), 'yyyy-MM-dd'), title: '', type: 1};
        $scope.$watch('field.title', function(value) {
            $scope.field.internaltitle = $filter('urlify')(value);
        });

        $.get(site.base + 'admin/lists/getTypes', function(types) {

            $.get(site.base + 'admin/lists/get/' + $routeParams.id, function(r) {
                $scope.list = r;
                $scope.$apply(function() {
                    $scope.types = types;
                    $scope.working = false;
                });
            });


        });

        $scope.addField = function() {

            $.post(site.base + 'admin/lists/addField/' + $routeParams.id, $scope.field, function(r) {
                $scope.$apply(function() {
                    $scope.working = false;
                    $scope.saved = true;
                });
            });
        };


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
//                    alert($scope.working + '');
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