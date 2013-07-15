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
            case '1.1':

                if (isset($attrs) && $attrs->required) {
                    $str = ' required="required"';
                }

                if (isset($attrs) && isset($attrs->validation) && $attrs->validation == 'email') {
                    $str .= ' type="email"';
                } else {
                    $str .= ' type="text"';
                }

                if (isset($attrs) && $attrs->max_len > 0) {
                    $str .= ' maxlength="' . $attrs->max_len . '"';
                }

                if (isset($attrs) && $attrs->max_len > 0) {
                    $str .= ' minlength="' . $attrs->min_len . '"';
                }

                if (isset($attrs) && $attrs->default) {
                    $str .= ' value="' . $attrs->default . '"';
                }

                $html .="<input $str name=\"$field->internaltitle\" id=\"$field->internaltitle\" ng-model=\"item.$field->internaltitle\" />";
                break;
            case 2:
                $html .="<input type=\"number\" name=\"$field->internaltitle\" id=\"$field->internaltitle\" ng-model=\"item.$field->internaltitle\" />";
                break;
            case 3:
                $html .="<textarea name=\"$field->internaltitle\" id=\"$field->internaltitle\" ng-model=\"item.$field->internaltitle\" ></textarea>";
                break;
            case '5.1':

                if (isset($attrs)) {
                    if ($attrs->required) {
                        $str .= ' required="required"';
                    }
                    if ($attrs->max) {
                        $str .= ' max="' . $attrs->max . '"';
                    }

                    if ($attrs->thumbnail) {

                        if (!isset($attrs->thumbnail_width)) {
                            $attrs->thumbnail_width = '250';
                        }

                        if (!isset($attrs->thumbnail_height)) {
                            $attrs->thumbnail_height = '150';
                        }

                        $str .= ' thumbnail="' . $attrs->thumbnail_height . ',' . $attrs->thumbnail_width . '"';
                    }
                    
                    if(isset($attrs->ext) && $attrs->ext){
                        $str .= ' ext="'.$attrs->ext.'"';
                    }
                }


                $html .="<div $str upload=\"" . site_url('admin/pages/upload/' . $field->id) . "\" property=\"item.$field->internaltitle\" fieldid=\"$field->id\" name=\"$field->internaltitle\">upload</div>
                    <pre>{{item.{$field->internaltitle}}}</pre>";
                break;
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
                $html .= "<div ng-bind-html-unsafe=\"item.{$field->internaltitle} | images\"></div>";
                break;
                break;
            case 6:
            default:
                $html .="<input type=\"text\" name=\"$field->internaltitle\" id=\"$field->internaltitle\" ng-model=\"item.$field->internaltitle\" />";
        }

        return $html;
    }

}
