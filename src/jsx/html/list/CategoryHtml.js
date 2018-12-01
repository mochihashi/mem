'use strict';
import * as container from 'html/Container';
import CardListHtml from 'html/common/CardListHtml';

export default function() {
	let div = $('#main-container');
	let userId = toInt(div.find('[name="user_id"]').val());
	let userName = div.find('.user').text();
	let userDir = div.find('.user').attr('href');
	let categoryName = div.find('.category').text();
	let categoryDir = div.find('.category').attr('href');

	div = container.renderMain(escapeTemplate`
<div class="page-header">
	<h1 class="page-title">${categoryName}</h1>
	<div class="d-flex align-items-center pt-5 col-12">
		<div class="avatar avatar-sm mr-2"><i class="fe fe-user"></i></div>
		<div>
			<a href="${userDir}" class="text-default">${userName}</a>
		</div>
	</div>
</div>
<div class="row" id="row-tables"></div>
	`);
	
	window.app.readJson(categoryDir, function(data){
		div.find('.page-title').text(data.name);
		let links = '';
		links += CardListHtml({list: data.categories, userId: userId});
		links += CardListHtml({list: data.tables, userId: userId});
		if(!links) links = `<span class="lang-msg-no-data"></span>`;
		div.find('#row-tables').html(links);
	});
}