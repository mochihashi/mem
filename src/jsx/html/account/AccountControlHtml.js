'use strict';
import * as container from 'html/Container';
import SignOutHtml from 'html/account/SignOutHtml';
import ProfileHtml from 'html/account/ProfileHtml';
import AccountTableListHtml from 'html/account/AccountTableListHtml';
import AccountCategoryListHtml from 'html/account/AccountCategoryListHtml';

export default function(data) {
	if(data) {
		if(data.auth) window.app.cookies.set('auth', data.auth, 30);
		if(data.id) { window.app.account.id = data.id; window.app.cookies.set('account.id', data.id, 3); }
		if(data.name) { window.app.account.name = data.name; window.app.cookies.set('account.name', data.name, 3); }
		if(data.dir) { window.app.account.dir = data.dir; window.app.cookies.set('account.dir', data.dir, 3); }
	} else {
		window.app.account.id = toInt(window.app.cookies.get('account.id'));
		window.app.account.name = window.app.cookies.get('account.name');
		window.app.account.dir = window.app.cookies.get('account.dir');
	}
	let div = container.renderTo('#account-control', `
<div class="dropdown" id="div-login-user">
	<a href="javascript:void(0)" class="nav-link pr-0 leading-none" data-toggle="dropdown">
	<span class="avatar avatar-sm"><i data-feather="user" class="icon"></i></span>
	<span class="ms-2 d-none d-lg-block">
	<span class="text-default">${window.app.account.name}</span>
	</span>
	</a>
	<div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
		<a class="dropdown-item" href="${window.app.account.dir}">
		<i class="dropdown-icon fe fe-home"></i> <span class="lang-my-page"></span>
		</a>
		<div class="dropdown-divider"></div>
		<button class="dropdown-item" id="btn-account-profile">
		<i class="dropdown-icon fe fe-user"></i> <span class="lang-profile"></span>
		</button>
		<button class="dropdown-item" id="btn-account-tables">
		<i class="dropdown-icon fe fe-grid"></i> <span class="lang-tables"></span>
		</button>
		<button class="dropdown-item" id="btn-account-categories">
		<i class="dropdown-icon fe fe-folder"></i> <span class="lang-categories"></span>
		</button>
		<div class="dropdown-divider"></div>
		<button class="dropdown-item" id="btn-account-sign-out">
		<i class="dropdown-icon fe fe-log-out"></i> <span class="lang-sign-out"></span>
		</button>
	</div>
</div>
	`);
	div.find('#btn-account-profile').click(ProfileHtml);
	div.find('#btn-account-tables').click(AccountTableListHtml);
	div.find('#btn-account-categories').click(AccountCategoryListHtml);
	div.find('#btn-account-sign-out').click(SignOutHtml);
}
	