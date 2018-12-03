import App from 'common/App';
import Cookies from 'common/Cookies';
import Lang from 'common/Lang';
import HeaderHtml from 'html/HeaderHtml';
import FooterHtml from 'html/FooterHtml';
import MessageHtml from 'html/MessageHtml';
import TopHtml from 'html/list/TopHtml';
import UserHtml from 'html/list/UserHtml';
import CategoryHtml from 'html/list/CategoryHtml';
import TableHtml from 'html/table/TableHtml';

window.app = new App({rootDirs: '/public/'});

window.app
.includeStyle('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css')
.includeStyle('https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,300i,400,400i,500,500i,600,600i,700,700i&amp;subset=latin-ext')
.includeScript('https://mochihashi.github.io/static/tabler/assets/js/vendors/bootstrap.bundle.min.js')
.includeScript('https://mochihashi.github.io/static/tabler/assets/js/tabler-core.js')
.includeStyle('https://mochihashi.github.io/static/tabler/assets/css/tabler.css')
.includeStyle('css/style.css')
;

window.app.cookies = new Cookies();
window.app.lang = new Lang({langNames: { en: 'English', zh: '中文', ja: '日本語', ko: '한국어'}, cssPath: 'css/lang/lang.', jsPath: 'js/lang/lang.' });

$(document).ready(function(){
	HeaderHtml();
	FooterHtml();
	window.app.lang.render('#select-lang');
	if(window.app.args.msg) { MessageHtml(window.app.args.msg); }
	let pageType = $('#main-container [name="page_type"]').val();
	if(pageType == 'top') TopHtml();
	else if(pageType == 'table') TableHtml();
	else if(pageType == 'category') CategoryHtml();
	else if(pageType == 'user') UserHtml();
	
	if(location.hostname != '127.0.0.1') {
		window.app.includeScript('https://mochihashi.github.io/static/pixel/tracking.js');
	}
});
