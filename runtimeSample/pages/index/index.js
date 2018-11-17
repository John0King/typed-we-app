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
var Runtime_1 = require("../../runtime/Runtime");
var IndexPage = /** @class */ (function (_super) {
    __extends(IndexPage, _super);
    function IndexPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = {
            showClick: false,
            word: "need init"
        };
        return _this;
    }
    IndexPage.prototype.onLoad = function (args) {
        console.log(this.data.word);
        this.setData({
            word: "hello world"
        });
        console.log("onload");
    };
    IndexPage.prototype.clickme = function () {
        console.log("clickme clicked");
        this.setData({
            showClick: true
        });
        console.log("clickme setDataed");
    };
    return IndexPage;
}(Runtime_1.WeChatPage));
Runtime_1.WeChatPage.initPage(IndexPage);
