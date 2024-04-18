'use strict';

export default class {
	constructor({langNames = { en: 'English' }, defaultLang = 'en'
	, cssPath = 'css/lang/lang.', jsPath = null}) {
		this.langNames = langNames;
		this.cssPath = cssPath;
		this.jsPath = jsPath;
		this.texts = {};
		let lang = window.app.cookies.get('lang');
		if(!lang || !this.langNames[lang]) {
			lang = defaultLang;
			let languages = window.navigator.languages || window.navigator.userLanguage || window.navigator.language || [];
			if(!Array.isArray(languages)) languages = [languages];
			for(let i in languages) {
				let k = languages[i];
				if(this.langNames[k]) {
					lang = k;
					break;
				}
			}
		}
		this.setLang(lang);
	}
	
	setLang(lang) {
		this.lang = lang;
		$(document).ready(function(){ $(document.body).attr('lang', lang); });
		window.app.includeStyle(this.cssPath + lang + '.css');
		if(this.jsPath) window.app.includeScript(this.jsPath + lang + '.js', true);
		window.app.cookies.set('lang', lang);
		document.getElementsByTagName("html")[0].lang = lang;
	}
	
	getText(key) {
		let text;
		if(this.texts[this.lang]) text = this.texts[this.lang][key];
		if(!text) text = key;
		return text;
	}
	
	render(selector = '#select-lang') {
		let options = '';
		for(let k in this.langNames) {
			let v = this.langNames[k];
			let selected = (k == this.lang ? ' selected="selected"' : '');
			options += `<option value="${k}"${selected}>${v}</option>`;
		}
		$(selector).html(options).change(function(){
			window.app.lang.setLang($('option:selected', this).val());
		});
	}
};