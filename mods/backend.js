/*
    Post to backend APIs.
        api: String
            the postfix of api url.

        data: PlainObject
            Parameters of the api that will be post as the request header.

        callback: function (data, err)
                      where data: PlainObject | undefined | null,
                             err: PlainObject { id: Number, msg: String } | undefined
            Function to call when the ajax succeeded or failed.

            `data` is the "data" properties of the response.
            When ajax failed, `data` may be undefined and `err`
              contains error id and message.
            When succeed, `data` is the data part of response
              (data.data, without result and resultDesp),
              and `errid` is undefined.

            The key is that **you can get data whenever API provided it**.

    Some custom error id is exported:
        post.NO_PERMISSION
        post.NOT_LOGIN
        post.DATA_INCORRECT
        post.NETWORK_ERROR
    You may use errid===post.NOT_LOGIN to check to go to login page or not.

    Import the module:
        > var post = require("/mods/backend");

    Usage:
        An API that always succeed:
            > post("/always-succeed-useless-api", {param: 1}, function(data) {
            >     console.log(data);
            > });

        An API that may fail or succeed:
            > post("/common/get_demo", {id: 2}, function(data, err) {
            >     if (err) {
            >         // Failed. Print err message
            >         console.log(err.id, err.msg, data);
            >         return;
            >     }
            >     // Handling data
            >     console.log(data);
            > });

        Jump to login page if not login:
            > post("/some-api", {id: 2}, function(data, err) {
            >     if (err && err.id === post.NOT_LOGIN) {
            >         // Return to login page
            >
            >         // The page may be inside an <iframe>.
            >         // To control the whole window, use window.top instead of window.
            >         this.$alert(err.msg);
            >         window.top.location.href = 'login.html';
            >     }
            >     // Handling data
            >     console.log(data);
            > });

    Configuration:
        You can call post.setPrefix("[PREFIX]") and
        post.setTimeout([TIMEOUT(ms)]) to set the two parameters.

        Remember that these changes are globally on one page
          and cannot be undone. (Unless you refresh the page)

        For example:
            > post.setPrefix(0);
            > post('//www.baidu.com', {}, function(){});
*/
var $ = require("jquery");

var apiPrefix = "http://10.112.128.63:8080/dispatch";
var timeout = 2500;

var errs = {
    NO_PERMISSION: -10,
    NOT_LOGIN: -11,
    NETWORK_ERROR: -12
};

function getHeaders(xhr) {
    var res = {};

    function assign(headName) {
        var headVal = xhr.getResponseHeader(headName);
        if (headVal) {
            res[headName] = (headVal === "true" ? true : false);
        }
    }

    assign("isLogin");
    assign("authorized");
    return res;
}

function post(api, data, callback) {
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
        success(data, _, xhr) {
            var newToken = xhr.getResponseHeader("token");

            if (newToken) {
                localStorage.setItem("token", newToken);
            }

            var headers = getHeaders(xhr);

            // 这五个条件的顺序不能改，因为条件背后有很多关于后端API的假设。
            if (data.result === 1000) {
                // 如果 result 为 1000，那么一定成功了
                callback(data.data);
            } else if (headers.authorized === false) {
                // 如果 result 不为 1000，考虑是不是权限的问题
                callback(data.data, {
                    id: errs.NO_PERMISSION,
                    msg: "您没有做这件事情的权限。"
                });
            } else if (headers.isLogin === false) {
                // 不为 false 可能是未登陆时权限头不存在，检查登录
                callback(data.data, {
                    id: errs.NOT_LOGIN,
                    msg: "您还没有登录，或者您登录后长时间未操作。"
                });
            } else if (data.result) {
                // 如果已经登录或者没有登录头，那么用后端给的错误消息
                callback(data.data, {
                    id: data.result,
                    msg: data.resultDesp
                });
            } else {
                // 如果后端连错误消息和登录头都没给，那就是不返回数据的成功
                callback(data.data);
            }
        },
        error(xhr) {
            if (xhr.status > 0) {
                callback(undefined, {
                    id: errs.NETWORK_ERROR,
                    msg: "服务器故障，HTTP 错误码为 " + xhr.status + "。"
                });
            } else {
                callback(undefined, {
                    id: errs.NETWORK_ERROR,
                    msg: "服务器连接失败，请检查您的网络连接。"
                });
            }
        }
    });
}

post.NO_PERMISSION = errs.NO_PERMISSION;
post.NOT_LOGIN = errs.NOT_LOGIN;
post.NETWORK_ERROR = errs.NETWORK_ERROR;

post.setPrefix = (newPrefix) => {
    apiPrefix = newPrefix;
};

post.setTimeout = (newTime) => {
    timeout = newTime;
};

export default post;