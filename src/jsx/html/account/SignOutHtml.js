'use strict';
import * as container from 'html/Container';
import SignInHtml from 'html/account/SignInHtml';

export default function({init = false}) {
	let div = container.renderTo('#account-control', `
<button class="btn btn-primary" id="btn-sign-in"><span class="lang-sign-in"></span></button>
	`);
	div.find('#btn-sign-in').click(SignInHtml);
	if(!init) window.app.cookies.delete('auth');
}