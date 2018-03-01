/* 初期化 */
var play = false;
// ダイアトニックスケール表示
var diatonic = 1;
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
    for (var i = 0; i < tempChord.length; i++) {
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
    case 4:
        chord = [0, 4, 7, 11];
        break;
    case 5:
        chord = [0, 3, 7, 10];
        break;
    case 6:
        chord = [0, 4, 7, 10];
        break;
    case 7:
        chord = [0, 3, 6, 10];
        break;
    }
}

/* 色の変更 */
function resetAllButtonsColor() {
    for (var i = 0; i < SOUND_Y; i++) {
        resetButtonColor("btnMaj" + i);
        resetButtonColor("btnMin" + i);
        resetButtonColor("btnDim" + i);
        resetButtonColor("btnAug" + i);

        resetButtonColor("btnMaj7" + i);
        resetButtonColor("btnMin7" + i);
        resetButtonColor("btnD7" + i);
        resetButtonColor("btnMin7b5" + i);
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
    case 4:
        typeOfButton += "Maj7" +root;
        break;
    case 5:
        typeOfButton += "Min7" +root;
        break;
    case 6:
        typeOfButton += "D7" +root;
        break;
    case 7:
        typeOfButton += "Min7b5" +root;
        break;
    }

    return typeOfButton;
}

function getButtonScaleId() {
    typeOfButton = "btn";

    switch (chordId) {
    case 0:
    case 4:
        typeOfButton += "Maj" +root;
        break;
    case 1:
    case 5:
        typeOfButton += "Min" +root;
        break;
    }

    return typeOfButton;
}

function displayDiatonic() {
    if (diatonic == 0) return;

    switch (scaleId) {
    case 0:
        // 三和音
        setButtonColorMarkedRed("btnMaj" +calcSound(scaleRoot, 0));
        setButtonColorMarkedRed("btnMin" +calcSound(scaleRoot, 2));
        setButtonColorMarkedRed("btnMin" +calcSound(scaleRoot, 4));
        setButtonColorMarkedRed("btnMaj" +calcSound(scaleRoot, 5));
        setButtonColorMarkedRed("btnMaj" +calcSound(scaleRoot, 7));
        setButtonColorMarkedRed("btnMin" +calcSound(scaleRoot, 9));
        setButtonColorMarkedRed("btnDim" +calcSound(scaleRoot, 11));
        // 四和音
        setButtonColorMarkedRed("btnMaj7" +calcSound(scaleRoot, 0));
        setButtonColorMarkedRed("btnMin7" +calcSound(scaleRoot, 2));
        setButtonColorMarkedRed("btnMin7" +calcSound(scaleRoot, 4));
        setButtonColorMarkedRed("btnMaj7" +calcSound(scaleRoot, 5));
        setButtonColorMarkedRed("btnD7" +calcSound(scaleRoot, 7));
        setButtonColorMarkedRed("btnMin7" +calcSound(scaleRoot, 9));
        setButtonColorMarkedRed("btnMin7b5" +calcSound(scaleRoot, 11));
        break;
    case 1:
        if (diatonic == 1) {
            // 三和音
            setButtonColorMarkedRed("btnMin" +calcSound(scaleRoot, 0));
            setButtonColorMarkedRed("btnDim" +calcSound(scaleRoot, 2));
            setButtonColorMarkedRed("btnMaj" +calcSound(scaleRoot, 3));
            setButtonColorMarkedRed("btnMin" +calcSound(scaleRoot, 5));
            setButtonColorMarkedRed("btnMin" +calcSound(scaleRoot, 7));
            setButtonColorMarkedRed("btnMaj" +calcSound(scaleRoot, 8));
            setButtonColorMarkedRed("btnMaj" +calcSound(scaleRoot, 10));
            // 四和音
            setButtonColorMarkedRed("btnMin7" +calcSound(scaleRoot, 0));
            setButtonColorMarkedRed("btnMin7b5" +calcSound(scaleRoot, 2));
            setButtonColorMarkedRed("btnMaj7" +calcSound(scaleRoot, 3));
            setButtonColorMarkedRed("btnMin7" +calcSound(scaleRoot, 5));
            setButtonColorMarkedRed("btnMin7" +calcSound(scaleRoot, 7));
            setButtonColorMarkedRed("btnMaj7" +calcSound(scaleRoot, 8));
            setButtonColorMarkedRed("btnD7" +calcSound(scaleRoot, 10));
        } else if (diatonic == 2) {
            // 三和音
            setButtonColorMarkedRed("btnMin" +calcSound(scaleRoot, 0));
            setButtonColorMarkedRed("btnDim" +calcSound(scaleRoot, 2));
            setButtonColorMarkedRed("btnAug" +calcSound(scaleRoot, 3));
            setButtonColorMarkedRed("btnMin" +calcSound(scaleRoot, 5));
            setButtonColorMarkedRed("btnMaj" +calcSound(scaleRoot, 7));
            setButtonColorMarkedRed("btnMaj" +calcSound(scaleRoot, 8));
            setButtonColorMarkedRed("btnDim" +calcSound(scaleRoot, 11));
            // 四和音
            // 0mM7
            setButtonColorMarkedRed("btnMin7b5" +calcSound(scaleRoot, 2));
            // 3M7(#5)
            setButtonColorMarkedRed("btnMin7" +calcSound(scaleRoot, 5));
            setButtonColorMarkedRed("btnD7" +calcSound(scaleRoot, 7));
            setButtonColorMarkedRed("btnD7" +calcSound(scaleRoot, 8));
            // 11dim7
        } else if (diatonic == 3) {
            // 三和音
            setButtonColorMarkedRed("btnMin" +calcSound(scaleRoot, 0));
            setButtonColorMarkedRed("btnMin" +calcSound(scaleRoot, 2));
            setButtonColorMarkedRed("btnAug" +calcSound(scaleRoot, 3));
            setButtonColorMarkedRed("btnMaj" +calcSound(scaleRoot, 5));
            setButtonColorMarkedRed("btnMaj" +calcSound(scaleRoot, 7));
            setButtonColorMarkedRed("btnDim" +calcSound(scaleRoot, 9));
            setButtonColorMarkedRed("btnDim" +calcSound(scaleRoot, 11));
            // 四和音
            // 0mM7
            setButtonColorMarkedRed("btnMin7" +calcSound(scaleRoot, 2));
            // 3M7(#5)
            setButtonColorMarkedRed("btnD7" +calcSound(scaleRoot, 5));
            setButtonColorMarkedRed("btnD7" +calcSound(scaleRoot, 7));
            setButtonColorMarkedRed("btnMin7b5" +calcSound(scaleRoot, 9));
            setButtonColorMarkedRed("btnMin7b5" +calcSound(scaleRoot, 11));
        }
    }
}

