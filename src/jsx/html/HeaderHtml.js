'use strict';
import * as container from 'html/Container';
import SignOutHtml from 'html/account/SignOutHtml';
import AccountControlHtml from 'html/account/AccountControlHtml';
import TableEditHtml from 'html/table/TableEditHtml';

export default function() {
	let div = container.renderTo('.header', `
<header class="navbar navbar-expand-md d-print-none">
	<div class="container-xl">
		<a class="navbar-brand" href="${window.app.rootPath}">
		<i data-feather="paperclip" class="icon"></i>
		memorize words
		</a>
		<div class="btn-list">
			<button class="btn btn-outline-primary" name="btn-create"><i data-feather="plus-circle" class="icon"></i> <span class="lang-create"></span></button>
			<select class="form-control custom-select w-auto" id="select-lang">
			</select>
			<span id="account-control">
			</span>
		</div><!-- .container-xl -->
	</div><!-- .d-flex -->
</header>
`);
	$('.header').removeClass('py-4');
	$('.header').next('.my-3').removeClass('my-3').removeClass('my-md-5').addClass('page-wrapper');
	div.find('[name="btn-create"]').click(TableEditHtml);
	SignOutHtml({init: true});
	let cookies = window.app.cookies;
	if(cookies.get('account.id') && cookies.get('account.name') && cookies.get('account.dir')) {
		AccountControlHtml();
	} else if(cookies.get('auth')) {
		window.app.readJson('api/account/autoSignIn/', function(data){
			if(data.error) {
				window.app.cookies.delete('auth');
			} else {
				AccountControlHtml(data);
			}
		});
	}
}
