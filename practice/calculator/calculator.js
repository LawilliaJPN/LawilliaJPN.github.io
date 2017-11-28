var value1 = -1;

function input(num) {
	var value = value1;

	// 例外処理
	if (value >= 100000000000000) {
		var outputMsg = document.getElementById("outputMsg");
		outputMsg.innerHTML = "エラー：入力可能な数は、15桁までです。";
		return;
	}

	if (value < 0) value = num;
	else value = value * 10 + num;

	var output = document.getElementById("outputValue1");
	value1 = value;
	// 参考：「数値をカンマ区切りにする - Qiita」 https://qiita.com/zawascript/items/922b5db574ef2b126069
	output.innerHTML = String(value).replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
}

function calculation(num) {
	var outputMsg = document.getElementById("outputMsg");
	outputMsg.innerHTML = "エラー：四則演算は未実装です。";
}

/* ボタン */
function btnInputClear() {
	value1 = -1;

	var outputValue1 = document.getElementById("outputValue1");
	outputValue1.innerHTML = "　";

	var outputMsg = document.getElementById("outputMsg");
	outputMsg.innerHTML = "　";
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

function btnInputPlus() {
	calculation(0);
}

function btnInputMinus() {
	calculation(1);
}

function btnInputMultiply() {
	calculation(2);
}

function btnInputDivide() {
	calculation(3);
}

/* キーボード */
document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 96:
            btnInput0();
            break;
        case 97:
            btnInput1();
            break;
        case 98:
            btnInput2();
            break;
        case 99:
            btnInput3();
            break;
        case 100:
            btnInput4();
            break;
        case 101:
            btnInput5();
            break;
        case 102:
            btnInput6();
            break;
        case 103:
            btnInput7();
            break;
        case 104:
            btnInput8();
            break;
        case 105:
            btnInput9();
            break;
    }
}