function updateButtonColor() {
    resetAllButtonsColor();
    displayDiatonic();
    setButtonColorSelected(getButtonId());
}

function updateDiatonic() {
    var id = chordId;
    switch (id) {
    case 4:
        id = 0;
        break;
    case 5:
        id = 1;
        break;
    }

    if ((root == scaleRoot) && (id == scaleId)) {        
        switch (scaleId) {
        case 0:
            if (diatonic != 0) diatonic = 0;
            else diatonic = 1;
            break;
        case 1:
            if (3 <= diatonic) diatonic = 0;
            else diatonic++;
            break;
        case 2:
            break;
        case 3:
            break;
        }
    } else {
        diatonic = 1;
    }

    scaleRoot = root;
    scaleId = id;
    updateNameOfScale();
    updateButtonColor();
}

function updateNameOfScale() {
    if (diatonic == 0) {
        updateHtml("scale", "非表示");
        return;
    }

    switch (scaleId) {
        case 0:
            updateHtml("scale", document.getElementById(getButtonScaleId()).innerHTML + "スケール");
            break;
        case 1:
            if (diatonic == 1) updateHtml("scale", "ナチュラル" + document.getElementById(getButtonScaleId()).innerHTML + "スケール");
            else if (diatonic == 2) updateHtml("scale", "ハーモニック" + document.getElementById(getButtonScaleId()).innerHTML + "スケール");
            else updateHtml("scale", "メロディック" + document.getElementById(getButtonScaleId()).innerHTML + "スケール");
            break;
        default:
            updateHtml("scale", "未実装");
    }
}

/* ボタン */
// 操作
function btnPlay() {
    if (play) stop();
    else start();
}

function btnDiatonic() {
    updateDiatonic();
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

// 四和音
function btnMaj7(num) {
    inputChord(4, num);
}

function btnMin7(num) {
    inputChord(5, num);
}

function btnD7(num) {
    inputChord(6, num);
}

function btnMin7b5(num) {
    inputChord(7, num);
}