'use strict';
import * as html from 'html/Html';
import SignOutHtml from 'html/sign/SignOutHtml';

export default function(data) {
	window.app.cookies.set('auth', data.auth);
	window.app.user = data;

	let div = html.renderTo('#account-control', `
<div class="dropdown" id="div-login-user">
	<a href="javascript:void(0)" class="nav-link pr-0 leading-none" data-toggle="dropdown">
	<span class="avatar"><i class="fe fe-user"></i></span>
	<span class="ml-2 d-none d-lg-block">
	<span class="text-default">${data.name}</span>
	</span>
	</a>
	<div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
		<a class="dropdown-item" href="${data.dir}">
		<i class="dropdown-icon fe fe-home"></i> <span class="lang-my-page"></span>
		</a>
		<div class="dropdown-divider"></div>
		<button class="dropdown-item">
		<i class="dropdown-icon fe fe-user"></i> <span class="lang-profile"></span>
		</button>
		<button class="dropdown-item">
		<i class="dropdown-icon fe fe-grid"></i> <span class="lang-tables"></span>
		</button>
		<button class="dropdown-item">
		<i class="dropdown-icon fe fe-folder"></i> <span class="lang-categories"></span>
		</button>
		<div class="dropdown-divider"></div>
		<button class="dropdown-item" id="btn-sign-out">
		<i class="dropdown-icon fe fe-log-out"></i> <span class="lang-sign-out"></span>
		</button>
	</div>
</div>
	`);
	div.find('#btn-sign-out').click(SignOutHtml);
}
	