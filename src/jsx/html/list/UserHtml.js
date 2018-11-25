'use strict';
import * as container from 'html/Container';

export default function() {
	let div = $('#main-container');
	let userId = toInt(div.find('[name="user_id"]').val());
	let userName = div.find('.user').text();
	let userDir = div.find('.user').attr('href');

	div = container.renderMain(escapeTemplate`
<div class="page-header">
	<h1 class="page-title">
		<div class="d-flex align-items-center pt-3">
			<div class="avatar avatar-sm mr-2"><i class="fe fe-user"></i></div>
			<div>
				<a href="${userDir}" class="text-default" id="a-user">${userName}</a>
			</div>
		</div>
	</h1>
</div>
<div class="row" id="row-tables"></div>
	`);
	
	window.app.readJson(userDir, function(data){
		div.find('#a-user').text(data.name);
		let links = '';
		for(let i in data.categories) {
			if(data.categories[i].parent_id > 0) continue;
			links += escapeTemplate`
<div class="col-md-6 col-lg-4 col-xl-3">
	<div class="card">
		<div class="card-header">
			<h3 class="card-title"><a href="${data.categories[i].url}">${data.categories[i].name}</a></h3>
		</div>
	</div>
</div>
			`;
		}
		for(let i in data.tables) {
			if(data.tables[i].private && userId != window.app.account.id) continue;
			links += escapeTemplate`
<div class="col-md-6 col-lg-4 col-xl-3">
	<div class="card">
		<div class="card-header">
			<h3 class="card-title"><a href="${data.tables[i].url}">${data.tables[i].name}</a></h3>
		</div>
		<div class="card-body d-flex flex-column">
			<div class="text-muted">${data.tables[i].description}</div>
		</div>
	</div>
</div>
			`;
		}
		if(!links) links = `<span class="lang-msg-no-data"></span>`;
		div.find('#row-tables').html(links);
	});
}