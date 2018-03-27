var canvas, ctx;
var game = {width:0, height:0, isRunning:false, timer:0, count:0, missCount:0, pair:0};
// カード描画関連
var card = {width:0, height:0, widthS:0, heightS:0, numX:0, numY:0};
// 各カードの中身
var cards = [20];
// 各カードが既にそろっているか
var isPair = [20];
// 既にその数字が出ているか
var isAlready = [10];
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
    if (game.isRunning) drawGame();
}

/* ボタン */
function btnStart() {
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

    cards = ['0', '0', '1', '1', '2', '2', '3', '3', '4', '4',
             '5', '5', '6', '6', '7', '7', '8', '8', '9', '9'];
    isPair = [false, false, false, false, false, false, false, false, false, false,
            false, false, false, false, false, false, false, false, false, false];
    isAlready = [false, false, false, false, false, false, false, false, false, false];

    game.isRunning = false;
    game.timer = 0;
    game.count = game.missCount = 0;
    game.pair = cards.length /2;
    front.first = front.second = -1;

    shuffle();
    drawGame();
}

function clear() {
    game.isRunning == false;
    drawScore();
}

function shuffle() {
    var cardA, cardB, temp;

    for (var i = 0; i < 100; i++) {
        cardA = Math.floor(Math.random() * cards.length);
        cardB = Math.floor(Math.random() * cards.length);
        
        temp = cards[cardA];
        cards[cardA] = cards[cardB];
        cards[cardB] = temp;
    }
}

function select(e) {
    var eventX = (e.clientX - canvas.offsetLeft) % (card.width + card.widthS);
    var eventY = (e.clientY - canvas.offsetTop) % (card.height + card.heightS);
    var x = Math.floor((e.clientX - canvas.offsetLeft) / (card.width + card.widthS));
    var y = Math.floor((e.clientY - canvas.offsetTop) / (card.height + card.heightS));
    var num = 5 * y + x;

    if ((eventX <= card.width) && (eventY <= card.height) && (isPair[num] == false)) {
        if (front.first != -1) {
            front.second = num;
            drawGame();

            game.isRunning = true;
            game.count++;

            if (cards[front.first] == cards[front.second]) {
                isPair[front.first] = true;
                isPair[front.second] = true;
                
                game.pair--;
                if (game.pair == 0) clear();
            } else {
                if (isAlreadyNow) {
                    game.missCount++;
                }
            }

            isAlready[cards[front.second]] = true;
            front.first = front.second = -1;
        } else {
            front.first = num;
            drawGame();
            if (isAlready[cards[front.first]]) {
                isAlreadyNow = true;
            } else {
                isAlready[cards[front.first]] = true;
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
                ctx.rect(card.width * x + card.widthS * x, card.height * y + card.heightS * y, card.width, card.height);
                ctx.stroke();

                if ((i == front.first) || (i == front.second)) {
                    ctx.fillText(cards[y * card.numX + x], card.width * (x + 0.5) + card.widthS * x, card.height * (y + 0.5) + card.heightS * y, card.width);
                }
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