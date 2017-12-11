var count = 0;
var isRunning = false;

/* タイマー */
var timer = function() {
	if (isRunning) {
		count++;
		output();
	}
}
setInterval(timer, 10);

/* 各機能の処理 */
function output() {
	var ms = ("0" + count % 100).slice(-2);
	var s = ("0" + Math.floor(count / 100 % 60)).slice(-2);
	var m = ("0" + Math.floor(count / 6000 % 60)).slice(-2);
	var h = ("0" + Math.floor(count / 360000)).slice(-2);

	var output = document.getElementById("output");
	output.innerHTML = h + "時間" + m + "分" + s + "秒" + ms;
}

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
	output();
}

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

/* ボタン */
function btnOnOff() {
	onOff();
}

function btnClear() {
	clear();
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