'use strict';
import * as container from 'html/Container';
import InputForm from 'common/InputForm';

export default function({id, parentId, name, callback}) {
	let div = container.renderOverlay('account_category_edit', escapeTemplate`
<div class="row">
	<div class="col col-login mx-auto">
		<form class="card" action="api/category/save/">
			<input type="hidden" name="id" value="${id}" />
			<div class="card-header">
				<h3 class="card-title"><span class="lang-category"></span></h3>
				<div class="card-options">
					<a href="javascript:void(0)" class="card-options-remove" data-toggle="card-remove"><i class="fe fe-x"></i></a>
				</div>
			</div>
			<div class="card-body p-6">
				<div class="dimmer"><div class="loader"></div><div class="dimmer-content">
				<div class="form-group">
					<label class="form-label"><span class="lang-category"></span></label>
					<input type="text" class="form-control" name="name" placeholder="Name" value="${name}">
				</div>
				<div class="form-group">
					<label class="form-label"><span class="lang-parent-category"></span></label>
					<select class="form-control custom-select w-auto mr-2" name="parent_id"></select>
				</div>
				<div class="form-footer">
					<button type="submit" class="btn btn-primary"><i class="fe fe-save mr-2"></i><span class="lang-save"></span></button>
				</div>
				</div></div>
			</div>
		</form>
	</div><!-- .col-login -->
</div><!-- .row -->
	`);
	div.find('[name="name"]').focus();
	let inputForm = new InputForm();
	inputForm.assign({form: div.find('form'), fields: {
		name: {required: true}
	}, callback: function(data){
		container.closeOverlay('account_category_edit');
		if(callback) callback();
	}, confirmMessage: 'save?'});
	
	window.app.readJson(window.app.account.dir, function(data){
		let map = {};
		map[0] = '-';
		for(let i in data.categories) {
			let category = data.categories[i];
			if(id) {
				if(category.id == id || category.parent_id == id) continue;
			}
			map[category.id] = category.name;
		}
		div.find('[name="parent_id"]').setSelectOption(map, parentId);
	});
}
