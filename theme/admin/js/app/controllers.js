'use strict';

/* Controllers */

var app = angular.module('myApp.controllers', []);


///////////////
// Index
///////////////
app.controller('IndexCtrl', ['$scope', function($scope) {

    }]);

app.controller('TestCtrl', ['$scope', function(scope) {
        //============== DRAG & DROP =============
        // source for drag&drop: http://www.webappers.com/2011/09/28/drag-drop-file-upload-with-html5-javascript/
        var dropbox = document.getElementById("dropbox")
        scope.dropText = 'Drop files here...'

        // init event handlers
        function dragEnterLeave(evt) {
            evt.stopPropagation()
            evt.preventDefault()
            scope.$apply(function() {
                scope.dropText = 'Drop files here...'
                scope.dropClass = ''
            })
        }
        dropbox.addEventListener("dragenter", dragEnterLeave, false)
        dropbox.addEventListener("dragleave", dragEnterLeave, false)
        dropbox.addEventListener("dragover", function(evt) {
            evt.stopPropagation()
            evt.preventDefault()
            var clazz = 'not-available'
            var ok = evt.dataTransfer && evt.dataTransfer.types && evt.dataTransfer.types.indexOf('Files') >= 0
            scope.$apply(function() {
                scope.dropText = ok ? 'Drop files here...' : 'Only files are allowed!'
                scope.dropClass = ok ? 'over' : 'not-available'
            })
        }, false)
        dropbox.addEventListener("drop", function(evt) {
            console.log('drop evt:', JSON.parse(JSON.stringify(evt.dataTransfer)))
            evt.stopPropagation()
            evt.preventDefault()
            scope.$apply(function() {
                scope.dropText = 'Drop files here...'
                scope.dropClass = ''
            })
            var files = evt.dataTransfer.files
            if (files.length > 0) {
                scope.$apply(function() {
                    scope.files = []
                    for (var i = 0; i < files.length; i++) {
                        scope.files.push(files[i])
                    }
                })
            }
        }, false)
        //============== DRAG & DROP =============

        scope.setFiles = function(element) {
            scope.$apply(function(scope) {
                console.log('files:', element.files);
                // Turn the FileList object into an Array
                scope.files = []
                for (var i = 0; i < element.files.length; i++) {
                    scope.files.push(element.files[i])
                }
                scope.progressVisible = false
            });
        };

        scope.uploadFile = function() {
            var fd = new FormData()
            for (var i in scope.files) {
                fd.append("file", scope.files[i])
            }
            var xhr = new XMLHttpRequest()
            xhr.upload.addEventListener("progress", uploadProgress, false)
            xhr.addEventListener("load", uploadComplete, false)
            xhr.addEventListener("error", uploadFailed, false)
            xhr.addEventListener("abort", uploadCanceled, false)
            xhr.open("POST", site.base + 'admin/pages/upload')
            scope.progressVisible = true
            xhr.send(fd)
        }

        function uploadProgress(evt) {
            scope.$apply(function() {
                if (evt.lengthComputable) {
                    scope.progress = Math.round(evt.loaded * 100 / evt.total)
                } else {
                    scope.progress = 'unable to compute'
                }
            })
        }

        function uploadComplete(evt) {
            /* This event is raised when the server send back a response */
            alert(evt.target.responseText)
        }

        function uploadFailed(evt) {
            alert("There was an error attempting to upload the file.")
        }

        function uploadCanceled(evt) {
            scope.$apply(function() {
                scope.progressVisible = false
            })
            alert("The upload has been canceled by the user or the browser dropped the connection.")
        }
    }]);



app.controller('ModulesCtrl', ['$scope', function($scope) {
        $scope.working = true;

        $.get(site.base + 'admin/modules/getModules', function(r) {
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
            $.get(site.base + 'admin/modules/getItem/' + $routeParams.id, function(r) {
                $scope.$apply(function() {
                    $scope.items = r;
                    $('#view').html($compile(data)($scope));
                    $scope.working = false;
                });
            });
        });


    }]);
app.controller('ModulesCreateCtrl', ['$scope', '$routeParams', '$route', '$compile', function($scope, $routeParams, $route, $compile) {
        $scope.working = true;
        $scope.attachedfiles = [];
        $route.current.templateUrl = site.base + 'admin/modules/renderView/create/' + $routeParams.id;
        $.get($route.current.templateUrl, function(data) {
            $scope.$apply(function() {
                $('#view').html($compile(data)($scope));
                $scope.working = false;
            });
        });

        $scope.save = function() {
            $scope.working = true;
            $.post(site.base + 'admin/modules/setItem/' + $routeParams.id, $scope.item, function(r) {
                $scope.$apply(function() {
                    $scope.working = false;
                    $scope.saved = true;
                });
            });
        };





    }]);
