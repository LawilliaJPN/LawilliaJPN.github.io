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
    // ゲームの難易度
    difficulty:13,
    // プレイ中か否か
    isRunning:false,
    // 場札の枚数
    numOfFieldCards: 0
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
    // 順番
    deal: [],
    // 場札
    field: [],
    // 選択中のカード
    selected: [-1, -1]
};

/*
 * 基本処理
 */
/* ボタン */
const btnStart = dif => {
    game.difficulty = dif;
    toggleButtonDisplay();
    start();
}

/* ゲームの初期化 */
const start = () => {
    // 1～13を4つずつ入れる
    cards.deal.length = 0;
    for (let i = 0; i < (game.difficulty * 4); i++) {
        cards.deal[i] = i % game.difficulty + 1;
    }
    shuffleCards(cards.deal, 1000);

    // 場のカードの初期化
    cards.field.length = 0;
    for (game.numOfFieldCards = 0; game.numOfFieldCards < 25; game.numOfFieldCards++) {
        cards.field.push(cards.deal[game.numOfFieldCards]);
    }

    cards.selected[0] = -1;
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

    if ((num < 0) || (cards.field.length <= num)) return;
    if ((card.width < eventX) || (card.height < eventY)) return;

    if (cards.selected[0] !== -1) {
        cards.selected[1] = num;

        if (canSelect()) {
            if (cards.field[cards.selected[0]] === cards.field[cards.selected[1]]) {
                cards.field.splice(cards.selected[0], 1);
                if (cards.selected[0] < cards.selected[1]) cards.selected[1] -= 1;
                cards.field.splice(cards.selected[1], 1);

                for (let i = 0; i < 2; i++) {
                    if (game.numOfFieldCards < cards.deal.length) {
                        cards.field.push(cards.deal[game.numOfFieldCards]);
                        game.numOfFieldCards++;
                    }
                }
                
                cards.selected[0] = cards.selected[1] = -1;
            } else {
                cards.selected[0] = cards.selected[1];
                cards.selected[1] = -1;
            }
        } else {
            cards.selected[0] = cards.selected[1];
            cards.selected[1] = -1;
        }

    } else {
        cards.selected[0] = num;
    }
    
    draw();
}

/* カード同士の位置関係の判定 */
const canSelect = () => {
    if ((cards.selected[0] % 5 === 0) && (cards.selected[1] % 5 === 4) ||
        (cards.selected[0] % 5 === 4) && (cards.selected[1] % 5 === 0)) {
        // 左端と右端を選んだ場合、消せない
        return false;
    } else if (((cards.selected[0] - 1) === cards.selected[1]) || 
            ((cards.selected[0] + 1) === cards.selected[1]) ||
            ((cards.selected[0] - card.numX) === cards.selected[1]) ||
            ((cards.selected[0] + card.numX) === cards.selected[1]) ||
            ((cards.selected[0] + card.numX - 1) === cards.selected[1]) || 
            ((cards.selected[0] + card.numX + 1) === cards.selected[1]) || 
            ((cards.selected[0] - card.numX - 1) === cards.selected[1]) || 
            ((cards.selected[0] - card.numX + 1) === cards.selected[1])) {
        // 縦横斜めで隣接する場合は、消せる
        return true;
    } else {
        return false;
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
    document.getElementById('game').innerHTML = `<canvas id="canvas" width="${game.width}" height="${game.height}">`;
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    /* ゲーム中 入力 */
    canvas.addEventListener("mousedown",function(e){
        select(e);
    });
}

const draw = () => {
    if (cards.field.length === 0) drawScore();
    else drawGame();
}

/* ゲームの描画 */
const drawGame = () => {
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

    let i = 0;
    for (let y = 0; y < card.numY; y++){
        for (let x = 0; x < card.numX; x++){
            if (i < cards.field.length) {
                if ((i === cards.selected[0]) || (i === cards.selected[1])) {
                    ctx.fillStyle = '#DDD';
                    ctx.fillRect(card.width * x + card.widthS * x, card.height * y + card.heightS * y, card.width, card.height);
                } else if (cards.field[i] === cards.field[cards.selected[0]]) {
                    ctx.fillStyle = '#FDD';
                    ctx.fillRect(card.width * x + card.widthS * x, card.height * y + card.heightS * y, card.width, card.height);
                }
                
                ctx.fillStyle = 'black';
                ctx.rect(card.width * x + card.widthS * x, card.height * y + card.heightS * y, card.width, card.height);
                ctx.stroke();
                ctx.fillText(cards.field[y * card.numX + x], card.width * (x + 0.5) + card.widthS * x, card.height * (y + 0.5) + card.heightS * y, card.width);
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

    ctx.fillText(getDifficulty(), game.width / 2, card.height * 2, game.width);
    ctx.fillText('CLEAR', game.width / 2, card.height * 3, game.width);
}

/* 難易度の取得 */
const getDifficulty = () => {
    switch (game.difficulty) {
    case 10:
        return 'Easy';
    case 13:
        return 'Normal';
    case 16:
        return 'Hard';
    }
}

/* ボタンのデザインの変更 */
const toggleButtonDisplay = () => {
    const startE = document.getElementById('startE');
    const startN = document.getElementById('startN');
    const startH = document.getElementById('startH');

    switch(game.difficulty) {
    case 10:
        startE.classList.add('bg-info');
        startE.classList.add('text-light');
        startE.classList.remove('btn-light');
        startE.classList.remove('btn-outline-info');

        startN.classList.remove('bg-info');
        startN.classList.remove('text-light');
        startN.classList.add('btn-light');
        startN.classList.add('btn-outline-info');

        startH.classList.remove('bg-info');
        startH.classList.remove('text-light');
        startH.classList.add('btn-light');
        startH.classList.add('btn-outline-info');
        break;
    case 13:
        startN.classList.add('bg-info');
        startN.classList.add('text-light');
        startN.classList.remove('btn-light');
        startN.classList.remove('btn-outline-info');

        startE.classList.remove('bg-info');
        startE.classList.remove('text-light');
        startE.classList.add('btn-light');
        startE.classList.add('btn-outline-info');

        startH.classList.remove('bg-info');
        startH.classList.remove('text-light');
        startH.classList.add('btn-light');
        startH.classList.add('btn-outline-info');
        break;
    case 16:
        startH.classList.add('bg-info');
        startH.classList.add('text-light');
        startH.classList.remove('btn-light');
        startH.classList.remove('btn-outline-info');

        startE.classList.remove('bg-info');
        startE.classList.remove('text-light');
        startE.classList.add('btn-light');
        startE.classList.add('btn-outline-info');

        startN.classList.remove('bg-info');
        startN.classList.remove('text-light');
        startN.classList.add('btn-light');
        startN.classList.add('btn-outline-info');
        break;
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