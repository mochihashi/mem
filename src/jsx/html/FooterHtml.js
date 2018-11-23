'use strict';
import * as container from 'html/Container';

export default function() {
	container.renderTo('.footer', `
<div class="container">
	<div class="row align-items-center flex-row">
		<div class="col-12 col-lg-auto mt-3 mt-lg-0 text-center">
			Copyright © 2018 All rights reserved.
		</div><!-- .col-12 -->
	</div><!-- .row -->
</div><!-- .container -->
`);
}
