<?php
/**
 * sign/auto/
 */
require_once('../../api.php');

try {
	require_once('common/Auth.php');
	$auth = Auth::getCookieAuth();
	$id = $auth['id'];
	
	// db validate
	require_once('common/Password.php');
	require_once('config/db.php');
	require_once('common/Dao.php');
	$dao = new Dao($db, 'user');
	$user = $dao->addWhere('id', $id)->selectOne();
	if(!Password::matchUser($auth, $user)) respondError($error);
	
	// return auth
	respond(Auth::createResponseAuth($user));
	
} catch(Exception $e) {
	respondException($e);
}