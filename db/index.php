<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>Tables</title>
<style>
pre { border: 1px solid #ccc; padding:10px; }
h3 { padding:0; padding-top:10px; margin:0;font-size:medium;font-weight:bold;color:#a90; }
img { border:0;vertical-align:middle; }
</style>
</head>
<body>
<?php

$file = @$_GET['file'];

if(!$file) {
	print("<h1>Tables</h1>");
	// list
	function showDir($root) {
		$hDir = dir($root);
		while($filename = $hDir->read()) {
			if(substr($filename, 0, 1) == '.') continue;
			$filepath = $root . "/" . $filename;
			
			if(is_dir($filepath)) {
				print("<h3><img src='folder.png'> $filename</h3>\n");
				print("<div style='margin-left:20px;'>\n");
				showDir($filepath);
				print("</div>\n");
			} else {
				if(substr($filename, -4) != '.xml') continue;
				print("<img src='file.png'> $filename [<a href='$filepath'>desc</a>] [<a href='?file=$filepath'>code</a>]<br/>\n");
			}
		}
	}
	showDir(".");
	
} else {
	print("<h1>$file</h1>");
	// file
	$text = implode('', file($file));
	$map = simplexml_load_string($text, 'SimpleXMLElement', LIBXML_NOBLANKS);
	$map = obj2array($map);
	
	print("<h2>sql</h2>\n");
	print("<pre>" . htmlspecialchars(getSql($map)) . "</pre>");
	
	print("<h2>fields</h2>\n");
	print("<pre>" . htmlspecialchars(getFields($map)) . "</pre>");
	
}

function obj2array($object) {
	$arr = array();
	if(is_object($object)) {
		$object = get_object_vars($object);
	} else if(!is_array($object)) {
		return $object;
	}
	foreach($object as $k => $v) {
		$arr[$k] = obj2array($v);
	}
	if(count($arr) == 0) return null;
	return $arr;
}

function getFields(&$map) {
	$arr = array();
	foreach($map['columns']['column'] as $col) {
		if(!$col['field']) continue;
		$arr[] = $col['field'];
	}
	return implode("\n", $arr);
}

function getSql(&$map) {
	$buf = "CREATE TABLE " . $map['table']['name'] . " (\n";
	$lines = array();
	foreach($map['columns']['column'] as $col) {
		if(!$col['field']) continue;
		$arr = array();
		$arr[] = $col['field'];
		$arr[] = $col['type'];
		if(@$col['not-null']) $arr[] = 'NOT NULL';
		if(strlen(@$col['default'])>0) $arr[] = 'DEFAULT ' . $col['default'];
		if(@$col['extra']) $arr[] = $col['extra'];
		
		$lines[] = implode(' ', $arr);
	}
	
	if($map['primary-key']['column']) {
		$lines[] = 'PRIMARY KEY (' . $map['primary-key']['column'] . ')';
	}
	$keys = @$map['keys']['key'];
	if($keys) {
		if(@$keys['name']) $keys = array($keys);
		foreach($keys as $key) {
			if(!$key['name'] || !$key['column']) continue;
			$lines[] = 'KEY idx_' . $map['table']['name'] . '_' . $key['name'] . ' (' . $key['column'] . ')';
		}
	}
	
	$buf .= "\t" . implode(",\n\t", $lines);
	
	$buf .= "\n)";
	if(@$map['table']['engine']) $buf .= ' ENGINE=' . $map['table']['engine'];
	if(@$map['partition']) $buf .= "\n" . trim($map['partition']);
	$buf .= ";";
	return $buf;
}

?>
</body>
</html>