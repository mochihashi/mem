<?php
/**
 * autoSignIn
 */
require_once('../api.php');

try {
	$error = array('error'=>'auth-failed');
	
	// validate
	$auth = mapGet($_COOKIE, 'auth');
	if(!$auth) respondError($error);
	
	require_once('common/Password.php');
	$auth = Password::decodeCookieKey($auth);
	if(!$auth || mapGet($auth, '$auth')) respondError($error);
	
	$id = mapGet($auth, 'id');
	$email = mapGet($auth, 'email');
	if(!$id || !$email) respondError($error);
	
	// db validate
	require_once('config/db.php');
	require_once('common/Dao.php');
	$dao = new Dao($db, 'user');
	$user = $dao->addWhere('id', $id)->selectOne();
	if(mapGet($user, 'email') != $email) respondError($error);
	
	// return auth
	$res = array();
	$res['id'] = $id;
	$res['name'] = mapGet($user, 'name');
	$res['auth'] = Password::encodeCookieKey($id, $email);
	
	respond($res);
	
} catch(Exception $e) {
	respondException($e);
}