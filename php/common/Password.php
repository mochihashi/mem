<?php
class Password {
    const ALGORITHM = 'AES-256-CBC';
	const SECRET_IV = 'VmAU8B4sP63gPJjJ';  // 16bytes
	
	public static function hashPassword($password) {
		return password_hash($password, PASSWORD_DEFAULT);
	}
	
	public static function matchPassword($password, $hash) {
		return password_verify($password, $hash);
	}
	
	private static function encodeKey(&$user, $secretKey) {
		$time = time();
		$id = $user['id'];
		$hash = self::shortHash($user['password_hash']);
		$key = "$time\t$id\t$hash";
		$enc = openssl_encrypt($key, self::ALGORITHM, $secretKey, 0, self::SECRET_IV);
		return bin2hex($enc);
	}
	
	private static function shortHash($hash) { return substr($hash, -20); }
	
	public static function matchUser(&$auth, &$user) {
		if(!$user) return false;
		if(mapGet($auth, 'hash') != self::shortHash(mapGet($user, 'password_hash'))) return false;
		return true;
	}
	
	private static function decodeKey($key, $secretKey, $expireHours = 0) {
		$dec = pack("H*", $key);
		$key = openssl_decrypt($dec, self::ALGORITHM, $secretKey, 0, self::SECRET_IV);
		$arr = explode("\t", $key);
		if(count($arr) < 3) return null;
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