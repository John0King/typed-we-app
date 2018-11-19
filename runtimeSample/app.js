"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Runtime_1 = require("./runtime/Runtime");
var Application = /** @class */ (function (_super) {
    __extends(Application, _super);
    function Application() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.globalData = {
            abc: 0,
            def: "hello",
            g: {
                a: 1,
                b: "2"
            }
        };
        return _this;
    }
    Application.prototype.onLaunch = function (info) {
        this.globalData.abc = 1; //full intellisence support
        wx.showModal({
            title: "abc:",
            content: "" + this.globalData.abc,
            success: function () {
                var a = Runtime_1.WeChatApplication.GetCurrentApp().globalData.g.a; // no intellisence.
                var b = Runtime_1.WeChatApplication.GetCurrentApp().globalData.g.b; // has intellisence
                wx.showModal({
                    title: "g:",
                    content: "a:" + a + ",b:" + b
                });
            }
        });
    };
    return Application;
}(Runtime_1.WeChatApplication));
Runtime_1.WeChatApplication.bootstrap(Application);
