'use strict';

export function renderTo(target, html) {
	return $(target).html(html);
}
	
export function renderOverlay(html) {
	if($('#overlay-container').length == 0) {
		$('#main-container').parent().append(`<div class="container" id="overlay-container">`);
	}
	$('#main-container').hide();
	$('#overlay-container').html(html).show();
	$('#overlay-container .card-options-remove').click(function(event){
		event.preventDefault();
		$('#overlay-container').hide();
		$('#main-container').show();
	});
	return $('#overlay-container');
}
	
export function renderOverlayCard(title, colClass, html) {
	return renderOverlay(`
<div class="row">
	<div class="${colClass}">
		<div class="card">
			<div class="card-header">
				<h3 class="card-title">${title}</h3>
				<div class="card-options">
					<a href="#" class="card-options-remove" data-toggle="card-remove"><i class="fe fe-x"></i></a>
				</div>
			</div>
			<div class="card-body p-6">
				<div class="dimmer"><div class="loader"></div><div class="dimmer-content">
				${html}
				</div></div>
			</div>
		</div>
	</div>
</div>
	`);
}
