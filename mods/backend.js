var $ = require('jquery');

var apiPrefix = "http://10.112.128.63:8080/dispatch/";
var timeout = 6000;

/*
    Post data to specified url asynchronous.
        api: String
            the postfix of api.

        data: PlainObject
            Parameters of the api that will be post as the request header.

        callback: function (data, errid)
                    where data: String (not succeed) | PlainObject (succeed)
            Function to call when the ajax succeeded or failed.

            `data` is the 'data' properties of the response.
            When ajax failed, `data` is the error message
                and `errid` is the result id.
            When succeed, `data` is the error message and `errid` is undefined.

    Usage:
        var post = require('/mods/backend');

    For example:
        post('/common/get_demo', {id: 2}, function(data, errid) {
            if (errid) {
                console.log(errid, data); // Failed. Print err message
                return;
            }
            // Handling data
            console.log(data);
        })
*/
export default function (api, data, callback) {
    $.ajax({
        url: apiPrefix + api,
        type: "POST",
        data: JSON.stringify(data),
        timeout: timeout,
        headers: {
            "token": localStorage.getItem("token"),
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        success(data, _, jqXHR) {
            // TODO: Should I update token on every success or result === 1000?
            if (!data.result) {
                callback("服务器连接成功，但服务器返回的数据格式不正确。", 1);
            } else if (data.result === 1000) {
                var newToken = jqXHR.getResponseHeader("token");
                
                callback(data.data);
            } else {
                callback(data.resultDesp || "", data.result);
            }
        },
        error() {
            // TODO: Distinguish timeout and other errors.
            callback("服务器连接失败，请检查您的网络连接。", 0);
        }
    });
}