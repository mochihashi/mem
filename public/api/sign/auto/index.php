<?php
/**
 * sign/auto/
 */
require_once('../../api.php');

try {
	$auth = getAuth();
	$id = $auth['id'];
	
	// db validate
	require_once('config/db.php');
	require_once('common/Dao.php');
	$dao = new Dao($db, 'user');
	$user = $dao->addWhere('id', $id)->selectOne();
	if(!Password::matchUser($auth, $user)) respondError($error);
	
	// return auth
	$res = array();
	$res['id'] = $id;
	$res['name'] = mapGet($user, 'name');
	$res['auth'] = Password::encodeCookieKey($user);
	
	respond($res);
	
} catch(Exception $e) {
	respondException($e);
}