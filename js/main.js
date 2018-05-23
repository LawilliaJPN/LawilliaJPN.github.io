/* ページを開いたとき */
window.onload = function() {
    updateEachPages();
}

/* ページを開いたときに呼び出す */
function updateEachPages() {
    updateH1Title();
    updateCopyright();
}

/* ページタイトルのh1タグの編集 */
function updateH1Title() {
    document.getElementById('h1title').innerHTML = '<span id="PCW">PCW</span><a href="https://lawilliajpn.github.io">Web制作の練習</a>';
}

/* フッターの編集 */
function updateCopyright() {
    document.getElementById('copyright').innerHTML = '<small>Copyright c 2017-2018 Lawillia All Rights Reserved.</small>';
}