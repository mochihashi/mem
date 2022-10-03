<?php
/**
 * create_top.php dir=/var/www/html/data/top/
 */
chdir(dirname(__FILE__));
require_once('../job.php');
require_once('config/db.php');
require_once('common/Dao.php');
require_once('common/DataFile.php');

$dir = $form['dir'];

$data = new DataFile();
$map = array();

$dao = new Dao($db, 'category');
$categories = $dao->addOrderDesc('id')->setLimit(60)
->addWhere('private', 0)
->addSelect('id')->addSelect('name')
->addSelect('user_id')->addSelectAs('(select u.name from user u where u.id=user_id)', 'user_name')
->select();
$data->setUrlToCategoryList($categories);
$data->setUserUrlToList($categories);
$map['categories'] = rows2map($categories, 'id');

$dao = new Dao($db, 'word_table');
$tables = $dao->addOrderDesc('id')->setLimit(60)
->addWhere('private', 0)
->addSelect('id')->addSelect('name')->addSelect('description')
->addSelect('category_id')->addSelectAs('(select c.name from category c where c.id=category_id)', 'category_name')
->addSelect('user_id')->addSelectAs('(select u.name from user u where u.id=user_id)', 'user_name')
->select();
$data->setUrlToTableList($tables);
$data->setUserUrlToList($tables);
$map['tables'] = rows2map($tables, 'id');

$data->writeJson($dir, $map);
