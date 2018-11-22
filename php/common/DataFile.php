<?php
class DataFile {
	private $_fileRoot;
	private $_webRoot;
	private $_userLinkHtml = '';
	private $_categoryLinkHtml = '';
	
	function __construct() {
		$filePath = $_SERVER['SCRIPT_FILENAME'];
		$this->_fileRoot = substr($filePath, 0, strpos($filePath, '/api/'));
		$webPath = $_SERVER['SCRIPT_NAME'];
		$this->_webRoot = substr($webPath, 0, strpos($webPath, '/api/')) . '/';
	}
	
	public function getUserDir($userId) { return "data/u$userId/"; }
	public function getCategoryDir($userId, $categoryId) { return "data/u$userId/c$categoryId/"; }
	public function getTableDir($userId, $tableId) { return "data/u$userId/t$tableId/"; }
	
	public function getFilePath($dir) { return joinPath($this->_fileRoot, $dir); }
	public function getWebPath($dir) { return joinPath($this->_webRoot, $dir); }
	
	public function getUserLinkHtml() { return $this->_userLinkHtml; }
	public function getCategoryLinkHtml() { return $this->_categoryLinkHtml; }
	
	public function writeFile($path, $text) {
		$path = $this->getFilePath($path);
		$dir = dirname($path);
		if(!is_dir($dir)) mkdir($dir, 0777, true);
		file_put_contents($path, $text);
	}
	
	public function writeJson($dir, &$map) {
		if(substr($dir, -1) == '/') $dir = $dir . 'index.json';
		$this->writeFile($dir, json_encode($map));
	}
	
	public function getPageTypeHtml($type) {
		return '<input type="hidden" name="page_type" value="' . $type . '" />';
	}
	
	public function getLinkHtml(&$list) {
		$arr = array();
		foreach($list as $row) {
			$url = @$row['url'];
			$name = @$row['name'];
			$description = @$row['description'];
			if(!$url || !$name) continue;
			$arr[] = '<a href="' . $url . '">' . $name . '</a>' . $description . '<br/>';
		}
		return implode("\n", $arr);
	}
	
	/**
	 * write /u{id}/
	 */
	public function writeUserFile($userId, $userName) {
		global $db;
		$userInfo = array('id'=>$userId, 'name'=>$userName);
		$dao = new Dao($db, 'category');
		$categories = $dao->addWhere('user_id', $userId)->addOrderAsc('id')->addSelect('id')->addSelect('name')->select();
		for($i = 0, $c = count($categories); $i < $c; $i++) {
			$categories[$i]['url'] = $this->getWebPath($this->getCategoryDir($userId, $categories[$i]['id']));
		}
		$userInfo['categories'] = $categories;
		
		$dao = new Dao($db, 'word_table');
		$tables = $dao->addWhere('user_id', $userId)->addWhere('category_id', 0)->addWhere('private', 0)
		->addOrderDesc('id')
		->addSelect('id')->addSelect('name')->addSelect('description')->select();
		for($i = 0, $c = count($tables); $i < $c; $i++) {
			$tables[$i]['url'] = $this->getWebPath($this->getTableDir($userId, $tables[$i]['id']));
		}
		$userInfo['tables'] = $tables;
		
		$userDir = $this->getUserDir($userId);
		$this->writeJson($userDir, $userInfo);
		
		$this->_userLinkHtml = '
	<input type="hidden" name="user_id" value="' . $userId . '" />
	<a class="user" href="' . $this->getWebPath($userDir) . '">' . $userName . '</a><br/>';
		
		$html = $this->getPageTypeHtml('user')
		. $this->_userLinkHtml
		. $this->getLinkHtml($categories)
		. $this->getLinkHtml($tables);
		$this->writeHtml($userDir, $html, $userInfo['name']);
	}
	
	/**
	 * write /u{id}/c{id}/
	 */
	public function writeCategoryFile($userId, $categoryId, $categoryName) {
		global $db;
		$categoryInfo = array('id'=>$categoryId, 'name'=>$categoryName);
		$dao = new Dao($db, 'word_table');
		$tables = $dao->addWhere('user_id', $userId)->addWhere('category_id', $categoryId)->addWhere('private', 0)
		->addOrderDesc('id')
		->addSelect('id')->addSelect('name')->addSelect('description')->select();
		for($i = 0, $c = count($tables); $i < $c; $i++) {
			$tables[$i]['url'] = $this->getWebPath($this->getTableDir($userId, $tables[$i]['id']));
		}
		$categoryInfo['tables'] = $tables;
		
		$categoryDir = $this->getCategoryDir($userId, $categoryId);
		$this->writeJson($categoryDir, $categoryInfo);
	
		$this->_categoryLinkHtml = '
<input type="hidden" name="category_id" value="' . $categoryId . '" />
<a class="category" href="' . $this->getWebPath($categoryDir) . '">' . $categoryName . '</a><br/>';

		$html = $this->getPageTypeHtml('category')
		. $this->_userLinkHtml
		. $this->_categoryLinkHtml
		. $this->getLinkHtml($tables);
		$this->writeHtml($categoryDir, $html, $categoryName);
	}
	
	/**
	 * write index.html adding header and footer
	 */
	public function writeHtml($dir, $html, $title='', $description='') {
		$url = joinPath(App::URL, $this->getWebPath($dir));
		if(substr($dir, -1) == '/') $dir = $dir . 'index.html';
		$appName = App::NAME;
		//if(!$description) $description = $title;
		$title = $title ? "$title - $appName" : $appName;
		
		$this->writeFile($dir, '<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
<link rel="icon" href="/favicon.ico" type="image/x-icon"/>
<title>' . $title . '</title>
<meta name="description" content="' . $description . '" />
<meta property="og:url" content="' . $url . '" />
<meta property="og:title" content="' . $title . '" />
<meta property="og:description" content="' . $description . '" />
<meta property="og:site_name" content="' . $appName . '" />
<script src="https://mochihashi.github.io/static/js/jquery.min.js"></script>
<script src="https://mochihashi.github.io/static/js/csv.min.js"></script>
<script src="' . $this->getWebPath('js/script.js') . '"></script>
</head>
<body>
<div class="page">
<div class="page-main">
<div class="header py-4"></div>
<div class="my-3 my-md-5">
	<div class="container" id="main-container">
' . $html . '
	</div>
</div>
</div>
<footer class="footer"></footer>
</div>
</body>
</html>');
	}
}