'use strict';

export default class {
	constructor({rootDirs} = {}) {
		this.TITLE = 'memorize words';
		
		this.setPrototypeFunctions();
		this.rootPath = this.getRootPath(rootDirs);
		this.args = this.getArgs();
		this.data = {};
		this.account = {};
		this.includedScripts = {};
		this.includedStyles = {};
	}
	
	setTitle(title) {
		if(title) {
			title = title + ' - ' + this.TITLE;
		} else {
			title = this.TITLE;
		}
		document.title = title;
	}
	
	setPrototypeFunctions() {
		if(!String.prototype.startsWith) {
			String.prototype.startsWith = function(str) {
				str = str.toString();
				return (this.toString().slice(0, str.length) == str);
			};
		}
		if(!String.prototype.endsWith) {
			String.prototype.endsWith = function(str) {
				str = str.toString();
				return (this.toString().slice(0 - str.length) == str);
			};
		}
		if(!window.escapeHtml) {
			window.escapeHtml = function(str, lf2br=false) {
				if(!str) return '';
				if(str instanceof Object && str.raw) return str.raw;
				str = str.toString();
				str = str.replace(/[&'`"<>]/g, function(match) {
					return {
						'&': '&amp;',
						"'": '&#x27;',
						'`': '&#x60;',
						'"': '&quot;',
						'<': '&lt;',
						'>': '&gt;',
					}[match]
				});
				if(lf2br) str = str.replace(/\n/g, '<br/>');
				return str;
			};
		}
		if(!window.escapeTemplate) {
			window.escapeTemplate = function(strings, ...values) {
				let arr = [];
				for(let i = 0; i < strings.length; i++) {
					if(strings[i]) arr.push(strings[i]);
					if(i < values.length && values[i]) arr.push(escapeHtml(values[i], true));
				}
				return arr.join('');
			}
		}
		if(!window.toInt) {
			window.toInt = function(str, ifNull=0) {
				if(!str) return ifNull;
				let v = parseInt(str.toString());
				return v ? v : ifNull;
			}
		}
		jQuery.fn.extend({
			setSelectOption: function(map, selectedId){
				let html = '';
				for(let i in map) {
					html += `<option value="${i}" ${i == selectedId ? 'selected="selected"' : ''}>${map[i]}</option>`;
				}
				jQuery(this).html(html);
				return this;
			}
		});
	}
	
	adjustUrl(url) {
		if(url.startsWith('http:') || url.startsWith('https:') || url.startsWith('/')) return url;
		return this.rootPath + url;
	}
	
	includeScript(url, async = false) {
		if(!url || this.includedScripts[url]) return this;
		this.includedScripts[url] = true;
		let s = document.createElement('script');
		s.type = 'text/javascript'; if(async) s.async = true; s.src = this.adjustUrl(url);
		document.getElementsByTagName("head")[0].appendChild(s);
		return this;
	}
	
	includeStyle(url) {
		if(!url || this.includedStyles[url]) return this;
		this.includedStyles[url] = true;
		let s = document.createElement('link');
		s.rel = 'stylesheet'; s.href = this.adjustUrl(url);
		document.getElementsByTagName("head")[0].appendChild(s);
		return this;
	}
	
	/**
	 * URL = http://domain/root/path/?key1=a&key2=b
	 * ==> '/root';
	 */
	getRootPath(rootDirs) {
		let rootPath = '/';
		if(rootDirs) {
			if(!Array.isArray(rootDirs)) rootDirs = [rootDirs];
			for(let i in rootDirs) {
				let dir = rootDirs[i];
				let p = location.pathname.indexOf(dir);
				if(p < 0) continue;
				rootPath = location.pathname.slice(0, p + dir.length);
				break;
			}
		}
		return rootPath;
	}
	
	/**
	 * URL = http://domain/root/path/?key1=a&key2=b
	 * ==> {key1: 'a', key2: 'b'};
	 */
	getArgs() {
		let args = {};
		if(location.search) {
			let arr = location.search.substring(1).split('&');
			for(let i in arr) {
				let k = arr[i], v = null;
				let p = k.indexOf('=');
				if(p >= 0) { v = k.slice(p + 1); k = k.slice(0, p); }
				args[k] = decodeURIComponent(v);
			}
		}
		return args;
	}
	
	readJson(url, callback, params, inputForm, isFormData = false) {
		if(inputForm && !inputForm.startProcess()) return;
		url = this.adjustUrl(url);
		if(url.indexOf('/api/') < 0 && url.endsWith('/')) url = url + 'index.json';
		let props = {};
		if(params) {
			props.data = params;
			props.type = "POST";
			if(isFormData) {
				props.dataType = "JSON";
				props.processData = false;
				props.contentType = false;
			}
		} else {
			url += (url.indexOf('?') < 0) ? '?' : '&';
			url += '.cb=' + new Date().getTime();
			props.type = "GET";
		}
		props.url = url;
		props.dataType = "text";
		props.timeout = 10000;
		$.ajax(props).done(function(text, textStatus, jqXHR) {
			try {
				let data = JSON.parse(text);
				if(inputForm) inputForm.setMessages(data.responseMessages);
				if(!(inputForm && data.error)) {
					if(callback) {
						callback(data);
						feather.replace();
					}
				}
			} catch(e) {
				console.log(e);
				console.log(text);
			}
		}).fail(function(jqXHR, textStatus, errorThrown) {
			if(inputForm) inputForm.setMessage({error: 'error', suffix: ': ' + jqXHR.status + ' ' + textStatus});
			console.log(url + ': ' + jqXHR.status + ' ' + textStatus);
			console.log(errorThrown);
		}).always(function() {
			if(inputForm) inputForm.endProcess();
		});
		
	}
	
	goto({url, cb=false, post=false}) {
		if(!post) {
			let _url = url;
			if(cb) {
				_url += (url.indexOf('?') < 0 ? '?' : '&');
				_url += '_cb=' + new Date().getTime();
			}
			location.href = _url;
		} else {
			let html = '';
			if(cb) html = `<input type="hidden" name="_cb" value="${new Date().getTime()}" />`;
			html = `<form method="post" action="${url}" id="goto" style="display:none;">${html}</form>`;
			$("body").append(html);
			$("#goto").submit();
		}
	}
};