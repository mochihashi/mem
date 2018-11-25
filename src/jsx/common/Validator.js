'use strict';

export default class {
	validate(value, props) {
		this.error = '';
		this.prefix = '';
		this.suffix = '';
		
		value = value.toString();
		if(value.length == 0) {
			if(props.required) { this.error = 'required'; return false; }
			return true;
		}
		
		if(props.type == 'email') {
			const regex = "^[a-zA-Z0-9\\.\\$=_\\-\\^~\\+`]+@[a-zA-Z0-9\\._-]+$";
			if(!value.match(new RegExp(regex))) { this.error = 'not-email'; return false; }
		}
		
		if(props.minLength && value.length < props.minLength) {
			this.prefix = props.minLength;
			this.error = 'length-short'; return false;
		}
		
		if(!props.html) {
			if(value.indexOf('<') >= 0) {
				this.suffix = ': &lt;';
				this.error = 'invalid-char'; return false;
			}
			if(value.indexOf('>') >= 0) {
				this.suffix = ': &gt;';
				this.error = 'invalid-char'; return false;
			}
		}
		
		return true;
	}
};