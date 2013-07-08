<?php

class Modules extends CI_Controller {

    private $table = 'lists';

    public function __construct() {
        parent::__construct();
        $this->load->database();
        $this->load->helper('array');
    }

    function Get($id = FALSE) {
        header('Content-Type:application/json');
        $data = $this->db->from($this->table);

        if ($id) {
            $data = $data->where(array('id' => $id))->get()->row();
            $data->fields = $this->db->where(array('listid' => $id))->get('fields')->result();
        } else {
            $data = $data->get()->result();
        }

        echo json_encode($data);
    }

    function Set($id = FALSE) {

        $response = FALSE;

        $data = elements(array('title', 'internaltitle', 'mapped_table' , 'description'), $this->input->post());
        

        if (!$id) {
            // create
            
            $data['mapped_table'] = 'lists_' . $data['internaltitle'];
            // Create the table
            $this->load->dbforge();
            $this->dbforge->add_field('id');
            $this->dbforge->create_table($data['mapped_table']);

            $this->db->insert($this->table, $data);
            $id = $this->db->insert_id();
            $response = $id;
        } else {
            // update
            $this->db->update($this->table, $data, array('id' => $id));
            $response = $this->db->affected_rows();
        }

        // Todo updates columns

        echo json_encode($response);
    }

    function Delete($id) {
        try {
            $this->db->delete($this->table, array('id' => $id));
            $response = TRUE;
        } catch (Exception $exc) {
            $response = FALSE;
        }
        echo json_encode($response);
    }
    
    function renderView($viewName = FALSE, $moduleId = FALSE){
        if(!$viewName){echo '';return;}
        $data['module'] = $this->db->get_where('lists', array('id' => $moduleId), 1)->row();
        $data['fields'] = $this->db->get_where('fields', array('listid' => $moduleId))->result();
        $this->load->view('admin/modules/' . $viewName, $data);
    }


}
