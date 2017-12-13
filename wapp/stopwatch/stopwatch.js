var count = 0;
var isRunning = false;

var splits = [];
var laps = [];
var NUM_OF_LAPS = 10;

var display = 0;

/* タイマー */
var timer = function() {
	if (isRunning) {
		count++;
		outputTime();
	}
}
setInterval(timer, 10);

/* 機能 */
function onOff() {
	if (isRunning) {
		stop();
	} else {
		start();
	}
}

function clear() {
	stop();
	count = 0;

	splits = [];
	laps = [];

	updateOutput();
}

function addLap() {
	splits.unshift(count);

	if (splits.length > NUM_OF_LAPS) {
		splits.pop();
	}

	var lap = 0;
	if (splits.length == 1) {
		lap = splits[0];
	} else {
		lap = splits[0] - splits[1];
	}
	laps.unshift(lap)

	if (laps.length > NUM_OF_LAPS) {
		laps.pop();
	}

	outputSplit();
	outputLap();
}

function switchDisplay(num) {
	display = num;
	updateOutput();

	resetButtonColor();
	switch (display) {
	case 0:
		setButtonColor(displaySymbol);
		break;
	case 1:
		setButtonColor(displayEnglish);
		break;
	case 2:
		setButtonColor(displayJapanese);
		break;
	}
}

/* 出力 */
function updateOutput() {
	outputTime();
	outputSplit();
	outputLap();
}

function outputTime() {
	printTime(count, "output");
}

function outputSplit() {
	for (var i = 0; i < splits.length; i++) {
		printTime(splits[i], "split" + i);
	}

	for (var i = splits.length; i < NUM_OF_LAPS; i++) {
		printTime(0, "split" + i);
	}
}

function outputLap() {
	for (var i = 0; i < laps.length; i++) {
		printTime(laps[i], "lap" + i);
	}

	for (var i = splits.length; i < NUM_OF_LAPS; i++) {
		printTime(0, "lap" + i);
	}
}

/* 基本処理 */
function stop() {
	isRunning = false;

	var button = document.getElementById("on_off");
	button.innerHTML = "START:S";
}

function start() {
	isRunning = true;

	var button = document.getElementById("on_off");
	button.innerHTML = "STOP:S";
}

function printTime(c, Id) {
	var ms = ("0" + c % 100).slice(-2);
	var s = ("0" + Math.floor(c / 100 % 60)).slice(-2);
	var m = ("0" + Math.floor(c / 6000 % 60)).slice(-2);
	var h = ("0" + Math.floor(c / 360000)).slice(-2);

	var output = document.getElementById(Id);
	switch (display) {
	case 0:
		output.innerHTML = h + ":" + m + ":" + s + "." + ms;
		break;
	case 1:
		output.innerHTML = h + "h" + m + "m" + s + "s" + ms;
		break;
	case 2:
		output.innerHTML = h + "時間" + m + "分" + s + "秒" + ms;
		break;
	}
}

function setButtonColor(button) {
	button.style.color = "white";
	button.style.backgroundColor = "teal";
}

function resetButtonColor() {
	displaySymbol.style.color = "buttontext";
	displayEnglish.style.color = "buttontext";
	displayJapanese.style.color = "buttontext";

	displaySymbol.style.backgroundColor = "buttonface";
	displayEnglish.style.backgroundColor = "buttonface";
	displayJapanese.style.backgroundColor = "buttonface";
}

/* ボタン */
function btnOnOff() {
	onOff();
}

function btnClear() {
	clear();
}

function btnLap() {
	addLap();
}

function btnDisplaySymbol() {
	switchDisplay(0);
}

function btnDisplayEnglish() {
	switchDisplay(1);
}

function btnDisplayJapanese() {
	switchDisplay(2);
}

/* キーボード */
document.onkeydown = function(e) {
	switch (e.keyCode) {
	case 32:
		// スペースキー
		btnOnOff();
		break;
	case 49:
		// 1
		btnDisplaySymbol();
		break;
	case 50:
		// 2
		btnDisplayEnglish();
		break;
	case 51:
		// 3
		btnDisplayJapanese();
		break;
	case 67:
		// Cキー
		btnClear();
		break;
	case 76:
		// Lキー
		btnLap();
		break;
	case 83:
		// Sキー
		btnOnOff();
		break;
	case 97:
		// 1(テンキー)
		btnDisplaySymbol();
		break;
	case 98:
		// 2(テンキー)
		btnDisplayEnglish();
		break;
	case 99:
		// 3(テンキー)
		btnDisplayJapanese();
		break;
	}
}