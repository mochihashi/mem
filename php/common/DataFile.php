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
	
	public function getUserDir($userId) {
		$s = "u$userId";
		$p = ceil(strlen($s) / 2);
		$s = substr($s, 0, $p) . '/' . substr($s, $p);
		return "data/$s/";
	}
	public function getCategoryDir($userId, $categoryId) { return joinPath($this->getUserDir($userId), "c$categoryId/"); }
	public function getTableDir($userId, $tableId) { return joinPath($this->getUserDir($userId), "t$tableId/"); }
	
	public function getFilePath($dir) { return joinPath($this->_fileRoot, $dir); }
	public function getWebPath($dir) { return joinPath($this->_webRoot, $dir); }
	
	public function writeFile($path, $text) {
		$path = $this->getFilePath($path);
		$dir = dirname($path);
		if(!is_dir($dir)) mkdir($dir, 0777, true);
		file_put_contents($path, $text);
	}
	
	public function deleteFile($path) {
		$path = $this->getFilePath($path);
		if(is_dir($path)) {
			deleteDir($path);
		} else if(is_file($path)) {
			unlink($path);
		}
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
	
	public function setUrlToCategoryList(&$list, $userId = 0) {
		$c = count($list);
		foreach($list as $i => $row) {
			$u = ($userId ? $userId : $row['user_id']);
			$list[$i]['url'] = $this->getWebPath($this->getCategoryDir($u, $row['id']));
		}
	}
	
	public function setUrlToTableList(&$list, $userId = 0) {
		$c = count($list);
		foreach($list as $i => $row) {
			$u = ($userId ? $userId : $row['user_id']);
			$list[$i]['url'] = $this->getWebPath($this->getTableDir($u, $row['id']));
		}
	}
	
	public function setUserUrlToList(&$list) {
		$c = count($list);
		foreach($list as $i => $row) {
			$u = $row['user_id'];
			$list[$i]['user_url'] = $this->getWebPath($this->getUserDir($u));
		}
	}
	
	/**
	 * write /u{id}/
	 */
	public function writeUserFile($userId, $userName) {
		global $db;
		$userInfo = array('id'=>$userId, 'name'=>$userName);
		$dao = new Dao($db, 'category');
		$categories = $dao->addWhere('user_id', $userId)->addOrderDesc('id')
		->addSelect('id')->addSelect('name')->addSelect('parent_id')->select();
		$this->setUrlToCategoryList($categories, $userId);
		$userInfo['categories'] = rows2map($categories, 'id');
		
		$dao = new Dao($db, 'word_table');
		$tables = $dao->addWhere('user_id', $userId)->addWhere('category_id', 0)
		->addOrderDesc('id')
		->addSelect('id')->addSelect('name')->addSelect('description')->addSelect('private')->select();
		$this->setUrlToTableList($tables, $userId);
		$userInfo['tables'] = rows2map($tables, 'id');
		
		$userDir = $this->getUserDir($userId);
		$this->writeJson($userDir, $userInfo);
		
		$html = $this->getPageTypeHtml('user')
		. $this->getUserLinkHtml($userId, $userName)
		. $this->getLinkHtml($categories)
		. $this->getLinkHtml($tables);
		$this->writeHtml($userDir, $html, $userInfo['name']);
	}
	
	public function getUserLinkHtml($userId, $userName='') {
		global $db;
		if(!$this->_userLinkHtml) {
			if(!$userName) {
				$dao = new Dao($db, 'user');
				$user = $dao->addWhere('id', $userId)->selectOne();
				$userName = $user['name'];
			}
			$this->_userLinkHtml = '
<input type="hidden" name="user_id" value="' . $userId . '" />
<a class="user" href="' . $this->getWebPath($this->getUserDir($userId)) . '">' . $userName . '</a><br/>';
		}
		return $this->_userLinkHtml;
	}
	
	/**
	 * write /u{id}/c{id}/
	 */
	public function writeCategoryFile($userId, $categoryId, $categoryName, $private=0) {
		global $db;
		$categoryInfo = array('id'=>$categoryId, 'name'=>$categoryName, 'private'=>$private);
		$dao = new Dao($db, 'word_table');
		$tables = $dao->addWhere('user_id', $userId)->addWhere('category_id', $categoryId)
		->addOrderDesc('id')
		->addSelect('id')->addSelect('name')->addSelect('description')->select();
		$this->setUrlToTableList($tables, $userId);
		$categoryInfo['tables'] = rows2map($tables, 'id');
		
		$dao = new Dao($db, 'category');
		$categories = $dao->addWhere('user_id', $userId)->addWhere('parent_id', $categoryId)->addOrderDesc('id')
		->addSelect('id')->addSelect('name')->addSelect('parent_id')->select();
		$this->setUrlToCategoryList($categories, $userId);
		$categoryInfo['categories'] = rows2map($categories, 'id');
		
		$categoryDir = $this->getCategoryDir($userId, $categoryId);
		$this->writeJson($categoryDir, $categoryInfo);
	
		$html = $this->getPageTypeHtml('category')
		. $this->getUserLinkHtml($userId)
		. $this->getCategoryLinkHtml($userId, $categoryId, $categoryName)
		. $this->getLinkHtml($tables)
		. $this->getLinkHtml($categories);
		$this->writeHtml($categoryDir, $html, $categoryName);
	}
	
	public function getCategoryLinkHtml($userId, $categoryId, $categoryName='') {
		global $db;
		if(!$this->_categoryLinkHtml) {
			if(!$categoryName) {
				$dao = new Dao($db, 'category');
				$category = $dao->addWhere('id', $categoryId)->selectOne();
				$categoryName = $category['name'];
			}
			$this->_categoryLinkHtml = '
<input type="hidden" name="category_id" value="' . $categoryId . '" />
<a class="category" href="' . $this->getWebPath($this->getCategoryDir($userId, $categoryId)) . '">' . $categoryName . '</a><br/>';
		}
		return $this->_categoryLinkHtml;
	}
	
	/**
	 * write index.html adding header and footer
	 */
	public function writeHtml($dir, $html, $title='', $description='', $imageFile='') {
		$url = joinPath(App::URL, $this->getWebPath($dir));
		if(substr($dir, -1) == '/') $dir = $dir . 'index.html';
		$appName = App::NAME;
		//if(!$description) $description = $title;
		$title = $title ? "$title - $appName" : $appName;
		
		$ogImage = '';
		if($imageFile) $ogImage = '<meta property="og:image" content="' . $url . $imageFile . '" />';
		
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
' . $ogImage . '
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