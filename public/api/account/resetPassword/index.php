<?php
/**
 * account/resetPassword/
 */
require_once('../../api.php');

try {
	// validate
	require_once('common/Validator.php');
	$validator = new Validator($form);
	if(!$validator->validateField('email', array('required' => true, 'type' => 'email'))
	) respondErrors($validator->getErrors());
	
	// db validate
	$email = mapGet($form, 'email');
	require_once('config/db.php');
	require_once('common/Dao.php');
	$dao = new Dao($db, 'user');
	$user = $dao->addWhere('email', $email)->selectOne();
	if(!$user) respondError(array('error'=>'email-not-found'));
	$id = $user['id'];
	
	// update password
	$chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZzbcdefghijkmnprstuvwxyz';
	$last = strlen($chars) - 1;
	$password = '';
	for($i = 0; $i < 12; $i++) {
		$p = rand(0, $last);
		$password .= $chars[$p];
	}
	$lang = mapGet($form, 'lang');
	require_once('common/Password.php');
	if(!$lang) $lang = 'en';
	$password_hash = Password::hashPassword($password);
	
	$dao->addWhere('id', $id);
	$dao->addValue('password_hash', $password_hash);
	$dao->update();
	
	// send email
	require_once("lang/lang.$lang.php");
	$replaces = array('{#APPNAME}' => App::NAME, '{#PASSWORD}' => $password, '{#NAME}' => $user['name']);
	$title = strtr(Lang::PASSWORD_MAIL_TITLE, $replaces);
	$body = strtr(Lang::PASSWORD_MAIL_BODY, $replaces);
	mb_send_mail($email, $title, $body);
	
	respond(array('id' => $id));
	
} catch(Exception $e) {
	respondException($e);
}