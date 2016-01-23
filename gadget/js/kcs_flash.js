// Flash 起動
function kcsFlash_StartFlash(worldServerAddr)
{
    // Flash パラメータを設定する。
    var flashParams =
    {
        "id"                : "externalswf",
        "width"             : "800",
        "height"            : "480",
        "wmode"             : "opaque",
        "quality"           : "high",
        "bgcolor"           : "#000000",
        "allowScriptAccess" : "always"
    };

    // Flash の貼り付けに失敗した場合のメッセージを設定する。
    document.getElementById("flashWrap").innerHTML = ConstMessageInfo.InstallFlashMessage;

    // Flash をページに貼り付ける。
    gadgets.flash.embedFlash(
        worldServerAddr + ConstURLInfo.MainFlashURL + "?api_token=" + flashInfo.apiToken + 
                                  "&api_starttime=" + flashInfo.apiStartTime,
        document.getElementById("flashWrap"),
        6,
        flashParams
    );

    // サンクスページ用フラッシュのエリアの高さを変更する。
    document.getElementById("adFlashWrap").style.height = "0px";

    // ワールド選択用フラッシュのエリアの高さを変更する。
    document.getElementById("wsFlashWrap").style.height = "0px";

    // ゲーム用フラッシュのエリアのエリアの高さを変更する。
    document.getElementById("flashWrap").style.height = "480px";

    // ガジェットの高さを調整する。
    gadgets.window.adjustHeight(ConstGadgetInfo.height);
}
// サンクスページ表示
function kcsFlash_ViewThanksPage()
{
}
// ワールド選択ページ表示
function kcsFlash_StartWorldSelectFlash()
{
    // Flash パラメータを設定する。
    var flashParams =
    {
        "id"                : "worldselectswf",
        "width"             : "800",
        "height"            : "480",
        "wmode"             : "opaque",
        "quality"           : "high",
        "bgcolor"           : "#000000",
        "allowScriptAccess" : "always"
    };

    // Flash の貼り付けに失敗した場合のメッセージを設定する。
    document.getElementById("wsFlashWrap").innerHTML = ConstMessageInfo.InstallFlashMessage;

    // Flash をページに貼り付ける。
    gadgets.flash.embedFlash(
        ConstURLInfo.WorldSelectFlashURL + "?api_loginid=" + flashInfo.dmmLoginId,
        document.getElementById("wsFlashWrap"),
        6,
        flashParams
    );

    // サンクスページ用フラッシュのエリアの高さを変更する。
    document.getElementById("adFlashWrap").style.height = "0px";

    // ワールド選択用フラッシュのエリアの高さを変更する。
    document.getElementById("wsFlashWrap").style.height = "480px";

    // ゲーム用フラッシュのエリアのエリアの高さを変更する。
    document.getElementById("flashWrap").style.height = "0px";

    // ガジェットの高さを調整する。
    gadgets.window.adjustHeight(ConstGadgetInfo.height);
}
// メンテナンスページ表示
function kcsFlash_ViewMaintenancePage()
{
    // Flash パラメータを設定する。
    var flashParams =
    {
        "id"                : "maintenanceswf",
        "width"             : "800",
        "height"            : "480",
        "wmode"             : "opaque",
        "quality"           : "high",
        "bgcolor"           : "#000000",
        "allowScriptAccess" : "always"
    };

    // Flash の貼り付けに失敗した場合のメッセージを設定する。
    document.getElementById("adFlashWrap").innerHTML = ConstMessageInfo.InstallFlashMessage;

    // Flash をページに貼り付ける。
    gadgets.flash.embedFlash(
        ConstURLInfo.MaintenanceFlashURL,
        document.getElementById("adFlashWrap"),
        6,
        flashParams
    );

    // メンテナンスページ用フラッシュのエリアの高さを変更する。
    document.getElementById("adFlashWrap").style.height = "480px";

    // ワールド選択用フラッシュのエリアの高さを変更する。
    document.getElementById("wsFlashWrap").style.height = "0px";

    // ゲーム用フラッシュのエリアのエリアの高さを変更する。
    document.getElementById("flashWrap").style.height = "0px";

    // ガジェットの高さを調整する。
    gadgets.window.adjustHeight(ConstGadgetInfo.height);
}
// エントランス待ちページ表示
function kcsFlash_ViewEntrancePage()
{
    // Flash パラメータを設定する。
    var flashParams =
    {
        "id"                : "entranceswf",
        "width"             : "800",
        "height"            : "480",
        "wmode"             : "opaque",
        "quality"           : "high",
        "bgcolor"           : "#000000",
        "allowScriptAccess" : "always"
    };

    // Flash の貼り付けに失敗した場合のメッセージを設定する。
    document.getElementById("adFlashWrap").innerHTML = ConstMessageInfo.InstallFlashMessage;

    // Flash をページに貼り付ける。
    gadgets.flash.embedFlash(
        ConstURLInfo.EntranceFlashURL,
        document.getElementById("adFlashWrap"),
        6,
        flashParams
    );

    // エントランス待ちページ用フラッシュのエリアの高さを変更する。
    document.getElementById("adFlashWrap").style.height = "480px";

    // ワールド選択用フラッシュのエリアの高さを変更する。
    document.getElementById("wsFlashWrap").style.height = "0px";

    // ゲーム用フラッシュのエリアのエリアの高さを変更する。
    document.getElementById("flashWrap").style.height = "0px";

    // ガジェットの高さを調整する。
    gadgets.window.adjustHeight(ConstGadgetInfo.height);
}
// ウェイトページ表示（明日以降...）
function kcsFlash_ViewWaitPage()
{
    // Flash パラメータを設定する。
    var flashParams =
    {
        "id"                : "waitswf",
        "width"             : "800",
        "height"            : "480",
        "wmode"             : "opaque",
        "quality"           : "high",
        "bgcolor"           : "#FFFFFF",
        "allowScriptAccess" : "always"
    };

    // Flash の貼り付けに失敗した場合のメッセージを設定する。
    document.getElementById("adFlashWrap").innerHTML = ConstMessageInfo.InstallFlashMessage;

    // Flash をページに貼り付ける。
    gadgets.flash.embedFlash(
        ConstURLInfo.WaitingFlashURL,
        document.getElementById("adFlashWrap"),
        6,
        flashParams
    );

    // エントランス待ちページ用フラッシュのエリアの高さを変更する。
    document.getElementById("adFlashWrap").style.height = "480px";

    // ワールド選択用フラッシュのエリアの高さを変更する。
    document.getElementById("wsFlashWrap").style.height = "0px";

    // ゲーム用フラッシュのエリアのエリアの高さを変更する。
    document.getElementById("flashWrap").style.height = "0px";

    // ガジェットの高さを調整する。
    gadgets.window.adjustHeight(ConstGadgetInfo.height);
}
// ウェイトページ表示（当日着任可）
function kcsFlash_ViewWaitPage2()
{
    // Flash パラメータを設定する。
    var flashParams =
    {
        "id"                : "waitswf",
        "width"             : "800",
        "height"            : "480",
        "wmode"             : "opaque",
        "quality"           : "high",
        "bgcolor"           : "#FFFFFF",
        "allowScriptAccess" : "always"
    };

    // Flash の貼り付けに失敗した場合のメッセージを設定する。
    document.getElementById("adFlashWrap").innerHTML = ConstMessageInfo.InstallFlashMessage;

    // Flash をページに貼り付ける。
    gadgets.flash.embedFlash(
        ConstURLInfo.WaitingFlashURL2,
        document.getElementById("adFlashWrap"),
        6,
        flashParams
    );

    // エントランス待ちページ用フラッシュのエリアの高さを変更する。
    document.getElementById("adFlashWrap").style.height = "480px";

    // ワールド選択用フラッシュのエリアの高さを変更する。
    document.getElementById("wsFlashWrap").style.height = "0px";

    // ゲーム用フラッシュのエリアのエリアの高さを変更する。
    document.getElementById("flashWrap").style.height = "0px";

    // ガジェットの高さを調整する。
    gadgets.window.adjustHeight(ConstGadgetInfo.height);
}
// アクセス拒否ページ表示
function kcsFlash_ViewAccessDenyPage()
{
    // Flash パラメータを設定する。
    var flashParams =
    {
        "id"                : "accessdenyswf",
        "width"             : "800",
        "height"            : "480",
        "wmode"             : "opaque",
        "quality"           : "high",
        "bgcolor"           : "#FFFFFF",
        "allowScriptAccess" : "always"
    };

    // Flash の貼り付けに失敗した場合のメッセージを設定する。
    document.getElementById("adFlashWrap").innerHTML = ConstMessageInfo.InstallFlashMessage;

    // Flash をページに貼り付ける。
    gadgets.flash.embedFlash(
        ConstURLInfo.AccessDenyFlashURL,
        document.getElementById("adFlashWrap"),
        6,
        flashParams
    );

    // エントランス待ちページ用フラッシュのエリアの高さを変更する。
    document.getElementById("adFlashWrap").style.height = "480px";

    // ワールド選択用フラッシュのエリアの高さを変更する。
    document.getElementById("wsFlashWrap").style.height = "0px";

    // ゲーム用フラッシュのエリアのエリアの高さを変更する。
    document.getElementById("flashWrap").style.height = "0px";

    // ガジェットの高さを調整する。
    gadgets.window.adjustHeight(ConstGadgetInfo.height);
}
// アクセス一時拒否ページ表示
function kcsFlash_ViewAccessDenyPage2()
{
    // Flash パラメータを設定する。
    var flashParams =
    {
        "id"                : "accessdenyswf",
        "width"             : "800",
        "height"            : "480",
        "wmode"             : "opaque",
        "quality"           : "high",
        "bgcolor"           : "#FFFFFF",
        "allowScriptAccess" : "always"
    };

    // Flash の貼り付けに失敗した場合のメッセージを設定する。
    document.getElementById("adFlashWrap").innerHTML = ConstMessageInfo.InstallFlashMessage;

    // Flash をページに貼り付ける。
    gadgets.flash.embedFlash(
        ConstURLInfo.AccessTDenyFlashURL,
        document.getElementById("adFlashWrap"),
        6,
        flashParams
    );

    // エントランス待ちページ用フラッシュのエリアの高さを変更する。
    document.getElementById("adFlashWrap").style.height = "480px";

    // ワールド選択用フラッシュのエリアの高さを変更する。
    document.getElementById("wsFlashWrap").style.height = "0px";

    // ゲーム用フラッシュのエリアのエリアの高さを変更する。
    document.getElementById("flashWrap").style.height = "0px";

    // ガジェットの高さを調整する。
    gadgets.window.adjustHeight(ConstGadgetInfo.height);
}
// Flash 要素を取得
function kcsFlash_GetFlashElementById(id)
{
    // ドキュメント本体を示す DOM 要素が
    // ブラウザによって異なるため、取得方法を分ける。
    var flashElement;
    if (navigator.appName.indexOf("Microsoft") != -1)
    {
        flashElement = window[id];
    }
    else
    {
        flashElement = document.getElementById(id);
    }
    if(!flashElement)
    {
        return null;
    }
    if(flashElement.constructor == HTMLCollection)
    {
        return flashElement[0];
    }
    else
    {
        return flashElement;
    }
}
