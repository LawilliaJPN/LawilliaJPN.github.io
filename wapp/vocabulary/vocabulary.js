var testQ, testA;
var answered = false;

/* 機能 */
function resisterWord() {
    var wordQ = document.getElementById("wordQ").value;
    var wordA = document.getElementById("wordA").value;

    // 例外処理
    if (wordA.includes("／")) {
        outputMsg("resisterMsg", "エラー：「／」を含む文字列を登録することはできません。");
        return;
    } else if (wordQ == "") {
        outputMsg("resisterMsg", "エラー：「問題」が空欄です。");
        return;
    } else if (wordA == "") {
        outputMsg("resisterMsg", "エラー：「解答」が空欄です。");
        return;
    }

    outputMsg("resisterMsg", "問題「" + wordQ + "」、解答「" + wordA + "」を登録しました。");
    wordA = wordA + "／" + 0 + "／" + 0;
    localStorage.setItem(wordQ, wordA);
}

function displayTest() {
    // 例外処理
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
    var input = document.getElementById("testA").value;

    // 例外処理
    if (answered) {
        outputMsg("testMsg", "エラー：解答済みです。「次の問題」を押してください。");
        return;
    } else if (input == "") {
        outputMsg("testMsg", "エラー：「解答」が空欄です。");
        return;
    }

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