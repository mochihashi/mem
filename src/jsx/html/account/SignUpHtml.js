'use strict';
import * as container from 'html/Container';
import SignInHtml from 'html/account/SignInHtml';
import MessageHtml from 'html/MessageHtml';
import InputForm from 'common/InputForm';

export default function() {
	let div = container.renderOverlay('sign', `
<div class="page-body">
  <div class="row row-cards">
	<div class="col col-md-6 mx-auto">
		<form class="card" action="api/account/signUp/">
			<div class="card-header">
				<h3 class="card-title"><span class="lang-sign-up"></span></h3>
				<div class="card-options">
					<a href="javascript:void(0)" class="card-options-remove" data-toggle="card-remove"><i data-feather="x" class="icon"></i></a>
				</div>
			</div>
			<div class="card-body p-6">
				<div class="dimmer"><div class="loader"></div><div class="dimmer-content">
				<div class="form-group">
					<label class="form-label"><span class="lang-name"></span></label>
					<input type="text" class="form-control" name="name" placeholder="Name" maxlength="50">
				</div>
				<div class="form-group">
					<label class="form-label"><span class="lang-email-address"></span></label>
					<input type="email" class="form-control" name="email" placeholder="Email" maxlength="100">
				</div>
				<div class="form-group">
					<label class="form-label"><span class="lang-password"></span></label>
					<input type="password" class="form-control" name="password" placeholder="Password" maxlength="50">
				</div>
				<div class="form-footer">
					<input type="hidden" name="lang" value="${window.app.lang.lang}"/>
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
</div>
	`);
	div.find('[name="btn-to-sign-in"]').click(SignInHtml);
	div.find('[name="name"]').focus();
	new InputForm().assign({form: div.find('form'), fields: {
		name: {required: true, minLength: 3},
		email: {required: true, type: 'email'},
		password: {required: true, minLength: 8}
	}, callback: function(data) {
		container.closeOverlay('sign');
		SignInHtml();
	}});
}
