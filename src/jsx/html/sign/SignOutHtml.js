'use strict';
import * as html from 'html/Html';
import SignInHtml from 'html/sign/SignInHtml';

export default function({init = false}) {
	let div = html.renderTo('#account-control', `
<button class="btn btn-primary" id="btn-sign-in"><span class="lang-sign-in"></span></button>
	`);
	div.find('#btn-sign-in').click(SignInHtml);
	if(!init) window.app.cookies.delete('auth');
}