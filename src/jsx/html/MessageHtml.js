'use strict';
import * as container from 'html/Container';
import SignInHtml from 'html/account/SignInHtml';
import SignUpHtml from 'html/account/SignUpHtml';

export default function(message, title='') {
	let div = container.renderOverlay('message', `
<div class="row">
	<div class="col col-login mx-auto">
		<div class="card">
			<div class="card-header">
				<h3 class="card-title">${title ? '<span class="lang-msg-' + title + '"></span>' : ''}</h3>
				<div class="card-options">
					<a href="javascript:void(0)" class="card-options-remove" data-toggle="card-remove"><i data-feather="x" class="icon"></i></a>
				</div>
			</div>
			<div class="card-body p-6">
				<span class="lang-msg-${message}"></span>
				<div class="btn-list mt-3"></div>
			</div>
		</div>
	</div><!-- .col-login -->
</div><!-- .row -->
	`);
	if(message == 'activated') {
		div.find('.btn-list').html(`<button class="btn btn-primary"><span class="lang-sign-in"></span></button>`);
		div.find('.btn-list button').click(SignInHtml);
	} else if(message == 'activate-expired') {
		div.find('.btn-list').html(`<button class="btn btn-primary"><span class="lang-sign-up"></span></button>`);
		div.find('.btn-list button').click(SignUpHtml);
	}
}
