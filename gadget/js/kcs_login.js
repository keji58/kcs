// ログイン
function kcsLogin_StartLogin()
{
    // 
    // UserAgent を判定する。
    // 
    if ((navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') == -1) || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0)
    {
        // メッセージを表示する。
        document.getElementById("flashWrap").innerHTML = ConstMessageInfo.UAErrorMessage;

        // 画面下部の情報セクションを表示しない。
        document.getElementById("sectionWrap").innerHTML = "";

        return;
    }

    // DMM サーバが過負荷な状況にある場合、
    // さらなる負荷をかけないよう、ここで STOP する。
    if (MaintenanceInfo.IsDoing == 1 && MaintenanceInfo.IsEmergency == 1)
    {
        // メンテナンス画面を表示する。
        kcsFlash_ViewMaintenancePage();
        return;
    }

    // 
    // ユーザ情報取得リクエストを送信する。
    // 

    // 取得データパラメータを定義する。
    var params = {};

    // （DMM固有）取得データパラメータに userType を設定する。
    if (ConstSNSInfo.id == "DMM")
    {
        params[opensocial.DataRequest.PeopleRequestFields.PROFILE_DETAILS] = [
            "userType"
        ];
    }

    // データリクエストを作成する。
    var req = opensocial.newDataRequest();

    // プロフィール読み取りリクエストを作成し、
    // データリクエストに格納する。
    // 読み取る対象はアプリを参照しているユーザー（VIEWER）
    req.add(
        req.newFetchPersonRequest(
            opensocial.IdSpec.PersonId.VIEWER, params), "viewer");

    // データリクエストを送信する。
    // （データレスポンス用のコールバック関数を設定）
    req.send(function(response)
    {
        // エラーが発生した場合
        if (response.hadError())
        {
            // エラー処理へ遷移する。
            return;
        }
        else
        {
            // データレスポンスから item を取得する。
            var item = response.get("viewer");
            // item からデータを取得する。
            var viewer = item.getData();

            // ユーザーID
            viewerInfo.id = viewer.getId();
            // ユーザー名
            viewerInfo.displayName = viewer.getDisplayName();
            // （DMM固有）ユーザータイプ
            if (ConstSNSInfo.id == "DMM")
            {
                viewerInfo.userType = viewer.getField("userType");
            }

            // 2013/05/09 通常メンテナンス対応
            // ※ 一般ユーザーはログインできない。
            if (MaintenanceInfo.IsDoing == 1 && MaintenanceInfo.IsEmergency == 0)
            {
                if(viewerInfo.userType == "developer" || viewerInfo.userType == "staff")
                {
                    // developer, staff の場合、
                    // ログイン処理を続行する。
                }
                else
                {
                    // 一般ユーザーの場合、

                    // 画面下部の情報セクションを表示する。
                    document.getElementById("sectionWrap").style.display = "block";

                    // メンテナンス画面を表示する。
                    kcsFlash_ViewMaintenancePage();
                    return;
                }
            }

            // トークン情報を取得する。
            kcsGetLoginToken();
        }
    });
}

// トークン情報取得
function kcsGetLoginToken()
{

    // 2013/07/04 サーバー振り分け対応
    var worldParams = {};
    worldParams[gadgets.io.RequestParameters.METHOD]         = gadgets.io.MethodType.GET;
    worldParams[gadgets.io.RequestParameters.CONTENT_TYPE]   = gadgets.io.ContentType.JSON;

    // リクエストの URL に現在時刻（ミリ秒）を追加する。
    // （ガジェットのキャッシュを読み込んでしまわないように）
    var date = new Date();

    // ユーザー所属ワールド取得
    gadgets.io.makeRequest(
        ConstURLInfo.GetUserWorldURL + viewerInfo.id + "/1/" + date.getTime(), function(worldResponse)
    {
        // レスポンスデータを JSON デコードする。
        var json = eval(worldResponse.text);

        // 取得成功した場合
        if(json.api_result == ConstParameterInfo.APIResult_OK)
        {
            // ワールド ID を取得する。
            var userWorldId = json.api_data.api_world_id;

            // ログイン不可の場合
            if(kcsCanLogin(viewerInfo, userWorldId) == false)
            {
                // 画面下部の情報セクションを表示する。
                document.getElementById("sectionWrap").style.display = "block";

                // 新規ユーザーの場合
                if(userWorldId == ConstParameterInfo.GetUserWorld_IsNew)
                {
                    // 新規着任待ち画面を表示する。
                    kcsFlash_ViewWaitPage2();
                }
                else
                {
                    // エントランス待ち画面を表示する。
                    kcsFlash_ViewEntrancePage();
                }
                return;
            }
            else
            {
                // 画面下部の情報セクションを表示する。
                document.getElementById("sectionWrap").style.display = "block";
            }

            // 新規ユーザーの場合
            if(userWorldId == ConstParameterInfo.GetUserWorld_IsNew)
            {
                // ワールド選択 Flash を起動する。

                // トークン
                flashInfo.dmmLoginId = viewerInfo.id;

                // Flash を起動する。
                kcsFlash_StartWorldSelectFlash();
            }
            // 既存ユーザーの場合
            else
            {
                // ワールドサーバーのアドレスを取得する。
                var worldServerAddr = ConstServerInfo["World_" + userWorldId];

                // OSAPI サーバとの接続維持を開始する。
                kcsStartKeepConnection();

                // ワールドサーバーにログインする。
                
                // リクエストパラメータを定義する。
                var params = {};

                // リクエストパラメータを設定する。
                params[gadgets.io.RequestParameters.METHOD]         = gadgets.io.MethodType.GET;
                params[gadgets.io.RequestParameters.CONTENT_TYPE]   = gadgets.io.ContentType.JSON;
                params[gadgets.io.RequestParameters.AUTHORIZATION]  = gadgets.io.AuthorizationType.SIGNED;

                // リクエストの URL に現在時刻（ミリ秒）を追加する。
                // （ガジェットのキャッシュを読み込んでしまわないように）
                var date = new Date();

                // リクエストを実行する。
                // （レスポンス用のコールバック関数を設定）
                gadgets.io.makeRequest(
                    worldServerAddr + ConstURLInfo.LoginURL + viewerInfo.id + "/1/" + date.getTime(), function(response)
                {
                    // レスポンスデータを JSON デコードする。
                    var json = eval(response.text);

                    // ログインに成功した場合
                    if(json.api_result == ConstParameterInfo.APIResult_OK)
                    {
                        // Flash を起動する。

                        // トークン
                        flashInfo.apiToken = json.api_token;
                        // 起動時刻
                        flashInfo.apiStartTime  = json.api_starttime;

                        // トークン取得失敗時、アクセスを拒否する。
                        if(flashInfo.apiToken == null || flashInfo.apiStartTime == null)
                        {
                            return;
                        }
                        // Flash を起動する。
                        kcsFlash_StartFlash(worldServerAddr);
                    }
                    // アクセス拒否された場合
                    if(json.api_result == 301)
                    {
                        // アクセス拒否 Flash を表示する。
                        kcsFlash_ViewAccessDenyPage();
                        return;
                    }
                    // アクセスが一時拒否された場合
                    //if(json.api_result == 302)
                    //{
                    //    // アクセス一時拒否 Flash を表示する。
                    //    kcsFlash_ViewAccessDenyPage2();
                    //    return;
                    //}
                }, params);
            }
        }
    }, worldParams);

}

// ログイン可能か判定
function kcsCanLogin(pViewerInfo, userWorldId)
{
    // 入場不可の場合
    if((userWorldId == ConstParameterInfo.GetUserWorld_IsNew && EntranceInfo.NewUser == 0)
     ||(EntranceInfo["World_" + userWorldId + "_User"] == 0))
    {
        // 
        // スタッフのみログイン可能
        // 

        // 入場可否フラグ
        var canEnter = false;

        if(pViewerInfo.userType == "developer" || pViewerInfo.userType == "staff")
        {
            // developer, staff の場合、
            // 入場可とする。
            canEnter = true;
        }
        return canEnter;
    }
    // 順次入場中の場合
    else if((userWorldId == ConstParameterInfo.GetUserWorld_IsNew && EntranceInfo.NewUser == 1)
     ||(EntranceInfo["World_" + userWorldId + "_User"] == 1))
    {
        // 
        // 順次エントランス
        // 

        // 入場可否フラグ
        var canEnter = false;

        if(pViewerInfo.userType == "developer" || pViewerInfo.userType == "staff")
        {
            // developer, staff の場合、
            // 入場可とする。
            canEnter = true;
        }
        else
        {
            // 一般ユーザーの場合、
            // ユーザーIDによって順次入場させる。
            
            // ID ディジットを取得する。
            var digit = pViewerInfo.id % 100;

            // ID ディジットにインデックス値を加算する。
            digit += EntranceInfo.UidIndex;

            // グループIDを計算する。
            var groupId = digit % EntranceInfo.Groups;

            // エントランスオープンからの時間（分）を求める。
            var nowDateTime = new Date().getTime();
            var passedMinutes = (nowDateTime - MaintenanceInfo.EndDateTime) / (1000 * 60);

            // グループIDから入場可否を判定する。
            if(passedMinutes > groupId * EntranceInfo.Interval_Min)
            {
                // 入場可とする。
                canEnter = true;
            }
        }
        return canEnter;
    }
    // 全員入場可の場合
    else if((userWorldId == ConstParameterInfo.GetUserWorld_IsNew && EntranceInfo.NewUser == 2)
     ||(EntranceInfo["World_" + userWorldId + "_User"] == 2))
    {
        return true;
    }
    else
    {
        return false;
    }
}

// OSAPI サーバとの接続維持を開始
function kcsStartKeepConnection()
{
    // OSAPI サーバーとの通信を維持する。
    setInterval("kcsKeepConnection()", ConnectionInfo.Interval_Min * 1000 * 60);
}
// OSAPI サーバーとの通信を維持
function kcsKeepConnection()
{
    // 接続を維持する。
    var params = {};
    params[gadgets.io.RequestParameters.METHOD] = gadgets.io.MethodType.GET;
    params[gadgets.io.RequestParameters.CONTENT_TYPE] = gadgets.io.ContentType.TEXT;
    var date = new Date();
    gadgets.io.makeRequest(
        ConstURLInfo.ConnectionCheckURL + "?" + date.getTime(), function(response)
    {
    }, params);
}
