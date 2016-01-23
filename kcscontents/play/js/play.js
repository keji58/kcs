// ---------------------------------------------------------------------
// 初期化
// ---------------------------------------------------------------------
function init()
{
    // はじめにメニューを開く。
    openMenu('hajimeni');

    // 説明フレームの内容を初期化する。
    viewHtml('01_01_hajimeni_kancolle.html')
}
// ---------------------------------------------------------------------
// メニューの開閉
// ---------------------------------------------------------------------
function openMenu(menuId)
{
    // 全てのメニューを閉じる。
    document.getElementById("hajimeniMenuItems").style.display  = "none";
    document.getElementById("asobiMenuItems").style.display     = "none";
    document.getElementById("bokoMenuItems").style.display      = "none";
    document.getElementById("hokyuMenuItems").style.display     = "none";
    document.getElementById("henseiMenuItems").style.display    = "none";
    document.getElementById("kaisoMenuItems").style.display     = "none";
    document.getElementById("nyukyoMenuItems").style.display    = "none";
    document.getElementById("kosyoMenuItems").style.display     = "none";
    document.getElementById("syutugekiMenuItems").style.display = "none";

    // 選択されたメニューを開く。
    if(menuId == "hajimeni")
        document.getElementById("hajimeniMenuItems").style.display  = "block";
    else if(menuId == "asobi")
        document.getElementById("asobiMenuItems").style.display     = "block";
    else if(menuId == "boko")
        document.getElementById("bokoMenuItems").style.display      = "block";
    else if(menuId == "hokyu")
        document.getElementById("hokyuMenuItems").style.display     = "block";
    else if(menuId == "hensei")
        document.getElementById("henseiMenuItems").style.display    = "block";
    else if(menuId == "kaiso")
        document.getElementById("kaisoMenuItems").style.display     = "block";
    else if(menuId == "nyukyo")
        document.getElementById("nyukyoMenuItems").style.display    = "block";
    else if(menuId == "kosyo")
        document.getElementById("kosyoMenuItems").style.display     = "block";
    else if(menuId == "syutugeki")
        document.getElementById("syutugekiMenuItems").style.display = "block";
}
// ---------------------------------------------------------------------
// 説明の表示
// ---------------------------------------------------------------------
function viewHtml(url)
{
    // メインフレームの内容をクリアする。
    document.getElementById("wrapPrimary").innerHTML = "";

    // メインフレームにページを読み込む。
    document.getElementById("wrapPrimary").innerHTML =
        "<iframe id=\"mainframe\" name=\"mainframe\" src=\""+ url +
        "\" width=\"500px\" height=\"900px\" allowtransparency=\"true\" frameborder=\"0\"></iframe>";

    // 境界線は表示しない。
    document.getElementById("mainframe").style.border = "none";

    // スクロールバーは表示しない。
    document.getElementById("mainframe").style.overflow = "hidden";

}
