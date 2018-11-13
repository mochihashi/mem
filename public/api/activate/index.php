<?php
require_once('../api.php');

try {
	$key = mapGet($form, 'key');
	if(!$key) respondText("Unknown parameter.");
	
	require_once('common/Password.php');
	require_once('config/db.php');
	require_once('common/Dao.php');
	
	$map = Password::decodeActivateKey($key);
	if(!$map) respondText("Invalid parameter.");
	if(mapGet($map, 'expired')) redirect("../../?msg=activate-expired");
	
	$dao = new Dao($db, 'user');
	$dao->addWhere('id', $map['id']);
	$account = $dao->selectOne();
	if(!$account || $account['email'] != $map['email']) redirect("../../");
	
	$dao->addValue('active', 1)->update();
	
	header("Location: ../../?msg=activated");
	
} catch(Exception $e) {
	respondText("Error: " . $e->getMessage());
}