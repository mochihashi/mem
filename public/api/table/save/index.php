<?php
/**
 * table/save/
 */
require_once('../../api.php');

try {
	$auth = getAuth();
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
	$userInfo = array('id'=>$userId, 'name'=>$user['name']);
	$dao = new Dao($db, 'category');
	$categories = $dao->addWhere('user_id', $userId)->addOrderAsc('id')->addSelect('id')->addSelect('name')->select();
	for($i = 0, $c = count($categories); $i < $c; $i++) {
		$categories[$i]['url'] = $data->getWebPath($data->getCategoryDir($userId, $categories[$i]['id']));
	}
	$userInfo['categories'] = $categories;
	
	$dao = new Dao($db, 'word_table');
	$tables = $dao->addWhere('user_id', $userId)->addWhere('category_id', 0)->addWhere('private', 0)
	->addOrderDesc('id')
	->addSelect('id')->addSelect('name')->addSelect('description')->select();
	for($i = 0, $c = count($tables); $i < $c; $i++) {
		$tables[$i]['url'] = $data->getWebPath($data->getTableDir($userId, $tables[$i]['id']));
	}
	$userInfo['tables'] = $tables;
	
	$userDir = $data->getUserDir($userId);
	$data->writeJson($userDir, $userInfo);
	$html = buildPageTypeHtml('user') . buildLinkHtml($categories) . buildLinkHtml($tables);
	$data->writeHtml($userDir, $html, $userInfo['name']);
	
	if($categoryId) {
		$categoryInfo = array('id'=>$categoryId, 'name'=>$category);
		$dao = new Dao($db, 'word_table');
		$tables = $dao->addWhere('user_id', $userId)->addWhere('category_id', $categoryId)->addWhere('private', 0)
		->addOrderDesc('id')
		->addSelect('id')->addSelect('name')->addSelect('description')->select();
		for($i = 0, $c = count($tables); $i < $c; $i++) {
			$tables[$i]['url'] = $data->getWebPath($data->getTableDir($userId, $tables[$i]['id']));
		}
		$categoryInfo['tables'] = $tables;
		
		$categoryDir = $data->getCategoryDir($userId, $categoryId);
		$data->writeJson($categoryDir, $categoryInfo);
		$html = buildPageTypeHtml('category') . buildLinkHtml($tables);
		$data->writeHtml($categoryDir, $html, $category);
	}
	
	$html = buildPageTypeHtml('table') . '
	<input type="hidden" name="user_id" value="' . $userId . '" />
<input type="hidden" name="category_id" value="' . $categoryId . '" />
<input type="hidden" name="table_id" value="' . $tableId . '" />
<h1 class="title">' . $title . '</h1>
<h4 class="description">' . $description . '</h4>
<pre class="words">' . $words . '</pre>
<a href="' . $data->getWebPath($userDir) . '">' . $user['name'] . '</a>';
	if($categoryId) $html . '<a href="' + $data->getWebPath($categoryDir) . '">' . $category . '</a>';
	$tableDir = $data->getTableDir($userId, $tableId);
	$data->writeHtml($tableDir, $html, $title, $description);
	
	respond(array('table_id' => $tableId, 'table_path' => $data->getWebPath($tableDir)));
	
} catch(Exception $e) {
	respondException($e);
}

function buildPageTypeHtml($type) {
	return '<input type="hidden" name="page_type" value="' . $type . '" />';
}

function buildLinkHtml(&$list) {
	$arr = array();
	foreach($list as $row) {
		$url = @$row['url'];
		$name = @$row['name'];
		$description = @$row['description'];
		if(!$url || !$name) continue;
		$arr[] = '<a href="' . $url . '">' . $name . '</a>' . $description;
	}
	return implode("<br/>\n", $arr);
}

