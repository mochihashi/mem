<?php
class Password {
	public static function hashPassword($password) {
		return password_hash($password, PASSWORD_DEFAULT);
	}
	
	public static function matchPassword($password, $hash) {
		return password_verify($password, $hash);
	}
	
	private static function encodeKey($id, $email, $secretKey) {
		include_once('Crypt/Blowfish.php');
		$blowfish = new Crypt_Blowfish($secretKey);
		$time = time();
		$key = "$time\t$id\t$email";
		return bin2hex($blowfish->encrypt($key));
	}
	
	private static function decodeKey($key, $secretKey, $expireHours = 0) {
		include_once('Crypt/Blowfish.php');
		$blowfish = new Crypt_Blowfish($secretKey);
		$key = rtrim($blowfish->decrypt(pack("H*", $key)));
		$arr = explode("\t", $key);
		if(count($arr) < 3) return null;
		$time = intval($arr[0]);
		$id = intval($arr[1]);
		$email = $arr[2];
		if(!$time || !$id || !$email) return null;
		$map = array('id' => $id, 'email' => $email, 'time' => $time);
		if($expireHours) {
			if(time() - $time > $expireHours * 3600) $map['expired'] = 1;
		}
		return $map;
	}
	
	public static function encodeActivateKey($id, $email) {
		return self::encodeKey($id, $email, App::ACTIVATE_CRYPT_KEY);
	}
	
	public static function decodeActivateKey($key) {
		return self::decodeKey($key, App::ACTIVATE_CRYPT_KEY, App::ACTIVATE_EXPIRE_HOURS);
	}
	
	public static function encodeCookieKey($id, $email) {
		return self::encodeKey($id, $email, App::COOKIE_CRYPT_KEY);
	}
	
	public static function decodeCookieKey($key) {
		return self::decodeKey($key, App::COOKIE_CRYPT_KEY, App::COOKIE_EXPIRE_HOURS);
	}
}