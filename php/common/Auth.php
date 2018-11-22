<?php
class Auth {
	public static function getCookieAuth() {
		$error = array('error'=>'auth-expired');
		$auth = mapGet($_COOKIE, 'auth');
		if(!$auth) respondError($error);
		
		require_once('common/Password.php');
		$auth = Password::decodeCookieKey($auth);
		if(!$auth || mapGet($auth, 'expired')) respondError($error);
		
		$id = mapGet($auth, 'id');
		if(!$id) respondError($error);
		return $auth;
	}
	
	public static function createResponseAuth(&$user) {
		$res = array();
		$res['id'] = $user['id'];
		$res['name'] = $user['name'];
		
		require_once('common/Password.php');
		$res['auth'] = Password::encodeCookieKey($user);
		
		require_once('common/DataFile.php');
		$data = new DataFile();
		$res['dir'] = $data->getWebPath($data->getUserDir($user['id']));
		return $res;
	}
}