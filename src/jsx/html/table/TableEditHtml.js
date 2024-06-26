'use strict';
import * as container from 'html/Container';
import Table from 'common/Table';
import InputForm from 'common/InputForm';
import SignInHtml from 'html/account/SignInHtml';
import TableTestHtml from 'html/table/TableTestHtml';

export default function({title, words, description, category, isPublic, tableId, imageFile}) {
	let isPrivate = !isPublic;
	if(!words) words = `English,Spanish
Hello,Hola
Good morning,Buenos días
Goodbye,Adiós
Thank you,Gracias
Sorry,Lo siento
I don't know,No lo sé`;

	let div = container.renderOverlay('edit', escapeTemplate`
<div class="page-body">
  <div class="row row-cards">
	<div class="col-12">
		<form class="card" action="api/table/save/">
			<input type="hidden" name="table_id" value="${tableId}" />
			<div class="card-header">
				<div class="form-group col-10 mb-0">
				<input type="text" name="title" class="form-control" value="${title}" placeholder="Title" maxlength="100" />
				</div>
				<div class="card-options">
					<a href="javascript:void(0)" class="card-options-remove" data-toggle="card-remove"><i data-feather="x" class="icon"></i></a>
				</div>
			</div>
			<div class="card-body">
				<div class="dimmer"><div class="loader"></div><div class="dimmer-content">
				<div class="btn-list">
					<button name="btn-test" class="btn btn-primary"><i data-feather="play" class="icon"></i> <span class="lang-start-test"></span></button>
				</div>
				<div class="form-group mt-2">
					<div class="lang-msg-1st-row-is-title"></div>
					<div name="jexcel" style="width:100%;overflow-x:auto;"></div>
					<input type="hidden" name="words" value="">
				</div>
				<div class="row">
					<div class="col-md-6 col-lg-3">
						<div class="form-group">
							<label class="form-label"><span class="lang-description"></span></label>
							<textarea name="description" rows="3" class="form-control">${description}</textarea>
						</div>
					</div>
					<div class="col-md-6 col-lg-3">
						<div class="form-group">
							<label class="form-label"><i data-feather="folder" class="icon"></i> <span class="lang-category"></span></label>
							<div class="input-group">
								<input type="text" name="category" class="form-control" value="${category}" maxlength="100">
							</div>
						</div>
					</div>
					<div class="col-md-6 col-lg-3">
						<div class="form-group">
							<label class="form-label"><span class="lang-image-file"></span></label>
							<input name="image_file" type="file" class="form-control" />
						</div>
					</div>
					<div class="col-md-6 col-lg-3">
						<div class="form-group">
							<label class="form-label"><span class="lang-option"></span></label>
							<label class="custom-switch">
								<input type="checkbox" class="custom-switch-input" name="private" value="1" ${isPrivate ? 'checked' : ''}>
								<span class="custom-switch-indicator"></span>
								<span class="custom-switch-description"><span class="lang-private"></span></span>
							</label>
						</div>
					</div>
				</div>
				</div></div>
			</div><!-- .card-body -->
			<div class="card-footer d-flex align-items-center">
				<button type="submit" class="btn btn-primary"><i data-feather="save" class="icon"></i> <span class="lang-save"></span></button>
				<label class="custom-control custom-checkbox ms-3" name="control-overwrite">
					<input type="checkbox" class="custom-control-input" name="overwrite" value="1" ${tableId ? 'checked' : ''}>
					<span class="custom-control-label"><span class="lang-overwrite"></span></span>
				</label>
			</div>
		</form><!-- .card -->
	</div><!-- .col-12 -->
  </div><!-- .row -->
</div>
	`);
	
	let obj = div.find('[name="jexcel"]');
	let list = new Table().parse(words, null, false);
	let columns = [];
	if(!list) list = [['question', 'answer']];
	for(let i = 0; i < list[0].length; i++) {
		columns.push({ type: 'text', width: 200 });
	}
	let jexcel = jspreadsheet(obj[0], {
	    data: list, columns: columns
	});
	if(list[list.length - 1][0]) jexcel.insertRow();
	
	if(!tableId) div.find('[name="control-overwrite"]').hide();
	
	let inputForm = new InputForm();
	inputForm.assign({form: div.find('form'), fields: {
		title: {required: true}
	}, validate: function(form) {
		list = new Table().validate(jexcel.getData(), inputForm, false);
		if(!list) return false;
		if(!window.app.cookies.get('auth')) {
			SignInHtml();
			return false;
		}
		div.find('[name="words"]').val(new Table().array2text(list));
		return true;
	}, callback: function(data) {
		if(data.table_path) window.app.goto({url: data.table_path, cb: true, post: true});
	}, confirmMessage: 'save?'});
	
	div.find('[name="btn-test"]').click((event)=>{
		event.preventDefault(); event.stopPropagation();
		let title = div.find('[name="title"]').val();
		let list = new Table().validate(jexcel.getData(), inputForm);
		if(!list) return;
		TableTestHtml({title: title, list: list});
	});
	
	if(window.app.account && window.app.account.dir) {
		window.app.readJson(window.app.account.dir, function(data){
			if(data.categories) {
				let links = '';
				for(let i in data.categories) {
					let name = data.categories[i].name;
					links += `<a class="dropdown-item" href="javascript:void(0);" onclick="$(this).parent().parent().parent().find('input').val('${name}');">${name}</a>`;
				}
				if(links) {
					div.find('[name="category"]').parent().append(`
<button data-bs-toggle="dropdown" type="button" class="btn dropdown-toggle dropdown-toggle-split"></button>
<div class="dropdown-menu dropdown-menu-end">
${links}
</div>
					`);
				}
				
			}
		});
	}
}
