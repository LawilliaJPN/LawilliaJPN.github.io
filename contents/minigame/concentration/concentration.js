var canvas, ctx;
var game = {width:0, height:0, mode:0, isRunning:false, timer:0, count:0, missCount:0, pair:0};
// カード描画関連
var card = {width:0, height:0, widthS:0, heightS:0, numX:0, numY:0};
// 各カードの中身
var cards = [20];
// 各カードが既にそろっているか
var isPair = [20];
// 既にその数字が出ているか
var isAlreadyCard= [20];
var isAlreadyNumber= [10];
var isAlreadyNow = false;
// 表のカード
var front = {first:-1, second:-1};

/*
 * 入力
 */
/* タイマー */
setInterval(concentration, 10);

/* ページを開いたとき */
window.onload = function() {
    updateCanvas();
    start();
}

/* ウィンドウのサイズが変わったとき */
window.onresize = function() {
    updateCanvas();
    draw();
}

/* ボタン */
function btnStart(mode) {
    game.mode = mode;
    setButtonColors();
    start();
}

/* キーボード */
document.onkeydown = function(e) {
    start();
}

/*
 * 基本処理
 */
function concentration() {
    if (!game.isRunning) return;
    game.timer++;
}

function start() {
    updateCanvas();

    cards.length = 0;
    for (var i = 0; i < 20; i++) {
        cards[i] = i % 10;
    }
    shuffleCards(cards, 100);

    isPair = [false, false, false, false, false, false, false, false, false, false,
            false, false, false, false, false, false, false, false, false, false];
    isAlreadyCard = [false, false, false, false, false, false, false, false, false, false,
            false, false, false, false, false, false, false, false, false, false];
    isAlreadyNumber = [false, false, false, false, false, false, false, false, false, false];

    game.isRunning = false;
    game.timer = 0;
    game.count = game.missCount = 0;
    game.pair = cards.length /2;
    front.first = front.second = -1;

    draw();
}

function clear() {
    game.isRunning = false;
    draw();
}

function select(e) {
    var eventX = (e.clientX - canvas.offsetLeft) % (card.width + card.widthS);
    var eventY = (e.clientY - canvas.offsetTop) % (card.height + card.heightS);
    var x = Math.floor((e.clientX - canvas.offsetLeft) / (card.width + card.widthS));
    var y = Math.floor((e.clientY - canvas.offsetTop) / (card.height + card.heightS));
    var num = card.numX * y + x;

    if ((eventX <= card.width) && (eventY <= card.height) && (isPair[num] == false)) {
        if (front.first != -1) {
            if (front.first == num) return;
            
            front.second = num;
            draw();

            game.isRunning = true;
            game.count++;

            if (cards[front.first] == cards[front.second]) {
                isPair[front.first] = true;
                isPair[front.second] = true;
                
                game.pair--;
                if (game.pair == 0) clear();
            } else {
                if (isAlreadyNow) {
                    console.log('miss');
                    game.missCount++;
                } else if (isAlreadyCard[front.second]) {
                    console.log('miss');
                    game.missCount++;
                }
            }

            isAlreadyNumber[cards[front.second]] = true;
            isAlreadyCard[front.second] = true;
            front.first = front.second = -1;
        } else {
            front.first = num;
            draw();

            isAlreadyCard[front.first] = true;
            if (isAlreadyNumber[cards[front.first]]) {
                isAlreadyNow = true;
            } else {
                isAlreadyNumber[cards[front.first]] = true;
                isAlreadyNow = false;
            }
        }
    }
}

/*
 * 表示
 */
/* Canvasの更新 */
function updateCanvas() {
    updateSize();
    getCanvas();
}

/* Canvasサイズの反映 */
function updateSize() {
	game.width = document.body.clientWidth;
	game.height = window.innerHeight /2;
}

/* Canvas要素を取得して行う処理 */
function getCanvas() {
    updateHtml('game', '<canvas id="canvas" width="' + game.width + '" height="' + game.height + '">');
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    /* ゲーム中 入力 */
    canvas.addEventListener("mousedown",function(e){
        select(e);
    });
}

function draw() {
    if (game.pair == 0) drawScore();
    else drawGame();
}

/* ゲームの描画 */
function drawGame() {
    // 画面をクリア
    ctx.clearRect(0, 0, game.width, game.height);

    // カード描画関連の初期化
    card.num = 20;
    card.numX = 5;
    card.numY = cards.length / card.numX;
    card.width = game.width / (card.numX + 1);
    card.height = game.height / (card.numY + 1);
    card.widthS = card.width / (card.numX - 1);
    card.heightS = card.height / card.numY;

    // カードの描画
    ctx.fillStyle = 'black';
    ctx.font = '48px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    var i = 0;
    for (var y = 0; y < card.numY; y++){
        for (var x = 0; x < card.numX; x++){
            if (!isPair[i]) {
                if ((i == front.first) || (i == front.second)) {
                    switch (game.mode) {
                    case 0:
                        ctx.fillText(cards[y * card.numX + x], card.width * (x + 0.5) + card.widthS * x, card.height * (y + 0.5) + card.heightS * y, card.width);
                        break;
                    case 1:
                        ctx.fillStyle = getColorBW(cards[y * card.numX + x]);
                        ctx.fillRect(card.width * x + card.widthS * x, card.height * y + card.heightS * y, card.width, card.height);
                        ctx.fillStyle = 'black';
                        break;
                    }
                }
                
                ctx.rect(card.width * x + card.widthS * x, card.height * y + card.heightS * y, card.width, card.height);
                ctx.stroke();
            } else {
                ctx.fillRect(card.width * x + card.widthS * x, card.height * y + card.heightS * y, card.width, card.height);
            }
            i++;
        }
    }
}

/* ゲームクリア画面の描画 */
function drawScore() {
    // 画面をクリア
    ctx.clearRect(0, 0, game.width, game.height);

    // スコアの描画
    ctx.fillStyle = 'black';
    ctx.font = '48px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    ctx.fillText('CLEAR', game.width / 2, card.height * 0, game.width);
    ctx.fillText('時間：' + (Math.floor(game.timer / 6000)) + '分' + (game.timer % 6000 / 100) + '秒', game.width / 2, card.height * 2, game.width);
    ctx.fillText('回数：' + game.count + '回', game.width / 2, card.height * 3, game.width);
    ctx.fillText('ミス：' + game.missCount + '回', game.width / 2, card.height * 4, game.width);
}

/* ボタンのデザインの変更 */
function setButtonColors() {
    resetButtonColor('startNum');
    resetButtonColor('startBW');

    switch(game.mode) {
    case 0:
        setButtonColorSelected('startNum');
        break;
    case 1:
        setButtonColorSelected('startBW');
        break;
    }
}

/* 白黒モードの色の取得 */
function getColorBW(num) {
    switch (num) {
    case 0:
        return '#000000';
    case 1:
        return '#191919';
    case 2:
        return '#323232';
    case 3:
        return '#4B4B4B';
    case 4:
        return '#646464';
    case 5:
        return '#7D7D7D';
    case 6:
        return '#969696';
    case 7:
        return '#AFAFAF';
    case 8:
        return '#C8C8C8';
    case 9:
        return '#E1E1E1';
    }
}