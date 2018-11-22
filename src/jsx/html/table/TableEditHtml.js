'use strict';
import * as html from 'html/Html';
import InputForm from 'common/InputForm';
import SignInHtml from 'html/sign/SignInHtml';

export default function({title, words, description, category, isPrivate, tableId}) {
	if(!words) words = `English	Spanish
Hello	Hola
Good morning	Buenos días
Goodbye	Adiós
Thank you	Gracias
Sorry	Lo siento
I don't know	No lo sé`;

	let div = html.renderOverlay('edit', `
<div class="row">
	<div class="col-12">
		<form class="card" action="api/table/save/">
			<div class="card-header">
				<div class="form-group col-10 mb-0">
				<input type="text" name="title" class="form-control" value="${title || ''}" placeholder="Title" />
				</div>
				<div class="card-options">
					<a href="javascript:void(0)" class="card-options-remove" data-toggle="card-remove"><i class="fe fe-x"></i></a>
				</div>
			</div>
			<div class="card-body">
				<div class="btn-list">
					<button class="btn btn-primary btn-lg"><i class="fe fe-play mr-2"></i><span class="lang-start-test"></span></button>
				</div>
				<div class="form-group mt-2">
					<textarea rows="9" name="words" class="form-control">${words}</textarea>
				</div>
				<div class="row">
					<div class="col-md-6">
						<div class="form-group">
							<label class="form-label"><span class="lang-description"></span></label>
							<textarea name="description" rows="3" class="form-control">${description || ''}</textarea>
						</div>
					</div>
					<div class="col-md-6 col-lg-3">
						<div class="form-group">
							<label class="form-label"><i class="fe fe-folder"></i> <span class="lang-category"></span></label>
							<div class="input-group">
								<input type="text" name="category" class="form-control" value="${category || ''}">
								<!--
								<div class="input-group-append">
									<button data-toggle="dropdown" type="button" class="btn btn-secondary dropdown-toggle"></button>
									<div class="dropdown-menu dropdown-menu-right">
										<a class="dropdown-item" href="javascript:void(0);" onclick="$(this).parent().parent().parent().find('input').val($(this).text());">Study Japanese</a>
									</div>
								</div>
								-->
							</div>
						</div>
					</div>
					<div class="col-md-6 col-lg-3">
						<div class="form-group">
							<label class="form-label"><span class="lang-option"></span></label>
							<label class="custom-switch">
								<input type="checkbox" name="private" class="custom-switch-input" ${isPrivate ? 'checked' : ''}>
								<span class="custom-switch-indicator"></span>
								<span class="custom-switch-description"><span class="lang-private"></span></span>
							</label>
						</div>
					</div>
				</div>
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
	if(!tableId) div.find('[name="control-overwrite"]').hide();
	let inputForm = new InputForm();
	inputForm.assign({form: div.find('form'), fields: {
		title: {required: true},
		words: {required: true}
	}, validate: function(form) {
		let text = div.find('[name="words"]').val();
		let arr = CSV.parse(text, {delimiter: '\t'});
		if(arr.length < 3) {
			inputForm.setMessage(form, {'field':'words', 'error':'row-short', 'prefix':3}); return false;
		}
		if(arr[0].length < 2) {
			inputForm.setMessage(form, {'field':'words', 'error':'column-short', 'prefix':2}); return false;
		}
		if(!window.app.cookies.get('auth')) {
			SignInHtml();
			return false;
		}
		return true;
	}, callback: function(data) {
		if(data.table_path) location.href = data.table_path;
	}});
}
