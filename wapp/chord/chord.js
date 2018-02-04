var play = false;
var root = 0;
var chord = [0, 4, 7];
var tempRoot = 0;
var tempChord = [0, 4, 7];

/* 再生・停止 */
function start() {
    play = true;
    outputMsg("btnPlay", "停止");
    startSounds();
}

function stop() {
    play = false;
    outputMsg("btnPlay", "再生");
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
function setRoot(num) {
    tempRoot = root;
    root = num;
    updateSounds();
}

/* 色の変更 */
function setButtonColor(button) {
	button.style.color = "white";
	button.style.backgroundColor = "teal";
}

function resetButtonColor(button) {
	button.style.color = "buttontext";
	button.style.backgroundColor = "buttonface";
}

/* 基本処理 */
function outputMsg(id, str) {
    document.getElementById(id).innerHTML = str;
}

/* ボタン */
function btnPlay() {
    if (play) stop();
    else start();
}

function btnRoot(num) {
    setRoot(num);
}