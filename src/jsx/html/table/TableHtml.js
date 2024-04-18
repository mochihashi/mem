'use strict';
import * as container from 'html/Container';
import Table from 'common/Table';
import TableEditHtml from 'html/table/TableEditHtml';
import TableTestHtml from 'html/table/TableTestHtml';

export default function() {
	let div = $('#main-container');
	let userId = div.find('[name="user_id"]').val();
	let userName = div.find('.user').text();
	let userDir = div.find('.user').attr('href');
	let categoryId = div.find('[name="category_id"]').val();
	let categoryName = div.find('.category').text();
	let categoryDir = div.find('.category').attr('href');
	let tableId = div.find('[name="table_id"]').val();
	let isPrivate = parseInt(div.find('[name="private"]').val());
	let title = div.find('.title').text();
	let description = div.find('.description').text();
	let imageFile = div.find('[name="image_file"]').val();
	let words = div.find('.words').text();
	let urlEsc = encodeURIComponent(document.URL);
	let isMe = (userId == window.app.account.id);
	let list = new Table().parse(words);
	
	let image = `<div></div>`;
	if(imageFile) {
		image = `<div class="img-responsive img-responsive-21x9 card-img-top" style="background-image: url(${imageFile})"></div>`;
	}
	
	div = container.renderMain(escapeTemplate`
<div class="page-body">
  <div class="row row-cards">
	<div class="col-lg-9">
		<div class="card">${{raw:image}}
			<div class="card-header">
				<h3 class="card-title">${title}</h3>
				<div class="card-options">
				<div class="btn-list">
				</div>
				</div>
			</div>
			<div class="card-body">
				<a href="${categoryDir}" class="text-default" id="a-category">${categoryName}</a>
				<div class="d-flex align-items-center pt-3">
					<div class="avatar avatar-sm me-2"><i data-feather="user" class="icon"></i></div>
					<div>
						<a href="${userDir}" class="text-default" id="a-user">${userName}</a>
					</div>
				</div>
				<div class="mt-5">${description}</div>
				<div class="btn-list mt-5">
					<button class="btn btn-primary" name="btn-test"><i data-feather="play" class="icon"></i> <span class="lang-start-test"></span></button>
					<button class="btn btn-outline-primary" name="btn-edit"><i data-feather="edit" class="icon"></i> <span class="lang-edit"></span></button>
				</div>
				<div class="table-responsive mt-2">${{raw:getTableHtml(list)}}</div>
			</div>
		</div>
	</div>
	<div class="col-lg-3">
		<div class="row">
			<div class="col-md-6 col-lg-12 mb-5" id="nav-category"></div>
			<div class="col-md-6 col-lg-12 mb-5" id="nav-user"></div>
		</div>
	</div>
  </div>
</div>
	`);
	
	
	if(!list) {
		div.find('[name="btn-edit"]').hide();
		div.find('[name="btn-test"]').hide();
	} else {
		div.find('[name="btn-edit"]').click(()=>{TableEditHtml({
			title: title, words: words, description: description, category: categoryName,
			isPublic: (isMe ? !isPrivate : false), tableId: (isMe ? tableId : 0), imageFile: imageFile
		}); return false;});
		div.find('[name="btn-test"]').click(()=>{TableTestHtml({
			title: title, list: list
		}); return false;});
	}
	
	if(!categoryId) {
		div.find('#a-category').hide();
		div.find('#nav-category').hide();
	} else {
		window.app.readJson(categoryDir, function(data){
			div.find('#a-category').text(data.name);
			let nav = `<div class="card">
			<div class="card-header"><h3 class="card-title"><a href="${categoryDir}"><i data-feather="folder" class="icon"></i> ${data.name}</a></h3></div>
			<div class="list-group list-group-flush">`;
			for(let i in data.categories) {
				let active = (data.categories[i].id == categoryId ? ' active' : '');
				nav += `<a href="${data.categories[i].url}" class="list-group-item list-group-item-action${active}">
				${data.categories[i].name}</a>`;
			}
			for(let i in data.tables) {
				let active = (data.tables[i].id == tableId ? ' active' : '');
				nav += `<a href="${data.tables[i].url}" class="list-group-item list-group-item-action${active}">
				${data.tables[i].name}</a>`;
			}
			nav += `</div>
			</div>`;
			div.find('#nav-category').html(nav);
		});
	}
	
	window.app.readJson(userDir, function(data){
		div.find('#a-user').text(data.name);
		let nav = `<div class="card">
		<div class="card-header"><h3 class="card-title"><a href="${userDir}"><i data-feather="user" class="icon"></i> ${data.name}</a></h3></div>
		<div class="list-group list-group-flush">`;
		for(let i in data.categories) {
			if(data.categories[i].parent_id > 0) continue;
			let active = (data.categories[i].id == categoryId ? ' active' : '');
			nav += `<a href="${data.categories[i].url}" class="list-group-item list-group-item-action${active}">
			${data.categories[i].name}</a>`;
		}
		for(let i in data.tables) {
			let active = (data.tables[i].id == tableId ? ' active' : '');
			nav += `<a href="${data.tables[i].url}" class="list-group-item list-group-item-action${active}">
			${data.tables[i].name}</a>`;
		}
		nav += `</div>
		</div>`;
		div.find('#nav-user').html(nav);
	});
}

function getTableHtml(list) {
	if(!list) return '';
	let table = '<table class="table mb-0 table-bordered">';
	let headCols = 0;
	for(let r = 0; r < list.length; r++) {
		if(r == 0) table += '<thead class="thead-light">';
		let row = list[r];
		let td = (r == 0 ? 'th' : 'td');
		table += '<tr>';
		if(r == 0) headCols = row.length;
		let cols = Math.max(headCols, row.length);
		for(let c = 0; c < cols; c++) {
			let value = (c < row.length ? row[c] : '');
			table += `<${td}>${value}</${td}>`;
		}
		table += '</tr>';
		if(r == 0) table += '</thead>';
	}
	table += '</table>';
	return table;
}