'use strict';
import * as container from 'html/Container';
import Table from 'common/Table';
import InputForm from 'common/InputForm';
import SignInHtml from 'html/account/SignInHtml';
import TableTestHtml from 'html/table/TableTestHtml';

export default function({title, words, description, category, isPublic, tableId}) {
	let isPrivate = !isPublic;
	if(!words) words = `English,Spanish
Hello,Hola
Good morning,Buenos días
Goodbye,Adiós
Thank you,Gracias
Sorry,Lo siento
I don't know,No lo sé`;

	let div = container.renderOverlay('edit', escapeTemplate`
<div class="row">
	<div class="col-12">
		<form class="card" action="api/table/save/">
			<input type="hidden" name="table_id" value="${tableId}" />
			<div class="card-header">
				<div class="form-group col-10 mb-0">
				<input type="text" name="title" class="form-control" value="${title}" placeholder="Title" maxlength="100" />
				</div>
				<div class="card-options">
					<a href="javascript:void(0)" class="card-options-remove" data-toggle="card-remove"><i class="fe fe-x"></i></a>
				</div>
			</div>
			<div class="card-body">
				<div class="dimmer"><div class="loader"></div><div class="dimmer-content">
				<div class="btn-list">
					<button name="btn-test" class="btn btn-primary btn-lg"><i class="fe fe-play mr-2"></i><span class="lang-start-test"></span></button>
				</div>
				<div class="form-group mt-2">
					<textarea rows="9" name="words" class="form-control">${{raw:words}}</textarea>
				</div>
				<div class="row">
					<div class="col-md-6">
						<div class="form-group">
							<label class="form-label"><span class="lang-description"></span></label>
							<textarea name="description" rows="3" class="form-control">${description}</textarea>
						</div>
					</div>
					<div class="col-md-6 col-lg-3">
						<div class="form-group">
							<label class="form-label"><i class="fe fe-folder"></i> <span class="lang-category"></span></label>
							<div class="input-group">
								<input type="text" name="category" class="form-control" value="${category}" maxlength="100">
							</div>
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
				<button type="submit" class="btn btn-primary"><i class="fe fe-save mr-2"></i><span class="lang-save"></span></button>
				<label class="custom-control custom-checkbox ml-3" name="control-overwrite">
					<input type="checkbox" class="custom-control-input" name="overwrite" value="1" ${tableId ? 'checked' : ''}>
					<span class="custom-control-label"><span class="lang-overwrite"></span></span>
				</label>
			</div>
		</form><!-- .card -->
	</div><!-- .col-12 -->
</div><!-- .row -->
	`);
	
	let obj = div.find('[name="words"]');
	obj[0].setSelectionRange(0, obj.text().length); obj.focus();
	obj.keydown(function(e){
		if(e.keyCode == 9) { // tab
			e.preventDefault();
			var p1 = this.selectionStart, p2 = this.selectionEnd;
			this.value = this.value.substr(0, p1) + "\t" + this.value.substr(p2);
			this.setSelectionRange(p1 + 1, p1 + 1);
		}
	});
	
	if(!tableId) div.find('[name="control-overwrite"]').hide();
	
	let inputForm = new InputForm();
	inputForm.assign({form: div.find('form'), fields: {
		title: {required: true},
		words: {required: true}
	}, validate: function(form) {
		let text = div.find('[name="words"]').val();
		let list = new Table().parse(words, inputForm);
		if(!list) return false;
		if(!window.app.cookies.get('auth')) {
			SignInHtml();
			return false;
		}
		return true;
	}, callback: function(data) {
		if(data.table_path) window.app.goto({url: data.table_path, cb: true, post: true});
	}, confirmMessage: 'save?'});
	
	div.find('[name="btn-test"]').click((event)=>{
		event.preventDefault(); event.stopPropagation();
		let title = div.find('[name="title"]').val();
		let words = div.find('[name="words"]').val();
		let list = new Table().parse(words, inputForm);
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
<div class="input-group-append">
	<button data-toggle="dropdown" type="button" class="btn btn-secondary dropdown-toggle"></button>
	<div class="dropdown-menu dropdown-menu-right">${links}</div>
</div>
					`);
				}
				
			}
		});
	}
}
