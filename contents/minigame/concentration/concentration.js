'use strict';

/*
 * グローバル変数
 */

let canvas, ctx;

/* ゲーム全体 */
const game = {
    // Canvasのサイズ
    width:0,
    height:0,
    // ゲームモード
    mode:0,
    // プレイ中か否か
    isRunning:false,
    // カードの枚数
    numOfCards:20,
    // ペア成立数
    pair:0
};

/* スコア関連 */
const result = {
    timer:0,
    count:0,
    miss:0
};

/* カード描画関連 */
const card = {
    // カードのサイズ
    width:0,
    height:0,
    // カード同士の隙間のサイズ
    widthS:0,
    heightS:0,
    // カードが縦横何枚ずつ並ぶか
    numX:0,
    numY:0
};

/* 各カードの情報 */
const cards = {
    // 各カードの種類
    number: [game.numOfCards],
    // ペアが揃っているか否か
    isPaired: [game.numOfCards],
    // カードか既知の否か
    isKnownCard: [game.numOfCards],
    // 種類か既知の否か
    isKnownNumber: [game.numOfCards / 2],
    // 1枚目として選択中のカードが既知か否か
    isKnownNow: false,
    // 選択中のカード
    selected: [-1, -1]
};

/*
 * 基本処理
 */
/* ボタン */
const btnStart = mode => {
    game.mode = mode;
    toggleButtonDisplay();
    start();
}

const concentration = () => {
    if (!game.isRunning) return;
    result.timer++;
}

const start = () => {
    updateCanvas();

    cards.number.length = 0;
    for (let i = 0; i < game.numOfCards; i++) {
        cards.number[i] = i % 10;
        cards.isPaired[i] = false;
        cards.isKnownCard[i] = false;
	cards.isKnownNumber[i / 2] = false;
    }
    shuffleCards(cards.number, 100);

    game.isRunning = false;
    game.pair = cards.number.length /2;
    result.timer = 0;
    result.count = result.miss = 0;
    cards.selected[0] = cards.selected[1] = -1;

    draw();
}

const clear = () => {
    game.isRunning = false;
    draw();
}

const select = e => {
    const rect = e.target.getBoundingClientRect();
    const eventX = (e.clientX - Math.floor(rect.left)) % (card.width + card.widthS);
    const eventY = (e.clientY - Math.floor(rect.top)) % (card.height + card.heightS);
    const x = Math.floor((e.clientX - Math.floor(rect.left)) / (card.width + card.widthS));
    const y = Math.floor((e.clientY - Math.floor(rect.top)) / (card.height + card.heightS));
    const num = card.numX * y + x;

    if ((eventX <= card.width) && (eventY <= card.height) && (cards.isPaired[num] === false)) {
        if (cards.selected[0] !== -1) {
            if (cards.selected[0] === num) return;
            
            cards.selected[1] = num;
            draw();

            game.isRunning = true;
            result.count++;

            if (cards.number[cards.selected[0]] === cards.number[cards.selected[1]]) {
                cards.isPaired[cards.selected[0]] = true;
                cards.isPaired[cards.selected[1]] = true;
                
                game.pair--;
                if (game.pair === 0) clear();
            } else {
                if (cards.isKnownNow) {
                    console.log('miss');
                    result.miss++;
                } else if (cards.isKnownCard[cards.selected[1]]) {
                    console.log('miss');
                    result.miss++;
                }
            }

            cards.isKnownNumber[cards.number[cards.selected[1]]] = true;
            cards.isKnownCard[cards.selected[1]] = true;
            cards.selected[0] = cards.selected[1] = -1;
        } else {
            cards.selected[0] = num;
            draw();

            cards.isKnownCard[cards.selected[0]] = true;
            if (cards.isKnownNumber[cards.number[cards.selected[0]]]) {
                cards.isKnownNow = true;
            } else {
                cards.isKnownNumber[cards.number[cards.selected[0]]] = true;
                cards.isKnownNow = false;
            }
        }
    }
}

/*
 * 表示
 */
/* Canvasの更新 */
const updateCanvas = () => {
    updateSize();
    getCanvas();
}

/* Canvasサイズの反映 */
const updateSize = () => {
    game.width = document.getElementById('game').clientWidth;
    game.height = window.innerHeight / 2;
}

/* Canvas要素を取得して行う処理 */
const getCanvas = () => {
    updateHtml('game', '<canvas id="canvas" width="' + game.width + '" height="' + game.height + '">');
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    /* ゲーム中 入力 */
    canvas.addEventListener('mousedown',function(e){
        select(e);
    });
}

const draw = () => {
    if (game.pair === 0) drawScore();
    else drawGame();
}

/* ゲームの描画 */
const drawGame = () => {
    // 画面をクリア
    ctx.clearRect(0, 0, game.width, game.height);

    // カード描画関連の初期化
    card.num = 20;
    card.numX = 5;
    card.numY = cards.number.length / card.numX;
    card.width = game.width / (card.numX + 1);
    card.height = game.height / (card.numY + 1);
    card.widthS = card.width / (card.numX - 1);
    card.heightS = card.height / card.numY;

    // カードの描画
    ctx.fillStyle = 'black';
    ctx.font = '48px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    let i = 0;
    for (let y = 0; y < card.numY; y++){
        for (let x = 0; x < card.numX; x++){
            if (!cards.isPaired[i]) {
                if ((i === cards.selected[0]) || (i === cards.selected[1])) {
                    switch (game.mode) {
                    case 0:
                        ctx.fillText(cards.number[y * card.numX + x], card.width * (x + 0.5) + card.widthS * x, card.height * (y + 0.5) + card.heightS * y, card.width);
                        break;
                    case 1:
                        ctx.fillStyle = getColorBW(cards.number[y * card.numX + x]);
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
const drawScore = () => {
    // 画面をクリア
    ctx.clearRect(0, 0, game.width, game.height);

    // スコアの描画
    ctx.fillStyle = 'black';
    ctx.font = '48px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    ctx.fillText('CLEAR', game.width / 2, card.height * 0, game.width);
    ctx.fillText(`時間：${Math.floor(result.timer / 6000)}分${(result.timer % 6000 / 100)}秒`, game.width / 2, card.height * 1.5, game.width);
    ctx.fillText(`回数：${result.count}回`, game.width / 2, card.height * 2.5, game.width);
    ctx.fillText(`ミス：${result.miss}回`, game.width / 2, card.height * 3.5, game.width);
}

/* ボタンの見た目の切り替え */
const toggleButtonDisplay = () => {
    const startNum = document.getElementById('startNum');
    const startBW = document.getElementById('startBW');

    switch(game.mode) {
    case 0:
        startNum.classList.add('bg-info');
        startNum.classList.add('text-light');
        startNum.classList.remove('btn-light');
        startNum.classList.remove('btn-outline-info');

        startBW.classList.remove('bg-info');
        startBW.classList.remove('text-light');
        startBW.classList.add('btn-light');
        startBW.classList.add('btn-outline-info');
        break;
    case 1:
        startBW.classList.add('bg-info');
        startBW.classList.add('text-light');
        startBW.classList.remove('btn-light');
        startBW.classList.remove('btn-outline-info');

        startNum.classList.remove('bg-info');
        startNum.classList.remove('text-light');
        startNum.classList.add('btn-light');
        startNum.classList.add('btn-outline-info');
        break;
    }
}

/* 白黒モードの色の取得 */
const getColorBW = num => {
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

/* キーボード */
document.onkeydown = function(e) {
    start();
}
/* タイマー */
setInterval(concentration, 10);