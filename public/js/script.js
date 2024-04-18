!function(t){var e={};function a(s){if(e[s])return e[s].exports;var n=e[s]={i:s,l:!1,exports:{}};return t[s].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=t,a.c=e,a.d=function(t,e,s){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(a.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)a.d(s,n,function(e){return t[e]}.bind(null,n));return s},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="",a(a.s=0)}([function(t,e,a){"use strict";a.r(e);function s(t,e){return $(t).html(e)}function n(){window.app.pages={},window.app.activePage="#main-container"}function i(t,e=!0){let a="overlay-container-"+t;return e&&(a="#"+a),a}function l(t,e){window.app.pages||n();let a=window.app.pages[t];a&&i(a)==window.app.activePage||(a&&$(i(a)).remove(),a=Object.keys(window.app.pages).length+1,$("#main-container").parent().append(`<div class="container overlay-container" id="${i(a,!1)}">`),window.app.pages[t]=a,$(window.app.activePage).hide(),window.app.activePage=i(a));let s=$(window.app.activePage).html(e).show();return s.find(".card-options-remove").click(function(e){e.preventDefault(),o(t)}),s.find(".card-options-fullscreen").click(function(t){t.preventDefault(),s.find(".card").toggleClass("card-fullscreen")}),feather.replace(),s}function o(t){let e=window.app.pages[t];$(i(e)).remove(),window.app.pages[t]=null;let a=0;for(let t in window.app.pages){let e=window.app.pages[t];e&&e>a&&(a=e)}0==a?n():window.app.activePage=i(a),$(window.app.activePage).show()}function c(t){return $(".overlay-container").remove(),n(),$("#main-container").html(t).show()}var r=function(t,e=""){let a=l("message",`\n<div class="row">\n\t<div class="col col-login mx-auto">\n\t\t<div class="card">\n\t\t\t<div class="card-header">\n\t\t\t\t<h3 class="card-title">${e?'<span class="lang-msg-'+e+'"></span>':""}</h3>\n\t\t\t\t<div class="card-options">\n\t\t\t\t\t<a href="javascript:void(0)" class="card-options-remove" data-toggle="card-remove"><i data-feather="x" class="icon"></i></a>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="card-body p-6">\n\t\t\t\t<span class="lang-msg-${t}"></span>\n\t\t\t\t<div class="btn-list mt-3"></div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\x3c!-- .col-login --\x3e\n</div>\x3c!-- .row --\x3e\n\t`);"activated"==t?(a.find(".btn-list").html('<button class="btn btn-primary"><span class="lang-sign-in"></span></button>'),a.find(".btn-list button").click(y)):"activate-expired"==t&&(a.find(".btn-list").html('<button class="btn btn-primary"><span class="lang-sign-up"></span></button>'),a.find(".btn-list button").click(p))};let d=class{constructor(){this.validator=new class{validate(t,e){if(this.error="",this.prefix="",this.suffix="",0==(t=t.toString()).length)return!e.required||(this.error="required",!1);if("email"==e.type){const e="^[a-zA-Z0-9\\.\\$=_\\-\\^~\\+`]+@[a-zA-Z0-9\\._-]+$";if(!t.match(new RegExp(e)))return this.error="not-email",!1}if(e.minLength&&t.length<e.minLength)return this.prefix=e.minLength,this.error="length-short",!1;if(!e.html){if(t.indexOf("<")>=0)return this.suffix=": &lt;",this.error="invalid-char",!1;if(t.indexOf(">")>=0)return this.suffix=": &gt;",this.error="invalid-char",!1}return!0}}}assign({form:t,callback:e,fields:a,validate:s,confirmMessage:n}){this.form=t;let i=this;if(a)for(let e in a){let s=a[e];t.find('[name="'+e+'"]').change(()=>i.validate(e,s))}t.submit(function(l){if(l.preventDefault(),l.stopPropagation(),a){let e=!1;for(let s in a){let n=a[s];i.validate(s,n)||(e||t.find('[name="'+s+'"]').focus(),e=!0)}if(e)return}s&&!s(t)||n&&!confirm(window.app.lang.getText(n))||window.app.readJson(t.attr("action"),e,new FormData(t[0]),i,!0)})}setMessages(t){if(this.setMessage(),t)for(let e=t.length-1;e>=0;e--)this.addMessage(t[e],e)}setMessage(t){this.form.parent().find(".alert").remove(),t&&this.addMessage(t)}addMessage(t,e){let a=t.error?"danger":"primary",s=t.text?t.text:t.error,n=t.prefix||"",i=t.suffix||"",l=t.field||"";if(s&&(s=`<span class="lang-msg-${s}"></span>`),t.error&&l){let t=this.form.find('[name="'+l+'"]');if(1==t.length)return void("hidden"==t.attr("type")?t.parent().append(`<div style="color:#f00;font-size:85%;">${n}${s}${i}</div>`):(t.addClass("is-invalid"),t.parent().append(`<div class="invalid-feedback">${n}${s}${i}</div>`),0==e&&form.find('[name="'+l+'"]').focus()))}l&&(l=`[<span class="lang-${l}"></span>] `),this.form.parent().prepend(`\n<div class="alert alert-${a} alert-dismissible">\n\t<button type="button" class="close" data-dismiss="alert"></button>\n\t${l}${n}${s}${i}\n</div>\n\t\t`)}startProcess(){return!this.isProcessing&&(this.isProcessing=!0,this.form.find(".dimmer").addClass("active"),!0)}endProcess(){this.isProcessing=!1,this.form.find(".dimmer").removeClass("active")}val(t){let e=$(t);if(e.is(":disabled"))return"";let a=e.attr("type"),s=e.attr("name"),n=e.val();if(void 0===s||""==s||""==n)return"";if("submit"==a||"button"==a)return"";if("radio"==a||"checkbox"==a){let t=[];e.each(function(){this.checked&&t.push(this.val())}),n=t.join(",")}return n}validate(t,e){let a=this.form.find('[name="'+t+'"]'),s=this.val(a);if(a.parent().find(".invalid-feedback").remove(),this.validator.validate(s,e))return 1==a.length&&a.removeClass("is-invalid"),!0;{1==a.length&&a.addClass("is-invalid");let t=this.validator.error,e=this.validator.prefix,s=this.validator.suffix;return a.parent().append(`<div class="invalid-feedback">${e}<span class="lang-msg-${t}"></span>${s}</div>`),!1}}};var p=function(){let t=l("sign",`\n<div class="row">\n\t<div class="col col-login mx-auto">\n\t\t<form class="card" action="api/account/signUp/">\n\t\t\t<div class="card-header">\n\t\t\t\t<h3 class="card-title"><span class="lang-sign-up"></span></h3>\n\t\t\t\t<div class="card-options">\n\t\t\t\t\t<a href="javascript:void(0)" class="card-options-remove" data-toggle="card-remove"><i data-feather="x" class="icon"></i></a>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="card-body p-6">\n\t\t\t\t<div class="dimmer"><div class="loader"></div><div class="dimmer-content">\n\t\t\t\t<div class="form-group">\n\t\t\t\t\t<label class="form-label"><span class="lang-name"></span></label>\n\t\t\t\t\t<input type="text" class="form-control" name="name" placeholder="Name" maxlength="50">\n\t\t\t\t</div>\n\t\t\t\t<div class="form-group">\n\t\t\t\t\t<label class="form-label"><span class="lang-email-address"></span></label>\n\t\t\t\t\t<input type="email" class="form-control" name="email" placeholder="Email" maxlength="100">\n\t\t\t\t</div>\n\t\t\t\t<div class="form-group">\n\t\t\t\t\t<label class="form-label"><span class="lang-password"></span></label>\n\t\t\t\t\t<input type="password" class="form-control" name="password" placeholder="Password" maxlength="50">\n\t\t\t\t</div>\n\t\t\t\t<div class="form-footer">\n\t\t\t\t\t<input type="hidden" name="lang" value="${window.app.lang.lang}"/>\n\t\t\t\t\t<button type="submit" class="btn btn-primary btn-block"><span class="lang-create-new-account"></span></button>\n\t\t\t\t</div>\n\t\t\t\t</div></div>\n\t\t\t</div>\n\t\t</form>\n\t\t<div class="text-center text-muted">\n\t\t\t<span class="lang-msg-already-have-account"></span>\n\t\t\t<button class="btn btn-outline-primary" name="btn-to-sign-in"><span class="lang-sign-in"></span></button>\n\t\t</div>\n\t</div>\x3c!-- .col-login --\x3e\n</div>\x3c!-- .row --\x3e\n\t`);t.find('[name="btn-to-sign-in"]').click(y),t.find('[name="name"]').focus(),(new d).assign({form:t.find("form"),fields:{name:{required:!0,minLength:3},email:{required:!0,type:"email"},password:{required:!0,minLength:8}},callback:function(t){o("sign"),y()}})},m=function(){let t=l("profile",escapeTemplate`
<div class="page-body">
  <div class="row row-cards">
	<div class="col col-md-6 mx-auto">
		<form class="card" action="api/account/update/">
			<div class="card-header">
				<h3 class="card-title"><span class="lang-profile"></span></h3>
				<div class="card-options">
					<a href="javascript:void(0)" class="card-options-remove" data-toggle="card-remove"><i data-feather="x" class="icon"></i></a>
				</div>
			</div>
			<div class="card-body p-6">
				<div class="dimmer"><div class="loader"></div><div class="dimmer-content">
				<div class="mb-3">
					<span class="lang-msg-input-to-update"></span>
				</div>
				<div class="form-group">
					<label class="form-label"><span class="lang-name"></span></label>
					<input type="text" class="form-control" name="name" placeholder="Name">
				</div>
				<div class="form-group">
					<label class="form-label"><span class="lang-email-address"></span></label>
					<input type="email" class="form-control" name="email" placeholder="Email">
				</div>
				<div class="form-group">
					<label class="form-label"><span class="lang-password"></span></label>
					<input type="password" class="form-control" name="password" placeholder="Password">
				</div>
				<div class="form-footer">
					<input type="hidden" name="lang" value="${window.app.lang.lang}"/>
					<button type="submit" class="btn btn-primary"><i data-feather="save" class="icon"></i> <span class="lang-save"></span></button>
				</div>
				</div></div>
			</div>
		</form>
	</div><!-- .col-login -->
  </div><!-- .row -->
</div>
	`);t.find('[name="name"]').focus();let e=new d;e.assign({form:t.find("form"),fields:{name:{minLength:3},email:{type:"email"},password:{minLength:8}},callback:function(t){e.setMessage({text:"updated"}),t.name&&w(t)},validate:function(a){return!!(t.find('[name="name"]').val()||t.find('[name="email"]').val()||t.find('[name="password"]').val())||(e.setMessage({error:"required"}),!1)},confirmMessage:"update?"})},u=function({categoryId:t=0}){let e=l("account_table_list",escapeTemplate`
<div class="page-body">
  <div class="row row-cards">
	<div class="col col-lg-9 mx-auto">
		<form class="card">
			<div class="card-header">
				<h3 class="card-title"><span class="lang-tables"></span></h3>
				<div class="card-options">
					<a href="javascript:void(0)" class="card-options-remove" data-toggle="card-remove"><i data-feather="x" class="icon"></i></a>
				</div>
			</div>
			<div class="card-body">
				<div class="dimmer"><div class="loader"></div><div class="dimmer-content">
				<div class="form-group">
					<label class="form-label"><span class="lang-category"></span></label>
					<select class="form-control custom-select w-auto me-2" name="select-category"></select>
				</div>
				<div class="table-responsive mt-2">
					<table class="table mb-0 table-hover">
						<thead>
							<tr>
								<th><span class="lang-table"></span></th>
								<th></th>
								<th></th>
							</tr>
						</thead>
						<tbody></tbody>
					</table>
				</div><!-- .table-responsive -->
				</div></div>
			</div><!-- .card-body -->
		</form><!-- .card -->
	</div>
  </div>
</div>
	`);if(!window.app.account.dir)return;let a={};window.app.readJson(window.app.account.dir,function(s){a=s;let n={0:"-"};for(let t in s.categories)n[s.categories[t].id]=s.categories[t].name;e.find('[name="select-category"]').setSelectOption(n,t),e.find('[name="select-category"]').change(function(){f(e,a,parseInt($("option:selected",this).val()))}),f(e,a,t)})};function f(t,e,a){if(a>0){let s=null;e.categories&&e.categories[a]&&(s=e.categories[a].url),s&&window.app.readJson(s,function(s){v(t,e,s.tables,a)})}else v(t,e,e.tables,a)}function v(t,e,a,s){let n="";if(a)for(let t in a)n+=`\n<tr>\n\t<td>${a[t].name}</td>\n\t<td>${a[t].private?'<span class="lang-private"></span>':""}</td>\n\t<td>\n\t\t<div class="btn-list">\n\t\t<a class="btn btn-outline-secondary" href="${a[t].url}"><i data-feather="external-link" class="icon"></i> <span class="lang-view"></span></a>\n\t\t<button class="btn btn-outline-danger" data-control="delete" data-id="${a[t].id}"><i data-feather="delete" class="icon"></i> <span class="lang-delete"></span></button>\n\t\t</div>\n\t</td>\n</tr>\n\t\t\t`;let i=new d;i.assign({form:t.find("form")}),t.find("table.table tbody").html(n),t.find('table.table tbody [data-control="delete"]').click(function(a){if(!confirm(window.app.lang.getText("delete?")))return!1;let n=$(this).attr("data-id");return window.app.readJson("api/table/delete/",function(a){f(t,e,s)},{id:n},i),!1})}var g=function({id:t,parentId:e,name:a,isPublic:s,callback:n}){let i=l("account_category_edit",escapeTemplate`
<div class="page-body">
  <div class="row row-cards">
	<div class="col col-md-6 mx-auto">
		<form class="card" action="api/category/save/">
			<input type="hidden" name="id" value="${t}" />
			<div class="card-header">
				<h3 class="card-title"><span class="lang-category"></span></h3>
				<div class="card-options">
					<a href="javascript:void(0)" class="card-options-remove" data-toggle="card-remove"><i data-feather="x" class="icon"></i></a>
				</div>
			</div>
			<div class="card-body p-6">
				<div class="dimmer"><div class="loader"></div><div class="dimmer-content">
				<div class="form-group">
					<label class="form-label"><span class="lang-category"></span></label>
					<input type="text" class="form-control" name="name" placeholder="Name" value="${a}">
				</div>
				<div class="form-group">
					<label class="form-label"><span class="lang-parent-category"></span></label>
					<select class="form-control custom-select w-auto me-2" name="parent_id"></select>
				</div>
				<div class="form-group">
					<label class="form-label"><span class="lang-option"></span></label>
					<label class="custom-switch">
						<input type="checkbox" class="custom-switch-input" name="private" value="1" ${!s?"checked":""}>
						<span class="custom-switch-indicator"></span>
						<span class="custom-switch-description"><span class="lang-private"></span></span>
					</label>
				</div>
				<div class="form-footer">
					<button type="submit" class="btn btn-primary"><i data-feather="save" class="icon"></i> <span class="lang-save"></span></button>
				</div>
				</div></div>
			</div>
		</form>
	</div><!-- .col-login -->
  </div><!-- .row -->
</div>
	`);i.find('[name="name"]').focus(),(new d).assign({form:i.find("form"),fields:{name:{required:!0}},callback:function(t){o("account_category_edit"),n&&n()},confirmMessage:"save?"}),window.app.readJson(window.app.account.dir,function(a){let s={0:"-"};for(let e in a.categories){let n=a.categories[e];(!t||n.id!=t&&n.parent_id!=t)&&(s[n.id]=n.name)}i.find('[name="parent_id"]').setSelectOption(s,e)})},h=function({categoryId:t=0}){let e=l("account_category_list",escapeTemplate`
<div class="page-body">
  <div class="row row-cards">
	<div class="col col-lg-9 mx-auto">
		<form class="card">
			<div class="card-header">
				<h3 class="card-title"><span class="lang-categories"></span></h3>
				<div class="card-options">
					<a href="javascript:void(0)" class="card-options-remove" data-toggle="card-remove"><i data-feather="x" class="icon"></i></a>
				</div>
			</div>
			<div class="card-body">
				<div class="dimmer"><div class="loader"></div><div class="dimmer-content">
				<div class="btn-list">
					<button class="btn btn-primary" data-control="create"><i data-feather="plus-circle" class="icon"></i> <span class="lang-create"></span></button>
				</div>
				<div class="table-responsive mt-2">
					<table class="table mb-0 table-hover">
						<thead>
							<tr>
								<th><span class="lang-category"></span></th>
								<th><span class="lang-parent-category"></span></th>
								<th></th>
							</tr>
						</thead>
						<tbody></tbody>
					</table>
				</div><!-- .table-responsive -->
				</div></div>
			</div><!-- .card-body -->
		</form><!-- .card -->
	</div>
  </div>
</div>
	`);window.app.account.dir&&(e.find('[data-control="create"]').click(function(t){return g({callback:function(){b(e)}}),!1}),b(e))};function b(t){window.app.readJson(window.app.account.dir,function(e){let a="";for(let t in e.categories){let s=e.categories[t];a+=`\n<tr>\n\t<td>${s.name}</td>\n\t<td>${s.parent_id>0?e.categories[s.parent_id].name:""}</td>\n\t<td>\n\t\t<div class="btn-list">\n\t\t<a class="btn btn-outline-secondary" href="${s.url}"><i data-feather="external-link" class="icon"></i> <span class="lang-view"></span></a>\n\t\t<button class="btn btn-outline-secondary" data-control="table" data-id="${s.id}"><i data-feather="grid" class="icon"></i> <span class="lang-table"></span></button>\n\t\t<button class="btn btn-outline-primary" data-control="edit" data-id="${s.id}"><i data-feather="edit" class="icon"></i> <span class="lang-edit"></span></button>\n\t\t<button class="btn btn-outline-danger" data-control="delete" data-id="${s.id}"><i data-feather="delete" class="icon"></i> <span class="lang-delete"></span></button>\n\t\t</div>\n\t</td>\n</tr>\n\t\t\t`}let s=new d;s.assign({form:t.find("form")}),t.find("table.table tbody").html(a),t.find('table.table tbody [data-control="delete"]').click(function(e){if(!confirm(window.app.lang.getText("delete?")))return!1;let a=$(this).attr("data-id");return window.app.readJson("api/category/delete/",function(e){b(t)},{id:a},s),!1}),t.find('table.table tbody [data-control="table"]').click(function(t){let e=parseInt($(this).attr("data-id"));return u({categoryId:e}),!1}),t.find('table.table tbody [data-control="edit"]').click(function(a){let s=parseInt($(this).attr("data-id")),n=e.categories[s];return g({id:s,name:n.name,parentId:n.parent_id,callback:function(){b(t)}}),!1})})}var w=function(t){t?(t.auth&&window.app.cookies.set("auth",t.auth,30),t.id&&(window.app.account.id=t.id,window.app.cookies.set("account.id",t.id,3)),t.name&&(window.app.account.name=t.name,window.app.cookies.set("account.name",t.name,3)),t.dir&&(window.app.account.dir=t.dir,window.app.cookies.set("account.dir",t.dir,3))):(window.app.account.id=toInt(window.app.cookies.get("account.id")),window.app.account.name=window.app.cookies.get("account.name"),window.app.account.dir=window.app.cookies.get("account.dir"));let e=s("#account-control",`\n<div class="dropdown" id="div-login-user">\n\t<a href="javascript:void(0)" class="nav-link pr-0 leading-none" data-toggle="dropdown">\n\t<span class="avatar avatar-sm"><i data-feather="user" class="icon"></i></span>\n\t<span class="ms-2 d-none d-lg-block">\n\t<span class="text-default">${window.app.account.name}</span>\n\t</span>\n\t</a>\n\t<div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">\n\t\t<a class="dropdown-item" href="${window.app.account.dir}">\n\t\t<i class="dropdown-icon fe fe-home"></i> <span class="lang-my-page"></span>\n\t\t</a>\n\t\t<div class="dropdown-divider"></div>\n\t\t<button class="dropdown-item" id="btn-account-profile">\n\t\t<i class="dropdown-icon fe fe-user"></i> <span class="lang-profile"></span>\n\t\t</button>\n\t\t<button class="dropdown-item" id="btn-account-tables">\n\t\t<i class="dropdown-icon fe fe-grid"></i> <span class="lang-tables"></span>\n\t\t</button>\n\t\t<button class="dropdown-item" id="btn-account-categories">\n\t\t<i class="dropdown-icon fe fe-folder"></i> <span class="lang-categories"></span>\n\t\t</button>\n\t\t<div class="dropdown-divider"></div>\n\t\t<button class="dropdown-item" id="btn-account-sign-out">\n\t\t<i class="dropdown-icon fe fe-log-out"></i> <span class="lang-sign-out"></span>\n\t\t</button>\n\t</div>\n</div>\n\t`);e.find("#btn-account-profile").click(m),e.find("#btn-account-tables").click(u),e.find("#btn-account-categories").click(h),e.find("#btn-account-sign-out").click(x)},y=function(){let t=l("sign",'\n<div class="row">\n\t<div class="col col-login mx-auto">\n\t\t<form class="card" action="api/account/signIn/">\n\t\t\t<div class="card-header">\n\t\t\t\t<h3 class="card-title"><span class="lang-sign-in"></span></h3>\n\t\t\t\t<div class="card-options">\n\t\t\t\t\t<a href="javascript:void(0)" class="card-options-remove" data-toggle="card-remove"><i data-feather="x" class="icon"></i></a>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="card-body p-6">\n\t\t\t\t<div class="dimmer"><div class="loader"></div><div class="dimmer-content">\n\t\t\t\t<div class="form-group">\n\t\t\t\t\t<label class="form-label"><span class="lang-email-address"></span></label>\n\t\t\t\t\t<input type="email" class="form-control" name="email" placeholder="Email">\n\t\t\t\t</div>\n\t\t\t\t<div class="form-group">\n\t\t\t\t\t<label class="form-label">\n\t\t\t\t\t<span class="lang-password"></span>\n\t\t\t\t\t<a href="" class="float-right small" name="forgot-password"><span class="lang-msg-forgot-password"></span></a>\n\t\t\t\t\t</label>\n\t\t\t\t\t<input type="password" class="form-control" name="password" placeholder="Password">\n\t\t\t\t</div>\n\t\t\t\t<div class="form-footer">\n\t\t\t\t\t<button type="submit" class="btn btn-primary btn-block"><span class="lang-sign-in"></span></button>\n\t\t\t\t</div>\n\t\t\t\t</div></div>\n\t\t\t</div>\n\t\t</form>\n\t\t<div class="text-center text-muted">\n\t\t\t<span class="lang-msg-no-account"></span>\n\t\t\t<button class="btn btn-outline-primary" name="btn-to-sign-up"><span class="lang-sign-up"></span></button>\n\t\t</div>\n\t</div>\x3c!-- .col-login --\x3e\n</div>\x3c!-- .row --\x3e\n\t');t.find('[name="btn-to-sign-up"]').click(p),t.find('[name="forgot-password"]').click(()=>((function(){let t=l("forgot-password",`\n<div class="row">\n\t<div class="col col-login mx-auto">\n\t\t<form class="card" action="api/account/resetPassword/">\n\t\t\t<div class="card-header">\n\t\t\t\t<h3 class="card-title"><span class="lang-reset-password"></span></h3>\n\t\t\t\t<div class="card-options">\n\t\t\t\t\t<a href="javascript:void(0)" class="card-options-remove" data-toggle="card-remove"><i data-feather="x" class="icon"></i></a>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="card-body p-6">\n\t\t\t\t<div class="dimmer"><div class="loader"></div><div class="dimmer-content">\n\t\t\t\t<div class="form-group">\n\t\t\t\t\t<label class="form-label"><span class="lang-email-address"></span></label>\n\t\t\t\t\t<input type="email" class="form-control" name="email" placeholder="Email">\n\t\t\t\t</div>\n\t\t\t\t<div class="form-footer">\n\t\t\t\t\t<input type="hidden" name="lang" value="${window.app.lang.lang}"/>\n\t\t\t\t\t<button type="submit" class="btn btn-primary btn-block"><span class="lang-send-new-password"></span></button>\n\t\t\t\t</div>\n\t\t\t\t</div></div>\n\t\t\t</div>\n\t\t</form>\n\t</div>\x3c!-- .col-login --\x3e\n</div>\x3c!-- .row --\x3e\n\t`);t.find('[name="email"]').focus(),(new d).assign({form:t.find("form"),fields:{email:{required:!0,type:"email"}},callback:function(t){o("sign"),r("password-email-sent","")}})})(),!1)),t.find('[name="email"]').focus(),(new d).assign({form:t.find("form"),fields:{email:{required:!0,type:"email"},password:{required:!0,minLength:8}},callback:function(t){o("sign"),w(t)}})},x=function({init:t=!1}){s("#account-control",'\n<button class="btn btn-primary" id="btn-sign-in"><span class="lang-sign-in"></span></button>\n\t').find("#btn-sign-in").click(y),t||window.app.cookies.delete("auth")};let k=class{constructor(){this.IMG_EXTS=this.array2map("jpg,jpeg,gif,png".split(",")),this.AUDIO_EXTS=this.array2map("mp3,wav".split(","))}parse(t,e,a=!0){if(!t)return null;let s=t.indexOf("\t")<0&&t.indexOf(",")>=0,n=CSV.parse(t,{delimiter:s?",":"\t"});return this.validate(n,e,a)}validate(t,e,a=!0){if(t.length<3)return e&&e.setMessage({field:"words",error:"row-short",prefix:3}),null;if(t[0].length<2)return e&&e.setMessage({field:"words",error:"column-short",prefix:2}),null;let s=[];for(let e=0;e<t.length;e++){let n=!1;for(let s=0;s<t[e].length;s++){let i=t[e][s];if(void 0!==i&&null!==i){if(a)if((i=(i=(i=i.toString()).replace(/</g,"&lt;")).replace(/>/g,"&gt;")).indexOf("\n")>=0)i=i.replace(/\n/g,"<br/>");else if(e>0){let t=i.lastIndexOf(".");if(t>0){let e=i.slice(t+1);this.IMG_EXTS[e]?i='<img src="'+i+'" />':this.AUDIO_EXTS[e]&&(i='<audio src="'+i+'" controls onclick="event.stopPropagation();">'+i+"</audio>")}}}else i="";t[e][s]=i,i&&(n=!0)}n&&s.push(t[e])}return s.length<3?(e&&e.setMessage({field:"words",error:"row-short",prefix:3}),null):s}array2text(t){let e=[];for(let a=0;a<t.length;a++)e.push(t[a].join("\t"));return e.join("\n")}array2map(t){let e={};for(let a=0;a<t.length;a++)e[t[a]]=t[a];return e}};var j=function({title:t,list:e}){let a=!window.test;window.test={},test.title=e[0],test.list=e.slice(1),test.col1=0,test.col2=1,test.isRandom=!0,test.isMute=1==toInt(window.app.cookies.get("mute"));let s=l("test",escapeTemplate`
<div class="page-body">
  <div class="row row-cards">
	<div class="col-12">
		<div class="card test">
			<div class="card-header">
				<h3 class="card-title">${t}</h3>
				<div class="card-actions">
					<a href="javascript:void(0)" class="card-options-remove" data-toggle="card-remove"><i data-feather="x" class="icon"></i></a>
				</div>
			</div>
			<div class="card-header d-flex flex-wrap align-items-center">
				<select class="form-control custom-select w-auto" id="test-select-column1"></select>
				<button name="test-reverse" title="reverse" class="btn btn-icon btn-outline-secondary ms-1"><i data-feather="refresh-cw" class="icon"></i></button>
				<select class="form-control custom-select w-auto ms-1" id="test-select-column2"></select>
				
				<div class="selectgroup">
					<label class="form-selectgroup-item ms-2 my-auto" title="random">
						<input type="checkbox" name="test-random" value="1" class="form-selectgroup-input" checked="checked">
						<span class="form-selectgroup-label"><i data-feather="shuffle" class="icon"></i></span>
					</label>
				</div>
				<div class="selectgroup">
					<label class="form-selectgroup-item ms-2 my-auto" title="hide answers">
						<input type="checkbox" name="test-yesno" value="1" class="form-selectgroup-input">
						<span class="form-selectgroup-label"><i data-feather="eye-off" class="icon"></i></span>
					</label>
				</div>
				<div class="selectgroup">
					<label class="form-selectgroup-item ms-2 my-auto" title="mute">
						<input type="checkbox" name="test-mute" value="1" class="form-selectgroup-input">
						<span class="form-selectgroup-label"><i data-feather="volume-x" class="icon"></i></span>
					</label>
				</div>
				<div>
					<button name="test-retry" title="retry" class="btn btn-icon btn-outline-secondary ms-2"><i data-feather="rotate-cw" class="icon"></i></button>
				</div>
				<div class="input-icon ms-2">
					<span class="input-icon-addon"><i data-feather="search" class="icon"></i></span>
					<input name="test-search" type="text" class="form-control w-10 text-search">
				</div>
			</div>
			<div class="card-body">

<div class="row test-row-nav">
	<div class="col-3 text-left">
		<button name="test-before" class="btn btn-icon btn-outline-secondary"><i data-feather="chevron-left" class="icon"></i></button>
	</div>
	<div class="col-6 text-center">
		<div name="test-page" class="small text-muted">(1 / 8)</div>
	</div>
	<div class="col-3 text-right">
	</div>
</div>
<div class="row test-row-question">
	<div class="col-12">
		<div class="row">
			<div class="col-12 text-left">
				<div class="test-prompt"></div>
			</div>
			<div class="col-12 text-center">
				<div class="test-question"></div>
			</div>
		</div>
	</div>
</div>
<div class="row test-row-options">
</div>
<div class="row test-row-yesno">
	<div class="col-6 mt-2">
		<button class="btn btn-outline-primary w-100 btn-lg btn-block test-yes"><span class="lang-know"></span><i data-feather="chevron-down" class="icon"></i></button>
	</div>
	<div class="col-6 mt-2">
		<button class="btn btn-outline-danger w-100 btn-lg btn-block test-no"><span class="lang-not-know"></span><i data-feather="chevron-right" class="icon"></i></button>
	</div>
</div>
<div class="row test-row-answer mt-5">
	<span class="test-answer">
		<table class="table table-borderless">
		</table>
		<div class="btn-list mt-5 text-right">
			<button name="test-next" class="btn btn-outline-primary btn-lg btn-block"><i data-feather="chevron-right" class="icon"></i> <span class="lang-next"></span></button>
		</div>
	</span>
</div>
<div class="row test-row-end mt-5">
	<span class="test-answer text-center">
		<span name="test-end-message"><span class="lang-msg-finished"></span></span>
		<div class="btn-list mt-5">
			<button name="test-retry" class="btn btn-outline-secondary"><i data-feather="rotate-cw" class="icon"></i> <span class="lang-retry"></span></button>
			<button name="test-reverse" class="btn btn-outline-primary"><i data-feather="refresh-cw" class="icon"></i> <span class="lang-reverse"></span></button>
		</div>
	</span>
</div>

			</div><!-- .card-body -->
		</div><!-- .card -->
	</div><!-- .col-12 -->
  </div><!-- .row -->
</div>
	`);S("#test-select-column1",test.col1,-1),S("#test-select-column2",test.col2,test.col1),test.title.length<=2&&s.find("#test-select-column2").hide(),s.find("#test-select-column1").change(()=>{_(parseInt($("#test-select-column1").val())),P()}),s.find("#test-select-column2").change(()=>{test.col2=parseInt($("#test-select-column2").val()),P()}),s.find('[name="test-retry"]').click(()=>{P()}),s.find('[name="test-reverse"]').click(()=>{_(test.col2),P()}),s.find('[name="test-before"]').click(()=>{I()}),s.find('[name="test-next"]').click(()=>{M()}),s.find('[name="test-random"]').click(()=>{test.isRandom=!!$('[name="test-random"]').prop("checked"),P()}),s.find('[name="test-yesno"]').click(()=>{test.isYesNo=!!$('[name="test-yesno"]').prop("checked"),P()}),s.find('[name="test-mute"]').click(()=>{test.isMute=!!$('[name="test-mute"]').prop("checked"),window.app.cookies.set("mute",test.isMute?1:0)}),s.find('[name="test-search"]').change(()=>{test.searchText=$('[name="test-search"]').val(),P()}),s.find(".test-row-yesno button.test-yes").click(E),s.find(".test-row-yesno button.test-no").click(M),a&&document.addEventListener("keydown",function(t){test.test&&0!=$(".test").length&&(37==t.keyCode?I():39==t.keyCode?O():40==t.keyCode&&C())}),P()};function S(t,e,a){let s="";for(let t=0;t<test.title.length;t++)test.title[t]&&t!=a&&(s+=`<option value="${t}" ${t==e?'selected="selected"':""}>${test.title[t]}</option>`);$(t).html(s)}function _(t){let e=test.col1;test.col1=t,test.col2==test.col1&&(test.col2=e),S("#test-select-column1",test.col1,-1),S("#test-select-column2",test.col2,test.col1)}function P(){let t={},e=function(t){let e=[];for(let a=0;a<t.length;a++)e.push(t[a]);return e}(test.list);test.isRandom&&N(e),test.test=[];for(let a=0;a<e.length;a++){if(test.searchText){let t=!1;for(let s=0;s<test.title.length;s++)if(e[a][s]&&e[a][s].indexOf(test.searchText)>=0){t=!0;break}if(!t)continue}let s=e[a][test.col1];s&&(e[a][test.col2]&&(t[s]||(test.test.push({key:s,rows:[]}),t[s]=test.test.length),test.test[t[s]-1].rows.push(e[a])))}if(0==test.test.length)return void alert("no data");let a=test.title[test.col2];$(".test-prompt").html(a?a+" ?":"");for(let t=0;t<test.test.length;t++)test.test[t].index=t;test.pos=0,test.pages=[0,test.test.length],T()}function T(t,e){if(test.isAnswer=!1,e&&test.test.push(test.test[test.pos]),t&&(test.pos+=t,-1==t&&test.pos<test.test.length-1&&test.test[test.pos].key==test.test[test.test.length-1].key&&test.test.pop()),$(".test-row-answer").hide(),test.pos==test.test.length)test.isEnd=!0,$(".test-row-end").show(),$('[name="test-before"]').hide(),$(".test-row-question").hide(),$(".test-row-options").hide(),$(".test-row-yesno").hide(),test.pages[1]==test.test.length?($('[name="test-end-message"]').html('<span class="lang-msg-perfect"></span>'),test.isMute||q("audio/perfect.mp3")):($('[name="test-end-message"]').html('<span class="lang-msg-finished"></span>'),test.isMute||q("audio/end.mp3"));else{test.isEnd=!1,$(".test-question").html(test.test[test.pos].key),1==t&&test.pos==test.pages[test.pages.length-1]&&test.pages.push(test.test.length),-1==t&&test.pos==test.pages[test.pages.length-2]-1&&test.pages.pop();let e=test.pages.length-1,a="";for(let t=1;t<e;t++)a+=test.pages[t]-test.pages[t-1]+" ... ";let s=test.pages[e]-test.pages[e-1];if(a+="( "+(test.pos-test.pages[e-1]+1)+" / "+s+" )",test.test.length>test.pages[e]&&(a+=" ... "+(test.test.length-test.pages[e])),$('[name="test-page"]').html(a),test.isYesNo)$(".test-row-yesno").show(),$(".test-row-options").hide();else{$(".test-row-yesno").hide(),$(".test-row-options").show();let t=function(){let t,e=[],a=[],s=test.pages[1],n=test.test[test.pos].index,i={};for(let t=0;t<s;t++)test.test[t].index!=n&&e.push(t);N(e);let l=test.test[n].rows,o=null;for(let e=0;e<l.length;e++)(t=l[e][test.col2])&&(o||(o=t),i[t]=t);a.push({isAnswer:!0,label:o});for(let s=0;s<e.length;s++){l=test.test[e[s]].rows;let n=!1;for(let e=0;e<l.length;e++)if((t=l[e][test.col2])&&!i[t]){n=!0;break}if(n&&(a.push({label:t}),i[t]=t,a.length>=4))break}return N(a),a}(),e="";for(let a=0;a<t.length;a++){let s=t[a].label;e+=`<div class="col-md-6 mt-2">\n\t\t\t\t<button class="btn btn-outline-secondary w-100 btn-lg btn-block ${t[a].isAnswer?"test-yes":"test-no"}">${s}</button>\n\t\t\t\t</div>`}$(".test-row-options").html(e),$(".test-row-options button.test-yes").click(E),$(".test-row-options button.test-no").click(M)}$(".test-row-question").show(),test.pos>0?$('[name="test-before"]').show():$('[name="test-before"]').hide(),$(".test-row-end").hide()}}function I(){test.isPreview||(test.isAnswer?T():test.pos>0&&T(-1))}function M(){O(!0)}function O(t){(test.isYesNo||t||test.isAnswer)&&(test.isEnd||(test.isAnswer?T(1,!0):function(){test.isAnswer=!0;let t=`<tr><th>${test.title[test.col1]}</th><td>${test.test[test.pos].key}</td></tr>`,e=test.test[test.pos].rows;for(let a=0;a<e.length;a++)if(e[a][test.col2]){t+=`<tr><th>${test.title[test.col2]}</th><td>${e[a][test.col2]}</td></tr>`;for(let s=0;s<test.title.length;s++)e[a][s]&&s!=test.col1&&s!=test.col2&&(t+=`<tr><th>${test.title[s]||""}</th><td>${e[a][s]}</td></tr>`);break}$(".test-row-answer table").html(t),$(".test-row-answer").show(),$('[name="test-before"]').show(),$(".test-row-question").hide(),$(".test-row-options").hide(),$(".test-row-yesno").hide()}()))}function E(){C(!0)}function C(t){(test.isYesNo||t)&&(test.isAnswer||test.isEnd||(test.isMute||q("audio/coin.mp3"),test.isYesNo?T(1):($(".test-question").html('<span class="test-ok"><i data-feather="check-circle" class="icon"></i></span>'),setTimeout(function(){T(1)},1e3))))}function q(t){let e=new Audio;e.src=window.app.adjustUrl(t),e.volume=.5,e.play()}function N(t){for(let e=t.length-1;e>0;e--){let a=Math.floor(Math.random()*(e+1)),s=t[e];t[e]=t[a],t[a]=s}}var A=function({title:t,words:e,description:a,category:s,isPublic:n,tableId:i,imageFile:o}){e||(e="English,Spanish\nHello,Hola\nGood morning,Buenos días\nGoodbye,Adiós\nThank you,Gracias\nSorry,Lo siento\nI don't know,No lo sé");let c=l("edit",escapeTemplate`
<div class="page-body">
  <div class="row row-cards">
	<div class="col-12">
		<form class="card" action="api/table/save/">
			<input type="hidden" name="table_id" value="${i}" />
			<div class="card-header">
				<div class="form-group col-10 mb-0">
				<input type="text" name="title" class="form-control" value="${t}" placeholder="Title" maxlength="100" />
				</div>
				<div class="card-options">
					<a href="javascript:void(0)" class="card-options-remove" data-toggle="card-remove"><i data-feather="x" class="icon"></i></a>
				</div>
			</div>
			<div class="card-body">
				<div class="dimmer"><div class="loader"></div><div class="dimmer-content">
				<div class="btn-list">
					<button name="btn-test" class="btn btn-primary"><i data-feather="play" class="icon"></i> <span class="lang-start-test"></span></button>
				</div>
				<div class="form-group mt-2">
					<div class="lang-msg-1st-row-is-title"></div>
					<div name="jexcel" style="width:100%;overflow-x:auto;"></div>
					<input type="hidden" name="words" value="">
				</div>
				<div class="row">
					<div class="col-md-6 col-lg-3">
						<div class="form-group">
							<label class="form-label"><span class="lang-description"></span></label>
							<textarea name="description" rows="3" class="form-control">${a}</textarea>
						</div>
					</div>
					<div class="col-md-6 col-lg-3">
						<div class="form-group">
							<label class="form-label"><i data-feather="folder" class="icon"></i> <span class="lang-category"></span></label>
							<div class="input-group">
								<input type="text" name="category" class="form-control" value="${s}" maxlength="100">
							</div>
						</div>
					</div>
					<div class="col-md-6 col-lg-3">
						<div class="form-group">
							<label class="form-label"><span class="lang-image-file"></span></label>
							<input name="image_file" type="file" class="form-control" />
						</div>
					</div>
					<div class="col-md-6 col-lg-3">
						<div class="form-group">
							<label class="form-label"><span class="lang-option"></span></label>
							<label class="custom-switch">
								<input type="checkbox" class="custom-switch-input" name="private" value="1" ${!n?"checked":""}>
								<span class="custom-switch-indicator"></span>
								<span class="custom-switch-description"><span class="lang-private"></span></span>
							</label>
						</div>
					</div>
				</div>
				</div></div>
			</div><!-- .card-body -->
			<div class="card-footer d-flex align-items-center">
				<button type="submit" class="btn btn-primary"><i data-feather="save" class="icon"></i> <span class="lang-save"></span></button>
				<label class="custom-control custom-checkbox ms-3" name="control-overwrite">
					<input type="checkbox" class="custom-control-input" name="overwrite" value="1" ${i?"checked":""}>
					<span class="custom-control-label"><span class="lang-overwrite"></span></span>
				</label>
			</div>
		</form><!-- .card -->
	</div><!-- .col-12 -->
  </div><!-- .row -->
</div>
	`),r=c.find('[name="jexcel"]'),p=(new k).parse(e,null,!1),m=[];p||(p=[["question","answer"]]);for(let t=0;t<p[0].length;t++)m.push({type:"text",width:200});let u=jspreadsheet(r[0],{data:p,columns:m});p[p.length-1][0]&&u.insertRow(),i||c.find('[name="control-overwrite"]').hide();let f=new d;f.assign({form:c.find("form"),fields:{title:{required:!0}},validate:function(t){return!!(p=(new k).validate(u.getData(),f,!1))&&(window.app.cookies.get("auth")?(c.find('[name="words"]').val((new k).array2text(p)),!0):(y(),!1))},callback:function(t){t.table_path&&window.app.goto({url:t.table_path,cb:!0,post:!0})},confirmMessage:"save?"}),c.find('[name="btn-test"]').click(t=>{t.preventDefault(),t.stopPropagation();let e=c.find('[name="title"]').val(),a=(new k).validate(u.getData(),f);a&&j({title:e,list:a})}),window.app.account&&window.app.account.dir&&window.app.readJson(window.app.account.dir,function(t){if(t.categories){let e="";for(let a in t.categories){let s=t.categories[a].name;e+=`<a class="dropdown-item" href="javascript:void(0);" onclick="$(this).parent().parent().parent().find('input').val('${s}');">${s}</a>`}e&&c.find('[name="category"]').parent().append(`\n<button data-bs-toggle="dropdown" type="button" class="btn dropdown-toggle dropdown-toggle-split"></button>\n<div class="dropdown-menu dropdown-menu-end">\n${e}\n</div>\n\t\t\t\t\t`)}})},L=function({list:t,userId:e=0,isCategory:a=!1}){let s="";if(!t)return s;for(let n in t){let i=t[n],l="";i.description&&(l+=`<div class="text-muted">${i.description}</div>`),!e&&i.user_url&&(l+=`\n<div class="d-flex align-items-center${i.description?" pt-5":""}">\n\t<div>\n\t\t<a href="${i.user_url}" class="text-muted">@${i.user_name}</a>\n\t</div>\n</div>\n\t\t\t`),l&&(l=`<div class="card-body d-flex flex-column">${l}</div>`);let o="";i.image_file&&(o=`<div class="img-responsive img-responsive-21x9 card-img-top" style="background-image: url(${i.url}${i.image_file})"></div>`),s+=`\n<div class="col-md-6 col-lg-3">\n\t<div class="card${a?" card-stacked":""}">${o}\n\t\t<div class="card-header">\n\t\t\t<h3 class="card-title"><a href="${i.url}">${i.name}</a></h3>\n\t\t</div>\n\t\t${l}\n\t</div>\n</div>\n\t\t`}return s};function J(t,e){let a="",s=e[t.id];if(s){for(let t in s)a+=J(s[t],e);a=`<div class="card-body d-flex flex-column"><div class="row row-cards">${a}</div></div>`}return`\n\t<div class="col-12"><div class="card card-stacked">\n\t\t<div class="card-header">\n\t\t\t<h3 class="card-title"><a href="${t.url}">${t.name}</a></h3>\n\t\t</div>\n\t\t${a}\n\t</div></div>\n\t`}var D=function(){let t=$("#main-container"),e=t.find('[name="user_id"]').val(),a=t.find(".user").text(),s=t.find(".user").attr("href"),n=t.find('[name="category_id"]').val(),i=t.find(".category").text(),l=t.find(".category").attr("href"),o=t.find('[name="table_id"]').val(),r=parseInt(t.find('[name="private"]').val()),d=t.find(".title").text(),p=t.find(".description").text(),m=t.find('[name="image_file"]').val(),u=t.find(".words").text(),f=(encodeURIComponent(document.URL),e==window.app.account.id),v=(new k).parse(u),g="<div></div>";m&&(g=`<div class="img-responsive img-responsive-21x9 card-img-top" style="background-image: url(${m})"></div>`),t=c(escapeTemplate`
<div class="page-body">
  <div class="row row-cards">
	<div class="col-lg-9">
		<div class="card">${{raw:g}}
			<div class="card-header">
				<h3 class="card-title">${d}</h3>
				<div class="card-options">
				<div class="btn-list">
				</div>
				</div>
			</div>
			<div class="card-body">
				<a href="${l}" class="text-default" id="a-category">${i}</a>
				<div class="d-flex align-items-center pt-3">
					<div class="avatar avatar-sm me-2"><i data-feather="user" class="icon"></i></div>
					<div>
						<a href="${s}" class="text-default" id="a-user">${a}</a>
					</div>
				</div>
				<div class="mt-5">${p}</div>
				<div class="btn-list mt-5">
					<button class="btn btn-primary" name="btn-test"><i data-feather="play" class="icon"></i> <span class="lang-start-test"></span></button>
					<button class="btn btn-outline-primary" name="btn-edit"><i data-feather="edit" class="icon"></i> <span class="lang-edit"></span></button>
				</div>
				<div class="table-responsive mt-2">${{raw:function(t){if(!t)return"";let e='<table class="table mb-0 table-bordered">',a=0;for(let s=0;s<t.length;s++){0==s&&(e+='<thead class="thead-light">');let n=t[s],i=0==s?"th":"td";e+="<tr>",0==s&&(a=n.length);let l=Math.max(a,n.length);for(let t=0;t<l;t++){let a=t<n.length?n[t]:"";e+=`<${i}>${a}</${i}>`}e+="</tr>",0==s&&(e+="</thead>")}return e+="</table>"}(v)}}</div>
			</div>
		</div>
	</div>
	<div class="col-lg-3">
		<div class="row">
			<div class="col-md-6 col-lg-12 mb-5" id="nav-category"></div>
			<div class="col-md-6 col-lg-12 mb-5" id="nav-user"></div>
		</div>
	</div>
  </div>
</div>
	`),v?(t.find('[name="btn-edit"]').click(()=>(A({title:d,words:u,description:p,category:i,isPublic:!!f&&!r,tableId:f?o:0,imageFile:m}),!1)),t.find('[name="btn-test"]').click(()=>(j({title:d,list:v}),!1))):(t.find('[name="btn-edit"]').hide(),t.find('[name="btn-test"]').hide()),n?window.app.readJson(l,function(e){t.find("#a-category").text(e.name);let a=`<div class="card">\n\t\t\t<div class="card-header"><h3 class="card-title"><a href="${l}"><i data-feather="folder" class="icon"></i> ${e.name}</a></h3></div>\n\t\t\t<div class="list-group list-group-flush">`;for(let t in e.categories){let s=e.categories[t].id==n?" active":"";a+=`<a href="${e.categories[t].url}" class="list-group-item list-group-item-action${s}">\n\t\t\t\t${e.categories[t].name}</a>`}for(let t in e.tables){let s=e.tables[t].id==o?" active":"";a+=`<a href="${e.tables[t].url}" class="list-group-item list-group-item-action${s}">\n\t\t\t\t${e.tables[t].name}</a>`}a+="</div>\n\t\t\t</div>",t.find("#nav-category").html(a)}):(t.find("#a-category").hide(),t.find("#nav-category").hide()),window.app.readJson(s,function(e){t.find("#a-user").text(e.name);let a=`<div class="card">\n\t\t<div class="card-header"><h3 class="card-title"><a href="${s}"><i data-feather="user" class="icon"></i> ${e.name}</a></h3></div>\n\t\t<div class="list-group list-group-flush">`;for(let t in e.categories){if(e.categories[t].parent_id>0)continue;let s=e.categories[t].id==n?" active":"";a+=`<a href="${e.categories[t].url}" class="list-group-item list-group-item-action${s}">\n\t\t\t${e.categories[t].name}</a>`}for(let t in e.tables){let s=e.tables[t].id==o?" active":"";a+=`<a href="${e.tables[t].url}" class="list-group-item list-group-item-action${s}">\n\t\t\t${e.tables[t].name}</a>`}a+="</div>\n\t\t</div>",t.find("#nav-user").html(a)})};window.app=new class{constructor({rootDirs:t}={}){this.TITLE="memorize words",this.setPrototypeFunctions(),this.rootPath=this.getRootPath(t),this.args=this.getArgs(),this.data={},this.account={},this.includedScripts={},this.includedStyles={}}setTitle(t){t=t?t+" - "+this.TITLE:this.TITLE,document.title=t}setPrototypeFunctions(){String.prototype.startsWith||(String.prototype.startsWith=function(t){return t=t.toString(),this.toString().slice(0,t.length)==t}),String.prototype.endsWith||(String.prototype.endsWith=function(t){return t=t.toString(),this.toString().slice(0-t.length)==t}),window.escapeHtml||(window.escapeHtml=function(t,e=!1){return t?t instanceof Object&&t.raw?t.raw:(t=(t=t.toString()).replace(/[&'`"<>]/g,function(t){return{"&":"&amp;","'":"&#x27;","`":"&#x60;",'"':"&quot;","<":"&lt;",">":"&gt;"}[t]}),e&&(t=t.replace(/\n/g,"<br/>")),t):""}),window.escapeTemplate||(window.escapeTemplate=function(t,...e){let a=[];for(let s=0;s<t.length;s++)t[s]&&a.push(t[s]),s<e.length&&e[s]&&a.push(escapeHtml(e[s],!0));return a.join("")}),window.toInt||(window.toInt=function(t,e=0){if(!t)return e;let a=parseInt(t.toString());return a||e}),jQuery.fn.extend({setSelectOption:function(t,e){let a="";for(let s in t)a+=`<option value="${s}" ${s==e?'selected="selected"':""}>${t[s]}</option>`;return jQuery(this).html(a),this}})}adjustUrl(t){return t.startsWith("http:")||t.startsWith("https:")||t.startsWith("/")?t:this.rootPath+t}includeScript(t,e=!1){if(!t||this.includedScripts[t])return this;this.includedScripts[t]=!0;let a=document.createElement("script");return a.type="text/javascript",e&&(a.async=!0),a.src=this.adjustUrl(t),document.getElementsByTagName("head")[0].appendChild(a),this}includeStyle(t){if(!t||this.includedStyles[t])return this;this.includedStyles[t]=!0;let e=document.createElement("link");return e.rel="stylesheet",e.href=this.adjustUrl(t),document.getElementsByTagName("head")[0].appendChild(e),this}getRootPath(t){let e="/";if(t){Array.isArray(t)||(t=[t]);for(let a in t){let s=t[a],n=location.pathname.indexOf(s);if(!(n<0)){e=location.pathname.slice(0,n+s.length);break}}}return e}getArgs(){let t={};if(location.search){let e=location.search.substring(1).split("&");for(let a in e){let s=e[a],n=null,i=s.indexOf("=");i>=0&&(n=s.slice(i+1),s=s.slice(0,i)),t[s]=decodeURIComponent(n)}}return t}readJson(t,e,a,s,n=!1){if(s&&!s.startProcess())return;(t=this.adjustUrl(t)).indexOf("/api/")<0&&t.endsWith("/")&&(t+="index.json");let i={};a?(i.data=a,i.type="POST",n&&(i.dataType="JSON",i.processData=!1,i.contentType=!1)):(t+=t.indexOf("?")<0?"?":"&",t+=".cb="+(new Date).getTime(),i.type="GET"),i.url=t,i.dataType="text",i.timeout=1e4,$.ajax(i).done(function(t,a,n){try{let a=JSON.parse(t);s&&s.setMessages(a.responseMessages),s&&a.error||e&&(e(a),feather.replace())}catch(e){console.log(e),console.log(t)}}).fail(function(e,a,n){s&&s.setMessage({error:"error",suffix:": "+e.status+" "+a}),console.log(t+": "+e.status+" "+a),console.log(n)}).always(function(){s&&s.endProcess()})}goto({url:t,cb:e=!1,post:a=!1}){if(a){let a="";e&&(a=`<input type="hidden" name="_cb" value="${(new Date).getTime()}" />`),a=`<form method="post" action="${t}" id="goto" style="display:none;">${a}</form>`,$("body").append(a),$("#goto").submit()}else{let a=t;e&&(a+=t.indexOf("?")<0?"?":"&",a+="_cb="+(new Date).getTime()),location.href=a}}}({rootDirs:"/public/"}),window.app.includeStyle("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css").includeStyle("https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,300i,400,400i,500,500i,600,600i,700,700i&amp;subset=latin-ext").includeScript("/js/shared/bootstrap.bundle.min.js").includeScript("/js/shared/tabler.min.js").includeStyle("https://mochihashi.github.io/static/tabler/assets/css/tabler.min.css").includeScript("https://mochihashi.github.io/static/jexcel/jexcel.js").includeStyle("https://mochihashi.github.io/static/jexcel/jexcel.css").includeScript("https://mochihashi.github.io/static/jexcel/jsuites.js").includeStyle("https://mochihashi.github.io/static/jexcel/jsuites.css").includeStyle("/css/style.css").includeScript("/js/shared/feather.min.js"),window.app.cookies=new class{constructor(){this.map={};let t=document.cookie;if(t){t=t.split("; ");for(let e in t){let a=t[e].split("=");a.length<2||!a[1]||"undefined"==a[1]||(this.map[a[0]]=decodeURIComponent(a[1]))}}}get(t){return this.map[t]}set(t,e,a,s,n){this.map[t]=e;let i=t+"="+encodeURIComponent(e);n||(n="/"),a||(a=100),i+="; path="+n,i+="; max-age="+3600*a*24,s&&(i+="; domain="+s),document.cookie=i}delete(t,e,a){if(!this.map[t])return;this.map[t]=null;let s=t+"=";a||(a="/"),s+="; path="+a,s+="; max-age=0",e&&(s+="; domain="+e),document.cookie=s}},window.app.lang=new class{constructor({langNames:t={en:"English"},defaultLang:e="en",cssPath:a="css/lang/lang.",jsPath:s=null}){this.langNames=t,this.cssPath=a,this.jsPath=s,this.texts={};let n=window.app.cookies.get("lang");if(!n||!this.langNames[n]){n=e;let t=window.navigator.languages||window.navigator.userLanguage||window.navigator.language||[];Array.isArray(t)||(t=[t]);for(let e in t){let a=t[e];if(this.langNames[a]){n=a;break}}}this.setLang(n)}setLang(t){this.lang=t,$(document).ready(function(){$(document.body).attr("lang",t)}),window.app.includeStyle(this.cssPath+t+".css"),this.jsPath&&window.app.includeScript(this.jsPath+t+".js",!0),window.app.cookies.set("lang",t),document.getElementsByTagName("html")[0].lang=t}getText(t){let e;return this.texts[this.lang]&&(e=this.texts[this.lang][t]),e||(e=t),e}render(t="#select-lang"){let e="";for(let t in this.langNames){let a=this.langNames[t];e+=`<option value="${t}"${t==this.lang?' selected="selected"':""}>${a}</option>`}$(t).html(e).change(function(){window.app.lang.setLang($("option:selected",this).val())})}}({langNames:{en:"English",zh:"中文",ja:"日本語",ko:"한국어"},cssPath:"css/lang/lang.",jsPath:"js/lang/lang."}),$(document).ready(function(){!function(){let t=s(".header",`\n<header class="navbar navbar-expand-md d-print-none">\n\t<div class="container-xl">\n\t\t<a class="navbar-brand" href="${window.app.rootPath}">\n\t\t<i data-feather="paperclip" class="icon"></i>\n\t\tmemorize words\n\t\t</a>\n\t\t<div class="btn-list">\n\t\t\t<button class="btn btn-outline-primary" name="btn-create"><i data-feather="plus-circle" class="icon"></i> <span class="lang-create"></span></button>\n\t\t\t<select class="form-control custom-select w-auto" id="select-lang">\n\t\t\t</select>\n\t\t\t<span id="account-control">\n\t\t\t</span>\n\t\t</div>\x3c!-- .container-xl --\x3e\n\t</div>\x3c!-- .d-flex --\x3e\n</header>\n`);$(".header").removeClass("py-4"),$(".header").next(".my-3").removeClass("my-3").removeClass("my-md-5").addClass("page-wrapper"),t.find('[name="btn-create"]').click(A),x({init:!0});let e=window.app.cookies;e.get("account.id")&&e.get("account.name")&&e.get("account.dir")?w():e.get("auth")&&window.app.readJson("api/account/autoSignIn/",function(t){t.error?window.app.cookies.delete("auth"):w(t)})}(),s(".footer",'\n<div class="container">\n\t<div class="row align-items-center flex-row">\n\t\t<div class="col-3 col-lg-auto mt-3 mt-lg-0 text-center">\n\t\t\t<a target="_blank" href="/readme.html">Getting started</a>\n\t\t</div>\x3c!-- .col-3 --\x3e\n\t\t<div class="col-9 col-lg-auto mt-3 mt-lg-0 text-center">\n\t\t\tThanks for visiting! @author <a target="_blank" href="https://facebook.com/hinowa">facebook.com/hinowa</a>\n\t\t</div>\x3c!-- .col-9 --\x3e\n\t</div>\x3c!-- .row --\x3e\n</div>\x3c!-- .container --\x3e\n'),window.app.lang.render("#select-lang"),window.app.args.msg&&r(window.app.args.msg);let t=$('#main-container [name="page_type"]').val();"top"==t?$("#search-text").change(function(){let t=$("#search-text").val();window.app.readJson("api/top/search/",function(t){let e="";(e=L({list:t.tables}))||(e='<span class="lang-msg-no-data"></span>'),$("#row-tables").html(e),(e=L({list:t.categories,isCategory:!0}))||(e='<span class="lang-msg-no-data"></span>'),$("#row-categories").html(e)},{q:t})}):"table"==t?D():"category"==t?function(){let t=$("#main-container"),e=toInt(t.find('[name="user_id"]').val()),a=t.find(".user").text(),s=t.find(".user").attr("href"),n=t.find(".category").text(),i=t.find(".category").attr("href");t=c(escapeTemplate`
<div class="page-header">
	<h1 class="page-title">${n}</h1>
	<div class="d-flex align-items-center pt-5 col-12">
		<div class="avatar avatar-sm me-2"><i data-feather="user" class="icon"></i></div>
		<div>
			<a href="${s}" class="text-default">${a}</a>
		</div>
	</div>
</div>
<div class="page-body">
  <div class="row row-cards" id="row-tables"></div>
</div>
	`),window.app.readJson(i,function(a){t.find(".page-title").text(a.name);let s="";s+=L({list:a.categories,userId:e,isCategory:!0}),(s+=L({list:a.tables,userId:e}))||(s='<span class="lang-msg-no-data"></span>'),t.find("#row-tables").html(s).addClass("row-cards")})}():"user"==t&&function(){let t=$("#main-container"),e=toInt(t.find('[name="user_id"]').val()),a=t.find(".user").text(),s=t.find(".user").attr("href");t=c(escapeTemplate`
<div class="page-header">
	<h1 class="page-title">
		<div class="d-flex align-items-center pt-3">
			<div class="avatar avatar-sm me-2"><i data-feather="user" class="icon"></i></div>
			<div>
				<a href="${s}" class="text-default" id="a-user">${a}</a>
			</div>
		</div>
	</h1>
</div>
<div class="page-body">
  <div class="row row-cards" id="row-tables"></div>
</div>
	`),window.app.readJson(s,function(a){t.find("#a-user").text(a.name);let s="",n={};for(let t in a.categories){let e=a.categories[t].parent_id;e>0&&(n[e]||(n[e]=[]),n[e].push(a.categories[t]))}for(let t in a.categories)a.categories[t].parent_id>0||(s+=`\n<div class="col-md-6 col-lg-4">\n\t${J(a.categories[t],n)}\n</div>\n\t\t\t`);(s+=L({list:a.tables,userId:e}))||(s='<span class="lang-msg-no-data"></span>'),t.find("#row-tables").html(s).addClass("row-cards")})}(),"127.0.0.1"!=location.hostname&&"mem.local"!=location.hostname&&window.app.includeScript("https://mochihashi.github.io/static/pixel/tracking.js"),setTimeout(function(){feather.replace()},100)})}]);