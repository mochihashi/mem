<?php

function getDb() {
	require_once('config/db.pdo.php');
	return $db;
}

function mapGet(&$map, $key, $valueIfNone = null) {
	if($map && array_key_exists($key, $map)) return $map[$key];
	return $valueIfNone;
}
