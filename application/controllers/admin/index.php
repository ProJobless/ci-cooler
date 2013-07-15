<?php
class Index extends CI_Controller{

    public function __construct() {
        parent::__construct();
        
        //TODO >> Check for logged users
    }
    
    function Index(){
        $this->loadView('index/index', array(), 'admin');
    }
}
