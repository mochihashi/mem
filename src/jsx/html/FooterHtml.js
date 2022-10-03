'use strict';
import * as container from 'html/Container';

export default function() {
	container.renderTo('.footer', `
<div class="container">
	<div class="row align-items-center flex-row">
		<div class="col-3 col-lg-auto mt-3 mt-lg-0 text-center">
			<a target="_blank" href="/readme.html">Getting started</a>
		</div><!-- .col-3 -->
		<div class="col-9 col-lg-auto mt-3 mt-lg-0 text-center">
			Thanks for visiting! @author <a target="_blank" href="https://facebook.com/hinowa">facebook.com/hinowa</a>
		</div><!-- .col-9 -->
	</div><!-- .row -->
</div><!-- .container -->
`);
}
