<?php
/**
 * account/signIn/
 */
require_once('../../api.php');

try {
	// validate
	require_once('common/Validator.php');
	$validator = new Validator($form);
	if(!$validator->validateField('email', array('required' => true, 'type' => 'email'))
	|| !$validator->validateField('password', array('required' => true, 'minLength' => 8))
	) respondErrors($validator->getErrors());
	
	// db validate
	require_once('config/db.php');
	require_once('common/Dao.php');
	require_once('common/Password.php');
	$email = mapGet($form, 'email');
	$password = mapGet($form, 'password');
	$dao = new Dao($db, 'user');
	$user = $dao->addWhere('email', $email)->selectOne();
	$hash = mapGet($user, 'password_hash');
	if(!$hash || !Password::matchPassword($password, $hash)) {
		respondError(array('field'=>'email', 'error'=>'auth-failed'));
	}
	
	// return auth
	require_once('common/Auth.php');
	respond(Auth::createResponseAuth($user));
	
} catch(Exception $e) {
	respondException($e);
}