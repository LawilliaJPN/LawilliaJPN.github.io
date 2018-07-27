'use strict';

/*
 * グローバル変数
 */
const config = {
    selectedAlgorithm: 'None'
};

/*
 * ノートの表示
 */
const displayNote = () => {
    switch (config.selectedAlgorithm) {
        case 'Implemented':
            displayImplemented();
            break;
        case 'None':
            displayNone();
            break;
    }
}

const displayNone = () => {
    $('#al-name').text('未選択');
    $('#al-output').text('一覧からアルゴリズムを選択してください。');
}

const displayImplemented = () => {
    $('#al-name').text('未実装');
    $('#al-output').text('選択したアルゴリズムは未実装です。');
}

/*
 * ボタン
 */
/* アルゴリズムの選択 */
const selectAlgorithm = name => {
    const id = convertIntoButtonId(name);

    if (name === config.selectedAlgorithm) {
        // 選択中のアルゴリズムを解除
        config.selectedAlgorithm = 'None';
        turnOffButton(id);


    } else {
        // 正常にアルゴリズムを選択
        config.selectedAlgorithm = name;

        turnOnButton(id);
    }

    displayNote();
}

/* ボタンのIDに変換 */
const convertIntoButtonId = name => `#select${name}`;

/* ボタンのデザイン変更 */
const turnOnButton = id => {
    $(id).addClass('bg-info');
    $(id).addClass('text-light');
    $(id).removeClass('btn-light');
    $(id).removeClass('btn-outline-info');
}

const turnOffButton = id => {
    $(id).removeClass('bg-info');
    $(id).removeClass('text-light');
    $(id).addClass('btn-light');
    $(id).addClass('btn-outline-info');
}

/*
 * 即時実行
 */
displayNote();