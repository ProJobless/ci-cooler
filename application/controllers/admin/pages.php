<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Pages extends CI_Controller{

	public function __construct() {
		parent::__construct();
		$this->load->database();
		$this->load->library('form_validation');
		$this->load->helper('array');
	}

	function Index(){
		$data['title'] = 'pages';
		$data['pages'] = $this->db->get('pages')->result();
		$this->loadView('pages/index', $data, 'admin');
	}

	function Create(){

		$data = array('title' => 'New Page');

		// Set the validation
		$this->form_validation->set_rules('title', 'Title', 'required');

//		var_dump($_POST);


//var_dump($this->form_validation->run());

		if( $this->form_validation->run() !== false){

			// Insert into database 
			$form = elements(array('title', 'body' , 'created', 'meta'), $this->input->post() );
			$form['created'] = element('created', $form , date('Y-m-d H:i:s'));

			$this->db->insert('pages', $form);

			redirect('/admin/pages/');

		}else{
			$this->loadView('pages/create', $data, 'admin');
		}


	}

}
