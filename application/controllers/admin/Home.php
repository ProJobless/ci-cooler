<?php

class Home extends CI_Controller {

    
    function Index(){
       $this->loadView('home/index', array(), 'admin');
    }
    
   
    
    
}