require = function o(s, u, a) {
    function h(r, t) {
        if (!u[r]) {
            if (!s[r]) {
                var e = "function" == typeof require && require;
                if (!t && e) return e(r, !0);
                if (l) return l(r, !0);
                var i = new Error("Cannot find module '" + r + "'");
                throw i.code = "MODULE_NOT_FOUND", i
            }
            var n = u[r] = {exports: {}};
            s[r][0].call(n.exports, function (t) {
                return h(s[r][1][t] || t)
            }, n, n.exports, o, s, u, a)
        }
        return u[r].exports
    }

    for (var l = "function" == typeof require && require, t = 0; t < a.length; t++) h(a[t]);
    return h
}({
    "verify-identity-card": [function (t, r, e) {
        "use strict";

        function i(t) {
            this.Valid = !1, this.ID15 = "", this.ID18 = "", this.Local = "", null != t && this.SetCardNo(t)
        }

        i.prototype.SetCardNo = function (t) {
            var r;
            if (this.ID15 = "", this.ID18 = "", this.Local = "", 18 === (t = t.replace(" ", "")).length) {
                var e = /^\d{17}(\d|x|X)$/;
                if (null == e.exec(t)) return;
                r = t.toUpperCase()
            } else {
                if (null == (e = /^\d{15}$/).exec(t)) return;
                r = t.substr(0, 6) + "19" + t.substr(6, 9), r += this.GetVCode(r)
            }
            18 !== t.length ? this.Valid = !1 : this.Valid = this.CheckValid(r)
        }, i.prototype.IsValid = function () {
            return this.Valid
        }, i.prototype.GetBirthDate = function () {
            var t = "";
            return this.Valid && (t = this.GetBirthYear() + "-" + this.GetBirthMonth() + "-" + this.GetBirthDay()), t
        }, i.prototype.GetBirthYear = function () {
            var t = "";
            return this.Valid && (t = this.ID18.substr(6, 4)), t
        }, i.prototype.GetBirthMonth = function () {
            var t = "";
            return this.Valid && (t = this.ID18.substr(10, 2)), "0" === t.charAt(0) && (t = t.charAt(1)), t
        }, i.prototype.GetBirthDay = function () {
            var t = "";
            return this.Valid && (t = this.ID18.substr(12, 2)), t
        }, i.prototype.GetSex = function () {
            var t = "";
            return this.Valid && (t = this.ID18.charAt(16) % 2), t
        }, i.prototype.Get15 = function () {
            var t = "";
            return this.Valid && (t = this.ID15), t
        }, i.prototype.Get18 = function () {
            var t = "";
            return this.Valid && (t = this.ID18), t
        }, i.prototype.GetLocal = function () {
            var t = "";
            return this.Valid && (t = this.Local), t
        }, i.prototype.GetVCode = function (t) {
            for (var r = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1], e = 0, i = 0; i < t.length; i++) e += t.charAt(i) * r[i];
            return ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"][e % 11]
        }, i.prototype.CheckValid = function (t) {
            if (this.GetVCode(t.substr(0, 17)) !== t.charAt(17)) return !1;
            if (!this.IsDate(t.substr(6, 8))) return !1;
            var r = {
                11: "北京",
                12: "天津",
                13: "河北",
                14: "山西",
                15: "内蒙古",
                21: "辽宁",
                22: "吉林",
                23: "黑龙江 ",
                31: "上海",
                32: "江苏",
                33: "浙江",
                34: "安徽",
                35: "福建",
                36: "江西",
                37: "山东",
                41: "河南",
                42: "湖北 ",
                43: "湖南",
                44: "广东",
                45: "广西",
                46: "海南",
                50: "重庆",
                51: "四川",
                52: "贵州",
                53: "云南",
                54: "西藏 ",
                61: "陕西",
                62: "甘肃",
                63: "青海",
                64: "宁夏",
                65: "新疆",
                71: "台湾",
                81: "香港",
                82: "澳门",
                91: "国外"
            };
            return null != r[parseInt(t.substr(0, 2))] && (this.ID18 = t, this.ID15 = t.substr(0, 6) + t.substr(8, 9), this.Local = r[parseInt(t.substr(0, 2))], !0)
        }, i.prototype.IsDate = function (t) {
            var r = t.match(/^(\d{1,4})(\d{1,2})(\d{1,2})$/);
            if (null == r) return !1;
            var e = new Date(r[1], r[2] - 1, r[3]);
            return e.getFullYear() === r[1] / 1 && e.getMonth() + 1 === r[2] / 1 && e.getDate() === r[3] / 1
        }, r.exports = function (t) {
            return new i(t).IsValid()
        }
    }, {}]
}, {}, []);