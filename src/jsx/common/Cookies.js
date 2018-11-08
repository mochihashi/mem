'use strict';

export default class {
	constructor() {
		this.map = {};
		let c = document.cookie;
		if(!c) return;
		c = c.split('; ');
		for(let i in c) {
			let kv = c[i].split('=');
			if(kv.length < 2 || !kv[1] || kv[1] == 'undefined') continue;
			this.map[kv[0]] = decodeURIComponent(kv[1]);
		}
	}
	
	get(key) {
		return this.map[key];
	}
	
	set(key, value, expireDays, domain, path) {
		this.map[key] = value;
		let c = key + '=' + encodeURIComponent(value);
		if(!path) path = '/';
		if(!expireDays) expireDays = 100;
		c += '; path=' + path;
		c += '; max-age=' + expireDays * 3600 * 24;
		if(domain) c += '; domain=' + domain;
		document.cookie = c;
	}
};