'use strict';

/* Directives */


angular.module('myApp.directives', []).
        directive('appVersion', ['version', function(version) {
        return function(scope, elm, attrs) {
            elm.text(version);
        };
    }])
        .directive('ckEditor', function() {
    return {
        require: '?ngModel',
        link: function(scope, elm, attr, ngModel) {
            var ck = CKEDITOR.replace(elm[0]);

            if (!ngModel)
                return;

            ck.on('pasteState', function() {
                scope.$apply(function() {
                    ngModel.$setViewValue(ck.getData());
                });
            });

            ngModel.$render = function(value) {
                ck.setData(ngModel.$viewValue);
            };
        }
    };
})

        .directive('upload', function() {
    return {
        restrict: 'A',
        templateUrl: site.base + 'theme/admin/js/partials/controls/upload.html?c=1',
        scope: {
            property: '=',
            upload: '@',
            max: '@',
            thumbnail: '@',
            fieldid: '@'
        },
        link: function(scope, elm, attr) {


            /** UPLOAD **/
            //============== DRAG & DROP =============
            // source for drag&drop: http://www.webappers.com/2011/09/28/drag-drop-file-upload-with-html5-javascript/
            var dropbox = elm.find('.dropbox')[0];
            scope.dropText = 'Drop files here...';
            scope.property = [];
            scope.files = [];
            scope.errors = [];

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
                var ok = evt.dataTransfer && evt.dataTransfer.types && evt.dataTransfer.types.indexOf('Files') >= 0
                scope.$apply(function() {
                    scope.dropText = ok ? 'Drop files here...' : 'Only files are allowed!'
                    scope.dropClass = ok ? 'over' : 'not-available'
                })
            }, false);

            dropbox.addEventListener("drop", function(evt) {
                //console.log('drop evt:', JSON.parse(JSON.stringify(evt.dataTransfer)))
                evt.stopPropagation()
                evt.preventDefault()
                scope.$apply(function() {
                    scope.dropText = 'Drop files here...'
                    scope.dropClass = ''
                });

                var files = evt.dataTransfer.files
                if (files.length > 0) {
                    scope.$apply(function() {
                        for (var i = 0; i < files.length; i++) {
                            if (scope.files.length == scope.max) {
                                break;
                            }
                            scope.files.push(files[i]);
                        }
                    });
                }
            }, false)
            //============== DRAG & DROP =============

            scope.removeFile = function(el) {

                var oldFiles = scope.files;
                scope.files = [];

                oldFiles.forEach(function(e) {
                    if (el.file.name !== e.name) {
                        scope.files.push(e);
                    }
                })
            }

            scope.setFiles = function(element) {
                scope.$apply(function(scope) {
                    //console.log('files:', element.files);
                    // Turn the FileList object into an Array
                    scope.files = []
                    for (var i = 0; i < element.files.length; i++) {
                        scope.files.push(element.files[i])
                    }
                    scope.progressVisible = false
                });
            };

            scope.uploadFile = function() {
                var fd = new FormData();
                var c = 0;
                for (var i in scope.files) {
                    fd.append("file" + (++c), scope.files[i])
                }
                ;

                //console.log(fd);
                var xhr = new XMLHttpRequest()
                xhr.upload.addEventListener("progress", uploadProgress, false)
                xhr.addEventListener("load", uploadComplete, false)
                xhr.addEventListener("error", uploadFailed, false)
                xhr.addEventListener("abort", uploadCanceled, false)
                xhr.open("POST", scope.upload)
                scope.progressVisible = true;
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
                scope.$apply(function() {
                    var response = $.parseJSON(evt.target.responseText);
                    scope.response = response;
                    response.data.forEach(function(e) {
                        scope.property.push(e.file_name);
                    });

                    scope.property = JSON.stringify(scope.property);
                    scope.files = [];
                });
//                    alert(evt.target.responseText)
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
            /** UPLOAD **/

        }
    };
})
