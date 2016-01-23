// 監視テキスト登録（提督名）
function kcsInspection_CreateInspectionNickName(nickName)
{
    // 監視テキスト登録パラメータを設定する。
    var params = {};
    params[dmm.UserText.Field.DATA] = nickName;

    // 監視テキストを登録する。
    dmm.requestCreateInspection(params, function(response)
    {
        // エラーが発生した場合
        if (response.hadError())
        {
            // Flash 要素を取得する。
            var flashElement = kcsFlash_GetFlashElementById("externalswf");

            // Flash 要素が取得できた場合
            if(flashElement)
            {
                // 監視テキスト登録結果（提督名）を通知する。
                flashElement.asCreateInspectionNickNameResult("");
            }

            // 処理を終了する。
            return;
        }
        
        // 監視テキストIDを取得する。
        var inspectionTextId;
        var data = response.getData();
        data.each(function(entry)
        {
            inspectionTextId = entry.getTextId();
        });

        // Flash 要素を取得する。
        var flashElement = kcsFlash_GetFlashElementById("externalswf");

        // Flash 要素が取得できた場合
        if(flashElement)
        {
            // 監視テキスト登録結果（提督名）を通知する。
            flashElement.asCreateInspectionNickNameResult(inspectionTextId);
        }
    });
}

// 監視テキスト登録（艦隊名）
function kcsInspection_CreateInspectionDeckName(deckName)
{
    // 2014/06/23 空白が入力された場合の動作を「更新しない」に変更
    if (!deckName.match(/\S/g))
    {
        // Flash 要素を取得する。
        var flashElement = kcsFlash_GetFlashElementById("externalswf");

        // Flash 要素が取得できた場合
        if(flashElement)
        {
            // 監視テキスト登録結果（艦隊名）を通知する。
            flashElement.asCreateInspectionDeckNameResult("");
        }
        // 処理を終了する。
        return;
    }

    // 監視テキスト登録パラメータを設定する。
    var params = {};
    params[dmm.UserText.Field.DATA] = deckName;

    // 監視テキストを登録する。
    dmm.requestCreateInspection(params, function(response)
    {
        // エラーが発生した場合
        if (response.hadError())
        {
            // Flash 要素を取得する。
            var flashElement = kcsFlash_GetFlashElementById("externalswf");

            // Flash 要素が取得できた場合
            if(flashElement)
            {
                // 監視テキスト登録結果（艦隊名）を通知する。
                flashElement.asCreateInspectionDeckNameResult("");
            }

            // 処理を終了する。
            return;
        }
        
        // 監視テキストIDを取得する。
        var inspectionTextId;
        var data = response.getData();
        data.each(function(entry)
        {
            inspectionTextId = entry.getTextId();
        });

        // Flash 要素を取得する。
        var flashElement = kcsFlash_GetFlashElementById("externalswf");

        // Flash 要素が取得できた場合
        if(flashElement)
        {
            // 監視テキスト登録結果（艦隊名）を通知する。
            flashElement.asCreateInspectionDeckNameResult(inspectionTextId);
        }
    });
}

// 監視テキスト登録（コメント）
function kcsInspection_CreateInspectionComment(comment)
{
    // 2014/06/23 空白が入力された場合の動作を「空白で更新する」よう変更
    if (!comment.match(/\S/g))
    {
        comment = " ";
    }

    // 監視テキスト登録パラメータを設定する。
    var params = {};
    params[dmm.UserText.Field.DATA] = comment;

    // 監視テキストを登録する。
    dmm.requestCreateInspection(params, function(response)
    {
        // エラーが発生した場合
        if (response.hadError())
        {
            // Flash 要素を取得する。
            var flashElement = kcsFlash_GetFlashElementById("externalswf");

            // Flash 要素が取得できた場合
            if(flashElement)
            {
                // 監視テキスト登録結果（コメント）を通知する。
                flashElement.asCreateInspectionCommentResult("");
            }

            // 処理を終了する。
            return;
        }
        
        // 監視テキストIDを取得する。
        var inspectionTextId;
        var data = response.getData();
        data.each(function(entry)
        {
            inspectionTextId = entry.getTextId();
        });

        // Flash 要素を取得する。
        var flashElement = kcsFlash_GetFlashElementById("externalswf");

        // Flash 要素が取得できた場合
        if(flashElement)
        {
            // 監視テキスト登録結果（コメント）を通知する。
            flashElement.asCreateInspectionCommentResult(inspectionTextId);
        }
    });
}

// 監視テキスト配列取得（汎用）
function kcsInspection_FetchInspectionTexts(ids)
{
    // 戻り値
    var resultTexts = [];

    // 監視テキスト取得パラメータを設定する。
    var params = {};
    params[dmm.UserText.Field.TEXT_ID] = ids;

    // 監視テキストを取得する。
    dmm.requestFetchInspection(params, function(response)
    {
        // エラーが発生した場合
        if (response.hadError())
        {
            // Flash 要素を取得する。
            var flashElement = kcsFlash_GetFlashElementById("externalswf");

            // Flash 要素が取得できた場合
            if(flashElement)
            {
                // 戻り値を設定する。
                for(var i = 0; i < ids.length; i++)
                {
                    var resultText = new Object();
                    resultText.textId = ids[i];
                    resultText.text = "";

                    resultTexts.push(resultText);
                }

                // 監視テキスト取得結果（艦隊名）を通知する。
                flashElement.asFetchInspectionTextsResult(resultTexts);
            }

            // 処理を終了する。
            return;
        }

        // 結果データを取得する。
        var userText = response.getData();

        // 結果データを戻り値に設定する。
        userText.each(function(entry)
        {
            // テキストID を取得する。
            var textId = entry.getTextId();
            
            // テキストを取得する。
            var text = entry.getData();

            // テキストが取得できなかった場合（監査結果NG）
            if(text == null)
            {
                text = "";
            }

            // 2013/05/27 戻り値のサニタイズ
            // 
            // 特殊記号をそのまま返すとエラーが発生する可能性があるため、
            // 全角文字への変換を行う。
            text = text.replace("&#60;", "＜");
            text = text.replace("&#62;", "＞");
            text = text.replace("&#34;", "”");
            text = text.replace("&#39;", "’");
            text = text.replace("&#37;", "％");
            text = text.replace("&#38;", "＆");

            // 戻り値を設定する。
            var resultText = new Object();
            resultText.textId = textId;
            resultText.text = text;

            resultTexts.push(resultText);
        });

        // Flash 要素を取得する。
        var flashElement = kcsFlash_GetFlashElementById("externalswf");

        // Flash 要素が取得できた場合
        if(flashElement)
        {
            // 監視テキスト取得結果（艦隊名）を通知する。
            flashElement.asFetchInspectionTextsResult(resultTexts);
        }
    });
}
