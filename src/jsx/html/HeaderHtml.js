'use strict';
import * as container from 'html/Container';
import SignOutHtml from 'html/sign/SignOutHtml';
import AccountControlHtml from 'html/account/AccountControlHtml';
import TableEditHtml from 'html/table/TableEditHtml';

export default function() {
	let div = container.renderTo('.header', `
<div class="container">
	<div class="d-flex">
		<a class="header-brand" href="./">
		<i class="fe fe-paperclip"></i>
		memorize words
		</a>
		<div class="d-flex order-lg-2 ml-auto">
			<button class="btn btn-outline-primary mr-2" name="btn-create"><i class="fe fe-plus-circle mr-2"></i><span class="lang-create"></span></button>
			<select class="form-control custom-select w-auto mr-2" id="select-lang">
			</select>
			<span id="account-control">
			</span>
		</div><!-- .d-flex -->
	</div><!-- .d-flex -->
</div><!-- .container -->
`);
	div.find('[name="btn-create"]').click(TableEditHtml);
	SignOutHtml({init: true});
	if(window.app.cookies.get('auth')) {
		$.ajax({
			url: window.app.adjustUrl('api/sign/auto/'),
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
