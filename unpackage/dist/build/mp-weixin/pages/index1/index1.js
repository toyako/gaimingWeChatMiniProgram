(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
  ["pages/index1/index1"], {
    "029f": function (t, a, o) {
      "use strict";
      (function (t, o) {
        Object.defineProperty(a, "__esModule", {
          value: !0
        }), a.default = void 0;
        var n = getApp(),
          e = {
            data: function () {
              return {
                input1: "",
                shuruNu: "",
                suiji: [],
                cfm: [],
                share: !1,
                arrayFuhao: "",
                chongfu: ["⁠", "⁡", "⁢", "⁣"],
                gai_type: 0,
                chongfu_android: ["⁤", "⁥", "⁦", "⁨", "⁩", "⁪", "⁫", "⁬", "⁭", "⁮", "⁯"]
              }
            },
            onLoad: function (t) {
              console.log("index1 onLoad"), n.globalData.login ? (console.log("已经登录"), this.setData({
                suiji: n.globalData.suiji,
                cfm: n.globalData.cfm
              })) : (console.log("还没登录"), this.getFuHao(1))
            },
            onReady: function () {},
            onShow: function () {
              console.log("index1 onshow");
              var a = this;
              try {
                a.setData({
                  share: t.getStorageSync("share")
                })
              } catch (o) {
                console.log("出错了")
              }
              setTimeout((function () {
                console.log("延迟调用"), 0 == a.suiji.length && (console.log("suiji.length == 0"), a.setData({
                  suiji: n.globalData.suiji,
                  cfm: n.globalData.cfm
                }))
              }), 1e3)
            },
            onHide: function () {},
            onUnload: function () {},
            onPullDownRefresh: function () {},
            onReachBottom: function () {},
            onShareAppMessage: function (a) {
              console.log("转发");
              try {
                t.setStorageSync("share", !0)
              } catch (o) {
                console.log("出错了")
              }
            },
            methods: {
              chongfuList: function (t) {
                console.log(this.chongfu), console.log(this.gai_type), this.nameList = [];
                for (var a = 0; a < 20; a++) {
                  for (var o, n = this.shuruNu, e = -1, l = -1, s = -1, i = -1, r = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", h = 0, u = 0; u < n.length; u++) {
                    for (var c = n.charAt(u), f = !1, g = 0; g < r.length; g++) c == r.charAt(g) && (f = !0);
                    h += f ? 1 : 2
                  }
                  switch (h) {
                    case 1:
                    case 2:
                      i = Math.floor(Math.random() * n.length), s = Math.floor(Math.random() * n.length), l = Math.floor(Math.random() * n.length), e = Math.floor(Math.random() * n.length);
                      break;
                    case 3:
                    case 4:
                      s = Math.floor(Math.random() * n.length), l = Math.floor(Math.random() * n.length), e = Math.floor(Math.random() * n.length);
                      break;
                    case 5:
                    case 6:
                      l = Math.floor(Math.random() * n.length), e = Math.floor(Math.random() * n.length);
                      break;
                    case 7:
                    case 8:
                      e = Math.floor(Math.random() * n.length)
                  }
                  o = Math.floor(Math.random() * n.length);
                  for (var d = "", m = 0; m < n.length; m++) {
                    var M = 0;
                    for (m == o && M++, m == e && M++, m == l && M++, m == s && M++, m == i && M++; M > 0;)
                      if (M--, 1 == this.gai_type) {
                        var v = Math.floor(11 * Math.random());
                        d += this.chongfu_android[v]
                      } else 2 == this.gai_type ? d += "̵" : (v = Math.floor(4 * Math.random()), d += this.chongfu[v]);
                    0 == m && 2 == this.gai_type ? d = n.charAt(m) + d : d += n.charAt(m)
                  }
                  for (var p = !1, b = 0; b < this.nameList.length; b++)
                    if (d == this.nameList[b].message) {
                      p = !0;
                      break
                    } if (!p) {
                    var D = {
                      status: 0,
                      tip: "",
                      message: d
                    };
                    this.nameList.push(D)
                  }
                }
                var _ = Math.floor(Math.random() * this.nameList.length),
                  w = this.nameList[_].message;
                console.log(w)
                wx.setClipboardData({
                  data: w,
                  success: function(t) {}
                })
              },
              catch1tap: function () {
                var t = Math.round(Math.random() * (this.suiji.length - 1));
                this.setData({
                  input1: this.suiji[t]
                })
              },
              longFun: function () {
                t.setClipboardData({
                  data: this.input1,
                  success: function (a) {
                    t.showToast({
                      title: "内容已复制"
                    })
                  }
                })
              },
              chongfuInput: function (t) {
                this.setData({
                  shuruNu: t.detail.value
                })
              },
              catch2tap: function (a) {
                var o = this.shuruNu,
                  n = this.cfm;
                if ("" == o) t.showModal({
                  content: "请输入昵称",
                  showCancel: !1
                });
                else if (o.length > 5) t.showModal({
                  content: "输入昵称最长长度不能大于5",
                  showCancel: !1
                });
                else {
                  var e = "";
                  if (1 == o.length) {
                    for (var l = 0; l < 5; l++) e = n[Math.round(Math.random() * (n.length - 1))] + e;
                    console.log(e)
                  } else if (2 == o.length) {
                    for (var s = 0; s < 4; s++) e = n[Math.round(Math.random() * (n.length - 1))] + e;
                    console.log(e)
                  } else if (3 == o.length) {
                    for (var i = 0; i < 3; i++) e = n[Math.round(Math.random() * (n.length - 1))] + e;
                    console.log(e)
                  } else if (4 == o.length) {
                    for (var r = 0; r < 2; r++) e = n[Math.round(Math.random() * (n.length - 1))] + e;
                    console.log(e)
                  } else e = n[Math.round(Math.random() * (n.length - 1))], console.log(e);
                  var h = "";
                  console.log(h);
                  for (var u = this.shuruNu.split(""), c = Math.round(Math.random() * (u.length - 1)), f = 0; f < u.length; f++) c == f ? h = h + u[f] + e : h += u[f];
                  console.log(h), t.setClipboardData({
                    data: h,
                    success: function (a) {
                      t.showModal({
                        title: "重复名已复制",
                        content: "请前往游戏内粘贴改名",
                        showCancel: !1
                      })
                    }
                  })
                }
              },
              getFuHao: function (a) {
                console.log("调用getFuhao函数, time=", a);
                var e = this;
                o.callFunction({
                  name: "newUser",
                  success: function (t) {
                    n.globalData.login = !0, n.globalData.arrayFuhao = t.result.fuHao.arrayFuhao, n.globalData.suiji = t.result.fuHao.suiji, n.globalData.cfm = t.result.fuHao.cfm, e.setData({
                      arrayFuhao: n.globalData.arrayFuhao,
                      suiji: n.globalData.suiji,
                      cfm: n.globalData.cfm
                    })
                  },
                  fail: function (o) {
                    a < 10 ? e.getFuHao(++a) : t.showModal({
                      title: "您的网络出了点问题",
                      content: "请检查您的网络",
                      showCancel: !1
                    })
                  }
                })
              }
            }
          };
        a.default = e
      }).call(this, o("543d")["default"], o("a9ff")["default"])
    },
    "08f2": function (t, a, o) {
      "use strict";
      o.r(a);
      var n = o("029f"),
        e = o.n(n);
      for (var l in n)["default"].indexOf(l) < 0 && function (t) {
        o.d(a, t, (function () {
          return n[t]
        }))
      }(l);
      a["default"] = e.a
    },
    "65d4": function (t, a, o) {
      "use strict";
      o.d(a, "b", (function () {
        return n
      })), o.d(a, "c", (function () {
        return e
      })), o.d(a, "a", (function () {}));
      var n = function () {
          var t = this.$createElement;
          this._self._c
        },
        e = []
    },
    "765f": function (t, a, o) {
      "use strict";
      var n = o("e918"),
        e = o.n(n);
      e.a
    },
    "9e28": function (t, a, o) {
      "use strict";
      o.r(a);
      var n = o("65d4"),
        e = o("08f2");
      for (var l in e)["default"].indexOf(l) < 0 && function (t) {
        o.d(a, t, (function () {
          return e[t]
        }))
      }(l);
      o("765f");
      var s = o("f0c5"),
        i = Object(s["a"])(e["default"], n["b"], n["c"], !1, null, null, null, !1, n["a"], void 0);
      a["default"] = i.exports
    },
    e918: function (t, a, o) {},
    f685: function (t, a, o) {
      "use strict";
      (function (t, a) {
        var n = o("4ea4");
        o("d7d3"), o("a9ff");
        n(o("66fd"));
        var e = n(o("9e28"));
        t.__webpack_require_UNI_MP_PLUGIN__ = o, a(e.default)
      }).call(this, o("bc2e")["default"], o("543d")["createPage"])
    }
  },
  [
    ["f685", "common/runtime", "common/vendor"]
  ]
]);