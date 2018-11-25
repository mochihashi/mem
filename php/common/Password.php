<?php
class Password {
	const PREFIX = 'SwZ3A2hk';
	
	public static function hashPassword($password) {
		return password_hash($password, PASSWORD_DEFAULT);
	}
	
	public static function matchPassword($password, $hash) {
		return password_verify($password, $hash);
	}
	
	private static function encodeKey(&$user, $secretKey) {
		include_once('Crypt/Blowfish.php');
		$blowfish = new Crypt_Blowfish($secretKey);
		$time = time();
		$id = $user['id'];
		$hash = self::shortHash($user['password_hash']);
		$key = "$time\t$id\t$hash\t" . self::PREFIX;
		return bin2hex($blowfish->encrypt($key));
	}
	
	private static function shortHash($hash) { return substr($hash, -20); }
	
	public static function matchUser(&$auth, &$user) {
		if(!$user) return false;
		if(mapGet($auth, 'hash') != self::shortHash(mapGet($user, 'password_hash'))) return false;
		return true;
	}
	
	private static function decodeKey($key, $secretKey, $expireHours = 0) {
		include_once('Crypt/Blowfish.php');
		$blowfish = new Crypt_Blowfish($secretKey);
		$key = rtrim($blowfish->decrypt(pack("H*", $key)));
		$arr = explode("\t", $key);
		if(count($arr) < 4) return null;
		$prefix = $arr[3];
		if($prefix != self::PREFIX) return null;
		$time = intval($arr[0]);
		$id = intval($arr[1]);
		$hash = $arr[2];
		if(!$time || !$id || !$hash) return null;
		$map = array('id' => $id, 'hash' => $hash, 'time' => $time);
		if($expireHours) {
			if(time() - $time > $expireHours * 3600) $map['expired'] = 1;
		}
		return $map;
	}
	
	public static function encodeActivateKey(&$user) {
		return self::encodeKey($user, App::ACTIVATE_CRYPT_KEY);
	}
	
	public static function decodeActivateKey($key) {
		return self::decodeKey($key, App::ACTIVATE_CRYPT_KEY, App::ACTIVATE_EXPIRE_HOURS);
	}
	
	public static function encodeCookieKey(&$user) {
		return self::encodeKey($user, App::COOKIE_CRYPT_KEY);
	}
	
	public static function decodeCookieKey($key) {
		return self::decodeKey($key, App::COOKIE_CRYPT_KEY, App::COOKIE_EXPIRE_HOURS);
	}
}