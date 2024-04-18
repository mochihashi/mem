'use strict';
import * as container from 'html/Container';
import MessageHtml from 'html/MessageHtml';
import InputForm from 'common/InputForm';

export default function() {
	let div = container.renderOverlay('forgot-password', `
<div class="row">
	<div class="col col-login mx-auto">
		<form class="card" action="api/account/resetPassword/">
			<div class="card-header">
				<h3 class="card-title"><span class="lang-reset-password"></span></h3>
				<div class="card-options">
					<a href="javascript:void(0)" class="card-options-remove" data-toggle="card-remove"><i data-feather="x" class="icon"></i></a>
				</div>
			</div>
			<div class="card-body p-6">
				<div class="dimmer"><div class="loader"></div><div class="dimmer-content">
				<div class="form-group">
					<label class="form-label"><span class="lang-email-address"></span></label>
					<input type="email" class="form-control" name="email" placeholder="Email">
				</div>
				<div class="form-footer">
					<input type="hidden" name="lang" value="${window.app.lang.lang}"/>
					<button type="submit" class="btn btn-primary btn-block"><span class="lang-send-new-password"></span></button>
				</div>
				</div></div>
			</div>
		</form>
	</div><!-- .col-login -->
</div><!-- .row -->
	`);
	div.find('[name="email"]').focus();
	new InputForm().assign({form: div.find('form'), fields: {
		email: {required: true, type: 'email'}
	}, callback: function(data) {
		container.closeOverlay('sign');
		MessageHtml('password-email-sent', '');
	}});
}
