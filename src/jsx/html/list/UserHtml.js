'use strict';
import * as container from 'html/Container';
import CardListHtml from 'html/common/CardListHtml';

export default function() {
	let div = $('#main-container');
	let userId = toInt(div.find('[name="user_id"]').val());
	let userName = div.find('.user').text();
	let userDir = div.find('.user').attr('href');

	div = container.renderMain(escapeTemplate`
<div class="page-header">
	<h1 class="page-title">
		<div class="d-flex align-items-center pt-3">
			<div class="avatar avatar-sm me-2"><i data-feather="user" class="icon"></i></div>
			<div>
				<a href="${userDir}" class="text-default" id="a-user">${userName}</a>
			</div>
		</div>
	</h1>
</div>
<div class="page-body">
  <div class="row row-cards" id="row-tables"></div>
</div>
	`);
	
	window.app.readJson(userDir, function(data){
		div.find('#a-user').text(data.name);
		let links = '';
		let parentMap = {};
		for(let i in data.categories) {
			let parent = data.categories[i].parent_id;
			if(parent > 0) {
				if(!parentMap[parent]) parentMap[parent] = [];
				parentMap[parent].push(data.categories[i]);
			}
		}
		for(let i in data.categories) {
			if(data.categories[i].parent_id > 0) continue;
			links += `
<div class="col-md-6 col-lg-4">
	${nestedCard(data.categories[i], parentMap)}
</div>
			`;
		}
		links += CardListHtml({list: data.tables, userId: userId});
		if(!links) links = `<span class="lang-msg-no-data"></span>`;
		div.find('#row-tables').html(links).addClass('row-cards');
	});
}

function nestedCard(category, parentMap) {
	let childrenHtml = '';
	let children = parentMap[category.id];
	if(children) {
		for(let c in children) {
			childrenHtml += nestedCard(children[c], parentMap);
		}
		childrenHtml = `<div class="card-body d-flex flex-column"><div class="row row-cards">${childrenHtml}</div></div>`;
	}
	return `
	<div class="col-12"><div class="card card-stacked">
		<div class="card-header">
			<h3 class="card-title"><a href="${category.url}">${category.name}</a></h3>
		</div>
		${childrenHtml}
	</div></div>
	`;
}