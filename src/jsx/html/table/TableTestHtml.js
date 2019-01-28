'use strict';
import * as container from 'html/Container';

export default function({title, list}) {
	let isFirst = !window.test;
	window.test = {};
	test.title = list[0];
	test.list = list.slice(1);
	test.col1 = 0;
	test.col2 = 1;
	test.isRandom = true;
	test.isMute = (toInt(window.app.cookies.get('mute')) == 1);
	
	let div = container.renderOverlay('test', escapeTemplate`
<div class="row">
	<div class="col-12">
		<div class="card test">
			<div class="card-header">
				<h3 class="card-title">${title}</h3>
				<div class="card-options">
					<a href="javascript:void(0)" class="card-options-fullscreen" data-toggle="card-fullscreen"><i class="fe fe-maximize"></i></a>
					<a href="javascript:void(0)" class="card-options-remove" data-toggle="card-remove"><i class="fe fe-x"></i></a>
				</div>
			</div>
			<div class="card-header d-flex flex-wrap align-items-center">
				<select class="form-control custom-select w-auto" id="test-select-column1"></select>
				<button name="test-reverse" title="reverse" class="btn btn-icon btn-outline-secondary ml-1"><i class="fa fa-exchange"></i></button>
				<select class="form-control custom-select w-auto ml-1" id="test-select-column2"></select>
				
				<div class="selectgroup">
					<label class="selectgroup-item ml-2 my-auto" title="random">
						<input type="checkbox" name="test-random" value="1" class="selectgroup-input" checked="checked">
						<span class="selectgroup-button selectgroup-button-icon"><i class="fe fe-shuffle"></i></span>
					</label>
				</div>
				<div class="selectgroup">
					<label class="selectgroup-item ml-2 my-auto" title="hide answers">
						<input type="checkbox" name="test-yesno" value="1" class="selectgroup-input">
						<span class="selectgroup-button selectgroup-button-icon"><i class="fe fe-eye-off"></i></span>
					</label>
				</div>
				<div class="selectgroup">
					<label class="selectgroup-item ml-2 my-auto" title="mute">
						<input type="checkbox" name="test-mute" value="1" class="selectgroup-input">
						<span class="selectgroup-button selectgroup-button-icon"><i class="fe fe-volume-x"></i></span>
					</label>
				</div>
				<div>
					<button name="test-retry" title="retry" class="btn btn-icon btn-outline-secondary ml-2"><i class="fe fe-rotate-cw"></i></button>
				</div>
				<div class="input-icon ml-2">
					<span class="input-icon-addon"><i class="fe fe-search"></i></span>
					<input name="test-search" type="text" class="form-control w-10 text-search">
				</div>
			</div>
			<div class="card-body">

<div class="row test-row-nav">
	<div class="col-3 text-left">
		<button name="test-before" class="btn btn-icon btn-outline-secondary"><i class="fe fe-chevron-left"></i></button>
	</div>
	<div class="col-6 text-center">
		<div name="test-page" class="small text-muted">(1 / 8)</div>
	</div>
	<div class="col-3 text-right">
	</div>
</div>
<div class="row test-row-question">
	<div class="col-12">
		<div class="row">
			<div class="col-12 text-left">
				<div class="test-prompt"></div>
			</div>
			<div class="col-12 text-center">
				<div class="test-question"></div>
			</div>
		</div>
	</div>
</div>
<div class="row test-row-options">
</div>
<div class="row test-row-yesno">
	<div class="col-6 mt-2">
		<button class="btn btn-outline-primary btn-lg btn-block test-yes"><span class="lang-know"></span><i class="fe fe-chevron-down mr-2"></i></button>
	</div>
	<div class="col-6 mt-2">
		<button class="btn btn-outline-danger btn-lg btn-block test-no"><span class="lang-not-know"></span><i class="fe fe-chevron-right mr-2"></i></button>
	</div>
</div>
<div class="row test-row-answer mt-5">
	<span class="test-answer">
		<table class="table table-borderless">
		</table>
		<div class="btn-list mt-5 text-right">
			<button name="test-next" class="btn btn-outline-primary btn-lg btn-block"><i class="fe fe-chevron-right mr-2"></i><span class="lang-next"></span></button>
		</div>
	</span>
</div>
<div class="row test-row-end mt-5">
	<span class="test-answer text-center">
		<span name="test-end-message"><span class="lang-msg-finished"></span></span>
		<div class="btn-list mt-5">
			<button name="test-retry" class="btn btn-outline-secondary"><i class="fe fe-rotate-cw mr-2"></i><span class="lang-retry"></span></button>
			<button name="test-reverse" class="btn btn-outline-primary"><i class="fa fa-exchange mr-2"></i><span class="lang-reverse"></span></button>
		</div>
	</span>
</div>

			</div><!-- .card-body -->
		</div><!-- .card -->
	</div><!-- .col-12 -->
</div><!-- .row -->
	`);
	
	setColumnOption('#test-select-column1', test.col1, -1);
	setColumnOption('#test-select-column2', test.col2, test.col1);
	if(test.title.length <= 2) div.find('#test-select-column2').hide();
	div.find('#test-select-column1').change(()=>{ changeColumn1(parseInt($('#test-select-column1').val())); start(); });
	div.find('#test-select-column2').change(()=>{ test.col2 = parseInt($('#test-select-column2').val()); start(); });
	div.find('[name="test-retry"]').click(()=>{ start(); });
	div.find('[name="test-reverse"]').click(()=>{ changeColumn1(test.col2); start(); });
	div.find('[name="test-before"]').click(()=>{ showBefore(); });
	div.find('[name="test-next"]').click(()=>{ clickNext(); });
	div.find('[name="test-random"]').click(()=>{ test.isRandom = $('[name="test-random"]').prop('checked') ? true : false; start(); });
	div.find('[name="test-yesno"]').click(()=>{ test.isYesNo = $('[name="test-yesno"]').prop('checked') ? true : false; start(); });
	div.find('[name="test-mute"]').click(()=>{
		test.isMute = $('[name="test-mute"]').prop('checked') ? true : false;
		window.app.cookies.set('mute', test.isMute ? 1 : 0);
	});
	div.find('[name="test-search"]').change(()=>{ test.searchText = $('[name="test-search"]').val(); start(); });
	div.find('.test-row-yesno button.test-yes').click(clickDown);
	div.find('.test-row-yesno button.test-no').click(clickNext);
	
	if(!isFirst) $(document).off('keydown', '.test');
	$(document).on('keydown', '.test', function(e) {
		if(!test.test) return;
		if(e.keyCode == 37) { // left
			showBefore();
		} else if(e.keyCode == 39) { // right
			showNext();
		} else if(e.keyCode == 40) { // down
			showDown();
		}
	});
	
	start();
}

