var value1 = 0;
var value2 = 0;
var value1Decimal = 0;
var value2Decimal = 0;
var buttonType = 0;
var calcType = -1;
var inputType = 0;

function input(num) {
	var value = 0;

	buttonType = 1;
	if ((inputType == 0) || (inputType == 1)) value = value1;
	else if (inputType == 2) value = value2;

	// 例外処理
	if (value >= 100000000000000) {
		var outputMsg = document.getElementById("outputMsg");
		outputMsg.innerHTML = "エラー：入力可能な数は、15桁までです。";
		return;
	}


	if ((inputType == 0) || (inputType == 1)) {
		if (value1Decimal >= 1) {
			value = value + num * Math.pow(0.1, value1Decimal);
			value1Decimal++;
		} else {
			if (value == 0) value = num;
			else value = value * 10 + num;
		}

		value1 = value;
		outputValue(value, "outputValue1");
	} else if (inputType == 2) {
		if (value2Decimal >= 1) {
			value = value + num * Math.pow(0.1, value2Decimal);
			value2Decimal++;
		} else {
			if (value == 0) value = num;
			else value = value * 10 + num;
		}

		value2 = value;
		outputValue(value, "outputValue2");
	}

	if (calcType != -1) {
		calc();
	}
}

function calculation() {
	buttonType = 2;
	resetButtonColor();

	var outputMsg = document.getElementById("outputMsg");
	outputMsg.innerHTML = "　";

	switch (calcType) {
	case 1:
		setButtonColor(inputPlus);
		break;
	case 2:
		setButtonColor(inputMinus);
		break;
	case 3:
		setButtonColor(inputMultiply);
		break;
	case 4:
		setButtonColor(inputDivide);
		break;
	}

	if (inputType != 0) {
		calc();
	} else {
		updateInputType(2);
	}
}

function calc() {
	var result = 0;

	switch (calcType) {
	case 1:
		result = value1 + value2;
		break;
	case 2:
		result = value1 - value2;
		break;
	case 3:
		result = value1 * value2;

		if (result >= 100000000000000) {
			var outputMsg = document.getElementById("outputMsg");
			outputMsg.innerHTML = "エラー：16桁以上になるかけ算の結果は、正常に表示されない場合があります。";
		}

		break;
	case 4:
		result = value1 / value2;

		if (value2 >= 100000) {
			var outputMsg = document.getElementById("outputMsg");
			outputMsg.innerHTML = "エラー：分母の大きな割り算の結果は、正常に表示されない場合があります。";
		}

		break;
	}

	outputValue(result, "outputResult");
}

function outputValue(value, strOutput) {
	var output = document.getElementById(strOutput);
	strValue = String(value);

	if (strValue.indexOf('.') == -1) {
		// 参考： https://qiita.com/zawascript/items/922b5db574ef2b126069
		output.innerHTML = strValue.replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
	} else {
		output.innerHTML = strValue;
	}

	if (value < 0) output.style.color = "red";
	else output.style.color = "black";
}

function clear(type) {
	if ((type == 0) || (type == 1)) {
		value1 = 0;
		value1Decimal = 0;

		var outputValue1 = document.getElementById("outputValue1");
		outputValue1.innerHTML = "　";
	}

	if ((type == 0) || (type == 2)) {
		value2 = 0;
		value2Decimal = 0;

		var outputValue2 = document.getElementById("outputValue2");
		outputValue2.innerHTML = "　";
	}


	if (type == 0) {
		calcType = -1;
		resetButtonColor();
		updateInputType(0);

		var outputMsg = document.getElementById("outputMsg");
		outputMsg.innerHTML = "　";
	}

	var outputResult = document.getElementById("outputResult");
	outputResult.innerHTML = "　";
}

function decimal() {
	if ((inputType == 0) || (inputType == 1)) {
		if (value1Decimal <= 0) value1Decimal = 1;
	} else if (inputType == 2) {
		if (value2Decimal <= 0) value2Decimal = 1;
	}

	var outputMsg = document.getElementById("outputMsg");
	outputMsg.innerHTML = "エラー：小数の計算は正常に動作しない可能性があります。";
}

function tab() {
	if ((inputType == 0) || (inputType == 1)) updateInputType(2);
	else if (inputType == 2) updateInputType(1);
}

function pm(type) {
	if ((inputType == 0) || (inputType == 1)) {
		if (value1 < 0) {
			if ((type == 0) || (type == 1)) value1 *= -1;
		} else {
			if ((type == 0) || (type == 2)) value1 *= -1;
		}
		outputValue(value1, "outputValue1");
	} else if (inputType == 2) {
		if (value2 < 0) {
			if ((type == 0) || (type == 1)) value2 *= -1;
		} else {
			if ((type == 0) || (type == 2)) value2 *= -1;
		}
		outputValue(value2, "outputValue2");
	}
}

/* 色の変更 */
function setButtonColor(button) {
	button.style.color = "white";
	button.style.backgroundColor = "teal";
}

function resetButtonColor() {
	inputPlus.style.color = "buttontext";
	inputMinus.style.color = "buttontext";
	inputMultiply.style.color = "buttontext";
	inputDivide.style.color = "buttontext";

	inputPlus.style.backgroundColor = "buttonface";
	inputMinus.style.backgroundColor = "buttonface";
	inputMultiply.style.backgroundColor = "buttonface";
	inputDivide.style.backgroundColor = "buttonface";
}

function updateInputType(type) {
	inputType = type;

	if ((inputType == 0) || (inputType == 1)) {
		outputValue1.style.backgroundColor = "#fcc";
		outputValue2.style.backgroundColor = "white";
	} else if (inputType == 2) {
		outputValue1.style.backgroundColor = "white";
		outputValue2.style.backgroundColor = "#fcc";
	}
}

/* ボタン */
// 数値入力
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

// 演算
function btnInputPlus() {
	calcType = 1;
	calculation();
}

function btnInputMinus() {
	calcType = 2;
	calculation();
}

function btnInputMultiply() {
	calcType = 3;
	calculation();
}

function btnInputDivide() {
	calcType = 4;
	calculation();
}

// 機能
function btnInputAC() {
	clear(0);
}

function btnInputClear() {
	clear(inputType);
}

function btnInputTab() {
	tab();
}

function btnInputDecimal() {
	decimal();
}

function btnInputPM() {
	pm(0);
}

/* キーボード */
document.onkeydown = function(e) {
    switch (e.keyCode) {
	case 9:
            // Tab
            btnInputTab();
            break;

	// 数字
        case 48:
            btnInput0();
            break;
        case 49:
            btnInput1();
            break;
        case 50:
            btnInput2();
            break;
        case 51:
            btnInput3();
            break;
        case 52:
            btnInput4();
            break;
        case 53:
            btnInput5();
            break;
        case 54:
            btnInput6();
            break;
        case 55:
            btnInput7();
            break;
        case 56:
            btnInput8();
            break;
        case 57:
            btnInput9();
            break;

	case 65:
            // A
            btnInputAC();
            break;
	case 67:
            // C
            btnInputClear();
            break;
	case 68:
            // D
            btnInputDecimal();
            break;
	case 77:
            // M
            pm(2);
            break;
	case 80:
            // P
            pm(1);
            break;
	case 84:
            // T
            btnInputTab();
            break;

	// テンキーの数字
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

	// テンキーの記号
        case 106:
            btnInputMultiply();
            break;
        case 107:
            btnInputPlus();
            break;
        case 109:
            btnInputMinus();
            break;
        case 110:
            btnInputDecimal();
            break;
        case 111:
            btnInputDivide();
            break;
    }
}