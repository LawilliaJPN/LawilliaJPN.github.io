/*
 * 全ページ共通
 */
// 共通ヘッダー
$('#common-header').html(`
<nav class="navbar navbar-expand-sm navbar-light">
	<a class="navbar-brand" href="https://lawilliajpn.github.io">
		<span class="mr-2">PCW</span>Web制作の練習
	</a>

	<button class="navbar-toggler" data-toggle="collapse" data-target="#menu">
		<span class="navbar-toggler-icon"></span>
	</button>
	<div id="menu" class="collapse navbar-collapse">
		<ul class="navbar-nav">
			<li class="nav-item mr-1">
				<a class="nav-link" href="https://lawilliajpn.github.io/">TOP</a>
			</li>
			<li class="nav-item mr-1">
				<a class="nav-link" href="https://lawilliajpn.github.io/profile/">PROFILE</a>
			</li>
		</ul>
	</div>
</nav>
`);

// 共通フッター
$('#common-footer').html(`
<p class="text-right text-muted">
	<small>Copyright © 2017-2018 Lawillia All Rights Reserved.</small>
</p>
`);

/*
 * リンク
 */
// Mini Games
const updateLinkToMiniGames = () => {
	$('#linktominigames').html(`
		<h3 class="mb-3 text-center">Mini Games</h3>
		<div class="row">
			<div class="col-lg-4 col-md-6 mb-3">
				<p class="m-1">神経衰弱</p>
				<a class="btn btn-light btn-outline-primary btn-block" href="https://lawilliajpn.github.io/contents/minigame/concentration/">
					Concentration
				</a>
			</div>
			<div class="col-lg-4 col-md-6 mb-3">
				<p class="m-1">モンテカルロ</p>
				<a class="btn btn-light btn-outline-primary btn-block" href="https://lawilliajpn.github.io/contents/minigame/montecarlo/">
					Monte Carlo
				</a>
			</div>
		</div>
	`);
}

// Mini Games
const updateLinkToTools = () => {
	$('#linktotools').html(`
		<h3 class="mb-3 text-center">Tools</h3>
		<div class="container">
			<div class="row">
				<div class="col-lg-4 col-md-6 mb-3">
		<p class="m-1">電卓</p>
					<a class="btn btn-light btn-outline-primary btn-block" href="https://lawilliajpn.github.io/contents/tool/calculator/">
						Calculator
					</a>
				</div>
				<div class="col-lg-4 col-md-6 mb-3">
		<p class="m-1">和音再生</p>
					<a class="btn btn-light btn-outline-primary btn-block" href="https://lawilliajpn.github.io/contents/tool/chord/">
						Chord
					</a>
				</div>
				<div class="col-lg-4 col-md-6 mb-3">
		<p class="m-1">カウンタ</p>
					<a class="btn btn-light btn-outline-primary btn-block" href="https://lawilliajpn.github.io/contents/tool/counter/">
						Counter
					</a>
				</div>
				<div class="col-lg-4 col-md-6 mb-3">
		<p class="m-1">ストップウォッチ</p>
					<a class="btn btn-light btn-outline-primary btn-block" href="https://lawilliajpn.github.io/contents/tool/stopwatch/">
						Stopwatch
					</a>
				</div>
				<div class="col-lg-4 col-md-6 mb-3">
		<p class="m-1">単語テスト</p>
					<a class="btn btn-light btn-outline-primary btn-block" href="https://lawilliajpn.github.io/contents/tool/vocabulary/">
						Vocabulary Test
					</a>
				</div>
			</div>
		</div>
	`);
}