<?php
/**
 * account/activate/
 */
require_once('../../api.php');

try {
	$key = mapGet($form, 'key');
	if(!$key) respondText("Unknown parameter.");
	
	require_once('common/Password.php');
	require_once('config/db.php');
	require_once('common/Dao.php');
	
	$auth = Password::decodeActivateKey($key);
	if(!$auth) respondText("Invalid parameter.");
	
	$dao = new Dao($db, 'user');
	$dao->addWhere('id', $auth['id']);
	
	if(mapGet($auth, 'expired')) {
		$dao->delete();
		redirect("../../../?msg=activate-expired");
	}
	
	$user = $dao->selectOne();
	if(!Password::matchUser($auth, $user)) redirect("../../");
	
	$dao->addValue('active', 1)->update();
	
	require_once('common/DataFile.php');
	$data = new DataFile();
	$data->writeUserFile($user['id'], $user['name']);
	
	header("Location: ../../../?msg=activated");
	
} catch(Exception $e) {
	respondText("Error: " . $e->getMessage());
}
