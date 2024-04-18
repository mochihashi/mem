'use strict';
import CardListHtml from 'html/common/CardListHtml';

export default function() {
	$('#search-text').change(function(){
		let q = $('#search-text').val();
		window.app.readJson('api/top/search/', function(data){
			let html = '';
			html = CardListHtml({list: data.tables});
			if(!html) html = `<span class="lang-msg-no-data"></span>`;
			$('#row-tables').html(html);

			html = CardListHtml({list: data.categories, isCategory: true});
			if(!html) html = `<span class="lang-msg-no-data"></span>`;
			$('#row-categories').html(html);
		}, {q: q});
	});
}
