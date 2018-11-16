'use strict';
import * as html from 'html/Html';
import SignOutHtml from 'html/sign/SignOutHtml';
import AccountControlHtml from 'html/account/AccountControlHtml';

export default function() {
	let div = html.renderTo('.header', `
<div class="container">
	<div class="d-flex">
		<a class="header-brand" href="./">
		<i class="fe fe-paperclip"></i>
		memorize words
		</a>
		<div class="d-flex order-lg-2 ml-auto">
			<select class="form-control custom-select w-auto mr-2" id="select-lang">
			</select>
			<span id="account-control">
			</span>
		</div><!-- .d-flex -->
	</div><!-- .d-flex -->
</div><!-- .container -->
`);
	SignOutHtml({init: true});
	if(window.app.cookies.get('auth')) {
		$.ajax({
			url: window.app.adjustUrl('api/autoSignIn/'),
			type: "POST",
			dataType: "json",
			timeout: 10000
		}).done(function(data, textStatus, jqXHR) {
			if(data.error) {
				window.app.cookies.delete('auth');
			} else {
				AccountControlHtml(data);
			}
		});
	}
}
