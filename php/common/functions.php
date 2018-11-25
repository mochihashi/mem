<?php

function getDb() {
	require_once('config/db.pdo.php');
	return $db;
}

function mapGet(&$map, $key, $valueIfNone = null) {
	if($map && array_key_exists($key, $map)) return $map[$key];
	return $valueIfNone;
}

function joinPath() {
	$last = func_num_args() - 1;
	$dirs = func_get_args();
	$arr = array();
	for($i = 0; $i <= $last; $i++) {
		$dir = $dirs[$i];
		if($i > 0 && substr($dir, 0, 1) == '/') $dir = substr($dir, 1);
		if($i < $last && substr($dir, -1) == '/') $dir = substr($dir, 0, -1);
		$arr[] = $dir;
	}
	return implode('/', $arr);
}

function rows2map(&$list, $keyCol='id') {
	$map = array();
	if($list) {
		foreach($list as $row) {
			$key = @$row[$keyCol];
			$map[$key] = $row;
		}
	}
	return $map;
}

function deleteDir($dir) {
	if(is_dir($dir)) {
		array_map('deleteDir',   glob($dir.'/*', GLOB_ONLYDIR));
		array_map('unlink', glob($dir.'/*'));
		rmdir($dir);
	}
}