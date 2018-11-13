<?php
require_once('../job.php');
require_once('config/db.php');
$db->exec("DELETE FROM user WHERE active = 0 AND create_time < date_add(now(), interval -1 day)");
