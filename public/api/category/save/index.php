<?php
/**
 * category/save/
 */
require_once('../../api.php');

try {
	require_once('common/Auth.php');
	$auth = Auth::getCookieAuth();
	$userId = $auth['id'];

	// validate
	require_once('common/Validator.php');
	$validator = new Validator($form);
	if(!$validator->validateField('name', array('required' => true))
	) respondErrors($validator->getErrors());
	
	// db validate
	require_once('config/db.php');
	require_once('common/Dao.php');
	$dao = new Dao($db, 'user');
	$user = $dao->addWhere('id', $userId)->selectOne();
	if(!Password::matchUser($auth, $user)) respondError(array('error'=>'auth-expired'));
	$userName = $user['name'];
	
	$id = mapGet($form, 'id');
	
	$dao = new Dao($db, 'category');
	$dao->addWhere('user_id', $userId);
	if(!$validator->validateUniqueField($dao, 'name', $id)
	) respondErrors($validator->getErrors());
	
	// insert
	$name = mapGet($form, 'name');
	$parentId = mapGet($form, 'parent_id');
	
	$dao = new Dao($db, 'category');
	$dao->addWhere('user_id', $userId);
	$dao->addValue('name', $name);
	$dao->addValue('parent_id', $parentId);
	if($id) {
		$dao->addWhere('id', $id);
		$dao->update();
	} else {
		$dao->addValue('user_id', $userId);
		$dao->insert();
		$id = $dao->getLastInsertId();
	}
	
	//----------------------
	// write files
	require_once('common/DataFile.php');
	$data = new DataFile();
	$data->writeUserFile($userId, $userName);
	$data->writeCategoryFile($userId, $id, $name);
	if($parentId > 0) {
		$dao = new Dao($db, 'category');
		$dao->addWhere('id', $parentId);
		$parent = $dao->selectOne();
		$data->writeCategoryFile($userId, $parentId, $parent['name']);
	}
	
	respond(array('id' => $id));
	
} catch(Exception $e) {
	respondException($e);
}
