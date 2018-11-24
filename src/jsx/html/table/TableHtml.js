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
	let words = div.find('.words').text();
	let urlEsc = encodeURIComponent(document.URL);
	
	let list = new Table().parse(words);
	
	div = container.renderMain(`
<div class="row">
	<div class="col-lg-9">
		<div class="card">
			<div class="card-header">
				<h3 class="card-title">${title}</h3>
				<div class="card-options">
				<div class="btn-list">
					<a href="http://www.facebook.com/share.php?u=${urlEsc}" target="_blank" rel="nofollow" title="Facebook" class="btn btn-sm btn-icon btn-facebook"><i class="fa fa-facebook"></i></a>
					<a href="https://twiter.com/share?url=${urlEsc}" text="${title}" target="_blank" rel="nofollow" title="Twitter" class="btn btn-sm btn-icon btn-twitter"><i class="fa fa-twitter"></i></a>
				</div>
				</div>
			</div>
			<div class="card-body">
				<a href="${categoryDir}" class="text-default" id="a-category">${categoryName}</a>
				<div class="d-flex align-items-center pt-3">
					<div class="avatar avatar-sm mr-2"><i class="fe fe-user"></i></div>
					<div>
						<a href="${userDir}" class="text-default" id="a-user">${userName}</a>
					</div>
				</div>
				<div class="mt-5">${description}</div>
				<div class="btn-list mt-5">
					<button class="btn btn-primary btn-lg" name="btn-test"><i class="fe fe-play mr-2"></i><span class="lang-start-test"></span></button>
					<button class="btn btn-outline-primary" name="btn-edit"><i class="fe fe-edit mr-2"></i><span class="lang-edit"></span></button>
				</div>
				<div class="table-responsive mt-2">${getTableHtml(list)}</div>
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
	`);
	div.find('[name="btn-edit"]').click(()=>{TableEditHtml({
		title: title, words: words, description: description, category: categoryName, isPrivate: isPrivate, tableId: tableId
	}); return false;});
	if(!list) div.find('[name="btn-test"]').hide();
	div.find('[name="btn-test"]').click(()=>{TableTestHtml({
		title: title, list: list
	}); return false;});
	if(!categoryId) {
		div.find('#a-category').hide();
		div.find('#nav-category').hide();
	} else {
		$.ajax({ url: categoryDir + 'index.json', type: "GET", dataType: "json", timeout: 10000
		}).done(function(data, textStatus, jqXHR) {
			div.find('#a-category').text(data.name);
			let nav = `<h4><a href="${categoryDir}">${data.name}</a></h4>
			<div class="list-group list-group-transparent mb-0">`;
			for(let i in data.tables) {
				let active = (data.tables[i].id == tableId ? ' active' : '');
				nav += `<a href="${data.tables[i].url}" class="list-group-item list-group-item-action${active}">
				${data.tables[i].name}</a>`;
			}
			nav += `</div>`;
			div.find('#nav-category').html(nav);
		});
	}
	$.ajax({ url: userDir + 'index.json', type: "GET", dataType: "json", timeout: 10000
	}).done(function(data, textStatus, jqXHR) {
		div.find('#a-user').text(data.name);
		let nav = `<h4><a href="${userDir}">${data.name}</a></h4>
		<div class="list-group list-group-transparent mb-0">`;
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
		nav += `</div>`;
		div.find('#nav-user').html(nav);
	});
	
}

function getTableHtml(list) {
	if(!list) return '';
	let table = '<table class="table mb-0 table-bordered">';
	for(let r = 0; r < list.length; r++) {
		if(r == 0) table += '<thead class="thead-light">';
		let row = list[r];
		let td = (r == 0 ? 'th' : 'td');
		table += '<tr>';
		for(let c = 0; c < row.length; c++) {
			table += `<${td}>${escapeHtml(row[c])}</${td}>`;
		}
		table += '</tr>';
		if(r == 0) table += '</thead>';
	}
	table += '</table>';
	return table;
}