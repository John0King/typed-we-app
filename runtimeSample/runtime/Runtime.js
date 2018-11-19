"use strict";
/// <reference path="../we-app.d.ts" />
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Reflect_1 = require("./Reflect");
//========================================================
// ==================Application==========================
//========================================================
var WeChatApplication = /** @class */ (function () {
    function WeChatApplication() {
        this.__temporary__globalData = {};
        this.__runtime__initialized = false;
    }
    Object.defineProperty(WeChatApplication.prototype, "globalData", {
        get: function () {
            if (this.__runtime__initialized) {
                return this.__runtime__app.globalData;
            }
            return this.__temporary__globalData;
        },
        set: function (value) {
            if (this.__runtime__initialized) {
                this.__runtime__app.setData(value);
                return;
            }
            this.__temporary__globalData = value;
        },
        enumerable: true,
        configurable: true
    });
    WeChatApplication.prototype.__runtime__initialize = function (deep) {
        if (this.__runtime__initialized) {
            throw new Error("type already inialized");
        }
        this.__runtime__app = deep;
        this.__runtime__initialized = true;
        WeChatApplication.__runtime__static_current_app = this; // set currentApplication
    };
    /** Start you application
     * @param app  instance of WechatApplction or a constructor
    */
    WeChatApplication.bootstrap = function (app) {
        var appConfig;
        if (app instanceof WeChatApplication) {
            appConfig = app;
        }
        else if (typeof (app) === "function") {
            appConfig = new app();
        }
        else {
            throw new TypeError("typeof app : must be a instance of WeChatApplication or a constructor of WebChatApplication");
        }
        App(applicationConfigConvert(appConfig));
    };
    /**
     * a helper method for replace wechat's @see GetGlobalApp()
     */
    WeChatApplication.GetCurrentApp = function () {
        if (this.__runtime__static_current_app != null) {
            return this.__runtime__static_current_app; // improve code experience
        }
        console.warn("You call WechatApplication.GetCurrentApp() so early and your will get a null! ");
        return null;
    };
    WeChatApplication.__runtime__static_current_app = null;
    __decorate([
        MapToIgnore()
    ], WeChatApplication.prototype, "__temporary__globalData", void 0);
    __decorate([
        MapToIgnore()
    ], WeChatApplication.prototype, "__runtime__app", void 0);
    __decorate([
        MapToIgnore()
    ], WeChatApplication.prototype, "__runtime__initialized", void 0);
    __decorate([
        MapToIgnore()
    ], WeChatApplication.prototype, "__runtime__initialize", null);
    return WeChatApplication;
}());
exports.WeChatApplication = WeChatApplication;
function applicationConfigConvert(app) {
    var config = {};
    config.data = config.data;
    config.onLaunch = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var that = this;
        app.__runtime__initialize(that);
        if (typeof (app["onLaunch"]) === "function") {
            app["onLaunch"].apply(app, args);
        }
    };
    var _loop_1 = function (name_1) {
        var has = Reflect_1.Reflect.hasMetadata("ignore", app, name_1);
        if (has) {
            return "continue";
        }
        if (name_1 === "onLaunch") {
            return "continue";
        }
        var f = app[name_1];
        if (typeof (f) === "function") {
            config[name_1] = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return f.apply(app, args);
            };
        }
        else {
            // undefined,null,string, symbol,number, boolean,object
            // if(name == "data"){
            //     config[name] = page[name];
            //     continue;
            // }
            // else
            if (f != null) {
                //string, symbol,number, boolean,object
                Object.defineProperty(config, name_1, {
                    get: function () {
                        return app[name_1];
                    },
                    set: function (value) {
                        app[name_1] = value;
                    },
                    enumerable: true,
                    configurable: true
                });
            }
        }
    };
    for (var name_1 in app) {
        _loop_1(name_1);
    }
    console.log(config);
    return config;
}
exports.applicationConfigConvert = applicationConfigConvert;
//========================================================
//=====================Page===============================
//========================================================
var WeChatPage = /** @class */ (function () {
    function WeChatPage() {
        this.__runtime__initialized = false;
        this.__temporary__data = {};
    }
    WeChatPage.prototype.__runtime__initialize = function (deep) {
        if (this.__runtime__initialized) {
            throw new Error("type already inialized");
        }
        this.__runtime__page = deep;
        this.__runtime__initialized = true;
    };
    Object.defineProperty(WeChatPage.prototype, "data", {
        get: function () {
            if (this.__runtime__initialized) {
                return this.__runtime__page.data;
            }
            return this.__temporary__data;
        },
        set: function (value) {
            if (this.__runtime__initialized) {
                this.__runtime__page.setData(value);
                return;
            }
            this.__temporary__data = value;
        },
        enumerable: true,
        configurable: true
    });
    WeChatPage.prototype.setData = function (partialData) {
        this.__runtime__page.setData(partialData);
    };
    WeChatPage.initPage = function (page) {
        var pageConfig;
        if (page instanceof WeChatPage) {
            pageConfig = page;
        }
        else if (typeof (page) === "function") {
            pageConfig = new page();
        }
        else {
            throw new TypeError("typeof app : must be a instance of WeChatApplication or a constructor of WebChatApplication");
        }
        Page(pageConfigConvert(pageConfig));
    };
    __decorate([
        MapToIgnore()
    ], WeChatPage.prototype, "__temporary__data", void 0);
    __decorate([
        MapToIgnore()
    ], WeChatPage.prototype, "setData", null);
    return WeChatPage;
}());
exports.WeChatPage = WeChatPage;
function pageConfigConvert(page) {
    var config = {};
    config.data = config.data;
    config.onLoad = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var that = this;
        page.__runtime__initialize(that);
        if (typeof (page["onLoad"]) === "function") {
            page["onLoad"].apply(page, args);
        }
    };
    var _loop_2 = function (name_2) {
        var has = Reflect_1.Reflect.hasMetadata("ignore", page, name_2);
        if (has) {
            return "continue";
        }
        if (name_2 === "onLoad") {
            return "continue";
        }
        var f = page[name_2];
        if (typeof (f) === "function") {
            config[name_2] = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return f.apply(page, args);
            };
        }
        else {
            // undefined,null,string, symbol,number, boolean,object
            if (f != null) {
                //string, symbol,number, boolean,object
                Object.defineProperty(config, name_2, {
                    get: function () {
                        return page[name_2];
                    },
                    set: function (value) {
                        page[name_2] = value;
                    },
                    enumerable: true,
                    configurable: true
                });
            }
        }
    };
    for (var name_2 in page) {
        _loop_2(name_2);
    }
    console.log(config);
    return config;
}
exports.pageConfigConvert = pageConfigConvert;
//========================================================
// ================Component==============================
//========================================================
/** wasn't ready for use */
var WechatComponent = /** @class */ (function () {
    function WechatComponent() {
        this.__runtime__initialized = false;
        this.__temporary__data = {};
    }
    WechatComponent.prototype.__runtime__initialize = function (deep) {
        if (this.__runtime__initialized) {
            throw new Error("type already inialized");
        }
        this.__runtime__component = deep;
        this.__runtime__initialized = true;
    };
    Object.defineProperty(WechatComponent.prototype, "data", {
        get: function () {
            if (this.__runtime__initialized) {
                return this.__runtime__component.data;
            }
            return this.__temporary__data;
        },
        set: function (value) {
            if (this.__runtime__initialized) {
                this.__runtime__component.setData(value);
                return;
            }
            this.__temporary__data = value;
        },
        enumerable: true,
        configurable: true
    });
    WechatComponent.prototype.setData = function (partialData) {
        this.__runtime__component.setData(partialData);
    };
    WechatComponent.initComponent = function (component) {
        var componentInstance;
        if (component instanceof WechatComponent) {
            componentInstance = component;
        }
        else if (typeof (component) === "function") {
            componentInstance = new component();
        }
        else {
            throw new TypeError("typeof app : must be a instance of WeChatApplication or a constructor of WebChatApplication");
        }
        Component(componentConfigConvert(componentInstance));
    };
    __decorate([
        MapToIgnore()
    ], WechatComponent.prototype, "__temporary__data", void 0);
    __decorate([
        MapToIgnore()
    ], WechatComponent.prototype, "setData", null);
    return WechatComponent;
}());
exports.WechatComponent = WechatComponent;
function componentConfigConvert(component) {
    throw new Error("not implement");
}
exports.componentConfigConvert = componentConfigConvert;
//========================================================
// ================Metadata==============================
//========================================================
/**
 * Tell the runtime that this method/property/field need to use specified name
 * @param targetName Specified name
 */
function MapTo(targetName) {
    return Reflect_1.Reflect.metadata("MapTo", targetName);
}
exports.MapTo = MapTo;
/**
 * Tell the runtime that this method/property/field do not need map to Config Object
 */
function MapToIgnore() {
    return Reflect_1.Reflect.metadata("ignore", true);
}
exports.MapToIgnore = MapToIgnore;
/**
 * Tell the runtime that this property/field   **must**  get/set back { Config => Class }
 * Warning: this decorator can only apply to filed/property
 */
function MapBackGetSet() {
    return Reflect_1.Reflect.metadata("nomap", true);
}
exports.MapBackGetSet = MapBackGetSet;
