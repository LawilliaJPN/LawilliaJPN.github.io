/* Audio Context */
// 周波数の準備
var SOUND_X = 2, SOUND_Y = 12;
var BASS_SOUND = 0, CHORD_SOUNDS = 1;
var hz = [
    [261.626, 277.183, 293.665, 311.127, 329.628, 349.228,
        369.994, 195.998, 207.652, 220.000, 233.082, 246.942],
    [523.251, 554.365, 587.330, 622.254, 659.255, 698.456,
        739.989, 391.995, 415.305, 440.000, 466.164, 493.883]
];
// 各音の二元配列
var sound = new Array(SOUND_X);
for (var i =0; i <SOUND_Y; i++) sound[i] = new Array(SOUND_Y);
// 初期化
var audioCtx = new AudioContext();
var audioGain = audioCtx.createGain();
initSounds();
// 出力
audioGain.connect(audioCtx.destination);

function initSounds() {
    audioGain.gain.value = document.getElementById('volume').value;

    for (var i =0; i <SOUND_X; i++) {
        for (var k =0; k <SOUND_Y; k++) {
            initSound(i, k);
        }
    }
}

function initSound(i, k) {
    sound[i][k] = audioCtx.createOscillator();
    // ボリューム
    sound[i][k].connect(audioGain);
    // 周波数
    sound[i][k].frequency.value = hz[i][k];
    // 音色
    sound[i][k].type = 'sine';
}