var testQ, testA;
var answered = false;

/* 機能 */
function resisterWord() {
    var wordQ = document.getElementById("wordQ").value;
    var wordA = document.getElementById("wordA").value;

    if (wordA.includes("／")) {
        outputMsg("resisterMsg", "「／」を含む文字列を登録することはできません。");
        return;
    } else {
        outputMsg("resisterMsg", "問題「" + wordQ + "」、解答「" + wordA + "」を登録しました。");
    }
    wordA = wordA + "／" + 0 + "／" + 0;

    localStorage.setItem(wordQ, wordA);
}

function displayTest() {
    if (localStorage.length == 0) {
        outputMsg("testQ", "問題：");
        outputMsg("testMsg", "エラー：単語が登録されていません。");
        return;
    }

    var num = Math.floor(Math.random()*localStorage.length);
    testQ = localStorage.key(num);
    testA = localStorage.getItem(testQ).split("／");

    outputMsg("testQ", "問題：" + testQ);
    outputMsg("testMsg", "　");
    answered = false;
}

function decideTest() {
    if (answered) {
        outputMsg("testMsg", "解答済みです。「次の問題」を押してください。");
        return;
    }

    var input = document.getElementById("testA").value;

    if (input == testA[0]) {
        outputMsg("testMsg", "正解です。");
        testA[1]++;
    } else {
        outputMsg("testMsg", "不正解です。正答：" +testA[0] + "です。");
    }
    testA[2]++;

    localStorage.removeItem(testQ);
    localStorage.setItem(testQ, testA[0] + "／" + testA[1] + "／" + testA[2]);
    answered = true;
}

/* 処理 */
function outputMsg(id, str) {
    document.getElementById(id).innerHTML = str;

}

function resetMsg() {
    displayTest();
    outputMsg("resisterMsg", "　");
}

/* ボタン */
function btnRegister() {
    resisterWord();
}

function btnTest() {
    decideTest();
}

function btnNext() {
    displayTest();
}

/* イベント */
// ページを開いたとき
window.onload = function() {
    resetMsg();
}