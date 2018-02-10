/* HTML */
function updateHtml(id, str) {
    document.getElementById(id).innerHTML = str;
}

/* CSS */
function resetButtonColor(button) {
	document.getElementById(button).style.color = "buttontext";
	document.getElementById(button).style.backgroundColor = "buttonface";
}

function setButtonColorSelected(button) {
	document.getElementById(button).style.color = "white";
	document.getElementById(button).style.backgroundColor = "teal";
}

function setButtonColorMarkedRed(button) {
	document.getElementById(button).style.color = "buttontext";
	document.getElementById(button).style.backgroundColor = "#c99";
}