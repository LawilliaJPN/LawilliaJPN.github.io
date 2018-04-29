/* ページを開いたとき */
window.onload = function() {
    updateH1Title();
    updateCopyright();
}

/* ページタイトルのh1タグの編集 */
function updateH1Title() {
    document.getElementById('h1title').innerHTML = '<span id="PCW">PCW</span><a href="https://lawilliajpn.github.io">Web製作の練習</a>';
}

/* フッターの編集 */
function updateCopyright() {
    document.getElementById('copyright').innerHTML = '<small>Copyright © 2017-2018 Lawillia All Rights Reserved.</small>';
}