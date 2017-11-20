var value = -1;

function input(num) {
	if (value < 0) value = num;
	else value = value * 10 + num;

	var output = document.getElementById("output");
	output.innerHTML = value;
}

function btnInputClear() {
	value = -1;

	var output = document.getElementById("output");
	output.innerHTML = "　";
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