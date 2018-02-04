var play = false;
var root = 0;
var chord = [0, 4, 7];
var tempRoot = 0;
var tempChord = [0, 4, 7];
var chordId = 0;

/* 再生・停止 */
function start() {
    play = true;
    updateHtml("btnPlay", "停止");
    startSounds();
}

function stop() {
    play = false;
    updateHtml("btnPlay", "再生");
    stopSounds()
}

function updateSounds() {
    if (!play) return;
    sound[BASS_SOUND][tempRoot].stop();
    for (var i = 0; i < chord.length; i++) {
        sound[CHORD_SOUNDS][calcSound(tempRoot, tempChord[i])].stop();
    }
    initSounds();

    sound[BASS_SOUND][root].start();
    for (var i = 0; i < chord.length; i++) {
        sound[CHORD_SOUNDS][calcSound(root, chord[i])].start();
        console.log(hz[CHORD_SOUNDS][calcSound(root, chord[i])]);
    }
}

function startSounds() {
    sound[BASS_SOUND][root].start();
    for (var i = 0; i < chord.length; i++) {
        sound[CHORD_SOUNDS][calcSound(root, chord[i])].start();
    }
}

function stopSounds() {
    sound[BASS_SOUND][root].stop();
    for (var i = 0; i < chord.length; i++) {
        sound[CHORD_SOUNDS][calcSound(root, chord[i])].stop();
    }
    initSounds();
}

function calcSound(root, interval) {
    return (root +interval) %SOUND_Y;
}

/* 和音の変更 */
function inputChord(id, num) {
    resetButtonColor(getButtonId());
    chordId = id;
    setRoot(num);
    setChord();
    updateSounds();
    setButtonColor(getButtonId());
}

function setRoot(num) {
    tempRoot = root;
    root = num;
}

function setChord() {
    tempChord = chord;

    switch (chordId) {
    case 0:
        chord = [0, 4, 7];
        break;
    case 1:
        chord = [0, 3, 7];
        break;
    case 2:
        chord = [0, 3, 6];
        break;
    case 3:
        chord = [0, 4, 8];
        break;
    }
}

/* 色の変更 */
function setButtonColor(button) {
	document.getElementById(button).style.color = "white";
	document.getElementById(button).style.backgroundColor = "teal";
}

function resetButtonColor(button) {
	document.getElementById(button).style.color = "buttontext";
	document.getElementById(button).style.backgroundColor = "buttonface";
}

function getButtonId() {
    typeOfButton = "btn";

    switch (chordId) {
    case 0:
        typeOfButton += "Maj" +root;
        break;
    case 1:
        typeOfButton += "Min" +root;
        break;
    case 2:
        typeOfButton += "Dim" +root;
        break;
    case 3:
        typeOfButton += "Aug" +root;
        break;
    }

    return typeOfButton;
}

/* ボタン */
function btnPlay() {
    if (play) stop();
    else start();
}

function btnMaj(num) {
    inputChord(0, num);
}

function btnMin(num) {
    inputChord(1, num);
}

function btnDim(num) {
    inputChord(2, num);
}

function btnAug(num) {
    inputChord(3, num);
}