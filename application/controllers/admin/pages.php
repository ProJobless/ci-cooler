<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Pages extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->database();
        $this->load->library('form_validation');
        $this->load->helper('array');
    }

    function Index() {
        $data['title'] = 'pages';
        $data['pages'] = $this->db->get('pages')->result();
        $this->loadView('pages/index', $data, 'admin');
    }

    function Get($id = null) {
        header('Content-Type:application/json');
        
        if ($id !== null) {
            echo json_encode($this->db->get_where('pages', array('id' => $id), 1)->row());
        } else {
            echo json_encode($this->db->get('pages')->result());
        }
    }
    
    function Update($id){
        
        $data = array(
            'title' => $this->input->post('title'),
            'body' => $this->input->post('body'),
            'urlpath' => $this->input->post('urlpath'),
        );
        
        $this->db->update('pages', $data, array('id' => $id));
        
        echo json_encode($this->db->affected_rows());
    }

    function Create() {
        // Set the validation
        $this->form_validation->set_rules('title', 'Title', 'required');

        if ($this->form_validation->run() !== false) {

            // Insert into database 
            $form = elements(array('title', 'body', 'created', 'meta'), $this->input->post());
            $form['created'] = element('created', $form, date('Y-m-d H:i:s'));

            $this->db->insert('pages', $form);

            echo json_encode($this->db->affected_rows());
        } else {
            echo json_encode(FALSE);
        }
    }

    function view($id) {

        $data['page'] = $this->db->where(array('id' => $id))->limit(1)->get('pages')->row();

        if ($data['page'] !== NULL) {

            $data['title'] = $data['page']->title;
            $this->loadView('pages/view', $data, 'admin');
        } else {
            show_404();
        }
    }

}
