'use strict';

export default function({list, userId=0, isCategory = false}) {
	let html = '';
	if(!list) return html;
	for(let i in list) {
		let row = list[i];
		let body = '';
		if(row.description) body += `<div class="text-muted">${row.description}</div>`;
		if(!userId && row.user_url) {
			body += `
<div class="d-flex align-items-center${row.description ? ' pt-5' : ''}">
	<div>
		<a href="${row.user_url}" class="text-muted">@${row.user_name}</a>
	</div>
</div>
			`;
		}
		if(body) body = `<div class="card-body d-flex flex-column">${body}</div>`;
		let image = '';
		if(row.image_file) {
			image = `<div class="img-responsive img-responsive-21x9 card-img-top" style="background-image: url(${row.url}${row.image_file})"></div>`;
		}
		let cardStacked = isCategory ? ' card-stacked' : '';
		html += `
<div class="col-md-6 col-lg-3">
	<div class="card${cardStacked}">${image}
		<div class="card-header">
			<h3 class="card-title"><a href="${row.url}">${row.name}</a></h3>
		</div>
		${body}
	</div>
</div>
		`;
	}
	return html;
}