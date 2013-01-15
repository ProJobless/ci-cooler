<?php
/**
 * Content Helper Class
 */
class Content {

    public static function link($href) {
        return '<link href="'. site_url('theme/' . $href) .'" type="text/css" rel="stylesheet" />';
    }
    
    public static function script($src){
        return '<script src="' . site_url('theme/' . $src) .'" type="text/javascript"></script>';
    }
    

}
