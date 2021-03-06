var pages = {
    "仓库管理": "RepoManage.html",
    "用户审核": "UserAuth.html",
    "用户列表": "UserQuery.html",
    "消息": "CheckMessage.html",
    "历史申请查询": "HistoryLookup.html",
    "调配业务管理": "Management.html"
};

// Get menus like [{name: ..., url: ...}, ...] from menulist.
// For example:
/*
    getMenus([
        "仓库管理", // A 1st-level function, also a menu item
        {"用户信息管理": [  // A menugroup (a.k.a. 2nd-level function)
            "用户审核", // Sub menu item of menugroup
            "用户列表"
        ]},
        "系统消息"
    ])
*/
var getMenus = function (menuName) {
    var getUrl = (x) => ({name: x, url: pages[x]});

    return menuName.map(function (x) {
        if (typeof x === "string") {
            // Menu item
            return getUrl(x);
        } else {
            // Menugroup
            var key = Object.keys(x)[0];
            return {name: key, menus: x[key].map(getUrl)};
        }
    });
};

export default {
    roleText: {
        admin: "系统管理员",
        manager: "仓库管理员",
        normal: "普通用户"
    },

    // roleId: Translate role name to backend-supported name.
    //         Currently useless.
    backToMine: {
        admin: "admin",
        manager: "manager",
        normal: "user"
    },

    // roleId: Translate role name to backend-supported name.
    //         Currently useless.
    mineToOther: {
        admin: "admin",
        manager: "manager",
        normal: "user"
    },

    menus: {
        admin: getMenus([
            {"用户信息管理": [
                "用户审核",
                "用户列表"
            ]},
            "仓库管理",
            "消息"
        ]),
        manager: getMenus([
            "消息"
        ]),
        normal: [
            "调配业务管理",
            "历史申请查询",
            "消息"
        ]
    }
};