<?php
class DataFile {
	private $_fileRoot;
	private $_webRoot;
	
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