function setColumnOption(selector, selected, exclude) {
	let options = '';
	for(let i = 0; i < test.title.length; i++) {
		if(!test.title[i]) continue;
		if(i == exclude) continue;
		options += `<option value="${i}" ${i == selected ? 'selected="selected"' : ''}>${test.title[i]}</option>`;
	}
	$(selector).html(options);
}

function changeColumn1(col) {
	let col0 = test.col1;
	test.col1 = col;
	if(test.col2 == test.col1) test.col2 = col0;
	setColumnOption('#test-select-column1', test.col1, -1);
	setColumnOption('#test-select-column2', test.col2, test.col1);
}

function start() {
	let indexes = {};
	let list = copyArray(test.list);
	if(test.isRandom) shuffle(list);
	test.test = [];
	for(let i = 0; i < list.length; i++) {
		if(test.searchText) {
			let isMatched = false;
			for(let c = 0; c < test.title.length; c++) {
				if(list[i][c] && list[i][c].indexOf(test.searchText) >= 0) { isMatched = true; break; }
			}
			if(!isMatched) continue;
		}
		let key = list[i][test.col1]; if(!key) continue;
		let value = list[i][test.col2]; if(!value) continue;
		if(!indexes[key]) {
			test.test.push({key: key, rows: []});
			indexes[key] = test.test.length;
		}
		test.test[indexes[key] - 1].rows.push(list[i]);
	}
	if(test.test.length == 0) { alert('no data'); return; }
	let prompt = test.title[test.col2];
	$('.test-prompt').html(prompt ? (prompt + ' ?') : '');
	for(let i = 0; i < test.test.length; i++) { test.test[i].index = i; }
	test.pos = 0;
	test.pages = [0, test.test.length];
	showQuestion();
}

