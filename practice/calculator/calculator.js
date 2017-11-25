var value = -1;

function input(num) {
	// 例外処理
	if (value >= 100000000000000) {
		var outputE = document.getElementById("outputE");
		outputE.innerHTML = "エラー：入力可能な数は、15桁までです。";
		return;
	}

	if (value < 0) value = num;
	else value = value * 10 + num;

	var output = document.getElementById("output");
	output.innerHTML = value;
}

/* ボタン */
function btnInputClear() {
	value = -1;

	var output = document.getElementById("output");
	output.innerHTML = "　";

	var outputE = document.getElementById("outputE");
	outputE.innerHTML = "　";
}

function btnInput0() {
	input(0);
}

function btnInput00() {
	input(0);
	input(0);
}

function btnInput1() {
	input(1);
}

function btnInput2() {
	input(2);
}

function btnInput3() {
	input(3);
}

function btnInput4() {
	input(4);
}

function btnInput5() {
	input(5);
}

function btnInput6() {
	input(6);
}

function btnInput7() {
	input(7);
}

function btnInput8() {
	input(8);
}

function btnInput9() {
	input(9);
}