<?php
/**
 * table/save/
 */
require_once('../../api.php');

try {
	require_once('common/Auth.php');
	$auth = Auth::getCookieAuth();
	$userId = $auth['id'];
	
	$form['name'] = mapGet($form, 'title');

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
	$userName = $user['name'];
	
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
	$categoryName = mapGet($form, 'category');
	$private = mapGet($form, 'private') ? 1 : 0;
	$categoryPrivate = $private;
	
	$imageFile = '';
	$imageFrom = '';
	if(@$_FILES['image_file'] && @$_FILES['image_file']['size'] > 0) {
	    $info = $_FILES['image_file'];
	    $ext = pathinfo($info['name'], PATHINFO_EXTENSION);
	    if(!$ext) $ext = 'jpg';
	    $imageFile = "image.$ext";
	    $imageFrom = $info['tmp_name'];
	}
	
	$categoryId = 0;
	if($categoryName) {
		$categoryDao = new Dao($db, 'category');
		$categoryDao->addWhere('user_id', $userId);
		$categoryDao->addWhere('name', $categoryName);
		$category = $categoryDao->selectOne();
		if($category) {
			$categoryId = $category['id'];
			$categoryPrivate = $category['private'];
		} else {
			$categoryDao->addValue('user_id', $userId);
			$categoryDao->addValue('name', $categoryName);
			$categoryDao->addValue('private', $private);
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
	if($imageFile) $dao->addValue('image_file', $imageFile);
	if($tableId && $overwrite) {
		$dao->addWhere('id', $tableId);
		$dao->addWhere('user_id', $userId);
		$dao->update();
	} else {
		$dao->insert();
		$tableId = $dao->getLastInsertId();
	}
	
	if(!$imageFile && $overwrite) {
	    $dao = new Dao($db, 'word_table');
	    $table = $dao->addWhere('id', $tableId)->selectOne();
	    $imageFile = $table['image_file'];
	}
	
	//----------------------
	// write files
	require_once('common/DataFile.php');
	$data = new DataFile();
	$data->writeUserFile($userId, $userName);
	
	if($categoryId) {
	    $data->writeCategoryFile($userId, $categoryId, $categoryName, $categoryPrivate);
	}
	
	$html = '
<input type="hidden" name="table_id" value="' . $tableId . '" />
<input type="hidden" name="private" value="' . $private . '" />
<input type="hidden" name="image_file" value="' . $imageFile . '" />
<h1 class="title">' . $title . '</h1>
<h4 class="description">' . $description . '</h4>
' . ($imageFile ? "<img src=\"$imageFile\" width=\"200px;\"/>" : "") . '
<pre class="words">' . $words . '</pre>';

	$html = $data->getPageTypeHtml('table')
	. $data->getUserLinkHtml($userId, $userName)
	. $data->getCategoryLinkHtml($userId, $categoryId, $categoryName)
	. $html;

	$tableDir = $data->getTableDir($userId, $tableId);
	$data->writeHtml($tableDir, $html, $title, $description, $imageFile);
	if($imageFile && $imageFrom) copy($imageFrom, $data->getFilePath($tableDir . $imageFile));
	
	respond(array('table_id' => $tableId, 'table_path' => $data->getWebPath($tableDir)));
	
} catch(Exception $e) {
	respondException($e);
}
