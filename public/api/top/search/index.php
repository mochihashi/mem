<?php
/**
 * top/search/
 */
require_once('../../api.php');

try {
	require_once('config/db.php');
	require_once('common/Dao.php');
	require_once('common/DataFile.php');
	$data = new DataFile();
	$map = array();
	$q = mapGet($form, 'q');
	if(!$q) respond($map);
	
	$dao = new Dao($db, 'category');
	$categories = $dao->addOrderDesc('id')->setLimit(60)
	->addWhere('private', 0)
	->addSelect('id')->addSelect('name')
	->addSelect('user_id')->addSelectAs('(select u.name from user u where u.id=user_id)', 'user_name')
	->addWhereLike('name', $q)
	->select();
	$data->setUrlToCategoryList($categories);
	$data->setUserUrlToList($categories);
	$map['categories'] = rows2map($categories, 'id');
	
	$dao = new Dao($db, 'word_table');
	$tables = $dao->addOrderDesc('id')->setLimit(60)
	->addWhere('private', 0)
	->addSelect('id')->addSelect('name')->addSelect('description')
	->addSelect('category_id')->addSelectAs('(select c.name from category c where c.id=category_id)', 'category_name')
	->addSelect('user_id')->addSelectAs('(select u.name from user u where u.id=user_id)', 'user_name')
	->addWhereLike('name', $q)
	->select();
	$data->setUrlToTableList($tables);
	$data->setUserUrlToList($tables);
	$map['tables'] = rows2map($tables, 'id');
	
	respond($map);
	
} catch(Exception $e) {
	respondException($e);
}
