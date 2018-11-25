<?php
/**
 * table/delete/
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
	
	$tableId = mapGet($form, 'id');
	
	// delete
	$dao = new Dao($db, 'word_table');
	$dao->addWhere('id', $tableId);
	$dao->addWhere('user_id', $userId);
	$table = $dao->selectOne();
	if(!$table) respondError(array('error'=>'not-found'));
	$categoryId = $table['category_id'];
	$dao->delete();
	
	//----------------------
	// delete files
	require_once('common/DataFile.php');
	$data = new DataFile();
	$tableDir = $data->getTableDir($userId, $tableId);
	$data->deleteFile($tableDir);
	
	if($categoryId) {
		$categoryDao = new Dao($db, 'category');
		$categoryDao->addWhere('user_id', $userId);
		$categoryDao->addWhere('id', $categoryId);
		$category = $categoryDao->selectOne();
		
		$data->writeCategoryFile($userId, $categoryId, $category['name']);
	} else {
		$data->writeUserFile($userId, $user['name']);
	}
	
	respond(array('table_id' => $tableId, 'category_id' => $categoryId));
	
} catch(Exception $e) {
	respondException($e);
}
