var canvas, ctx;
var game = {width:0, height:0, isRunning:false, difficulty:13};
// カード描画関連
var card = {width:0, height:0, widthS:0, heightS:0, numX:0, numY:0};
// 場のカードの中身
var field = [];
var fieldNum = 0;
// 全カードの順番
var cards = [];
// 選択中のカード
var selected = {first:-1, second:-1};

/*
 * 入力
 */
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
function btnStart(dif) {
    game.difficulty = dif;
    setButtonColors();
    start();
}

/*
 * 基本処理
 */
/* ゲームの初期化 */
function start() {
    // 1～13を4つずつ入れる
    cards.length = 0;
    for (var i = 0; i < (game.difficulty * 4); i++) {
        cards[i] = i % game.difficulty + 1;
    }
    shuffleCards(cards, 1000);

    // 場のカードの初期化
    field.length = 0;
    for (fieldNum = 0; fieldNum < 25; fieldNum++) {
        field.push(cards[fieldNum]);
    }

    game.isRunning = false;

    draw();
}

function select(e) {
    var eventX = (e.clientX - canvas.offsetLeft) % (card.width + card.widthS);
    var eventY = (e.clientY - canvas.offsetTop) % (card.height + card.heightS);
    var x = Math.floor((e.clientX - canvas.offsetLeft) / (card.width + card.widthS));
    var y = Math.floor((e.clientY - canvas.offsetTop) / (card.height + card.heightS));
    var num = card.numX * y + x;

    if ((num < 0) || (field.length <= num)) return;
    if ((card.width < eventX) || (card.height < eventY)) return;

    if (selected.first != -1) {
        selected.second = num;

        if (((selected.first - 1) == selected.second) ||
            ((selected.first + 1) == selected.second) ||
            ((selected.first - card.numX) == selected.second) ||
            ((selected.first + card.numX) == selected.second) ||
            ((selected.first + card.numX - 1) == selected.second) || 
            ((selected.first + card.numX + 1) == selected.second) || 
            ((selected.first - card.numX - 1) == selected.second) || 
            ((selected.first - card.numX + 1) == selected.second)) {

            if (field[selected.first] == field[selected.second]) {
                field.splice(selected.first, 1);
                if (selected.first < selected.second) selected.second -= 1;
                field.splice(selected.second, 1);

                for (var i = 0; i < 2; i++) {
                    if (fieldNum < cards.length) {
                        field.push(cards[fieldNum]);
                        fieldNum++;
                    }
                }
                
                selected.first = selected.second = -1;
            } else {
                selected.first = selected.second;
                selected.second = -1;
            }
        } else {
            selected.first = selected.second;
            selected.second = -1;
        }

    } else {
        selected.first = num;
    }
    
    draw();
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
    if (field.length == 0) drawScore();
    else drawGame();
}

/* ゲームの描画 */
function drawGame() {
    // 画面をクリア
    ctx.clearRect(0, 0, game.width, game.height);

    // カード描画関連の初期化
    card.num = 25;
    card.numX = 5;
    card.numY = card.num / card.numX;
    card.width = game.width / (card.numX + 1);
    card.height = game.height / (card.numY + 1);
    card.widthS = card.width / card.numX;
    card.heightS = card.height / card.numY;

    // カードの描画
    ctx.fillStyle = 'black';
    ctx.font = '48px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    var i = 0;
    for (var y = 0; y < card.numY; y++){
        for (var x = 0; x < card.numX; x++){
            if (i < field.length) {
                if ((i == selected.first) || (i == selected.second)) {
                    ctx.fillStyle = '#DDD';
                    ctx.fillRect(card.width * x + card.widthS * x, card.height * y + card.heightS * y, card.width, card.height);
                    ctx.fillStyle = 'black';
                }
                
                ctx.rect(card.width * x + card.widthS * x, card.height * y + card.heightS * y, card.width, card.height);
                ctx.stroke();
                ctx.fillText(field[y * card.numX + x], card.width * (x + 0.5) + card.widthS * x, card.height * (y + 0.5) + card.heightS * y, card.width);
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

    ctx.fillText(getDifficulty(), game.width / 2, card.height * 2, game.width);
    ctx.fillText('CLEAR', game.width / 2, card.height * 3, game.width);
}

/* 難易度の取得 */
function getDifficulty() {
    switch (game.difficulty) {
    case 9:
        return 'Very Easy';
    case 11:
        return 'Easy';
    case 13:
        return 'Normal';
    case 15:
        return 'Hard';
    case 17:
        return 'Very Hard';
    }
}

/* ボタンのデザインの変更 */
function setButtonColors() {
    resetButtonColor('startVE');
    resetButtonColor('startE');
    resetButtonColor('startN');
    resetButtonColor('startH');
    resetButtonColor('startVH');

    switch(game.difficulty) {
    case 9:
        setButtonColorSelected('startVE');
        break;
    case 11:
        setButtonColorSelected('startE');
        break;
    case 13:
        setButtonColorSelected('startN');
        break;
    case 15:
        setButtonColorSelected('startH');
        break;
    case 17:
        setButtonColorSelected('startVH');
        break;
    }
}