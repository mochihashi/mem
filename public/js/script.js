!function(t){var e={};function s(a){if(e[a])return e[a].exports;var n=e[a]={i:a,l:!1,exports:{}};return t[a].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=e,s.d=function(t,e,a){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)s.d(a,n,function(e){return t[e]}.bind(null,n));return a},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=0)}([function(t,e,s){"use strict";s.r(e);function a(t,e){return $(t).html(e)}function n(){window.app.pages={},window.app.activePage="#main-container"}function i(t,e=!0){let s="overlay-container-"+t;return e&&(s="#"+s),s}function l(t,e){window.app.pages||n();let s=window.app.pages[t];s&&i(s)==window.app.activePage||(s&&$(i(s)).remove(),s=Object.keys(window.app.pages).length+1,$("#main-container").parent().append(`<div class="container overlay-container" id="${i(s,!1)}">`),window.app.pages[t]=s,$(window.app.activePage).hide(),window.app.activePage=i(s));let a=$(window.app.activePage).html(e).show();return a.find(".card-options-remove").click(function(e){e.preventDefault(),o(t)}),a.find(".card-options-fullscreen").click(function(t){t.preventDefault(),a.find(".card").toggleClass("card-fullscreen")}),a}function o(t){let e=window.app.pages[t];$(i(e)).remove(),window.app.pages[t]=null;let s=0;for(let t in window.app.pages){let e=window.app.pages[t];e&&e>s&&(s=e)}0==s?n():window.app.activePage=i(s),$(window.app.activePage).show()}function c(t){return $(".overlay-container").remove(),n(),$("#main-container").html(t).show()}var r=function(t,e=""){let s=l("message",`\n<div class="row">\n\t<div class="col col-login mx-auto">\n\t\t<div class="card">\n\t\t\t<div class="card-header">\n\t\t\t\t<h3 class="card-title">${e?'<span class="lang-msg-'+e+'"></span>':""}</h3>\n\t\t\t\t<div class="card-options">\n\t\t\t\t\t<a href="javascript:void(0)" class="card-options-remove" data-toggle="card-remove"><i class="fe fe-x"></i></a>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="card-body p-6">\n\t\t\t\t<span class="lang-msg-${t}"></span>\n\t\t\t\t<div class="btn-list mt-3"></div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\x3c!-- .col-login --\x3e\n</div>\x3c!-- .row --\x3e\n\t`);"activated"==t?(s.find(".btn-list").html('<button class="btn btn-primary"><span class="lang-sign-in"></span></button>'),s.find(".btn-list button").click(y)):"activate-expired"==t&&(s.find(".btn-list").html('<button class="btn btn-primary"><span class="lang-sign-up"></span></button>'),s.find(".btn-list button").click(p))};let d=class{constructor(){this.validator=new class{validate(t,e){if(this.error="",this.prefix="",this.suffix="",0==(t=t.toString()).length)return!e.required||(this.error="required",!1);if("email"==e.type){const e="^[a-zA-Z0-9\\.\\$=_\\-\\^~\\+`]+@[a-zA-Z0-9\\._-]+$";if(!t.match(new RegExp(e)))return this.error="not-email",!1}if(e.minLength&&t.length<e.minLength)return this.prefix=e.minLength,this.error="length-short",!1;if(!e.html){if(t.indexOf("<")>=0)return this.suffix=": &lt;",this.error="invalid-char",!1;if(t.indexOf(">")>=0)return this.suffix=": &gt;",this.error="invalid-char",!1}return!0}}}assign({form:t,callback:e,fields:s,validate:a,confirmMessage:n}){this.form=t;let i=this;if(s)for(let e in s){let a=s[e];t.find('[name="'+e+'"]').change(()=>i.validate(e,a))}t.submit(function(l){if(l.preventDefault(),l.stopPropagation(),s){let e=!1;for(let a in s){let n=s[a];i.validate(a,n)||(e||t.find('[name="'+a+'"]').focus(),e=!0)}if(e)return}a&&!a(t)||n&&!confirm(window.app.lang.getText(n))||window.app.readJson(t.attr("action"),e,t.serialize(),i)})}setMessages(t){if(this.setMessage(),t)for(let e=t.length-1;e>=0;e--)this.addMessage(t[e],e)}setMessage(t){this.form.parent().find(".alert").remove(),t&&this.addMessage(t)}addMessage(t,e){let s=t.error?"danger":"primary",a=t.text?t.text:t.error,n=t.prefix||"",i=t.suffix||"",l=t.field||"";if(a&&(a=`<span class="lang-msg-${a}"></span>`),t.error&&l){let t=this.form.find('[name="'+l+'"]');if(1==t.length)return t.addClass("is-invalid"),t.parent().append(`<div class="invalid-feedback">${n}${a}${i}</div>`),void(0==e&&form.find('[name="'+l+'"]').focus())}l&&(l=`[<span class="lang-${l}"></span>] `),this.form.parent().prepend(`\n<div class="alert alert-${s} alert-dismissible">\n\t<button type="button" class="close" data-dismiss="alert"></button>\n\t${l}${n}${a}${i}\n</div>\n\t\t`)}startProcess(){return!this.isProcessing&&(this.isProcessing=!0,this.form.find(".dimmer").addClass("active"),!0)}endProcess(){this.isProcessing=!1,this.form.find(".dimmer").removeClass("active")}val(t){let e=$(t);if(e.is(":disabled"))return"";let s=e.attr("type"),a=e.attr("name"),n=e.val();if(void 0===a||""==a||""==n)return"";if("submit"==s||"button"==s)return"";if("radio"==s||"checkbox"==s){let t=[];e.each(function(){this.checked&&t.push(this.val())}),n=t.join(",")}return n}validate(t,e){let s=this.form.find('[name="'+t+'"]'),a=this.val(s);if(s.parent().find(".invalid-feedback").remove(),this.validator.validate(a,e))return 1==s.length&&s.removeClass("is-invalid"),!0;{1==s.length&&s.addClass("is-invalid");let t=this.validator.error,e=this.validator.prefix,a=this.validator.suffix;return s.parent().append(`<div class="invalid-feedback">${e}<span class="lang-msg-${t}"></span>${a}</div>`),!1}}};var p=function(){let t=l("sign",`\n<div class="row">\n\t<div class="col col-login mx-auto">\n\t\t<form class="card" action="api/account/signUp/">\n\t\t\t<div class="card-header">\n\t\t\t\t<h3 class="card-title"><span class="lang-sign-up"></span></h3>\n\t\t\t\t<div class="card-options">\n\t\t\t\t\t<a href="javascript:void(0)" class="card-options-remove" data-toggle="card-remove"><i class="fe fe-x"></i></a>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="card-body p-6">\n\t\t\t\t<div class="dimmer"><div class="loader"></div><div class="dimmer-content">\n\t\t\t\t<div class="form-group">\n\t\t\t\t\t<label class="form-label"><span class="lang-name"></span></label>\n\t\t\t\t\t<input type="text" class="form-control" name="name" placeholder="Name" maxlength="50">\n\t\t\t\t</div>\n\t\t\t\t<div class="form-group">\n\t\t\t\t\t<label class="form-label"><span class="lang-email-address"></span></label>\n\t\t\t\t\t<input type="email" class="form-control" name="email" placeholder="Email" maxlength="100">\n\t\t\t\t</div>\n\t\t\t\t<div class="form-group">\n\t\t\t\t\t<label class="form-label"><span class="lang-password"></span></label>\n\t\t\t\t\t<input type="password" class="form-control" name="password" placeholder="Password" maxlength="50">\n\t\t\t\t</div>\n\t\t\t\t<div class="form-footer">\n\t\t\t\t\t<input type="hidden" name="lang" value="${window.app.lang.lang}"/>\n\t\t\t\t\t<button type="submit" class="btn btn-primary btn-block"><span class="lang-create-new-account"></span></button>\n\t\t\t\t</div>\n\t\t\t\t</div></div>\n\t\t\t</div>\n\t\t</form>\n\t\t<div class="text-center text-muted">\n\t\t\t<span class="lang-msg-already-have-account"></span>\n\t\t\t<button class="btn btn-outline-primary" name="btn-to-sign-in"><span class="lang-sign-in"></span></button>\n\t\t</div>\n\t</div>\x3c!-- .col-login --\x3e\n</div>\x3c!-- .row --\x3e\n\t`);t.find('[name="btn-to-sign-in"]').click(y),t.find('[name="name"]').focus(),(new d).assign({form:t.find("form"),fields:{name:{required:!0,minLength:3},email:{required:!0,type:"email"},password:{required:!0,minLength:8}},callback:function(t){o("sign"),r("activation-email-sent","account-registered")}})},u=function(){let t=l("profile",escapeTemplate`
<div class="row">
	<div class="col col-login mx-auto">
		<form class="card" action="api/account/update/">
			<div class="card-header">
				<h3 class="card-title"><span class="lang-profile"></span></h3>
				<div class="card-options">
					<a href="javascript:void(0)" class="card-options-remove" data-toggle="card-remove"><i class="fe fe-x"></i></a>
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
					<button type="submit" class="btn btn-primary"><i class="fe fe-save mr-2"></i><span class="lang-save"></span></button>
				</div>
				</div></div>
			</div>
		</form>
	</div><!-- .col-login -->
</div><!-- .row -->
	`);t.find('[name="name"]').focus();let e=new d;e.assign({form:t.find("form"),fields:{name:{minLength:3},email:{type:"email"},password:{minLength:8}},callback:function(t){e.setMessage({text:"updated"}),t.name&&w(t)},validate:function(s){return!!(t.find('[name="name"]').val()||t.find('[name="email"]').val()||t.find('[name="password"]').val())||(e.setMessage({error:"required"}),!1)},confirmMessage:"update?"})},m=function({categoryId:t=0}){let e=l("account_table_list",escapeTemplate`
<div class="row">
	<div class="col col-lg-9 mx-auto">
		<form class="card">
			<div class="card-header">
				<h3 class="card-title"><span class="lang-tables"></span></h3>
				<div class="card-options">
					<a href="javascript:void(0)" class="card-options-remove" data-toggle="card-remove"><i class="fe fe-x"></i></a>
				</div>
			</div>
			<div class="card-body">
				<div class="dimmer"><div class="loader"></div><div class="dimmer-content">
				<div class="form-group">
					<label class="form-label"><span class="lang-category"></span></label>
					<select class="form-control custom-select w-auto mr-2" name="select-category"></select>
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
	`);if(!window.app.account.dir)return;let s={};window.app.readJson(window.app.account.dir,function(a){s=a;let n={0:"-"};for(let t in a.categories)n[a.categories[t].id]=a.categories[t].name;e.find('[name="select-category"]').setSelectOption(n,t),e.find('[name="select-category"]').change(function(){f(e,s,parseInt($("option:selected",this).val()))}),f(e,s,t)})};function f(t,e,s){if(s>0){let a=null;e.categories&&e.categories[s]&&(a=e.categories[s].url),a&&window.app.readJson(a,function(a){v(t,e,a.tables,s)})}else v(t,e,e.tables,s)}function v(t,e,s,a){let n="";if(s)for(let t in s)n+=`\n<tr>\n\t<td>${s[t].name}</td>\n\t<td>${s[t].private?'<span class="lang-private"></span>':""}</td>\n\t<td>\n\t\t<div class="btn-list">\n\t\t<a class="btn btn-outline-secondary" href="${s[t].url}"><i class="fe fe-external-link mr-2"></i><span class="lang-view"></span></a>\n\t\t<button class="btn btn-outline-danger" data-control="delete" data-id="${s[t].id}"><i class="fe fe-delete mr-2"></i><span class="lang-delete"></span></button>\n\t\t</div>\n\t</td>\n</tr>\n\t\t\t`;let i=new d;i.assign({form:t.find("form")}),t.find("table.table tbody").html(n),t.find('table.table tbody [data-control="delete"]').click(function(s){if(!confirm(window.app.lang.getText("delete?")))return;let n=$(this).attr("data-id");return window.app.readJson("api/table/delete/",function(s){f(t,e,a)},{id:n},i),!1})}var g=function({id:t,parentId:e,name:s,callback:a}){let n=l("account_category_edit",escapeTemplate`
<div class="row">
	<div class="col col-login mx-auto">
		<form class="card" action="api/category/save/">
			<input type="hidden" name="id" value="${t}" />
			<div class="card-header">
				<h3 class="card-title"><span class="lang-category"></span></h3>
				<div class="card-options">
					<a href="javascript:void(0)" class="card-options-remove" data-toggle="card-remove"><i class="fe fe-x"></i></a>
				</div>
			</div>
			<div class="card-body p-6">
				<div class="dimmer"><div class="loader"></div><div class="dimmer-content">
				<div class="form-group">
					<label class="form-label"><span class="lang-category"></span></label>
					<input type="text" class="form-control" name="name" placeholder="Name" value="${s}">
				</div>
				<div class="form-group">
					<label class="form-label"><span class="lang-parent-category"></span></label>
					<select class="form-control custom-select w-auto mr-2" name="parent_id"></select>
				</div>
				<div class="form-footer">
					<button type="submit" class="btn btn-primary"><i class="fe fe-save mr-2"></i><span class="lang-save"></span></button>
				</div>
				</div></div>
			</div>
		</form>
	</div><!-- .col-login -->
</div><!-- .row -->
	`);n.find('[name="name"]').focus(),(new d).assign({form:n.find("form"),fields:{name:{required:!0}},callback:function(t){o("account_category_edit"),a&&a()},confirmMessage:"save?"}),window.app.readJson(window.app.account.dir,function(s){let a={0:"-"};for(let e in s.categories){let n=s.categories[e];(!t||n.id!=t&&n.parent_id!=t)&&(a[n.id]=n.name)}n.find('[name="parent_id"]').setSelectOption(a,e)})},h=function({categoryId:t=0}){let e=l("account_category_list",escapeTemplate`
<div class="row">
	<div class="col col-lg-9 mx-auto">
		<form class="card">
			<div class="card-header">
				<h3 class="card-title"><span class="lang-categories"></span></h3>
				<div class="card-options">
					<a href="javascript:void(0)" class="card-options-remove" data-toggle="card-remove"><i class="fe fe-x"></i></a>
				</div>
			</div>
			<div class="card-body">
				<div class="dimmer"><div class="loader"></div><div class="dimmer-content">
				<div class="btn-list">
					<button class="btn btn-primary" data-control="create"><i class="fe fe-plus-circle mr-2"></i>Create</button>
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
	`);window.app.account.dir&&(e.find('[data-control="create"]').click(function(t){return g({callback:function(){b(e)}}),!1}),b(e))};function b(t){window.app.readJson(window.app.account.dir,function(e){let s="";for(let t in e.categories){let a=e.categories[t];s+=`\n<tr>\n\t<td>${a.name}</td>\n\t<td>${a.parent_id>0?e.categories[a.parent_id].name:""}</td>\n\t<td>\n\t\t<div class="btn-list">\n\t\t<a class="btn btn-outline-secondary" href="${a.url}"><i class="fe fe-external-link mr-2"></i><span class="lang-view"></span></a>\n\t\t<button class="btn btn-outline-secondary" data-control="table" data-id="${a.id}"><i class="fe fe-grid mr-2"></i><span class="lang-table"></span></button>\n\t\t<button class="btn btn-outline-primary" data-control="edit" data-id="${a.id}"><i class="fe fe-edit mr-2"></i><span class="lang-edit"></span></button>\n\t\t<button class="btn btn-outline-danger" data-control="delete" data-id="${a.id}"><i class="fe fe-delete mr-2"></i><span class="lang-delete"></span></button>\n\t\t</div>\n\t</td>\n</tr>\n\t\t\t`}let a=new d;a.assign({form:t.find("form")}),t.find("table.table tbody").html(s),t.find('table.table tbody [data-control="delete"]').click(function(e){if(!confirm(window.app.lang.getText("delete?")))return;let s=$(this).attr("data-id");return window.app.readJson("api/category/delete/",function(e){b(t)},{id:s},a),!1}),t.find('table.table tbody [data-control="table"]').click(function(t){let e=parseInt($(this).attr("data-id"));return m({categoryId:e}),!1}),t.find('table.table tbody [data-control="edit"]').click(function(s){let a=parseInt($(this).attr("data-id")),n=e.categories[a];return g({id:a,name:n.name,parentId:n.parent_id,callback:function(){b(t)}}),!1})})}var w=function(t){t?(t.auth&&window.app.cookies.set("auth",t.auth,30),t.id&&(window.app.account.id=t.id,window.app.cookies.set("account.id",t.id,3)),t.name&&(window.app.account.name=t.name,window.app.cookies.set("account.name",t.name,3)),t.dir&&(window.app.account.dir=t.dir,window.app.cookies.set("account.dir",t.dir,3))):(window.app.account.id=toInt(window.app.cookies.get("account.id")),window.app.account.name=window.app.cookies.get("account.name"),window.app.account.dir=window.app.cookies.get("account.dir"));let e=a("#account-control",`\n<div class="dropdown" id="div-login-user">\n\t<a href="javascript:void(0)" class="nav-link pr-0 leading-none" data-toggle="dropdown">\n\t<span class="avatar"><i class="fe fe-user"></i></span>\n\t<span class="ml-2 d-none d-lg-block">\n\t<span class="text-default">${window.app.account.name}</span>\n\t</span>\n\t</a>\n\t<div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">\n\t\t<a class="dropdown-item" href="${window.app.account.dir}">\n\t\t<i class="dropdown-icon fe fe-home"></i> <span class="lang-my-page"></span>\n\t\t</a>\n\t\t<div class="dropdown-divider"></div>\n\t\t<button class="dropdown-item" id="btn-account-profile">\n\t\t<i class="dropdown-icon fe fe-user"></i> <span class="lang-profile"></span>\n\t\t</button>\n\t\t<button class="dropdown-item" id="btn-account-tables">\n\t\t<i class="dropdown-icon fe fe-grid"></i> <span class="lang-tables"></span>\n\t\t</button>\n\t\t<button class="dropdown-item" id="btn-account-categories">\n\t\t<i class="dropdown-icon fe fe-folder"></i> <span class="lang-categories"></span>\n\t\t</button>\n\t\t<div class="dropdown-divider"></div>\n\t\t<button class="dropdown-item" id="btn-account-sign-out">\n\t\t<i class="dropdown-icon fe fe-log-out"></i> <span class="lang-sign-out"></span>\n\t\t</button>\n\t</div>\n</div>\n\t`);e.find("#btn-account-profile").click(u),e.find("#btn-account-tables").click(m),e.find("#btn-account-categories").click(h),e.find("#btn-account-sign-out").click(x)},y=function(){let t=l("sign",'\n<div class="row">\n\t<div class="col col-login mx-auto">\n\t\t<form class="card" action="api/account/signIn/">\n\t\t\t<div class="card-header">\n\t\t\t\t<h3 class="card-title"><span class="lang-sign-in"></span></h3>\n\t\t\t\t<div class="card-options">\n\t\t\t\t\t<a href="javascript:void(0)" class="card-options-remove" data-toggle="card-remove"><i class="fe fe-x"></i></a>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="card-body p-6">\n\t\t\t\t<div class="dimmer"><div class="loader"></div><div class="dimmer-content">\n\t\t\t\t<div class="form-group">\n\t\t\t\t\t<label class="form-label"><span class="lang-email-address"></span></label>\n\t\t\t\t\t<input type="email" class="form-control" name="email" placeholder="Email">\n\t\t\t\t</div>\n\t\t\t\t<div class="form-group">\n\t\t\t\t\t<label class="form-label">\n\t\t\t\t\t<span class="lang-password"></span>\n\t\t\t\t\t<a href="" class="float-right small" name="forgot-password"><span class="lang-msg-forgot-password"></span></a>\n\t\t\t\t\t</label>\n\t\t\t\t\t<input type="password" class="form-control" name="password" placeholder="Password">\n\t\t\t\t</div>\n\t\t\t\t<div class="form-footer">\n\t\t\t\t\t<button type="submit" class="btn btn-primary btn-block"><span class="lang-sign-in"></span></button>\n\t\t\t\t</div>\n\t\t\t\t</div></div>\n\t\t\t</div>\n\t\t</form>\n\t\t<div class="text-center text-muted">\n\t\t\t<span class="lang-msg-no-account"></span>\n\t\t\t<button class="btn btn-outline-primary" name="btn-to-sign-up"><span class="lang-sign-up"></span></button>\n\t\t</div>\n\t</div>\x3c!-- .col-login --\x3e\n</div>\x3c!-- .row --\x3e\n\t');t.find('[name="btn-to-sign-up"]').click(p),t.find('[name="forgot-password"]').click(()=>((function(){let t=l("forgot-password",`\n<div class="row">\n\t<div class="col col-login mx-auto">\n\t\t<form class="card" action="api/account/resetPassword/">\n\t\t\t<div class="card-header">\n\t\t\t\t<h3 class="card-title"><span class="lang-reset-password"></span></h3>\n\t\t\t\t<div class="card-options">\n\t\t\t\t\t<a href="javascript:void(0)" class="card-options-remove" data-toggle="card-remove"><i class="fe fe-x"></i></a>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="card-body p-6">\n\t\t\t\t<div class="dimmer"><div class="loader"></div><div class="dimmer-content">\n\t\t\t\t<div class="form-group">\n\t\t\t\t\t<label class="form-label"><span class="lang-email-address"></span></label>\n\t\t\t\t\t<input type="email" class="form-control" name="email" placeholder="Email">\n\t\t\t\t</div>\n\t\t\t\t<div class="form-footer">\n\t\t\t\t\t<input type="hidden" name="lang" value="${window.app.lang.lang}"/>\n\t\t\t\t\t<button type="submit" class="btn btn-primary btn-block"><span class="lang-send-new-password"></span></button>\n\t\t\t\t</div>\n\t\t\t\t</div></div>\n\t\t\t</div>\n\t\t</form>\n\t</div>\x3c!-- .col-login --\x3e\n</div>\x3c!-- .row --\x3e\n\t`);t.find('[name="email"]').focus(),(new d).assign({form:t.find("form"),fields:{email:{required:!0,type:"email"}},callback:function(t){o("sign"),r("password-email-sent","")}})})(),!1)),t.find('[name="email"]').focus(),(new d).assign({form:t.find("form"),fields:{email:{required:!0,type:"email"},password:{required:!0,minLength:8}},callback:function(t){o("sign"),w(t)}})},x=function({init:t=!1}){a("#account-control",'\n<button class="btn btn-primary" id="btn-sign-in"><span class="lang-sign-in"></span></button>\n\t').find("#btn-sign-in").click(y),t||window.app.cookies.delete("auth")};let k=class{constructor(){this.IMG_EXTS=this.array2map("jpg,jpeg,gif,png".split(",")),this.AUDIO_EXTS=this.array2map("mp3,wav".split(","))}parse(t,e){if(!t)return null;let s=CSV.parse(t,{delimiter:"\t"});if(s.length<3)return e&&e.setMessage({field:"words",error:"row-short",prefix:3}),null;if(s[0].length<2)return e&&e.setMessage({field:"words",error:"column-short",prefix:2}),null;for(let t=0;t<s.length;t++)for(let e=0;e<s[t].length;e++){let a=s[t][e];if(a){if((a=(a=(a=a.toString()).replace(/</g,"&lt;")).replace(/>/g,"&gt;")).indexOf("\n")>=0)a=a.replace(/\n/g,"<br/>");else if(t>0){let t=a.lastIndexOf(".");if(t>0){let e=a.slice(t+1);this.IMG_EXTS[e]?a='<img src="'+a+'" />':this.AUDIO_EXTS[e]&&(a='<audio src="'+a+'" controls onclick="event.stopPropagation();">'+a+"</audio>")}}}else a="";s[t][e]=a}return s}array2map(t){let e={};for(let s=0;s<t.length;s++)e[t[s]]=t[s];return e}};var S=function({title:t,list:e}){window.test={},test.title=e[0],test.list=e.slice(1),test.col1=0,test.col2=1,test.isRandom=!0,test.isMute=1==toInt(window.app.cookies.get("mute"));let s=l("test",escapeTemplate`
<div class="row">
	<div class="col-12">
		<div class="card test">
			<div class="card-header">
				<h3 class="card-title">${t}</h3>
				<div class="card-options">
					<a href="javascript:void(0)" class="card-options-fullscreen" data-toggle="card-fullscreen"><i class="fe fe-maximize"></i></a>
					<a href="javascript:void(0)" class="card-options-remove" data-toggle="card-remove"><i class="fe fe-x"></i></a>
				</div>
			</div>
			<div class="card-header d-flex flex-wrap align-items-center">
				<select class="form-control custom-select w-auto" id="test-select-column1"></select>
				<button name="test-reverse" title="reverse" class="btn btn-icon btn-outline-secondary ml-1"><i class="fa fa-exchange"></i></button>
				<select class="form-control custom-select w-auto ml-1" id="test-select-column2"></select>
				
				<div class="selectgroup">
					<label class="selectgroup-item ml-2 my-auto" title="random">
						<input type="checkbox" name="test-random" value="1" class="selectgroup-input" checked="checked">
						<span class="selectgroup-button selectgroup-button-icon"><i class="fe fe-shuffle"></i></span>
					</label>
				</div>
				<div class="selectgroup">
					<label class="selectgroup-item ml-2 my-auto" title="hide answers">
						<input type="checkbox" name="test-yesno" value="1" class="selectgroup-input">
						<span class="selectgroup-button selectgroup-button-icon"><i class="fe fe-eye-off"></i></span>
					</label>
				</div>
				<div class="selectgroup">
					<label class="selectgroup-item ml-2 my-auto" title="mute">
						<input type="checkbox" name="test-mute" value="1" class="selectgroup-input">
						<span class="selectgroup-button selectgroup-button-icon"><i class="fe fe-volume-x"></i></span>
					</label>
				</div>
				<div>
					<button name="test-retry" title="retry" class="btn btn-icon btn-outline-secondary ml-2"><i class="fe fe-rotate-cw"></i></button>
				</div>
				<div class="input-icon ml-2">
					<span class="input-icon-addon"><i class="fe fe-search"></i></span>
					<input name="test-search" type="text" class="form-control w-10 text-search">
				</div>
			</div>
			<div class="card-body">

<div class="row test-row-nav">
	<div class="col-3 text-left">
		<button name="test-before" class="btn btn-icon btn-outline-secondary"><i class="fe fe-chevron-left"></i></button>
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
		<button class="btn btn-outline-danger btn-lg btn-block test-no"><span class="lang-not-know"></span></button>
	</div>
	<div class="col-6 mt-2">
		<button class="btn btn-outline-primary btn-lg btn-block test-yes"><span class="lang-know"></span></button>
	</div>
</div>
<div class="row test-row-answer mt-5">
	<span class="test-answer">
		<table class="table table-borderless">
		</table>
		<div class="btn-list mt-5 text-right">
			<button name="test-next" class="btn btn-outline-primary"><i class="fe fe-chevron-right mr-2"></i><span class="lang-next"></span></button>
		</div>
	</span>
</div>
<div class="row test-row-end mt-5">
	<span class="test-answer text-center">
		<span name="test-end-message"><span class="lang-msg-finished"></span></span>
		<div class="btn-list mt-5">
			<button name="test-retry" class="btn btn-outline-secondary"><i class="fe fe-rotate-cw mr-2"></i><span class="lang-retry"></span></button>
			<button name="test-reverse" class="btn btn-outline-primary"><i class="fa fa-exchange mr-2"></i><span class="lang-reverse"></span></button>
		</div>
	</span>
</div>

			</div><!-- .card-body -->
		</div><!-- .card -->
	</div><!-- .col-12 -->
</div><!-- .row -->
	`);j("#test-select-column1",test.col1,-1),j("#test-select-column2",test.col2,test.col1),test.title.length<=2&&s.find("#test-select-column2").hide(),s.find("#test-select-column1").change(()=>{P(parseInt($("#test-select-column1").val())),_()}),s.find("#test-select-column2").change(()=>{test.col2=parseInt($("#test-select-column2").val()),_()}),s.find('[name="test-retry"]').click(()=>{_()}),s.find('[name="test-reverse"]').click(()=>{P(test.col2),_()}),s.find('[name="test-before"]').click(()=>{!function(){if(test.isPreview)return;test.isAnswer?T():test.pos>0&&T(-1)}()}),s.find('[name="test-next"]').click(()=>{I()}),s.find('[name="test-random"]').click(()=>{test.isRandom=!!$('[name="test-random"]').prop("checked"),_()}),s.find('[name="test-yesno"]').click(()=>{test.isYesNo=!!$('[name="test-yesno"]').prop("checked"),T()}),s.find('[name="test-mute"]').click(()=>{test.isMute=!!$('[name="test-mute"]').prop("checked"),window.app.cookies.set("mute",test.isMute?1:0)}),s.find('[name="test-search"]').change(()=>{test.searchText=$('[name="test-search"]').val(),_()}),_()};function j(t,e,s){let a="";for(let t=0;t<test.title.length;t++)test.title[t]&&t!=s&&(a+=`<option value="${t}" ${t==e?'selected="selected"':""}>${test.title[t]}</option>`);$(t).html(a)}function P(t){let e=test.col1;test.col1=t,test.col2==test.col1&&(test.col2=e),j("#test-select-column2",test.col2,test.col1)}function _(){let t={},e=function(t){let e=[];for(let s=0;s<t.length;s++)e.push(t[s]);return e}(test.list);test.isRandom&&E(e),test.test=[];for(let s=0;s<e.length;s++){if(test.searchText){let t=!1;for(let a=0;a<test.title.length;a++)if(e[s][a]&&e[s][a].indexOf(test.searchText)>=0){t=!0;break}if(!t)continue}let a=e[s][test.col1];a&&(e[s][test.col2]&&(t[a]||(test.test.push({key:a,rows:[]}),t[a]=test.test.length),test.test[t[a]-1].rows.push(e[s])))}if(0==test.test.length)return void alert("no data");let s=test.title[test.col2];$(".test-prompt").html(s?s+" ?":"");for(let t=0;t<test.test.length;t++)test.test[t].index=t;test.pos=0,test.pages=[0,test.test.length],T()}function T(t,e){if(test.isAnswer=!1,e&&test.test.push(test.test[test.pos]),t&&(test.pos+=t,-1==t&&test.pos<test.test.length-1&&test.test[test.pos].key==test.test[test.test.length-1].key&&test.test.pop()),$(".test-row-answer").hide(),test.pos==test.test.length)test.isEnd=!0,$(".test-row-end").show(),$('[name="test-before"]').hide(),$(".test-row-question").hide(),$(".test-row-options").hide(),$(".test-row-yesno").hide(),test.pages[1]==test.test.length?($('[name="test-end-message"]').html('<span class="lang-msg-perfect"></span>'),test.isMute||O("audio/perfect.mp3")):($('[name="test-end-message"]').html('<span class="lang-msg-finished"></span>'),test.isMute||O("audio/end.mp3"));else{test.isEnd=!1,$(".test-question").html(test.test[test.pos].key),1==t&&test.pos==test.pages[test.pages.length-1]&&test.pages.push(test.test.length),-1==t&&test.pos==test.pages[test.pages.length-2]-1&&test.pages.pop();let e=test.pages.length-1,s="";for(let t=1;t<e;t++)s+=test.pages[t]-test.pages[t-1]+" ... ";let a=test.pages[e]-test.pages[e-1];if(s+="( "+(test.pos-test.pages[e-1]+1)+" / "+a+" )",test.test.length>test.pages[e]&&(s+=" ... "+(test.test.length-test.pages[e])),$('[name="test-page"]').html(s),test.isYesNo)$(".test-row-yesno").show(),$(".test-row-options").hide(),$(".test-row-yesno button.test-yes").click(M),$(".test-row-yesno button.test-no").click(I);else{$(".test-row-yesno").hide(),$(".test-row-options").show();let t=function(){let t,e=[],s=[],a=test.pages[1],n=test.test[test.pos].index,i={};for(let t=0;t<a;t++)test.test[t].index!=n&&e.push(t);E(e);let l=test.test[n].rows,o=null;for(let e=0;e<l.length;e++)(t=l[e][test.col2])&&(o||(o=t),i[t]=t);s.push({isAnswer:!0,label:o});for(let a=0;a<e.length;a++){l=test.test[e[a]].rows;let n=!1;for(let e=0;e<l.length;e++)if((t=l[e][test.col2])&&!i[t]){n=!0;break}if(n&&(s.push({label:t}),i[t]=t,s.length>=4))break}return E(s),s}(),e="";for(let s=0;s<t.length;s++){let a=t[s].label;e+=`<div class="col-md-6 mt-2">\n\t\t\t\t<button class="btn btn-secondary btn-lg btn-block ${t[s].isAnswer?"test-yes":"test-no"}">${a}</button>\n\t\t\t\t</div>`}$(".test-row-options").html(e),$(".test-row-options button.test-yes").click(M),$(".test-row-options button.test-no").click(I)}$(".test-row-question").show(),test.pos>0?$('[name="test-before"]').show():$('[name="test-before"]').hide(),$(".test-row-end").hide()}}function I(){!function(t){if(!test.isYesNo&&!t&&!test.isAnswer)return;if(test.isEnd)return;test.isAnswer?T(1,!0):function(){test.isAnswer=!0;let t=`<tr><th>${test.title[test.col1]}</th><td>${test.test[test.pos].key}</td></tr>`,e=test.test[test.pos].rows;for(let s=0;s<e.length;s++)if(e[s][test.col2]){t+=`<tr><th>${test.title[test.col2]}</th><td>${e[s][test.col2]}</td></tr>`;for(let a=0;a<test.title.length;a++)e[s][a]&&a!=test.col1&&a!=test.col2&&(t+=`<tr><th>${test.title[a]||""}</th><td>${e[s][a]}</td></tr>`);break}$(".test-row-answer table").html(t),$(".test-row-answer").show(),$('[name="test-before"]').show(),$(".test-row-question").hide(),$(".test-row-options").hide(),$(".test-row-yesno").hide()}()}(!0)}function M(){!function(t){if(!test.isYesNo&&!t)return;if(test.isAnswer||test.isEnd)return;test.isMute||O("audio/coin.mp3");test.isYesNo?T(1):($(".test-question").html('<span class="test-ok"><i class="fe fe-check-circle"></i></span>'),setTimeout(function(){T(1)},1e3))}(!0)}function O(t){let e=new Audio;e.src=window.app.adjustUrl(t),e.volume=.5,e.play()}function E(t){for(let e=t.length-1;e>0;e--){let s=Math.floor(Math.random()*(e+1)),a=t[e];t[e]=t[s],t[s]=a}}var q=function({title:t,words:e,description:s,category:a,isPrivate:n,tableId:i}){e||(e="English\tSpanish\nHello\tHola\nGood morning\tBuenos días\nGoodbye\tAdiós\nThank you\tGracias\nSorry\tLo siento\nI don't know\tNo lo sé");let o=l("edit",escapeTemplate`
<div class="row">
	<div class="col-12">
		<form class="card" action="api/table/save/">
			<input type="hidden" name="table_id" value="${i}" />
			<div class="card-header">
				<div class="form-group col-10 mb-0">
				<input type="text" name="title" class="form-control" value="${t}" placeholder="Title" maxlength="100" />
				</div>
				<div class="card-options">
					<a href="javascript:void(0)" class="card-options-remove" data-toggle="card-remove"><i class="fe fe-x"></i></a>
				</div>
			</div>
			<div class="card-body">
				<div class="dimmer"><div class="loader"></div><div class="dimmer-content">
				<div class="btn-list">
					<button name="btn-test" class="btn btn-primary btn-lg"><i class="fe fe-play mr-2"></i><span class="lang-start-test"></span></button>
				</div>
				<div class="form-group mt-2">
					<textarea rows="9" name="words" class="form-control">${{raw:e}}</textarea>
				</div>
				<div class="row">
					<div class="col-md-6">
						<div class="form-group">
							<label class="form-label"><span class="lang-description"></span></label>
							<textarea name="description" rows="3" class="form-control">${s}</textarea>
						</div>
					</div>
					<div class="col-md-6 col-lg-3">
						<div class="form-group">
							<label class="form-label"><i class="fe fe-folder"></i> <span class="lang-category"></span></label>
							<div class="input-group">
								<input type="text" name="category" class="form-control" value="${a}" maxlength="100">
							</div>
						</div>
					</div>
					<div class="col-md-6 col-lg-3">
						<div class="form-group">
							<label class="form-label"><span class="lang-option"></span></label>
							<label class="custom-switch">
								<input type="checkbox" class="custom-switch-input" name="private" value="1" ${n?"checked":""}>
								<span class="custom-switch-indicator"></span>
								<span class="custom-switch-description"><span class="lang-private"></span></span>
							</label>
						</div>
					</div>
				</div>
				</div></div>
			</div><!-- .card-body -->
			<div class="card-footer d-flex align-items-center">
				<button type="submit" class="btn btn-primary"><i class="fe fe-save mr-2"></i><span class="lang-save"></span></button>
				<label class="custom-control custom-checkbox ml-3" name="control-overwrite">
					<input type="checkbox" class="custom-control-input" name="overwrite" value="1" ${i?"checked":""}>
					<span class="custom-control-label"><span class="lang-overwrite"></span></span>
				</label>
			</div>
		</form><!-- .card -->
	</div><!-- .col-12 -->
</div><!-- .row -->
	`),c=o.find('[name="words"]');c[0].setSelectionRange(0,c.text().length),c.focus(),i||o.find('[name="control-overwrite"]').hide();let r=new d;r.assign({form:o.find("form"),fields:{title:{required:!0},words:{required:!0}},validate:function(t){o.find('[name="words"]').val();return!!(new k).parse(e,r)&&(!!window.app.cookies.get("auth")||(y(),!1))},callback:function(t){t.table_path&&(location.href=t.table_path)},confirmMessage:"save?"}),o.find('[name="btn-test"]').click(t=>{t.preventDefault(),t.stopPropagation();let e=o.find('[name="title"]').val(),s=o.find('[name="words"]').val(),a=(new k).parse(s,r);a&&S({title:e,list:a})}),window.app.account&&window.app.account.dir&&window.app.readJson(window.app.account.dir,function(t){if(t.categories){let e="";for(let s in t.categories){let a=t.categories[s].name;e+=`<a class="dropdown-item" href="javascript:void(0);" onclick="$(this).parent().parent().parent().find('input').val('${a}');">${a}</a>`}e&&o.find('[name="category"]').parent().append(`\n<div class="input-group-append">\n\t<button data-toggle="dropdown" type="button" class="btn btn-secondary dropdown-toggle"></button>\n\t<div class="dropdown-menu dropdown-menu-right">${e}</div>\n</div>\n\t\t\t\t\t`)}})},A=function({list:t,userId:e=0}){let s="";if(!t)return s;for(let a in t){let n=t[a],i=e||n.user_id;if(n.private&&i!=window.app.account.id)continue;let l="";n.description&&(l+=`<div class="text-muted">${n.description}</div>`),!e&&n.user_url&&(l+=`\n<div class="d-flex align-items-center${n.description?" pt-5":""}">\n\t<div class="avatar avatar-sm mr-2"><i class="fe fe-user"></i></div>\n\t<div>\n\t\t<a href="${n.user_url}" class="text-default">${n.user_name}</a>\n\t</div>\n</div>\n\t\t\t`),l&&(l=`<div class="card-body d-flex flex-column">${l}</div>`),s+=`\n<div class="col-md-6 col-lg-4">\n\t<div class="card">\n\t\t<div class="card-header">\n\t\t\t<h3 class="card-title"><a href="${n.url}">${n.name}</a></h3>\n\t\t</div>\n\t\t${l}\n\t</div>\n</div>\n\t\t`}return s};function N(t,e){let s="",a=e[t.id];if(a){for(let t in a)s+=N(t,e);s=`<div class="card-body d-flex flex-column">${s}</div>`}return`\n\t<div class="card">\n\t\t<div class="card-header">\n\t\t\t<h3 class="card-title"><a href="${t.url}">${t.name}</a></h3>\n\t\t</div>\n\t\t${s}\n\t</div>\n\t`}window.app=new class{constructor({rootDirs:t}={}){this.TITLE="memorize words",this.setPrototypeFunctions(),this.rootPath=this.getRootPath(t),this.args=this.getArgs(),this.data={},this.account={},this.includedScripts={},this.includedStyles={}}setTitle(t){t=t?t+" - "+this.TITLE:this.TITLE,document.title=t}setPrototypeFunctions(){String.prototype.startsWith||(String.prototype.startsWith=function(t){return t=t.toString(),this.toString().slice(0,t.length)==t}),String.prototype.endsWith||(String.prototype.endsWith=function(t){return t=t.toString(),this.toString().slice(0-t.length)==t}),window.escapeHtml||(window.escapeHtml=function(t,e=!1){return t?t instanceof Object&&t.raw?t.raw:(t=(t=t.toString()).replace(/[&'`"<>]/g,function(t){return{"&":"&amp;","'":"&#x27;","`":"&#x60;",'"':"&quot;","<":"&lt;",">":"&gt;"}[t]}),e&&(t=t.replace(/\n/g,"<br/>")),t):""}),window.escapeTemplate||(window.escapeTemplate=function(t,...e){let s=[];for(let a=0;a<t.length;a++)t[a]&&s.push(t[a]),a<e.length&&e[a]&&s.push(escapeHtml(e[a],!0));return s.join("")}),window.toInt||(window.toInt=function(t,e=0){if(!t)return e;let s=parseInt(t.toString());return s||e}),jQuery.fn.extend({setSelectOption:function(t,e){let s="";for(let a in t)s+=`<option value="${a}" ${a==e?'selected="selected"':""}>${t[a]}</option>`;return jQuery(this).html(s),this}})}adjustUrl(t){return t.startsWith("http:")||t.startsWith("https:")||t.startsWith("/")?t:this.rootPath+t}includeScript(t,e=!1){if(!t||this.includedScripts[t])return this;this.includedScripts[t]=!0;let s=document.createElement("script");return s.type="text/javascript",e&&(s.async=!0),s.src=this.adjustUrl(t),document.getElementsByTagName("head")[0].appendChild(s),this}includeStyle(t){if(!t||this.includedStyles[t])return this;this.includedStyles[t]=!0;let e=document.createElement("link");return e.rel="stylesheet",e.href=this.adjustUrl(t),document.getElementsByTagName("head")[0].appendChild(e),this}getRootPath(t){let e="/";if(t){Array.isArray(t)||(t=[t]);for(let s in t){let a=t[s],n=location.pathname.indexOf(a);if(!(n<0)){e=location.pathname.slice(0,n+a.length);break}}}return e}getArgs(){let t={};if(location.search){let e=location.search.substring(1).split("&");for(let s in e){let a=e[s],n=null,i=a.indexOf("=");i>=0&&(n=a.slice(i+1),a=a.slice(0,i)),t[a]=decodeURIComponent(n)}}return t}readJson(t,e,s,a){if(a&&!a.startProcess())return;(t=this.adjustUrl(t)).indexOf("/api/")<0&&t.endsWith("/")&&(t+="index.json");let n={};s?(n.type="POST",n.data=s):(t+=t.indexOf("?")<0?"?":"&",t+=".cb="+(new Date).getTime(),n.type="GET"),n.url=t,n.dataType="text",n.timeout=1e4,$.ajax(n).done(function(t,s,n){try{let s=JSON.parse(t);a&&a.setMessages(s.responseMessages),a&&s.error||e&&e(s)}catch(e){console.log(e),console.log(t)}}).fail(function(e,s,n){a&&a.setMessage({error:"error",suffix:": "+e.status+" "+s}),console.log(t+": "+e.status+" "+s),console.log(n)}).always(function(){a&&a.endProcess()})}}({rootDirs:"/public/"}),window.app.includeStyle("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css").includeStyle("https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,300i,400,400i,500,500i,600,600i,700,700i&amp;subset=latin-ext").includeScript("https://mochihashi.github.io/static/tabler/assets/js/vendors/bootstrap.bundle.min.js").includeScript("https://mochihashi.github.io/static/tabler/assets/js/tabler-core.js").includeStyle("https://mochihashi.github.io/static/tabler/assets/css/tabler.css").includeStyle("css/style.css"),window.app.cookies=new class{constructor(){this.map={};let t=document.cookie;if(t){t=t.split("; ");for(let e in t){let s=t[e].split("=");s.length<2||!s[1]||"undefined"==s[1]||(this.map[s[0]]=decodeURIComponent(s[1]))}}}get(t){return this.map[t]}set(t,e,s,a,n){this.map[t]=e;let i=t+"="+encodeURIComponent(e);n||(n="/"),s||(s=100),i+="; path="+n,i+="; max-age="+3600*s*24,a&&(i+="; domain="+a),document.cookie=i}delete(t,e,s){if(!this.map[t])return;this.map[t]=null;let a=t+"=";s||(s="/"),a+="; path="+s,a+="; max-age=0",e&&(a+="; domain="+e),document.cookie=a}},window.app.lang=new class{constructor({langNames:t={en:"English"},defaultLang:e="en",cssPath:s="css/lang/lang.",jsPath:a=null}){this.langNames=t,this.cssPath=s,this.jsPath=a,this.texts={};let n=window.app.cookies.get("lang");if(!n||!this.langNames[n]){n=e;let t=window.navigator.languages||window.navigator.userLanguage||window.navigator.language||[];Array.isArray(t)||(t=[t]);for(let e in t){let s=t[e];if(this.langNames[s]){n=s;break}}}this.setLang(n)}setLang(t){this.lang=t,$(document).ready(function(){$(document.body).attr("lang",t)}),window.app.includeStyle(this.cssPath+t+".css"),this.jsPath&&window.app.includeScript(this.jsPath+t+".js",!0),window.app.cookies.set("lang",t)}getText(t){let e;return this.texts[this.lang]&&(e=this.texts[this.lang][t]),e||(e=t),e}render(t="#select-lang"){let e="";for(let t in this.langNames){let s=this.langNames[t];e+=`<option value="${t}"${t==this.lang?' selected="selected"':""}>${s}</option>`}$(t).html(e).change(function(){window.app.lang.setLang($("option:selected",this).val())})}}({langNames:{en:"English",ja:"日本語"},cssPath:"css/lang/lang.",jsPath:"js/lang/lang."}),$(document).ready(function(){!function(){a(".header",`\n<div class="container">\n\t<div class="d-flex">\n\t\t<a class="header-brand" href="${window.app.rootPath}">\n\t\t<i class="fe fe-paperclip"></i>\n\t\tmemorize words\n\t\t</a>\n\t\t<div class="d-flex order-lg-2 ml-auto">\n\t\t\t<button class="btn btn-outline-primary mr-2" name="btn-create"><i class="fe fe-plus-circle mr-2"></i><span class="lang-create"></span></button>\n\t\t\t<select class="form-control custom-select w-auto mr-2" id="select-lang">\n\t\t\t</select>\n\t\t\t<span id="account-control">\n\t\t\t</span>\n\t\t</div>\x3c!-- .d-flex --\x3e\n\t</div>\x3c!-- .d-flex --\x3e\n</div>\x3c!-- .container --\x3e\n`).find('[name="btn-create"]').click(q),x({init:!0});let t=window.app.cookies;t.get("account.id")&&t.get("account.name")&&t.get("account.dir")?w():t.get("auth")&&window.app.readJson("api/account/autoSignIn/",function(t){t.error?window.app.cookies.delete("auth"):w(t)})}(),a(".footer",'\n<div class="container">\n\t<div class="row align-items-center flex-row">\n\t\t<div class="col-12 col-lg-auto mt-3 mt-lg-0 text-center">\n\t\t\tCopyright © 2018 All rights reserved.\n\t\t</div>\x3c!-- .col-12 --\x3e\n\t</div>\x3c!-- .row --\x3e\n</div>\x3c!-- .container --\x3e\n'),window.app.lang.render("#select-lang"),window.app.args.msg&&r(window.app.args.msg);let t=$('#main-container [name="page_type"]').val();"top"==t?function(){let t="";window.app.readJson("data/top/",function(e){t+=A({list:e.tables}),(t+=A({list:e.categories}))||(t='<span class="lang-msg-no-data"></span>'),$("#row-tables").html(t)}),$("#search-text").change(function(){let e=$("#search-text").val();e?window.app.readJson("api/top/search/",function(t){let e="";e+=A({list:t.tables}),(e+=A({list:t.categories}))||(e='<span class="lang-msg-no-data"></span>'),$("#row-tables").html(e)},{q:e}):$("#row-tables").html(t)})}():"table"==t?function(){let t=$("#main-container"),e=t.find('[name="user_id"]').val(),s=t.find(".user").text(),a=t.find(".user").attr("href"),n=t.find('[name="category_id"]').val(),i=t.find(".category").text(),l=t.find(".category").attr("href"),o=t.find('[name="table_id"]').val(),r=parseInt(t.find('[name="private"]').val()),d=t.find(".title").text(),p=t.find(".description").text(),u=t.find(".words").text(),m=encodeURIComponent(document.URL),f=e==window.app.account.id,v=null,g=d;r&&!f?(g={raw:'(<span class="lang-private"></span>)'},p=""):v=(new k).parse(u),t=c(escapeTemplate`
<div class="row">
	<div class="col-lg-9">
		<div class="card">
			<div class="card-header">
				<h3 class="card-title">${g}</h3>
				<div class="card-options">
				<div class="btn-list">
					<a href="http://www.facebook.com/share.php?u=${m}" target="_blank" rel="nofollow" title="Facebook" class="btn btn-sm btn-icon btn-facebook"><i class="fa fa-facebook"></i></a>
					<a href="https://twiter.com/share?url=${m}" text="${d}" target="_blank" rel="nofollow" title="Twitter" class="btn btn-sm btn-icon btn-twitter"><i class="fa fa-twitter"></i></a>
				</div>
				</div>
			</div>
			<div class="card-body">
				<a href="${l}" class="text-default" id="a-category">${i}</a>
				<div class="d-flex align-items-center pt-3">
					<div class="avatar avatar-sm mr-2"><i class="fe fe-user"></i></div>
					<div>
						<a href="${a}" class="text-default" id="a-user">${s}</a>
					</div>
				</div>
				<div class="mt-5">${p}</div>
				<div class="btn-list mt-5">
					<button class="btn btn-primary btn-lg" name="btn-test"><i class="fe fe-play mr-2"></i><span class="lang-start-test"></span></button>
					<button class="btn btn-outline-primary" name="btn-edit"><i class="fe fe-edit mr-2"></i><span class="lang-edit"></span></button>
				</div>
				<div class="table-responsive mt-2">${{raw:function(t){if(!t)return"";let e='<table class="table mb-0 table-bordered">';for(let s=0;s<t.length;s++){0==s&&(e+='<thead class="thead-light">');let a=t[s],n=0==s?"th":"td";e+="<tr>";for(let t=0;t<a.length;t++)e+=`<${n}>${a[t]}</${n}>`;e+="</tr>",0==s&&(e+="</thead>")}return e+="</table>"}(v)}}</div>
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
	`),v?(t.find('[name="btn-edit"]').click(()=>(q({title:d,words:u,description:p,category:i,isPrivate:r,tableId:f?o:0}),!1)),t.find('[name="btn-test"]').click(()=>(S({title:d,list:v}),!1))):(t.find('[name="btn-edit"]').hide(),t.find('[name="btn-test"]').hide()),n?window.app.readJson(l,function(e){t.find("#a-category").text(e.name);let s=`<h4><a href="${l}">${e.name}</a></h4>\n\t\t\t<div class="list-group list-group-transparent mb-0">`;for(let t in e.categories){let a=e.categories[t].id==n?" active":"";s+=`<a href="${e.categories[t].url}" class="list-group-item list-group-item-action${a}">\n\t\t\t\t${e.categories[t].name}</a>`}for(let t in e.tables){if(e.tables[t].private&&!f)continue;let a=e.tables[t].id==o?" active":"";s+=`<a href="${e.tables[t].url}" class="list-group-item list-group-item-action${a}">\n\t\t\t\t${e.tables[t].name}</a>`}s+="</div>",t.find("#nav-category").html(s)}):(t.find("#a-category").hide(),t.find("#nav-category").hide()),window.app.readJson(a,function(e){t.find("#a-user").text(e.name);let s=`<h4><a href="${a}">${e.name}</a></h4>\n\t\t<div class="list-group list-group-transparent mb-0">`;for(let t in e.categories){if(e.categories[t].parent_id>0)continue;let a=e.categories[t].id==n?" active":"";s+=`<a href="${e.categories[t].url}" class="list-group-item list-group-item-action${a}">\n\t\t\t${e.categories[t].name}</a>`}for(let t in e.tables){if(e.tables[t].private&&!f)continue;let a=e.tables[t].id==o?" active":"";s+=`<a href="${e.tables[t].url}" class="list-group-item list-group-item-action${a}">\n\t\t\t${e.tables[t].name}</a>`}s+="</div>",t.find("#nav-user").html(s)})}():"category"==t?function(){let t=$("#main-container"),e=toInt(t.find('[name="user_id"]').val()),s=t.find(".user").text(),a=t.find(".user").attr("href"),n=t.find(".category").text(),i=t.find(".category").attr("href");t=c(escapeTemplate`
<div class="page-header">
	<h1 class="page-title">${n}</h1>
	<div class="d-flex align-items-center pt-5 col-12">
		<div class="avatar avatar-sm mr-2"><i class="fe fe-user"></i></div>
		<div>
			<a href="${a}" class="text-default">${s}</a>
		</div>
	</div>
</div>
<div class="row" id="row-tables"></div>
	`),window.app.readJson(i,function(s){t.find(".page-title").text(s.name);let a="";a+=A({list:s.categories,userId:e}),(a+=A({list:s.tables,userId:e}))||(a='<span class="lang-msg-no-data"></span>'),t.find("#row-tables").html(a)})}():"user"==t&&function(){let t=$("#main-container"),e=toInt(t.find('[name="user_id"]').val()),s=t.find(".user").text(),a=t.find(".user").attr("href");t=c(escapeTemplate`
<div class="page-header">
	<h1 class="page-title">
		<div class="d-flex align-items-center pt-3">
			<div class="avatar avatar-sm mr-2"><i class="fe fe-user"></i></div>
			<div>
				<a href="${a}" class="text-default" id="a-user">${s}</a>
			</div>
		</div>
	</h1>
</div>
<div class="row" id="row-tables"></div>
	`),window.app.readJson(a,function(s){t.find("#a-user").text(s.name);let a="",n={};for(let t in s.categories){let e=s.categories[t].parent_id;e>0&&(n[e]||(n[e]=[]),n[e].push(s.categories[t]))}for(let t in s.categories)s.categories[t].parent_id>0||(a+=escapeTemplate`
<div class="col-md-6 col-lg-4">
	${N(s.categories[t],n)}
</div>
			`);(a+=A({list:s.tables,userId:e}))||(a='<span class="lang-msg-no-data"></span>'),t.find("#row-tables").html(a)})}(),"127.0.0.1"!=location.hostname&&window.app.includeScript("https://mochihashi.github.io/static/pixel/tracking.js")})}]);