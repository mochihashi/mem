'use strict';
import * as container from 'html/Container';
import InputForm from 'common/InputForm';

export default function({categoryId = 0}) {
	let div = container.renderOverlay('account_table_list', escapeTemplate`
<div class="row">
	<div class="col col-lg-9 mx-auto">
		<form class="card">
			<div class="card-header">
				<h3 class="card-title"><span class="lang-tables"></span></h3>
				<div class="card-options">
					<a href="javascript:void(0)" class="card-options-remove" data-toggle="card-remove"><i class="fe fe-x"></i></a>
				</div>
			</div>
			<div class="card-body">
				<div class="dimmer"><div class="loader"></div><div class="dimmer-content">
				<div class="form-group">
					<label class="form-label"><span class="lang-category"></span></label>
					<select class="form-control custom-select w-auto mr-2" name="select-category"></select>
				</div>
				<div class="table-responsive mt-2">
					<table class="table mb-0 table-hover">
						<thead>
							<tr>
								<th><span class="lang-table"></span></th>
								<th></th>
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
	`);
	
	if(!window.app.account.dir) return;
	
	let accountData = {};
	
	window.app.readJson(window.app.account.dir, function(data){
		accountData = data;
		let map = {};
		map[0] = '-';
		for(let i in data.categories) {
			map[data.categories[i].id] = data.categories[i].name;
		}
		div.find('[name="select-category"]').setSelectOption(map, categoryId);
		div.find('[name="select-category"]').change(function(){
			changeCategory(div, accountData, parseInt($('option:selected', this).val()));
		});
		changeCategory(div, accountData, categoryId);
	});
}

function changeCategory(div, accountData, categoryId) {
	if(categoryId > 0) {
		let categoryDir = null;
		if(accountData.categories && accountData.categories[categoryId]) categoryDir = accountData.categories[categoryId].url;
		if(categoryDir) {
			window.app.readJson(categoryDir, function(data){
				setTable(div, accountData, data.tables, categoryId);
			});
		}
	} else {
		setTable(div, accountData, accountData.tables, categoryId);
	}
}

function setTable(div, accountData, tables, categoryId) {
	let html = '';
	if(tables) {
		for(let i in tables) {
			html += `
<tr>
	<td>${tables[i].name}</td>
	<td>${tables[i].private ? '<span class="lang-private"></span>' : ''}</td>
	<td>
		<div class="btn-list">
		<a class="btn btn-outline-secondary" href="${tables[i].url}"><i class="fe fe-external-link mr-2"></i><span class="lang-view"></span></a>
		<button class="btn btn-outline-danger" data-control="delete" data-id="${tables[i].id}"><i class="fe fe-delete mr-2"></i><span class="lang-delete"></span></button>
		</div>
	</td>
</tr>
			`;
		}
	}
	
	let inputForm = new InputForm();
	inputForm.assign({form: div.find('form')});
	
	div.find('table.table tbody').html(html);
	div.find('table.table tbody [data-control="delete"]').click(function(event){
		if(!confirm(window.app.lang.getText('delete?'))) return false;
		let tableId = $(this).attr('data-id');
		window.app.readJson('api/table/delete/', function(data){
			changeCategory(div, accountData, categoryId);
		}, {'id': tableId}, inputForm);
		return false;
	});
}
