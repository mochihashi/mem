'use strict';
import Validator from 'common/Validator';

export default class {
	constructor() {
		this.validator = new Validator();
	}
	
	assign({form, callback, fields, validate}) {
		this.form = form;
		let me = this;
		if(fields) {
			for(let name in fields) {
				let props = fields[name];
				form.find('[name="' + name + '"]').change( ()=>me.validate(name, props) );
			}
		}
		
		form.submit(function(event){
			event.preventDefault();
			
			if(fields) {
				let hasError = false;
				for(let name in fields) {
					let props = fields[name];
					if(me.validate(name, props)) continue;
					if(!hasError) form.find('[name="' + name + '"]').focus();
					hasError = true;
				}
				if(hasError) return;
			}
			
			if(validate && !validate(form)) return;
			
			if(!me.startProcess(form)) return;
			$.ajax({
				url: window.app.adjustUrl(form.attr('action')),
				type: "POST",
				data: form.serialize(),
				dataType: "text",
				timeout: 10000
			}).done(function(text, textStatus, jqXHR) {
				try {
					let data = JSON.parse(text);
					if(data.responseMessages) {
						me.setMessage(form);
						for(let i = data.responseMessages.length - 1; i >= 0; i--) {
							me.addMessage(form, data.responseMessages[i], i);
						}
					}
					if(!data.error && callback) callback(data);
				} catch(e) {
					console.log(e);
					console.log(text);
				}
			}).fail(function(jqXHR, textStatus, errorThrown) {
				let error = jqXHR.status + ' ' + textStatus;
				me.setMessage(form, {error: 'error', suffix: ': ' + jqXHR.status + ' ' + textStatus});
				console.log(errorThrown);
			}).always(function() {
				me.endProcess(form);
			});
		});
	}
	
	setMessage(form, message) {
		form.parent().find('.alert').remove();
		if(message) this.addMessage(form, message);
	}
	addMessage(form, message, index) {
		let type = (message.error ? 'danger' : 'primary');
		let text = message.text ? message.text : message.error;
		let prefix = message.prefix || '';
		let suffix = message.suffix || '';
		let field = message.field || '';
		if(text) text = `<span class="lang-msg-${text}"></span>`;
		if(message.error && field) {
			let obj = form.find('[name="' + field + '"]');
			if(obj.length == 1) {
				obj.addClass('is-invalid');
				obj.parent().append(`<div class="invalid-feedback">${prefix}${text}${suffix}</div>`);
				if(index == 0) form.find('[name="' + field + '"]').focus();
				return;
			}
		}
		if(field) field = `[<span class="lang-${field}"></span>] `;
		form.parent().prepend(`
<div class="alert alert-${type} alert-dismissible">
	<button type="button" class="close" data-dismiss="alert"></button>
	${field}${prefix}${text}${suffix}
</div>
		`);
	}
	
	startProcess(form) {
		if(this.isProcessing) return false;
		this.isProcessing = true;
		form.find('.dimmer').addClass('active');
		return true;
	}
	
	endProcess(form) {
		this.isProcessing = false;
		form.find('.dimmer').removeClass('active');
	}
	
	val(object) {
		let obj = $(object);
		if(obj.is(':disabled')) return '';
		let type = obj.attr('type');
		let name = obj.attr('name');
		let value = obj.val();
		if(name === undefined || name == '' || value == '') return '';
		if(type == 'submit' || type == 'button') return '';
		if(type == 'radio' || type == "checkbox") {
			let arr = [];
			obj.each(function(){
				if(this.checked) arr.push(this.val());
			})
			value = arr.join(',');
		}
		return value;
	}
	
	validate(name, props) {
		let obj = this.form.find('[name="' + name + '"]');
		let value = this.val(obj);
		obj.parent().find('.invalid-feedback').remove();
		if(this.validator.validate(value, props)) {
			// ok
			if(obj.length == 1) obj.removeClass('is-invalid');
			return true;
		} else {
			// error
			if(obj.length == 1) obj.addClass('is-invalid');
			let error = this.validator.error;
			let prefix = this.validator.prefix;
			let suffix = this.validator.suffix;
			obj.parent().append(`<div class="invalid-feedback">${prefix}<span class="lang-msg-${error}"></span>${suffix}</div>`);
			return false;
		}
	}
};