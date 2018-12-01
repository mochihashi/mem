'use strict';

export default function({list, userId=0}) {
	let html = '';
	if(!list) return html;
	for(let i in list) {
		let row = list[i];
		let u = userId || row.user_id;
		if(row.private && u != window.app.account.id) continue;
		let body = '';
		if(row.description) body += `<div class="text-muted">${row.description}</div>`;
		if(!userId && row.user_url) {
			body += `
<div class="d-flex align-items-center${row.description ? ' pt-5' : ''}">
	<div class="avatar avatar-sm mr-2"><i class="fe fe-user"></i></div>
	<div>
		<a href="${row.user_url}" class="text-default">${row.user_name}</a>
	</div>
</div>
			`;
		}
		if(body) body = `<div class="card-body d-flex flex-column">${body}</div>`;
		html += `
<div class="col-md-6 col-lg-4">
	<div class="card">
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