function showQuestion(add, push) {
	test.isAnswer = false;
	if(push) test.test.push(test.test[test.pos]);
	if(add) {
		test.pos += add;
		if(add == -1 && test.pos < test.test.length - 1) {
			if(test.test[test.pos].key == test.test[test.test.length - 1].key) test.test.pop();
		}
	}
	$('.test-row-answer').hide();
	if(test.pos == test.test.length) {
		// show end
		test.isEnd = true;
		$('.test-row-end').show(); $('[name="test-before"]').hide();
		$('.test-row-question').hide(); $('.test-row-options').hide(); $('.test-row-yesno').hide();
		if(test.pages[1] == test.test.length) {
			$('[name="test-end-message"]').html('<span class="lang-msg-perfect"></span>');
			if(!test.isMute) { playAudio('audio/perfect.mp3'); }
		} else {
			$('[name="test-end-message"]').html('<span class="lang-msg-finished"></span>');
			if(!test.isMute) { playAudio('audio/end.mp3'); }
		}
	} else {
		// show question
		test.isEnd = false;
		$('.test-question').html(test.test[test.pos].key);
		if(add == 1 && test.pos == test.pages[test.pages.length - 1]) test.pages.push(test.test.length);
		if(add == -1 && test.pos == test.pages[test.pages.length - 2] - 1) test.pages.pop();
		let p = test.pages.length - 1, pages = '';
		for(let i = 1; i < p; i++) { pages += (test.pages[i] - test.pages[i - 1]) + ' ... '; }
		let len = test.pages[p] - test.pages[p - 1], pos = test.pos - test.pages[p - 1];
		pages += '( ' + (pos + 1) + ' / ' + len + ' )';
		if(test.test.length > test.pages[p]) { pages += ' ... ' + (test.test.length - test.pages[p]);}
		$('[name="test-page"]').html(pages);
		if(test.isYesNo) {
			// no answer option
			$('.test-row-yesno').show(); $('.test-row-options').hide();
		} else {
			// show answer options
			$('.test-row-yesno').hide(); $('.test-row-options').show();
			let options = decideOptions(), html = '';
			for(let i = 0; i < options.length; i++) {
				let label = options[i].label, isAnswer = options[i].isAnswer;
				html += `<div class="col-md-6 mt-2">
				<button class="btn btn-secondary btn-lg btn-block ${isAnswer ? 'test-yes' : 'test-no'}">${label}</button>
				</div>`;
			}
			$('.test-row-options').html(html);
			$('.test-row-options button.test-yes').click(clickDown);
			$('.test-row-options button.test-no').click(clickNext);
		}
		$('.test-row-question').show();
		if(test.pos > 0) { $('[name="test-before"]').show(); } else { $('[name="test-before"]').hide(); }
		$('.test-row-end').hide();
	}
}

function decideOptions() {
	let candidates = [], options = [], len = test.pages[1], answerIndex = test.test[test.pos].index, label, answers = {};
	for(let i = 0; i < len; i++) {
		if(test.test[i].index != answerIndex) candidates.push(i);
	}
	shuffle(candidates);
	
	let rows = test.test[answerIndex].rows;
	let answerLabel = null;
	for(let i = 0; i < rows.length; i++) {
		label = rows[i][test.col2];
		if(!label) continue;
		if(!answerLabel) answerLabel = label;
		answers[label] = label;
	}
	options.push({ isAnswer: true, label: answerLabel });
	
	for(let i = 0; i < candidates.length; i++) {
		rows = test.test[candidates[i]].rows;
		let isFound = false;
		for(let r = 0; r < rows.length; r++) {
			label = rows[r][test.col2];
			if(!label || answers[label]) continue;
			isFound = true;
			break;
		}
		if(!isFound) continue;
		options.push({ label: label });
		answers[label] = label;
		if(options.length >= 4) break;
	}
	shuffle(options);
	return options;
}

function showAnswer() {
	test.isAnswer = true;
	let html = `<tr><th>${test.title[test.col1]}</th><td>${test.test[test.pos].key}</td></tr>`;
	let rows = test.test[test.pos].rows;
	for(let r = 0; r < rows.length; r++) {
		if(!rows[r][test.col2]) continue;
		html += `<tr><th>${test.title[test.col2]}</th><td>${rows[r][test.col2]}</td></tr>`;
		for(let i = 0; i < test.title.length; i++) {
			if(!rows[r][i] || i == test.col1 || i == test.col2) continue;
			html += `<tr><th>${test.title[i] || ''}</th><td>${rows[r][i]}</td></tr>`;
		}
		break;
	}
	$('.test-row-answer table').html(html);
	$('.test-row-answer').show(); $('[name="test-before"]').show();
	$('.test-row-question').hide(); $('.test-row-options').hide(); $('.test-row-yesno').hide();
}

function showBefore() {
	if(test.isPreview) return;
	if(test.isAnswer) showQuestion();
	else if(test.pos > 0) showQuestion(-1);
}

function clickNext() { showNext(true); }
function showNext(isClick) {
	if(!test.isYesNo && !isClick && !test.isAnswer) return;
	if(test.isEnd) return;
	if(!test.isAnswer) showAnswer();
	else showQuestion(1, true);
}

function clickDown() { showDown(true); }
function showDown(isClick) {
	if(!test.isYesNo && !isClick) return;
	if(test.isAnswer || test.isEnd) return;
	if(!test.isMute) { playAudio('audio/coin.mp3'); }
	if(test.isYesNo) {
		showQuestion(1);
	} else {
		$('.test-question').html('<span class="test-ok"><i class="fe fe-check-circle"></i></span>');
		setTimeout(function(){ showQuestion(1); }, 1000);
	}
}

function playAudio(file) { let a = new Audio(); a.src = window.app.adjustUrl(file); a.volume = 0.5; a.play(); }

function shuffle(arr) {
	for(let i = arr.length - 1; i > 0; i--) {
		let r = Math.floor(Math.random() * (i + 1));
		let tmp = arr[i]; arr[i] = arr[r]; arr[r] = tmp;
	}
}

function copyArray(arr) {
	let arr2 = [];
	for(let i = 0; i < arr.length; i++) { arr2.push(arr[i]); }
	return arr2;
}