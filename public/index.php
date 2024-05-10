<?php
require_once('api/api.php');

$tables = array();
$categories = array();
try {
	require_once('config/db.php');
	require_once('common/Dao.php');
	require_once('common/DataFile.php');
	$data = new DataFile();
	
	$dao = new Dao($db, 'category');
	$categories = $dao->addOrderDesc('id')->setLimit(60)
	->addWhere('private', 0)
	->addSelect('id')->addSelect('name')
	->addSelect('user_id')->addSelectAs('(select u.name from user u where u.id=user_id)', 'user_name')
	->select();
	$data->setUrlToCategoryList($categories);
	$data->setUserUrlToList($categories);
	
	$dao = new Dao($db, 'word_table');
	$tables = $dao
	->addOrderDesc('has_image')->addOrderDesc('id')->setLimit(60)
	->addWhere('private', 0)
	->addSelect('id')->addSelect('name')->addSelect('description')->addSelect('image_file')
	->addSelect('category_id')->addSelectAs('(select c.name from category c where c.id=category_id)', 'category_name')
	->addSelect('user_id')->addSelectAs('(select u.name from user u where u.id=user_id)', 'user_name')
	->addSelectAs("(case when image_file is null or image_file='' then 0 else 1 end)", 'has_image')
	->select();
	$data->setUrlToTableList($tables);
	$data->setUserUrlToList($tables);
	
} catch(Exception $e) {}


function getCardListHtml($list, $userId = 0, $isCategory = false) {
    $html = '';
    foreach($list as $row) {
        $body = '';
        if(@$row['description']) $body .= '<div class="text-muted pb-2">' . $row['description'] . '</div>';
        if(@$row['category_url']) {
            $body .= '<div><a href="' . $row['category_url'] . '">' . $row['category_name'] . '</a></div>';
        }
        if(!$userId && @$row['user_url']) {
            $body .= '<div><a href="' . $row['user_url'] . '" class="text-muted">@' . $row['user_name'] . '</a></div>';
        }
        if($body) $body = '<div class="card-body d-flex flex-column">' . $body . '</div>';
        $image = '';
        if(@$row['image_file']) {
            $image = '<div class="img-responsive img-responsive-21x9 card-img-top" style="background-image: url(' . $row['url'] . $row['image_file'] . ')"></div>';
        }
        $html .= 
'<div class="col-md-6 col-lg-3">
	<div class="card' . ($isCategory ? ' card-stacked' : '') . '">' . $image . '
		<div class="card-header">
			<h3 class="card-title"><a href="' . $row['url'] . '">' . $row['name'] . '</a></h3>
		</div>
		' . $body . '
	</div>
</div>';
    }
    return $html;
}
?>
<!doctype html>
<html lang="en" dir="ltr">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	<link rel="icon" href="favicon.ico" type="image/x-icon"/>
	<title>memorize words</title>
	<meta name="description" content="A free tool that helps you to memorize words or something. Input words list, then random questions and answers will be automatically generated.">
	<script src="https://mochihashi.github.io/static/js/jquery.min.js"></script>
	<script src="https://mochihashi.github.io/static/js/csv.min.js"></script>
	<script src="js/script.js"></script>
</head>
<body>

<div class="page">
<div class="page-main">
<div class="header"></div>

<div class="page-wrapper">
	<div class="container" id="main-container">
<input type="hidden" name="page_type" value="top" />
		<div class="page-header">
			<div class="row g-2 align-items-center">
        		<div class="col">
        			<h1 class="page-title"><i data-feather="file" class="icon"></i> <span class="lang-tables"></span></h1>
                </div>
                <div class="col-auto ms-auto d-print-none">
                    <div class="input-icon">
                        <span class="input-icon-addon"><i data-feather="search" class="icon"></i></span>
    					<input type="text" class="form-control w-10 search-text" id="search-text">
                    </div>
    			</div>
    		</div>
		</div><!-- .page-header -->
		<div class="page-body">
		<div class="row row-cards" id="row-tables">
<?php
if(count($tables) == 0) {
    echo '<span class="lang-msg-no-data"></span>';
} else {
    echo getCardListHtml($tables);
}
?>
		</div><!-- .row -->
		</div><!-- .page-body -->
		<div class="page-header">
			<h1 class="page-title"><i data-feather="folder" class="icon"></i> <span class="lang-categories"></span></h1>
		</div><!-- .page-header -->
		<div class="page-body">
		
		<div class="row row-cards" id="row-categories">
<?php
if(count($categories) == 0) {
    echo '<span class="lang-msg-no-data"></span>';
} else {
    echo getCardListHtml($categories, 0, true);
}
?>
		</div><!-- .row -->
		</div><!-- .page-body -->
	</div><!-- .container -->
</div><!-- .my-3 -->

</div><!-- .page-main -->

<footer class="footer"></footer>

</div><!-- .page -->

</body>
</html>