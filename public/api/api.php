<?php

/**
 * include
 */
$pathes = array(get_include_path());
$p = strpos(__FILE__, '/api/');
if($p >= 0) {
	$pathes[] = substr(__FILE__, 0, $p) . '/';
}
$p = strpos(__FILE__, '/public/');
if($p >= 0) {
	$pathes[] = substr(__FILE__, 0, $p) . '/php/';
} else {
	$pathes[] = '/var/opt/mem/php/';
}
set_include_path(implode(':', $pathes));

require_once('common/functions.php');
require_once('config/App.php');

/**
 * request
 */
$form = array();
foreach($_GET as $k => $v) { $form[$k] = $v; }
foreach($_POST as $k => $v) { $form[$k] = $v; }

/**
 * response
 */
function respond($data) {
	header('Content-Type: application/json');
	echo json_encode($data);
	exit();
}
function respondErrors($errors) {
	respond(array("error" => 1, "responseMessages" => $errors));
}
function respondError($error) {
	respond(array("error" => 1, "responseMessages" => array($error)));
}
function respondException(&$e) {
	$message = $e->getMessage() . " @" . $e->getFile() . "#" . $e->getLine();
	$error = array('error' => 'error', 'suffix' => ': ' . $message);
	respond(array("error" => 1, "responseMessages" => array($error)));
}
function redirect($url) {
	header("Location: $url");
	exit();
}
function respondText($text) {
	header('Content-Type: text/plain');
	echo $text;
	exit();	
}