var count = 0;
var isRunning = false;
var splits = [];
var laps = [];
var NUM_OF_LAPS = 10;

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

	outputTime();
	outputSplit();
	outputLap();
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

/* 出力 */
function outputTime() {
	printTime(count, "output");
}

function outputSplit() {
	if(splits.length == 0) {
		for (var i = 0; i < NUM_OF_LAPS; i++) {
			printTime(0, "split" + i);
		}
	} else {
		for (var i = 0; i < splits.length; i++) {
			printTime(splits[i], "split" + i);
		}
	}
}

function outputLap() {
	if(laps.length == 0) {
		for (var i = 0; i < NUM_OF_LAPS; i++) {
			printTime(0, "lap" + i);
		}
	} else {
		for (var i = 0; i < laps.length; i++) {
			printTime(laps[i], "lap" + i);
		}
	}
}

/* 処理 */
function stop() {
	isRunning = false;

	var button = document.getElementById("on_off");
	button.innerHTML = "START";
}

function start() {
	isRunning = true;

	var button = document.getElementById("on_off");
	button.innerHTML = "STOP";
}

function printTime(c, Id) {
	var ms = ("0" + c % 100).slice(-2);
	var s = ("0" + Math.floor(c / 100 % 60)).slice(-2);
	var m = ("0" + Math.floor(c / 6000 % 60)).slice(-2);
	var h = ("0" + Math.floor(c / 360000)).slice(-2);

	var output = document.getElementById(Id);
	output.innerHTML = h + "時間" + m + "分" + s + "秒" + ms;
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

/* キーボード */
document.onkeydown = function(e) {
	switch (e.keyCode) {
	case 32:
		// スペースキー
		btnOnOff();
		break;
	case 67:
		// Cキー
		btnClear();
		break;
	case 83:
		// Sキー
		btnOnOff();
		break;
	}
}