<?php
/**
 * account/update/
 */
require_once('../../api.php');

try {
	require_once('common/Auth.php');
	$auth = Auth::getCookieAuth();
	$userId = $auth['id'];

	// validate
	require_once('common/Validator.php');
	$validator = new Validator($form);
	if(!$validator->validateField('name', array('minLength' => 3))
	|| !$validator->validateField('email', array('type' => 'email'))
	|| !$validator->validateField('password', array('minLength' => 8))
	) respondErrors($validator->getErrors());
	
	// db validate
	require_once('config/db.php');
	require_once('common/Dao.php');
	$dao = new Dao($db, 'user');
	$user = $dao->addWhere('id', $userId)->selectOne();
	if(!Password::matchUser($auth, $user)) respondError(array('error'=>'auth-expired'));
	
	$name = mapGet($form, 'name');
	$email = mapGet($form, 'email');
	$password = mapGet($form, 'password');
	$lang = mapGet($form, 'lang');
	
	if(!$name && !$email && !$password) respondError(array('error'=>'required'));
	
	if(($email && !$validator->validateUniqueField($dao, 'email', $userId))
	|| ($name && !$validator->validateUniqueField($dao, 'name', $userId))
	) respondErrors($validator->getErrors());
	
	// update
	$dao = new Dao($db, 'user');
	$dao->addWhere('id', $userId);
	if($name) $dao->addValue('name', $name);
	if($email) $dao->addValue('email', $email);
	if($password) {
		require_once('common/Password.php');
		$password_hash = Password::hashPassword($password);
		$dao->addValue('password_hash', $password_hash);
	}
	if($lang) $dao->addValue('lang', $lang);
	$dao->update();
	
	respond(array('id' => $userId, 'name' => $name));
	
} catch(Exception $e) {
	respondException($e);
}