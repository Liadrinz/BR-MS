var pages = {
    "仓库管理": "RepoManage.html",
    "用户审核": "UserAuth.html",
    "用户列表": "UserQuery.html",
    "消息": "CheckMessage.html",
    "历史申请查询": "HistoryLookup.html",
    "调配业务管理": "Management.html",
    "个人信息修改":"EditProfile.html",
    "密码修改":"NewPassword.html",
    "查询后勤物资":"resLookup.html",
    "新物料入库登记":"resRegister.html",
    "调配物资出库":"Export.html",
    "调配物资入库":"Import.html",
    "待审核申请":"PendingItems.html",
    "库存盘点":"Kucunpandian.html",
    "数据统计":"Shujutongji.html"
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
        user: "normal"
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
            "新物料入库登记",
            "调配物资入库",
            "调配物资出库",
            "待审核申请",
            "库存盘点",
            "数据统计",
            {"个人中心":[
                "消息",
                "个人信息修改",
                "密码修改"
            ]
            }
        ]),
        normal: getMenus([
            "调配业务管理",
            "历史申请查询",
            "查询后勤物资",
            {"个人中心":[
                "消息",
                "个人信息修改",
                "密码修改"
            ]}
        ])
    }
};