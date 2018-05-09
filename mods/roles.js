export default {
    roleText: {
        admin: "系统管理员",
        manager: "仓库管理员",
        normal: "普通用户"
    },

    menus: {
        admin: [
            {name: "可爱的一级功能", url: "cuteyijigongneng"},
            {
                name: "老板要二级功能", menus: [
                    {name: "二级功能 1", url: "erjigongneng1"},
                    {name: "二级功能 2", url: "erjigongneng2"}
                ]
            },
            {name: "不可爱的一级功能", url: "yijigongneng"}
        ]
    }
}