<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Account extends CI_Controller{
    
    public function __construct() {
        parent::__construct();
        $this->load->database();
    }
    
    function Index(){
        
    }
    
    function Login(){
        $this->loadView('account/login', array('title'=> 'Login') , 'admin');
    }
    
    
}
