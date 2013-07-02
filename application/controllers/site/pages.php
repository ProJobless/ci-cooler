<?php

class Pages extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->database();
        $this->load->library('form_validation');
        $this->load->helper('array');
    }

    function View($path) {
        $data['page'] = $this->db->get('pages', array('urlpath' => $path))->row();
        $data['title'] = $data['page']->title;
         $this->loadView('pages/view', $data);
    }

}