app.controller('ModulesViewCtrl', ['$scope', '$routeParams', '$route', '$compile', function($scope, $routeParams, $route, $compile) {
        $scope.working = true;
        $route.current.templateUrl = site.base + 'admin/modules/renderView/view/' + $routeParams.id;
        $.get($route.current.templateUrl, function(data) {
            $.get(site.base + 'admin/modules/getItem/' + $routeParams.id + '/' + $routeParams.rowId, function(r) {
                $scope.$apply(function() {
                    $scope.item = r;
                    $('#view').html($compile(data)($scope));
                    $scope.working = false;
                });
            });
        });
    }]);
app.controller('ModulesEditCtrl', ['$scope', '$routeParams', '$route', '$compile', function($scope, $routeParams, $route, $compile) {
        $scope.working = true;
        $route.current.templateUrl = site.base + 'admin/modules/renderView/edit/' + $routeParams.id;
        $.get($route.current.templateUrl, function(data) {
            $.get(site.base + 'admin/modules/getItem/' + $routeParams.id + '/' + $routeParams.rowId, function(r) {
                $scope.$apply(function() {
                    $scope.item = r;
                    $('#view').html($compile(data)($scope));
                    $scope.working = false;
                });
            });
        });

        $scope.save = function() {
            $scope.working = true;
            $.post(site.base + 'admin/modules/setItem/' + $routeParams.id + '/' + $routeParams.rowId, $scope.item, function(r) {
                $scope.$apply(function() {
                    $scope.working = false;
                    $scope.saved = true;
                });
            });
        };
    }]);
app.controller('ModulesDeleteCtrl', ['$scope', '$routeParams', '$route', '$compile', '$location', function($scope, $routeParams, $route, $compile, $location) {
        $scope.working = true;
        $route.current.templateUrl = site.base + 'admin/modules/renderView/delete/' + $routeParams.id;
        $.get($route.current.templateUrl, function(data) {
            $.get(site.base + 'admin/modules/getItem/' + $routeParams.id + '/' + $routeParams.rowId, function(r) {
                $scope.$apply(function() {
                    $scope.item = r;
                    $('#view').html($compile(data)($scope));
                    $scope.working = false;
                });
            });
        });

        $scope.delete = function() {
            $.post(site.base + 'admin/modules/deleteItem/' + $routeParams.id + '/' + $routeParams.rowId, $scope.item, function(r) {
                $scope.$apply(function() {
                    $location.path('/modules/' + $routeParams.id + '/index');
                });
            });
        };
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
app.controller('ListsDeleteCtrl', ['$scope', '$routeParams', '$location', function($scope, $routeParams, $location) {
        $scope.working = true;

        //get list
        $.get(site.base + 'admin/lists/get/' + $routeParams.id, function(r) {
            $scope.$apply(function() {
                $scope.list = r;
                $scope.working = false;
            });
        });

        $scope.delete = function() {
            $.get(site.base + 'admin/lists/delete/' + $routeParams.id, function(r) {
                $scope.$apply(function() {
                    $scope.working = false;
                    $location.path('/lists/index');
                });
            });

        }

    }]);
app.controller('ListsCreateCtrl', ['$scope', '$filter', '$routeParams', function($scope, $filter, $routeParams) {
        $scope.working = false;

        $scope.list = {created: $filter('date')(new Date(), 'yyyy-MM-dd'), title: '', description: ''};
        $scope.$watch('list.title', function(value) {
            $scope.list.internaltitle = $filter('safetitle')(value);
        });

        $scope.save = function() {
            $scope.working = true;
            $scope.list.ispublished = +$scope.list.ispublished;
            var list = $scope.list;
            list.fields = null;
            $.post(site.base + 'admin/lists/set/', list, function(r) {
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
                    $scope.list.internaltitle = $filter('safetitle')(value);
                });

                $scope.working = false;
            });
        });

        $scope.save = function() {
            $scope.working = true;
            $scope.list.ispublished = +$scope.list.ispublished;
            var list = angular.copy($scope.list);
            list.fields = null;
            $.post(site.base + 'admin/lists/set/' + $routeParams.id, list, function(r) {
                $scope.$apply(function() {
                    $scope.working = false;
                    $scope.saved = true;
                });
            });
        };

    }]);
app.controller('ListsCreateFieldCtrl', ['$scope', '$routeParams', '$filter', function($scope, $routeParams, $filter) {
        $scope.working = true;
        $scope.attrs = {};
        $scope.field = {created: $filter('date')(new Date(), 'yyyy-MM-dd'), title: '', type: 1};
        $scope.$watch('field.title', function(value) {
            $scope.field.internaltitle = $filter('safetitle')(value);
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
app.controller('ListsDeleteFieldCtrl', ['$scope', '$routeParams', '$filter', '$location', function($scope, $routeParams, $filter, $location) {


        $.get(site.base + 'admin/lists/getField/' + $routeParams.fieldId, function(r) {
            $scope.$apply(function() {
                $scope.field = r;
            });
        });
        $scope.delete = function() {
            $.post(site.base + 'admin/lists/deleteField/' + $routeParams.fieldId, function(r) {
                $scope.$apply(function() {
                    $location.path('/lists/edit/' + $routeParams.id);
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
