<?php
/**
 * table/save/
 */
require_once('../../api.php');

try {
	require_once('common/Auth.php');
	$auth = Auth::getCookieAuth();
	$userId = $auth['id'];

	// validate
	require_once('common/Validator.php');
	$validator = new Validator($form);
	if(!$validator->validateField('title', array('required' => true))
	|| !$validator->validateField('words', array('required' => true))
	) respondErrors($validator->getErrors());
	
	// db validate
	require_once('config/db.php');
	require_once('common/Dao.php');
	$dao = new Dao($db, 'user');
	$user = $dao->addWhere('id', $userId)->selectOne();
	if(!Password::matchUser($auth, $user)) respondError(array('error'=>'auth-expired'));
	
	$tableId = mapGet($form, 'table_id');
	$overwrite = mapGet($form, 'overwrite');
	if(!$overwrite) $tableId = 0;
	$dao = new Dao($db, 'word_table');
	$dao->addWhere('user_id', $userId);
	if(!$validator->validateUniqueField($dao, 'name', $tableId)
	) respondErrors($validator->getErrors());
	
	// insert
	$title = mapGet($form, 'title');
	$words = mapGet($form, 'words');
	$description = mapGet($form, 'description');
	$category = mapGet($form, 'category');
	$private = mapGet($form, 'private') ? 1 : 0;
	
	$categoryId = 0;
	if($category) {
		$categoryDao = new Dao($db, 'category');
		$categoryDao->addWhere('user_id', $userId);
		$categoryDao->addWhere('name', $category);
		$categoryDao->addSelect('id');
		$categoryInfo = $categoryDao->selectOne();
		if($categoryInfo) {
			$categoryId = $categoryInfo['id'];
		} else {
			$categoryDao->addValue('user_id', $userId);
			$categoryDao->addValue('name', $category);
			$categoryDao->insert();
			$categoryId = $categoryDao->getLastInsertId();
		}
	}
	
	$dao = new Dao($db, 'word_table');
	$dao->addValue('user_id', $userId);
	$dao->addValue('name', $title);
	$dao->addValue('category_id', $categoryId);
	$dao->addValue('description', $description);
	$dao->addValue('private', $private);
	if($tableId && $overwrite) {
		$dao->addWhere('id', $tableId);
		$dao->addWhere('user_id', $userId);
		$dao->update();
	} else {
		$dao->insert();
		$tableId = $dao->getLastInsertId();
	}
	
	//----------------------
	// write files
	require_once('common/DataFile.php');
	$data = new DataFile();
	$data->writeUserFile($userId, $user['name']);
	
	if($categoryId) {
		$data->writeCategoryFile($userId, $categoryId, $category);
	}
	
	$html = $data->getPageTypeHtml('table')
	. $data->getUserLinkHtml()
	. $data->getCategoryLinkHtml()
	. '
<input type="hidden" name="table_id" value="' . $tableId . '" />
<input type="hidden" name="private" value="' . $private . '" />
<h1 class="title">' . $title . '</h1>
<h4 class="description">' . $description . '</h4>
<pre class="words">' . $words . '</pre>';

	$tableDir = $data->getTableDir($userId, $tableId);
	$data->writeHtml($tableDir, $html, $title, $description);
	
	respond(array('table_id' => $tableId, 'table_path' => $data->getWebPath($tableDir)));
	
} catch(Exception $e) {
	respondException($e);
}
