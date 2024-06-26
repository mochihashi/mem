'use strict';
import * as container from 'html/Container';
import InputForm from 'common/InputForm';
import AccountControlHtml from 'html/account/AccountControlHtml';

export default function() {
	let div = container.renderOverlay('profile', escapeTemplate`
<div class="page-body">
  <div class="row row-cards">
	<div class="col col-md-6 mx-auto">
		<form class="card" action="api/account/update/">
			<div class="card-header">
				<h3 class="card-title"><span class="lang-profile"></span></h3>
				<div class="card-options">
					<a href="javascript:void(0)" class="card-options-remove" data-toggle="card-remove"><i data-feather="x" class="icon"></i></a>
				</div>
			</div>
			<div class="card-body p-6">
				<div class="dimmer"><div class="loader"></div><div class="dimmer-content">
				<div class="mb-3">
					<span class="lang-msg-input-to-update"></span>
				</div>
				<div class="form-group">
					<label class="form-label"><span class="lang-name"></span></label>
					<input type="text" class="form-control" name="name" placeholder="Name">
				</div>
				<div class="form-group">
					<label class="form-label"><span class="lang-email-address"></span></label>
					<input type="email" class="form-control" name="email" placeholder="Email">
				</div>
				<div class="form-group">
					<label class="form-label"><span class="lang-password"></span></label>
					<input type="password" class="form-control" name="password" placeholder="Password">
				</div>
				<div class="form-footer">
					<input type="hidden" name="lang" value="${window.app.lang.lang}"/>
					<button type="submit" class="btn btn-primary"><i data-feather="save" class="icon"></i> <span class="lang-save"></span></button>
				</div>
				</div></div>
			</div>
		</form>
	</div><!-- .col-login -->
  </div><!-- .row -->
</div>
	`);
	div.find('[name="name"]').focus();
	let inputForm = new InputForm();
	inputForm.assign({form: div.find('form'), fields: {
		name: {minLength: 3},
		email: {type: 'email'},
		password: {minLength: 8}
	}, callback: function(data){
		inputForm.setMessage({text: 'updated'});
		if(data.name) AccountControlHtml(data);
	}, validate: function(form){
		if(!div.find('[name="name"]').val() && !div.find('[name="email"]').val() && !div.find('[name="password"]').val()) {
			inputForm.setMessage({error: 'required'});
			return false;
		}
		return true;
	}, confirmMessage: 'update?'});
}
