<?php
/**
 * sign/up/
 */
require_once('../../api.php');

try {
	// validate
	require_once('common/Validator.php');
	$validator = new Validator($form);
	if(!$validator->validateField('name', array('required' => true))
	|| !$validator->validateField('email', array('required' => true, 'type' => 'email'))
	|| !$validator->validateField('password', array('required' => true, 'minLength' => 8))
	) respondErrors($validator->getErrors());
	
	// db validate
	require_once('config/db.php');
	require_once('common/Dao.php');
	$dao = new Dao($db, 'user');
	if(!$validator->validateUniqueField($dao, 'email')
	|| !$validator->validateUniqueField($dao, 'name')
	) respondErrors($validator->getErrors());
	
	// insert
	$user = array();
	$name = mapGet($form, 'name');
	$email = mapGet($form, 'email');
	$password = mapGet($form, 'password');
	$lang = mapGet($form, 'lang');
	require_once('common/Password.php');
	if(!$lang) $lang = 'en';
	$password_hash = Password::hashPassword($password);
	
	$dao->addValue('name', $name);
	$dao->addValue('email', $email);
	$dao->addValue('password_hash', $password_hash);
	$dao->addValue('lang', $lang);
	$dao->insert();
	$id = $dao->getLastInsertId();
	$user = array('id'=>$id, 'email'=>$email, 'password_hash'=>$password_hash);
	$key = Password::encodeActivateKey($user);
	
	// send email
	require_once("lang/lang.$lang.php");
	$url = App::URL . 'api/sign/activate/?key=' . $key;
	$replaces = array('{#APPNAME}' => App::NAME, '{#URL}' => $url, '{#NAME}' => $name);
	$title = strtr(Lang::ACTIVATE_MAIL_TITLE, $replaces);
	$body = strtr(Lang::ACTIVATE_MAIL_BODY, $replaces);
	mb_send_mail($email, $title, $body);
	
	respond(array('id' => $id));
	
} catch(Exception $e) {
	respondException($e);
}