function btnUpdate() {
    var strLen = document.getElementById('inputLen').value;
    var strNum = document.getElementById('inputNum').value;

    // 入力された値の例外処理
    if ((strLen == '') || (strLen == '')) {
        document.getElementById('outputMsg').innerHTML = '入力をしてから更新ボタンを押してください。';
        document.getElementById('outputMsg').className = 'caution';
        return;
    } else if ((strLen.match(/[^0-9]+/)) || (strLen.match(/[^0-9]+/))) {
        document.getElementById('outputMsg').innerHTML = '半角数字のみで入力してください。';
        document.getElementById('outputMsg').className = 'caution';
        return;
    }

    var max = parseInt(strLen, 10);
    var num = parseInt(strNum, 10);

    // 入力された数値の例外処理
    if ((max <= 0) || (num <= 0)) {
        document.getElementById('outputMsg').innerHTML = '自然数を入力してください。';
        document.getElementById('outputMsg').className = 'caution';
        return;
    } else if (max < num) {
        document.getElementById('outputMsg').innerHTML = '入力値の大小関係が正しくありません。';
        document.getElementById('outputMsg').className = 'caution';
        return;
    }

    var cnt = 0;
    var i = 0;
    var min = 1;
    
    while (true) {
        cnt++;
        i = Math.floor((min + max) / 2);
    
        if (i == num) {
            document.getElementById('outputCnt').innerHTML = cnt;
            document.getElementById('outputMsg').innerHTML = '';
            document.getElementById('outputMsg').className = '';
            return;
        } else if (num < i) {
            max = i - 1;
        } else if (i < num) {
            min = i + 1;
        }

        // 無限ループ回避
        if (cnt == 10000) {
            document.getElementById('outputMsg').innerHTML = '探索回数が1万回以上のため、計算を打ち切ります。';
            document.getElementById('outputMsg').className = 'caution';
            return;
        }
    }
}