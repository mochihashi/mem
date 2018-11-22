'use strict';

export default class {
	constructor({rootDirs} = {}) {
		this.TITLE = 'memorize words';
		
		this.setPrototypeFunctions();
		this.rootPath = this.getRootPath(rootDirs);
		this.args = this.getArgs();
		this.data = {};
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
			window.escapeHtml = function(str) {
				if(!str) return '';
				str = str.toString();
				return str.replace(/[&'`"<>]/g, function(match) {
					return {
						'&': '&amp;',
						"'": '&#x27;',
						'`': '&#x60;',
						'"': '&quot;',
						'<': '&lt;',
						'>': '&gt;',
					}[match]
				});
			};
		}
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
};