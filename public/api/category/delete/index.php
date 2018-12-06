<?php
/**
 * category/delete/
 */
require_once('../../api.php');

try {
	require_once('common/Auth.php');
	$auth = Auth::getCookieAuth();
	$userId = $auth['id'];
	
	// validate
	require_once('common/Validator.php');
	$validator = new Validator($form);
	if(!$validator->validateField('id', array('required' => true))
	) respondErrors($validator->getErrors());
	
	// db validate
	require_once('config/db.php');
	require_once('common/Dao.php');
	$dao = new Dao($db, 'user');
	$user = $dao->addWhere('id', $userId)->selectOne();
	if(!Password::matchUser($auth, $user)) respondError(array('error'=>'auth-expired'));
	
	$categoryId = mapGet($form, 'id');
	
	// delete
	$dao = new Dao($db, 'category');
	$dao->addWhere('id', $categoryId);
	$dao->addWhere('user_id', $userId);
	$category = $dao->selectOne();
	if(!$category) respondError(array('error'=>'not-found'));
	$dao->delete();
	
	$dao = new Dao($db, 'word_table');
	$dao->addWhere('category_id', $categoryId);
	$dao->addWhere('user_id', $userId);
	$dao->addValue('category_id', 0);
	$dao->update();
	
	//----------------------
	// delete files
	require_once('common/DataFile.php');
	$data = new DataFile();
	$categoryDir = $data->getCategoryDir($userId, $categoryId);
	$data->deleteFile($categoryDir);
	
	$data->writeUserFile($userId, $user['name']);
	
	respond(array('category_id' => $categoryId));
	
} catch(Exception $e) {
	respondException($e);
}
