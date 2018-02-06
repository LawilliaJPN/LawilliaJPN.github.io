/* 初期化 */
var play = false;
// ダイアトニックスケール表示
var diatonic = true;
var scaleRoot = 0;
var scaleId = 0;
// コード選択
var root = 0;
var chord = [0, 4, 7];
var tempRoot = 0;
var tempChord = [0, 4, 7];
var chordId = 0;
// CSS
updateButtonColor();

/* 再生・停止 */
function start() {
    play = true;
    updateHtml("btnPlay", "停止");
    startSounds();
}

function stop() {
    play = false;
    updateHtml("btnPlay", "再生");
    stopSounds();
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
    }
}

function startSounds() {
    initSounds();
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
}

function calcSound(root, interval) {
    return (root +interval) %SOUND_Y;
}

/* 和音の変更 */
function inputChord(id, num) {
    chordId = id;
    setRoot(num);
    setChord();
    updateSounds();
    updateButtonColor();
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
function setButtonColorSelected(button) {
	document.getElementById(button).style.color = "white";
	document.getElementById(button).style.backgroundColor = "teal";
}

function setButtonColorDiatonic(button) {
	document.getElementById(button).style.color = "buttontext";
	document.getElementById(button).style.backgroundColor = "#c99";
}

function resetButtonColor(button) {
	document.getElementById(button).style.color = "buttontext";
	document.getElementById(button).style.backgroundColor = "buttonface";
}

function resetAllButtonsColor() {
    for (var i = 0; i < SOUND_Y; i++) {
        resetButtonColor("btnMaj" + i);
        resetButtonColor("btnMin" + i);
        resetButtonColor("btnDim" + i);
        resetButtonColor("btnAug" + i);
    }
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

function displayDiatonic() {
    if (!diatonic) return;
    if (scaleId == 0) {
        setButtonColorDiatonic("btnMaj" +calcSound(scaleRoot, 0));
        setButtonColorDiatonic("btnMin" +calcSound(scaleRoot, 2));
        setButtonColorDiatonic("btnMin" +calcSound(scaleRoot, 4));
        setButtonColorDiatonic("btnMaj" +calcSound(scaleRoot, 5));
        setButtonColorDiatonic("btnMaj" +calcSound(scaleRoot, 7));
        setButtonColorDiatonic("btnMin" +calcSound(scaleRoot, 9));
        setButtonColorDiatonic("btnDim" +calcSound(scaleRoot, 11));
    } else {
        updateHtml("scale", "未実装");
    }
}

function updateButtonColor() {
    resetAllButtonsColor();
    displayDiatonic();
    setButtonColorSelected(getButtonId());
}

/* ボタン */
// 操作
function btnPlay() {
    if (play) stop();
    else start();
}

function btnDiatonic() {
    if ((diatonic) && (root == scaleRoot) && (chordId == scaleId)) {
        diatonic = false;
        updateHtml("scale", "非表示");
    } else {
        diatonic = true;
        scaleRoot = root;
        scaleId = chordId;
        updateHtml("scale", document.getElementById(getButtonId()).innerHTML + "スケール");
    }
    updateButtonColor();
}

// 三和音
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