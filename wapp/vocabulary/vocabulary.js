var testQ, testA;
var answered = false;
var displayed = false;

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

function removeWord(i) {
    localStorage.removeItem(localStorage.key(i));
    displayList();
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
    outputMsg("testA", '解答：<input id="testInput">');
    outputMsg("testMsg", "　");
    answered = false;
}

function decideTest() {
    var input = document.getElementById("testInput").value;

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

function displayList() {
    var outputStr = '';
    var wordQ, wordA, rate;

    for (var i = 0; i < localStorage.length; i++) {
        wordQ = localStorage.key(i);
        wordA = localStorage.getItem(wordQ).split("／");
        if (wordA[2] == 0) {
            rate = "-";
        } else {
            rate = Math.round(wordA[1] / wordA[2] * 100);
            rate = "正答率：" + rate + "％";
        }

        outputStr = outputStr 
                    + '<tr><th colspan="2">'+ wordQ +'</th>' 
                    + '<th colspan="2">' +  wordA[0] +'</th></tr>'
                    + '<tr><td>正解：' + wordA[1] + '回</td><td>出題：' + wordA[2] + '回</td>'
                    + '<td>' + rate + '</td>'
                    + '<td><button onclick="btnDelete(' + i +  ');">削除</button></td></tr>';
    }
    
    var output = document.getElementById("list");
    output.innerHTML = outputStr;

    var button = document.getElementById("btnList");
    button.innerHTML = "非表示";
    displayed = true;
}

function hideList() {
    var output = document.getElementById("list");
    output.innerHTML = "";

    var button = document.getElementById("btnList");
    button.innerHTML = "表示";
    displayed = false;
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

function btnDelete(i) {
    removeWord(i);
}

function btnTest() {
    decideTest();
}

function btnNext() {
    displayTest();
}

function btnList() {
    if (displayed) {
        hideList();
    } else {
        displayList();
    }
}

/* イベント */
// ページを開いたとき
window.onload = function() {
    resetMsg();
}