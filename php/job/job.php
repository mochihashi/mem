<?php

/**
 * include
 */
$pathes = array(get_include_path());
$p = strpos(__FILE__, '/php/job/');
if($p >= 0) {
	$pathes[] = substr(__FILE__, 0, $p) . '/php/';
	$pathes[] = substr(__FILE__, 0, $p) . '/php/job/';
}
set_include_path(implode(':', $pathes));

require_once('common/functions.php');
require_once('config/App.php');

$form = array();
if($argc > 1) parse_str($argv[1], $form);
