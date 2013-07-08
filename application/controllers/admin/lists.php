<?php

class Lists extends CI_Controller {

    private $table = 'lists';

    public function __construct() {
        parent::__construct();
        $this->load->database();
        $this->load->helper('array');
        header('Content-Type:application/json');
    }

    function Get($id = FALSE) {

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

    /**
     * 
     * @param int or string $id the list id or internal name
     */
    function GetFields($id) {
        $data = $this->db->from('fields')->where(array('id' => $id))->result();
        return json_encode($data);
    }

    function GetTypes() {
        $types = array(
            array(
                'id' => 1,
                'label' => 'text'
            ),
            array(
                'id' => 2,
                'label' => 'number'
            ),
            array(
                'id' => 3,
                'label' => 'longtext'
            ),
            array(
                'id' => 4,
                'label' => 'datetime'
            ),
            array(
                'id' => 5,
                'label' => 'images'
            ),
            array(
                'id' => 5,
                'label' => 'files'
            ),
        );
        echo json_encode($types);
    }

    function AddField($listId) {

        $this->load->dbforge();

        $list = $this->db->where(array('id' => $listId))->limit(1)->get($this->table)->row();
        $field = elements(array('title', 'internaltitle', 'ispublished', 'type', 'description', 'attrs'), $this->input->post());

        // Create new column in the table
        $this->dbforge->add_column($list->mapped_table, array(
            $field['internaltitle'] => array(
                'type' => 'VARCHAR',
                'constraint' => 100,
            )
        ));

        $field['listid'] = $listId;
        $this->db->insert('fields', $field);
        return json_encode(array($this->db->affected_rows(), $field));
    }

}
