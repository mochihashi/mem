'use strict';
import * as html from 'html/Html';
import SignInHtml from 'html/sign/SignInHtml';
import InputForm from 'common/InputForm';

export default function() {
	let div = html.renderOverlay(`
<div class="row">
	<div class="col col-login mx-auto">
		<form class="card" action="api/signUp/">
			<div class="card-header">
				<h3 class="card-title"><span class="lang-sign-up"></span></h3>
				<div class="card-options">
					<a href="#" class="card-options-remove" data-toggle="card-remove"><i class="fe fe-x"></i></a>
				</div>
			</div>
			<div class="card-body p-6">
				<div class="dimmer"><div class="loader"></div><div class="dimmer-content">
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
					<button type="submit" class="btn btn-primary btn-block"><span class="lang-create-new-account"></span></button>
				</div>
				</div></div>
			</div>
		</form>
		<div class="text-center text-muted">
			<span class="lang-msg-already-have-account"></span>
			<button class="btn btn-outline-primary" name="btn-to-sign-in"><span class="lang-sign-in"></span></button>
		</div>
	</div><!-- .col-login -->
</div><!-- .row -->
	`);
	div.find('[name="btn-to-sign-in"]').click(SignInHtml);
	div.find('[name="name"]').focus();
	new InputForm().assign({form: div.find('form'), fields: {
		name: {required: true, minLength: 3},
		email: {required: true, type: 'email'},
		password: {required: true, minLength: 8}
	}});
}
