<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Pages extends CI_Controller {

    public function __construct() {
        parent::__construct();
        Auth::validate_request();
        $this->load->database();
        $this->load->library('form_validation');
        $this->load->helper('array');
        header('Content-Type:application/json');
    }

    function Get($id = null) {
        header('Content-Type:application/json');

        if ($id !== null) {
            $data = $this->db->get_where('pages', array('id' => $id), 1)->row();
            $data->ispublished = !!$data->ispublished;
            $data->isdraft = !!$data->isdraft;
        } else {
            $data = $this->db->get('pages')->result();
            foreach ($data as $k => $row) {
                $data[$k]->ispublished = !!$row->ispublished;
                $data[$k]->isdraft = !!$row->isdraft;
            }
        }
        echo json_encode($data);
    }

    function Update($id) {
        $data = elements(array('title', 'body', 'meta', 'isdraft', 'ispublished' ,'urlpath','images'), $this->input->post());
        $this->db->update('pages', $data, array('id' => $id));
        echo json_encode($this->db->affected_rows());
    }

    function Delete() {
        header('Content-Type:application/json');

        $this->db->delete('pages', array('id' => $this->input->post('id')));

        echo json_encode($this->db->affected_rows());
    }

    function Create() {
        header('Content-Type:application/json');

        // Set the validation
        $this->form_validation->set_rules('title', 'Title', 'required');

        if ($this->form_validation->run() !== false) {

            // Insert into database 
            $form = elements(array('title', 'body', 'meta', 'isdraft', 'ispublished' ,'urlpath' ,'images'), $this->input->post());

            $form['created'] = element('created', $form, date('Y-m-d H:i:s'));
            $form['createdby'] = Auth::is_authenticated()->login;
            $this->db->insert('pages', $form);

            echo json_encode(array('page' => array('id' => $this->db->insert_id())));
        } else {
            echo json_encode(FALSE);
        }
    }

    function view($id) {
        header('Content-Type:application/json');

        $data['page'] = $this->db->where(array('id' => $id))->limit(1)->get('pages')->row();

        if ($data['page'] !== NULL) {

            $data['title'] = $data['page']->title;
            $this->loadView('pages/view', $data, 'admin');
        } else {
            show_404();
        }
    }

    function upload($fieldId = FALSE) {

//        echo json_encode(array($_FILES, count($_FILES)));
//        die;

        $field = $this->db->get_where('fields', array('id' => $fieldId), 1)->row();
        $attrs = json_decode($field->attrs);
        print_r($attrs);
        die;

        $config['upload_path'] = APPPATH . '/uploads/';
        $config['allowed_types'] = 'gif|jpg|png';
        $config['max_size'] = '2500';
        $config['max_width'] = '3000';
        $config['max_height'] = '2000';
        $this->load->library('upload', $config);

        $errors = array();
        $upload_data = array();
        foreach ($_FILES as $key => $value) {

            if (!empty($key['name'])) {
                $this->upload->initialize($config);
                if (!$this->upload->do_upload($key)) {
                    $errors[] = $this->upload->display_errors();
                    //flashMsg($errors);
                } else {
                    $upload_data[] = $this->upload->data();
                    // Code After Files Upload Success GOES HERE
                }
            }
        }

        echo json_encode(array('errors' => $errors, 'data' => $upload_data));
        die;

//        if (!$this->upload->do_upload($fieldName)) {
//            $error = array('error' => $this->upload->display_errors());
//
//            echo json_encode($error);
//        } else {
//            $data = array('upload_data' => $this->upload->data());
//            echo json_encode($data);
//        }



        /**

          $config['upload_path'] = 'upload/Main_category_product/';
          $path=$config['upload_path'];
          $config['allowed_types'] = 'gif|jpg|jpeg|png';
          $config['max_size'] = '1024';
          $config['max_width'] = '1920';
          $config['max_height'] = '1280';
          $this->load->library('upload');

          foreach ($_FILES as $key => $value)
          {


          if (!empty($key['name']))
          {


          $this->upload->initialize($config);
          if (!$this->upload->do_upload($key))
          {

          $errors = $this->upload->display_errors();


          flashMsg($errors);

          }
          else
          {
          // Code After Files Upload Success GOES HERE
          }
          }
          }

         * 
         */
    }

}
