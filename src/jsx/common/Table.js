'use strict';

export default class {
	constructor() {
		this.IMG_EXTS = this.array2map("jpg,jpeg,gif,png".split(','));
		this.AUDIO_EXTS = this.array2map("mp3,wav".split(','));
	}
	
	parse(text, inputForm, isForTest = true) {
		if(!text) return null;
		let isCsv = (text.indexOf('\t') < 0 && text.indexOf(',') >= 0);
		let arr = CSV.parse(text, {delimiter: isCsv ? ',' : '\t'});
		return this.validate(arr, inputForm, isForTest);
	}
	
	validate(arr, inputForm, isForTest = true) {
		if(arr.length < 3) {
			if(inputForm) inputForm.setMessage({'field':'words', 'error':'row-short', 'prefix':3});
			return null;
		}
		if(arr[0].length < 2) {
			if(inputForm) inputForm.setMessage({'field':'words', 'error':'column-short', 'prefix':2});
			return null;
		}
		let arr2 = [];
		for(let r = 0; r < arr.length; r++) {
			let hasValue = false;
			for(let c = 0; c < arr[r].length; c++) {
				let val = arr[r][c];
				if(val !== undefined && val !== null) {
					if(isForTest) {
						val = val.toString();
						val = val.replace(/</g, "&lt;");
						val = val.replace(/>/g, "&gt;");
						if(val.indexOf("\n") >= 0) {
							val = val.replace(/\n/g, "<br/>");
						} else if(r > 0) {
							let p = val.lastIndexOf('.');
							if(p > 0) {
								let ext = val.slice(p + 1);
								if(this.IMG_EXTS[ext]) {
									val = '<img src="' + val + '" />';
								} else if(this.AUDIO_EXTS[ext]) {
									val = '<audio src="' + val + '" controls onclick="event.stopPropagation();">' + val + '</audio>';
								}
							}
						}
					}
				} else {
					val = '';
				}
				arr[r][c] = val;
				if(val) hasValue = true;
			}
			if(hasValue) arr2.push(arr[r]);
		}
		if(arr2.length < 3) {
			if(inputForm) inputForm.setMessage({'field':'words', 'error':'row-short', 'prefix':3});
			return null;
		}
		return arr2;
	}
	
	array2text(arr) {
		let lines = [];
		for(let i = 0; i < arr.length; i++) { lines.push(arr[i].join("\t")); }
		return lines.join("\n");
	}
	
	array2map(arr) {
		let map = {};
		for(let i = 0; i < arr.length; i++) { map[arr[i]] = arr[i]; }
		return map;
	}
}
