<?php
$db = new PDO('mysql:host=localhost;dbname=mem;charset=utf8', 'app', 'app01');
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);