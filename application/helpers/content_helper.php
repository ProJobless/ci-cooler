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

    public static function renderEditField($field) {
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
                $html .="<div upload=\"". site_url('admin/pages/upload') ."\" property=\"item.$field->internaltitle\" name=\"$field->internaltitle\">upload</div>
                    <pre>{{item.{$field->internaltitle}}}</pre>";break;
                break;
            case 6:
            default:
                $html .="<input type=\"text\" name=\"$field->internaltitle\" id=\"$field->internaltitle\" ng-model=\"item.$field->internaltitle\" />";
        }

        return $html;
    }
    
    public static function renderViewField($field) {
        $html = '';
        switch ($field->type) {
            case 1:
            case 2:
            case 3:
                $html .="{{item.$field->internaltitle}}";
                break;
            case 5:
                $html .= "<div ng-bind-html-unsafe=\"item.{$field->internaltitle} | images\"></div>";break;
                break;
            case 6:
            default:
                $html .="<input type=\"text\" name=\"$field->internaltitle\" id=\"$field->internaltitle\" ng-model=\"item.$field->internaltitle\" />";
        }

        return $html;
    }

}
