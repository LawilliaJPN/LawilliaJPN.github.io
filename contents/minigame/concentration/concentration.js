'use strict';

/*
 * グローバル変数
 */
let canvas, ctx;
const debug = false;

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

/* 設定 */
const option = {
    keyControl: false,
    slide: false
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
    number: new Array(game.numOfCards),
    // ペアが揃っているか否か
    isPaired: new Array(game.numOfCards),
    // カードが既知か否か
    isKnownCard: new Array(game.numOfCards),
    // 種類が既知か否か
    isKnownNumber: new Array(game.numOfCards / 2),
    // 1枚目として選択中のカードが既知か否か
    isKnownNow: false,
    // 選択中のカード
    selected: [-1, -1]
};

/* スライド関連 */
const slide = {
    display: false,
    tempDirection: -1
}

/*
 * ボタン
 */
/* モード切替 */
const btnStart = mode => {
    game.mode = mode;
    toggleButtonDisplay();
    start();
}

/* キー操作 設定 */
const btnOptionKey = () => {
    const optionKey = document.getElementById('btnOptionKey');

    switch(option.keyControl) {
    case true:
        optionKey.classList.remove('bg-info');
        optionKey.classList.remove('text-light');
        optionKey.classList.add('btn-light');
        optionKey.classList.add('btn-outline-info');

        optionKey.innerHTML = 'オフ';
        option.keyControl = false;
        break;
    case false:
        optionKey.classList.add('bg-info');
        optionKey.classList.add('text-light');
        optionKey.classList.remove('btn-light');
        optionKey.classList.remove('btn-outline-info');

        optionKey.innerHTML = 'オン';
        option.keyControl = true;
        break;
    }

    start();
}

/* スライド 設定 */
const btnOptionSlide = () => {
    const optionSlide = document.getElementById('btnOptionSlide');

    switch(option.slide) {
    case true:
        optionSlide.classList.remove('bg-info');
        optionSlide.classList.remove('text-light');
        optionSlide.classList.add('btn-light');
        optionSlide.classList.add('btn-outline-info');

        optionSlide.innerHTML = 'オフ';
        option.slide = false;
        break;
    case false:
        optionSlide.classList.add('bg-info');
        optionSlide.classList.add('text-light');
        optionSlide.classList.remove('btn-light');
        optionSlide.classList.remove('btn-outline-info');

        optionSlide.innerHTML = 'オン';
        option.slide = true;
        break;
    }

    start();
}

/*
 * 基本処理
 */
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
    
    slide.display = false;
    slide.tempDirection = -1;

    draw();
}

const clear = () => {
    game.isRunning = false;
    draw();
}

const select = num => {
    // 既にそろっているカードは選べない
    if (cards.isPaired[num] === true) return;

    if (cards.selected[0] !== -1) {
        // 2枚目

        if (cards.selected[0] === num) return;
        
        cards.selected[1] = num;

        game.isRunning = true;
        result.count++;

        if (cards.number[cards.selected[0]] === cards.number[cards.selected[1]]) {
            // ペアが揃った場合の時

            cards.isPaired[cards.selected[0]] = true;
            cards.isPaired[cards.selected[1]] = true;
            
            game.pair--;
            if (game.pair === 0) clear();

            slideCards();

        } else {
            // ペアが揃わなかった時

            if (cards.isKnownNow) {
                if (debug) {
                    console.log('miss');
                }
                
                result.miss++;
            } else if (cards.isKnownCard[cards.selected[1]]) {
                if (debug) {
                    console.log('miss');
                }
                result.miss++;
            }
        }

        draw();

        cards.isKnownNumber[cards.number[cards.selected[1]]] = true;
        cards.isKnownCard[cards.selected[1]] = true;
        cards.selected[0] = cards.selected[1] = -1;


    } else {
        // 1枚目

        cards.selected[0] = num;

        cards.isKnownCard[cards.selected[0]] = true;
        if (cards.isKnownNumber[cards.number[cards.selected[0]]]) {
            cards.isKnownNow = true;
        } else {
            cards.isKnownNumber[cards.number[cards.selected[0]]] = true;
            cards.isKnownNow = false;
        }

        slide.display = false;

        draw();
    }
}

