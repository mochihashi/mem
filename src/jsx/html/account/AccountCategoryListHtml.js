'use strict';
import * as container from 'html/Container';
import InputForm from 'common/InputForm';
import AccountTableListHtml from 'html/account/AccountTableListHtml';
import AccountCategoryEditHtml from 'html/account/AccountCategoryEditHtml';

export default function({categoryId = 0}) {
	let div = container.renderOverlay('account_category_list', escapeTemplate`
<div class="page-body">
  <div class="row row-cards">
	<div class="col col-lg-9 mx-auto">
		<form class="card">
			<div class="card-header">
				<h3 class="card-title"><span class="lang-categories"></span></h3>
				<div class="card-options">
					<a href="javascript:void(0)" class="card-options-remove" data-toggle="card-remove"><i data-feather="x" class="icon"></i></a>
				</div>
			</div>
			<div class="card-body">
				<div class="dimmer"><div class="loader"></div><div class="dimmer-content">
				<div class="btn-list">
					<button class="btn btn-primary" data-control="create"><i data-feather="plus-circle" class="icon"></i> <span class="lang-create"></span></button>
				</div>
				<div class="table-responsive mt-2">
					<table class="table mb-0 table-hover">
						<thead>
							<tr>
								<th><span class="lang-category"></span></th>
								<th><span class="lang-parent-category"></span></th>
								<th></th>
							</tr>
						</thead>
						<tbody></tbody>
					</table>
				</div><!-- .table-responsive -->
				</div></div>
			</div><!-- .card-body -->
		</form><!-- .card -->
	</div>
  </div>
</div>
	`);
	
	if(!window.app.account.dir) return;
	
	div.find('[data-control="create"]').click(function(event){
		AccountCategoryEditHtml({callback: function(){ setTable(div); }});
		return false;
	});
	
	setTable(div);
}

function setTable(div) {
	window.app.readJson(window.app.account.dir, function(data){
		let html = '';
		for(let i in data.categories) {
			let row = data.categories[i];
			
			html += `
<tr>
	<td>${row.name}</td>
	<td>${row.parent_id > 0 ? data.categories[row.parent_id].name : ''}</td>
	<td>
		<div class="btn-list">
		<a class="btn btn-outline-secondary" href="${row.url}"><i data-feather="external-link" class="icon"></i> <span class="lang-view"></span></a>
		<button class="btn btn-outline-secondary" data-control="table" data-id="${row.id}"><i data-feather="grid" class="icon"></i> <span class="lang-table"></span></button>
		<button class="btn btn-outline-primary" data-control="edit" data-id="${row.id}"><i data-feather="edit" class="icon"></i> <span class="lang-edit"></span></button>
		<button class="btn btn-outline-danger" data-control="delete" data-id="${row.id}"><i data-feather="delete" class="icon"></i> <span class="lang-delete"></span></button>
		</div>
	</td>
</tr>
			`;
		}
		let inputForm = new InputForm();
		inputForm.assign({form: div.find('form')});
		
		div.find('table.table tbody').html(html);
		div.find('table.table tbody [data-control="delete"]').click(function(event){
			if(!confirm(window.app.lang.getText('delete?'))) return false;
			let id = $(this).attr('data-id');
			window.app.readJson('api/category/delete/', function(data){
				setTable(div);
			}, {'id': id}, inputForm);
			return false;
		});
		div.find('table.table tbody [data-control="table"]').click(function(event){
			let id = parseInt($(this).attr('data-id'));
			AccountTableListHtml({categoryId: id});
			return false;
		});
		div.find('table.table tbody [data-control="edit"]').click(function(event){
			let id = parseInt($(this).attr('data-id'));
			let category = data.categories[id];
			AccountCategoryEditHtml({id: id, name: category.name, parentId: category.parent_id,
			callback: function(){ setTable(div); }});
			return false;
		});
	});
}
