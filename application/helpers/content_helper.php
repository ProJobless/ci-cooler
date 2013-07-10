<?php

/**
 * Content Helper Class
 */
class Content {

    public static function link($href) {
        return '<link href="' . site_url('theme/' . $href) . '" type="text/css" rel="stylesheet" />';
    }

    public static function script($src) {
        return '<script src="' . site_url('theme/' . $src) . '" type="text/javascript"></script>';
    }

    public static function renderField($field) {
        $html = '';
        switch ($field->type) {
            case 1:
                $html .="<input type=\"text\" name=\"$field->internaltitle\" id=\"$field->internaltitle\" ng-model=\"item.$field->internaltitle\" />";
                break;
            case 2:
                $html .="<input type=\"number\" name=\"$field->internaltitle\" id=\"$field->internaltitle\" ng-model=\"item.$field->internaltitle\" />";
                break;
            case 3:
                $html .="<textarea name=\"$field->internaltitle\" id=\"$field->internaltitle\" ng-model=\"item.$field->internaltitle\" ></textarea>";
                break;
            case 5:
                $html .="
                    <pre>{{files}}</pre>
                    <pre>{{response | json}}</pre>
                    <pre>{{attachedfiles | json}}</pre>
                    <img ng-show=\"response.upload_data.file_name.length > 0\" src=\"/ci/application/uploads/{{response.upload_data.file_name}}\" width=\"180\" class=\"img-polaroid\" />
<div class=\"upload-control\" id=\"{$field->internaltitle}\">
            <div class=\"row\">
                <label for=\"fileToUpload\">Select a File to Upload</label><br />
                <input type=\"file\" ng-model-instant id=\"fileToUpload\" multiple onchange=\"angular.element(this).scope().setFiles(this)\" />
            </div>
            <div id=\"dropbox\" class=\"dropbox\" ng-class=\"dropClass\"><span>{{dropText}}</span></div>
            <div ng-show=\"files.length\">
                <div ng-repeat=\"file in files.slice(0)\">
                    <span>{{file.webkitRelativePath || file.name}}</span>
                    (<span ng-switch=\"file.size > 1024*1024\">
                        <span ng-switch-when=\"true\">{{file.size / 1024 / 1024 | number:2}} MB</span>
                        <span ng-switch-default>{{file.size / 1024 | number:2}} kB</span>
                    </span>)
                </div>
                <input type=\"button\" ng-click=\"uploadFile()\" value=\"Upload\" />
                <div ng-show=\"progressVisible\">
                    <div class=\"percent\">{{progress}}%</div>
                    <div class=\"progress-bar\">
                        <div class=\"uploaded\" ng-style=\"{'width': progress+'%'}\"></div>
                    </div>
                </div>
            </div>
        </div>
";
                break;
            case 6:
            default:
                $html .="<input type=\"text\" name=\"$field->internaltitle\" id=\"$field->internaltitle\" ng-model=\"item.$field->internaltitle\" />";
        }

        return $html;
    }

}
