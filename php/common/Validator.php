<?php
class Validator {
	private $_form;
	private $_errors = array();
	
	function __construct(&$form){
		$this->_form = $form;
	}
	
	public function getErrors() { return $this->_errors; }
	
	public function hasError() { return count($this->_errors) > 0; }
	
	public function validateValue($value, $props) {
		$value = $value . '';
		if(strlen($value) == 0) {
			if(mapGet($props, 'required')) { return array('error' => 'required'); }
			return null;
		}
		
		if(mapGet($props, 'type') == 'email') {
			$regex = "/^[a-zA-Z0-9\\.\\$=_\\-\\^~\\+`]+@[a-zA-Z0-9\\._-]+$/";
			if(!preg_match($regex, $value)) { return array('error' => 'not-email'); }
		}
		
		$minLength = mapGet($props, 'minLength');
		if($minLength && strlen($value) < $minLength) {
			return array('error' => 'length-short', 'prefix' => $minLength);
		}
		
		if(!mapGet($props, 'html')) {
			if(strpos($value, '<') !== false) return array('error' => 'invalid-char', 'suffix' => ': &lt;');
			if(strpos($value, '>') !== false) return array('error' => 'invalid-char', 'suffix' => ': &gt;');
		}
		
		return null;
	}
	
	public function validateField($field, $props) {
		$value = mapGet($this->_form, $field) . '';
		$error = $this->validateValue($value, $props);
		if(!$error) return true;
		$error['field'] = $field;
		$this->_errors[] = $error;
		return false;
	}
	
	public function validateUniqueValue(&$_dao, $field, $value, $id = 0) {
		$dao = $_dao->copy();
		$dao->addSelect($field);
		$dao->addWhere($field, $value);
		if($id) $dao->addWhere('id', $id, '<>');
		$dao->setLimit(1);
		$rows = $dao->select();
		if(count($rows) > 0) {
			return array('error' => 'not-unique');
		}
		return null;
	}
	
	public function validateUniqueField(&$dao, $field, $id = 0) {
		$value = mapGet($this->_form, $field) . '';
		$error = $this->validateUniqueValue($dao, $field, $value, $id);
		if(!$error) return true;
		$error['field'] = $field;
		$this->_errors[] = $error;
		return false;
	}
}