'use strict';
import * as container from 'html/Container';

export default function() {
	let div = $('#main-container');
	let userName = div.find('.user').text();
	let userDir = div.find('.user').attr('href');
	let categoryName = div.find('.category').text();
	let categoryDir = div.find('.category').attr('href');

	div = container.renderMain(`
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
	
	$.ajax({ url: categoryDir + 'index.json', type: "GET", dataType: "json", timeout: 10000
	}).done(function(data, textStatus, jqXHR) {
		div.find('.page-title').text(data.name);
		let links = '';
		for(let i in data.tables) {
			links += `
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