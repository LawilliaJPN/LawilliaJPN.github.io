var counters = [];
var counterNames = [];
var deletes = 0;

/* 機能 */
function addCounter() {
    var strTextField = document.getElementById("name").value;
    if (strTextField == "") {
        strTextField = "Counter" + (counters.length+1+deletes);
    }

    counters.push(0);
    counterNames.push(strTextField);
    outputCounter();
}

function clearCounter() {
    counters = [];
    counterNames = [];
    deletes = 0;

    outputCounter();
}

function deleteCounter() {
    var strTextField = document.getElementById("name").value;
    for (var i = 0; i < counters.length; i++) {
        if (counterNames[i] == strTextField) {
            counters.splice(i, 1);
            counterNames.splice(i, 1);
            deletes++;
            i--;
        }
    }
    outputCounter();
}

function addCount(num) {
    counters[num]++;
    outputCounter();
}

function subCount(num) {
    counters[num]--;
    outputCounter();
}

/* 処理 */
function outputCounter() {
    var outputStr = '';
    for (var i = 0; i < counters.length; i++) {
        outputStr = outputStr 
                    + '<tr><td rowspan="2">'+ counterNames[i] +'</th>'
                    + '<td colspan="2">' +  counters[i] +'</td></tr>'
                    + '<tr><td><button onclick="btnMinus(' + i +  ');">－</button></td>'
                    + '<td><button onclick="btnPlus(' + i +  ');">＋</button></td></tr>';
    }
    
    var output = document.getElementById("output");
    output.innerHTML = outputStr;
}

/* ボタン */
function btnAddCounter() {
    addCounter();
}

function btnClearCounter() {
    clearCounter();
}

function btnDeleteCounter() {
    deleteCounter();
}

function btnPlus(num) {
    addCount(num);
}

function btnMinus(num) {
    subCount(num);
}