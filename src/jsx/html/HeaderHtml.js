'use strict';
import * as html from 'html/Html';
import SignInHtml from 'html/sign/SignInHtml';

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
			<button class="btn btn-primary" id="btn-sign-in"><span class="lang-sign-in"></span></button>
			<div class="dropdown" id="div-login-user">
				<a href="#" class="nav-link pr-0 leading-none" data-toggle="dropdown">
				<span class="avatar"><i class="fe fe-user"></i></span>
				<span class="ml-2 d-none d-lg-block">
				<span class="text-default">mochihashi</span>
				</span>
				</a>
				<div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
					<a class="dropdown-item" href="account.html">
					<i class="dropdown-icon fe fe-home"></i> <span class="lang-my-page"></span>
					</a>
					<div class="dropdown-divider"></div>
					<a class="dropdown-item" href="#">
					<i class="dropdown-icon fe fe-user"></i> <span class="lang-profile"></span>
					</a>
					<a class="dropdown-item" href="tables.html">
					<i class="dropdown-icon fe fe-grid"></i> <span class="lang-tables"></span>
					</a>
					<a class="dropdown-item" href="tables.html">
					<i class="dropdown-icon fe fe-folder"></i> <span class="lang-categories"></span>
					</a>
					<div class="dropdown-divider"></div>
					<a class="dropdown-item" href="#">
					<i class="dropdown-icon fe fe-log-out"></i> <span class="lang-sign-out"></span>
					</a>
				</div><!-- .dropdown-menu -->
			</div><!-- .dropdown -->
		</div><!-- .d-flex -->
	</div><!-- .d-flex -->
</div><!-- .container -->
`);
	div.find('#btn-sign-in').click(SignInHtml);
}
