'use strict';

export function renderTo(target, html) {
	return $(target).html(html);
}

function _initPage() {
	window.app.pages = {};
	window.app.activePage = '#main-container';
}
function getOverlayId(pageId, isSelector=true) {
	let id = 'overlay-container-' + pageId;
	if(isSelector) id = '#' + id;
	return id;
}

export function renderOverlay(pageName, html) {
	if(!window.app.pages) _initPage();
	let pageId = window.app.pages[pageName];
	if(pageId && getOverlayId(pageId) == window.app.activePage) {
	} else {
		if(pageId) $(getOverlayId(pageId)).remove();
		pageId = Object.keys(window.app.pages).length + 1;
		$('#main-container').parent().append(`<div class="container overlay-container" id="${getOverlayId(pageId, false)}">`);
		window.app.pages[pageName] = pageId;
		$(window.app.activePage).hide();
		window.app.activePage = getOverlayId(pageId);
	}
	
	let me = $(window.app.activePage).html(html).show();
	me.find('.card-options-remove').click(function(event){
		event.preventDefault();
		closeOverlay(pageName);
	});
	me.find('.card-options-fullscreen').click(function(event){
		event.preventDefault();
		me.find('.card').toggleClass('card-fullscreen');
	});
	feather.replace();
	return me;
}

export function closeOverlay(pageName) {
	let pageId = window.app.pages[pageName];
	$(getOverlayId(pageId)).remove();
	window.app.pages[pageName] = null;
	let maxId = 0;
	for(let n in window.app.pages) {
		let id = window.app.pages[n];
		if(id && id > maxId) maxId = id;
	}
	if(maxId == 0) {
		_initPage();
	} else {
		window.app.activePage = getOverlayId(maxId);
	}
	$(window.app.activePage).show();
}

export function renderMain(html) {
	$('.overlay-container').remove();
	_initPage();
	return $('#main-container').html(html).show();
}

export function renderOverlayCard({pageName, title = '', colClass = 'col-12', html}) {
	return renderOverlay(pageName, `
<div class="row">
	<div class="${colClass}">
		<div class="card">
			<div class="card-header">
				<h3 class="card-title">${title}</h3>
				<div class="card-options">
					<a href="javascript:void(0)" class="card-options-remove" data-toggle="card-remove"><i data-feather="x" class="icon"></i></a>
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
