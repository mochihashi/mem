'use strict';
import Validator from 'common/Validator';

export default class {
	constructor() {
		this.validator = new Validator();
	}
	
	assign({form, callback, fields}) {
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
					hasError = true;
				}
				if(hasError) return;
			}
			
			if(!me.startProcess(form)) return;
			
			$.ajax({
				url: window.app.adjustUrl(form.attr('action')),
				type: 'post',
				data: form.serialize(),
				timeout: 10000,
				complete: function(xhr, textStatus) {
					me.endProcess(form);
				},
				success: function(result, textStatus, xhr) {
					if(callback) callback();
				},
				error: function(xhr, textStatus, error) {
					// show error message
				}
			});
		});
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
		if(this.validator.validate(value, props)) {
			// ok
			if(obj.length == 1) obj.removeClass('is-invalid');
			obj.parent().find('.invalid-feedback').remove();
		} else {
			// error
			if(obj.length == 1) obj.addClass('is-invalid');
			let error = this.validator.error;
			let prefix = this.validator.prefix;
			let suffix = this.validator.suffix;
			obj.parent().append(`<div class="invalid-feedback">${prefix}<span class="lang-msg-${error}"></span>${suffix}</div>`);
		}
	}
};