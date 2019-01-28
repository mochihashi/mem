'use strict';
import CardListHtml from 'html/common/CardListHtml';

export default function() {
	let links = '';
	window.app.readJson('data/top/', function(data){
		links += CardListHtml({list: sortByIdDesc(data.tables)});
		links += CardListHtml({list: sortByIdDesc(data.categories)});
		if(!links) links = `<span class="lang-msg-no-data"></span>`;
		$('#row-tables').html(links);
	});
	
	$('#search-text').change(function(){
		let q = $('#search-text').val();
		if(!q) {
			$('#row-tables').html(links);
		} else {
			window.app.readJson('api/top/search/', function(data){
				let html= '';
				html += CardListHtml({list: data.tables});
				html += CardListHtml({list: data.categories});
				if(!html) html = `<span class="lang-msg-no-data"></span>`;
				$('#row-tables').html(html);
			}, {q: q});
		}
	});
}

function sortByIdDesc(map) {
	let arr = [];
	for(let i in map) {
		let row = map[i];
		row.id = parseInt(row.id);
		arr.push(row);
	}
	arr.sort(function(a,b){
	    if(a.id > b.id) return -1;
	    if(a.id < b.id) return 1;
	    return 0;
	});
	return arr;
}
