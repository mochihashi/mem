<?php

/**
 * include
 */
$pathes = array(get_include_path());
$p = strpos(__FILE__, '/api/');
if($p !== false) {
	$pathes[] = substr(__FILE__, 0, $p) . '/';
}
$p = strpos(__FILE__, '/public/');
if($p !== false) {
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
if(@$argc) { for($i = 1; $i + 1 < $argc; $i += 2) { $form[$argv[$i]] = $argv[$i + 1]; }}

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
	global $form;
	$message = $e->getMessage(); // . " @" . $e->getFile() . "#" . $e->getLine();
	$error = array('error' => 'error', 'suffix' => ': ' . $message);
	if(App::ERROR_MAIL_TO) {
		$body = $e->getMessage() . " @" . $e->getFile() . "#" . $e->getLine();
		$body .= "\nREQUEST_URI: " . $_SERVER['REQUEST_URI'];
		$body .= "\nArgs:";
		foreach($form as $k => $v) { $body .= "\n  $k = $v"; }
		mb_send_mail(App::ERROR_MAIL_TO, "Error: " . App::NAME, $body, "From: " . App::MAIL_FROM);
	}
	respond(array("error" => 1, "responseMessages" => array($error)));
}
set_error_handler(function ($errno, $errstr, $errfile, $errline ) {
    throw new ErrorException($errstr, 0, $errno, $errfile, $errline);
}, E_ERROR);
function redirect($url) {
	header("Location: $url");
	exit();
}
function respondText($text) {
	header('Content-Type: text/plain');
	echo $text;
	exit();	
}