// スライド
const slideCards = () => {
    if (!option.slide) return;

    // 方向決定
    let direction = Math.floor(Math.random() * 4);
    if (slide.tempDirection === direction) direction = (direction + 1) % 4;
    slide.tempDirection = direction;

    let tempNumber = new Array(game.numOfCards);
    let tempIsPaired = new Array(game.numOfCards);
    let tempIsKnownCard = new Array(game.numOfCards);

    for (let i = 0; i < game.numOfCards; i++) {
        tempNumber[i] = cards.number[i];
        tempIsPaired[i] = cards.isPaired[i];
        tempIsKnownCard[i] = cards.isKnownCard[i];
    }
    
    cards.selected = [-1, -1];

    switch (direction) {
    case 0:
        // 左
        if (debug) {
            console.log('左');
        }

        for (let i = 0; i < game.numOfCards; i++) {
            if (i % card.numX === (card.numX - 1)) {
                // 左端のカードを右端へ
                cards.number[i] = tempNumber[i - card.numX + 1];
                cards.isPaired[i] = tempIsPaired[i - card.numX + 1];
                cards.isKnownCard[i] = tempIsKnownCard[i - card.numX + 1];
            } else {
                // 右のカードを左へ
                cards.number[i] = tempNumber[i + 1];
                cards.isPaired[i] = tempIsPaired[i + 1];
                cards.isKnownCard[i] = tempIsKnownCard[i + 1];
            }
        }
        break;

    case 1:
        // 下
        if (debug) {
            console.log('下');
        }
        
        for (let i = 0; i < game.numOfCards; i++) {
            if (Math.floor(i / card.numX) === 0) {
                // 下端のカードを上端へ
                cards.number[i] = tempNumber[i + card.numX * (card.numY - 1)];
                cards.isPaired[i] = tempIsPaired[i + card.numX * (card.numY - 1)];
                cards.isKnownCard[i] = tempIsKnownCard[i + card.numX * (card.numY - 1)];
            } else {
                // 上のカードを下へ
                cards.number[i] = tempNumber[i - card.numX];
                cards.isPaired[i] = tempIsPaired[i - card.numX];
                cards.isKnownCard[i] = tempIsKnownCard[i - card.numX];
            }
        }
        break;

    case 2:
        // 右
        if (debug) {
            console.log('右');
        }
        
        for (let i = 0; i < game.numOfCards; i++) {
            if (i % card.numX === 0) {
                // 右端のカードを左端へ
                cards.number[i] = tempNumber[i + card.numX - 1];
                cards.isPaired[i] = tempIsPaired[i + card.numX - 1];
                cards.isKnownCard[i] = tempIsKnownCard[i + card.numX - 1];
            } else {
                // 左のカードを右へ
                cards.number[i] = tempNumber[i - 1];
                cards.isPaired[i] = tempIsPaired[i - 1];
                cards.isKnownCard[i] = tempIsKnownCard[i - 1];
            }
        }
        break;

    case 3:
        // 上
        if (debug) {
            console.log('上');
        }

        for (let i = 0; i < game.numOfCards; i++) {
            if (Math.floor(i / card.numX) === (card.numY - 1)) {
                // 上端のカードを下端へ
                cards.number[i] = tempNumber[i - card.numX * (card.numY - 1)];
                cards.isPaired[i] = tempIsPaired[i - card.numX * (card.numY - 1)];
                cards.isKnownCard[i] = tempIsKnownCard[i - card.numX * (card.numY - 1)];
            } else {
                // 下のカードを上へ
                cards.number[i] = tempNumber[i + card.numX];
                cards.isPaired[i] = tempIsPaired[i + card.numX];
                cards.isKnownCard[i] = tempIsKnownCard[i + card.numX];
            }
        }
        break;
    }

    slide.display = true;
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
    canvas.addEventListener('mousedown',function(e){
        const rect = e.target.getBoundingClientRect();
        const eventX = (e.clientX - Math.floor(rect.left)) % (card.width + card.widthS);
        const eventY = (e.clientY - Math.floor(rect.top)) % (card.height + card.heightS);
        const x = Math.floor((e.clientX - Math.floor(rect.left)) / (card.width + card.widthS));
        const y = Math.floor((e.clientY - Math.floor(rect.top)) / (card.height + card.heightS));
        const num = card.numX * y + x;
    
        if ((eventX <= card.width) && (eventY <= card.height)) {
            select(num);
        }
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
            if (cards.isPaired[i]) {
                // ペアが揃っているカードの描画
                ctx.fillRect(card.width * x + card.widthS * x, card.height * y + card.heightS * y, card.width, card.height);
            }
            
            // カードの外枠の描画
            ctx.rect(card.width * x + card.widthS * x, card.height * y + card.heightS * y, card.width, card.height);
            ctx.stroke();
            i++;
        }
    }

    if (slide.display) {
        // 矢印の描画
        ctx.fillStyle = 'gray';
        ctx.font = '256px serif';
        ctx.fillText(getSlideDirection(), game.width / 2, game.height / 2, game.width);
        ctx.fillStyle = 'black';
        ctx.font = '48px serif';
    }

    i = 0;

    for (let y = 0; y < card.numY; y++){
        for (let x = 0; x < card.numX; x++){
            if (!cards.isPaired[i]) {
                if ((i === cards.selected[0]) || (i === cards.selected[1])) {
                    // 選択中のカードの描画

                    switch (game.mode) {
                    case 0:
                        // カードの数字を描画
                        ctx.fillText(cards.number[y * card.numX + x], card.width * (x + 0.5) + card.widthS * x, card.height * (y + 0.5) + card.heightS * y, card.width);
                        break;
                    case 1:
                        // カードの白黒を描画
                        ctx.fillStyle = getColorBW(cards.number[y * card.numX + x]);
                        ctx.fillRect(card.width * x + card.widthS * x, card.height * y + card.heightS * y, card.width, card.height);
                        ctx.fillStyle = 'black';
                        break;
                    }
                } else if (option.keyControl) {
                    // キー操作のための描画
                    ctx.font = '24px serif';
                    ctx.fillText(getKeyFromCard(y * card.numX + x), card.width * (x + 0.2) + card.widthS * x, card.height * (y + 0.2) + card.heightS * y);
                    ctx.font = '48px serif';
                }

                // デバッグのための描画
                if (debug) {
                    ctx.font = '24px serif';
                    ctx.fillText(cards.number[y * card.numX + x], card.width * (x + 0.2) + card.widthS * x, card.height * (y + 0.2) + card.heightS * y);
                    ctx.font = '48px serif';
                }
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

    let msgMode = '';

    if (game.mode === 0) msgMode = 'Numeral';
    else msgMode = 'Black-and-White';
    if (option.slide) msgMode += '+Slide';

    ctx.fillText(`${msgMode} CLEAR`, game.width / 2, card.height * 0, game.width);
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

/* スライドの方向の取得 */
const getSlideDirection = () => {
    switch(slide.tempDirection) {
    case 0:
        return '←';
    case 1:
        return '↓';
    case 2:
        return '→';
    case 3:
        return '↑';
    }
}

/*
 * キー操作
 */
// キーコードからカードを選ぶ
const getCardFromKey = e => {
    switch (e.keyCode) {
    case 49:
        // 1
        select(0);
        break;
    case 50:
        // 2
        select(1);
        break;
    case 51:
        // 3
        select(2);
        break;
    case 52:
        // 4
        select(3);
        break;
    case 53:
        // 5
        select(4);
        break;
    case 81:
        // Q
        select(5);
        break;
    case 87:
        // W
        select(6);
        break;
    case 69:
        // E
        select(7);
        break;
    case 82:
        // R
        select(8);
        break;
    case 84:
        // T
        select(9);
        break;
    case 65:
        // A
        select(10);
        break;
    case 83:
        // S
        select(11);
        break;
    case 68:
        // D
        select(12);
        break;
    case 70:
        // F
        select(13);
        break;
    case 71:
        // G
        select(14);
        break;
    case 90:
        // Z
        select(15);
        break;
    case 88:
        // X
        select(16);
        break;
    case 67:
        // C
        select(17);
        break;
    case 86:
        // V
        select(18);
        break;
    case 66:
        // B
        select(19);
        break;
    }
}


// キーコードからカードを選ぶ
const getKeyFromCard = num => {
    switch (num) {
    case 0:
        return '1';
        break;
    case 1:
        return '2';
        break;
    case 2:
        return '3';
        break;
    case 3:
        return '4';
        break;
    case 4:
        return '5';
        break;
    case 5:
        return 'Q';
        break;
    case 6:
        return 'W';
        break;
    case 7:
        return 'E';
        break;
    case 8:
        return 'R';
        break;
    case 9:
        return 'T';
        break;
    case 10:
        return 'A';
        break;
    case 11:
        return 'S';
        break;
    case 12:
        return 'D';
        break;
    case 13:
        return 'F';
        break;
    case 14:
        return 'G';
        break;
    case 15:
        return 'Z';
        break;
    case 16:
        return 'X';
        break;
    case 17:
        return 'C';
        break;
    case 18:
        return 'V';
        break;
    case 19:
        return 'B';
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

/* キーボード */
document.onkeydown = function(e) {
    if (option.keyControl) {
        getCardFromKey(e);
    }
}

/* タイマー */
setInterval(() => {
    if (!game.isRunning) return;
    result.timer++;
}, 10);