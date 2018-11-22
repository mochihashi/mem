<?php
class Dao {
	private $_db;
	private $_table;
	private $_selects;
	private $_values;
	private $_wheres;
	private $_groups;
	private $_orders;
	private $_limits;
	private $_params;
	private $_colDeleted;
	private $_colCreateTime;
	
	function __construct(&$db, $table, $colDeleted = 'deleted', $colCreateTime = 'create_time'){
		$this->_db = $db;
		$this->_table = $table;
		$this->_colDeleted = $colDeleted;
		$this->_colCreateTime = $colCreateTime;
		$this->clear();
	}
	
	public function copy() {
		$dao = new Dao($this->_db, $this->_table, $this->_colDeleted, $this->_colCreateTime);
		$dao->_selects = $this->_selects;
		$dao->_values = $this->_values;
		$dao->_wheres = $this->_wheres;
		$dao->_groups = $this->_groups;
		$dao->_orders = $this->_orders;
		$dao->_limits = $this->_limits;
		return $dao;
	}
	
	public function clear() {
		$this->_selects = array();
		$this->_values = array();
		$this->_wheres = array();
		$this->_groups = array();
		$this->_orders = array();
		$this->_limits = array();
		$this->_params = array();
	}
	
	public function addSelect($col) { $this->_selects[] = $col; return $this; }
	public function addSelectAs($col, $as) { $this->_selects[] = "$col AS $as"; return $this; }
	
	public function addValue($col, $value) { $this->_values[$col] = $value; return $this; }
	public function addValueForm(&$form, $col) { return $this->addValue($col, mapGet($form, $col)); }
	
	public function addWhere($col, $value, $compare = '=') {
		$this->_wheres[] = array("col" => $col, "value" => $value, "compare" => $compare);
		return $this;
	}
	public function addWhereLike($col, $value) { return $this->addWhere($col, "%$value%", 'LIKE'); }
	public function addWhereNotLike($col, $value) { return $this->addWhere($col, "%$value%", 'NOT LIKE'); }
	public function addWhereForm(&$form, $col) { return $this->addWhere($col, mapGet($form, $col)); }
	
	public function addGroupBy($col) { $this->_groups[$col] = $col; return $this; }
	
	public function addOrderBy($col, $sort = 'asc') { $this->_orders[] = "$col $sort"; return $this; }
	public function addOrderAsc($col) { return $this->addOrderBy($col, 'asc'); return $this; }
	public function addOrderDesc($col) { return $this->addOrderBy($col, 'desc'); return $this; }
	
	public function setLimit($limit, $offset = 0) {
		$this->_limits['limit'] = $limit;
		$this->_limits['offset'] = $offset;
		return $this;
	}
	
	public function selectOne() {
		$list = $this->select();
		if(count($list) == 0) return null;
		return $list[0];
	}
	
	public function selectOneById($id) {
		return $this->addWhere('id', $id)->selectOne();
	}
	
	public function select() {
		$this->buildStart();
		$sql = 'SELECT ';
		if(count($this->_selects) == 0) {
			$sql .= '*';
		} else {
			$sql .= implode(', ', $this->_selects);
		}
		$sql .= $this->buildFrom();
		$sql .= $this->buildWhere();
		$sql .= $this->buildGroupBy();
		$sql .= $this->buildOrderBy();
		$sql .= $this->buildLimit();
		return $this->execute($sql, true);
	}
	
	public function insert() {
		if(count($this->_values) == 0) return false;
		$this->buildStart();
		$sql = 'INSERT INTO ' . $this->_table;
		$cols = array();
		$vals = array();
		if($this->_colCreateTime) {
			$cols[] = $this->_colCreateTime;
			$vals[] = "now()";
		}
		foreach($this->_values as $col => $value) {
			$cols[] = $col;
			$vals[] = ":$col";
			$this->_params[":$col"] = $value;
		}
		$sql .= ' (' . implode(', ', $cols) . ')';
		$sql .= ' VALUES (' . implode(', ', $vals) . ')';
		return $this->execute($sql);
	}
	
	public function getLastInsertId() {
		$ret = $this->execute('SELECT last_insert_id() AS id', true);
		return $ret[0]['id'];
	}
	
	public function update() {
		if(count($this->_values) == 0) return false;
		$this->buildStart();
		$sql = 'UPDATE ' . $this->_table . ' SET';
		$sets = array();
		foreach($this->_values as $col => $value) {
			$sets[] = "$col = :$col";
			$this->_params[":$col"] = $value;
		}
		$sql .= ' ' . implode(', ', $sets);
		$sql .= $this->buildWhere();
		return $this->execute($sql);
	}
	
	public function delete() {
		if($this->_colDeleted) {
			$this->addValue($this->_colDeleted, 1);
			return $this->update();
		}
		$sql = 'DELETE FROM ' . $this->_table;
		$sql .= $this->buildWhere();
		return $this->execute($sql);
	}
	
	public function execute($sql, $isSelect = false) {
		$result = false;
		if(count($this->_params) == 0) {
			if($isSelect) {
				$result = $this->_db->query($sql, PDO::FETCH_ASSOC);
			} else {
				$result = $this->_db->exec($sql);
			}
		} else {
			$stmt = $this->_db->prepare($sql);
			$result = $stmt->execute($this->_params);
			if($isSelect) {
				if($result) {
					$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
				} else {
					$result = array();
				}
			}
		}
		return $result;
	}
	
	private function buildStart() {
		$this->_params = array();
	}
	
	private function buildFrom() {
		return ' FROM ' . $this->_table;
	}
	
	private function buildWhere() {
		if($this->_colDeleted) {
			$this->addWhere($this->_colDeleted, 0);
		}
		
		if(count($this->_wheres) == 0) return '';
		
		$arr = array();
		foreach($this->_wheres as $where) {
			$col = mapGet($where, 'col');
			$compare = mapGet($where, 'compare');
			$value = mapGet($where, 'value');
			$arr[] = "$col $compare :$col";
			$this->_params[":$col"] = $value;
		}
		return ' WHERE ' . implode(' AND ', $arr);
	}
	
	private function buildGroupBy() {
		if(count($this->_groups) == 0) return '';
		return ' GROUP BY ' . implode(', ', $this->_groups);
	}
	
	private function buildOrderBy() {
		if(count($this->_orders) == 0) return '';
		return ' ORDER BY ' . implode(', ', $this->_orders);
	}
	
	private function buildLimit() {
		if(count($this->_limits) == 0) return '';
		$limit = $this->_limits['limit'];
		$offset = $this->_limits['offset'];
		if($offset) $offset .= ', ';
		return " LIMIT $offset$limit";
	}
}