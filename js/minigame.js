/* HTML */
function updateHtml(id, str) {
    document.getElementById(id).innerHTML = str;
}

/* CSS */
function resetButtonColor(button) {
	document.getElementById(button).style.background = "linear-gradient(45deg, #000 10%, #222 90%)";
}

function setButtonColorSelected(button) {
	document.getElementById(button).style.background = "linear-gradient(45deg, #000 10%, #088 90%)";
}