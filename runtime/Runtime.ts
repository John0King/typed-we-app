/// <reference path="../we-app.d.ts" />

import {Reflect} from "./Reflect"
//========================================================
// ==================Application==========================
//========================================================
export abstract class WeChatApplication {
    @Ignore()
    private __temporary__globalData: { [key: string]: any } = {};

    get globalData(): { [key: string]: any } {
        if (this.__runtime__initialized) {
            return this.__runtime__app.globalData;
        }
        return this.__temporary__globalData;
    }
    set globalData(value) {
        if (this.__runtime__initialized) {
            this.__runtime__app.setData(value);
            return;
        }
        this.__temporary__globalData = value;
    }

    abstract onLaunch(info: WeApp.LaunchData): void | Promise<any>

    onShow?(info: WeApp.LaunchData)

    @Ignore()
    private __runtime__app: any;
    @Ignore()
    private __runtime__initialized: boolean = false;
    @Ignore()
    public __runtime__initialize(deep: any) {
        if (this.__runtime__initialized) {
            throw new Error(`type already inialized`);
        }
        this.__runtime__app = deep;
        this.__runtime__initialized = true;
    }


    static bootstrap<T extends WeChatApplication>(app: WeChatApplication | ApplicationConstructor<T>) {
        let appConfig: WeChatApplication;
        if (app instanceof WeChatApplication) {
            appConfig = app;
        }
        else if (typeof (app) === "function") {
            appConfig = new app();
        }
        else {
            throw new TypeError(`typeof app : must be a instance of WeChatApplication or a constructor of WebChatApplication`)
        }
        App(applicationConfigConvert(appConfig))
    }
}

export function applicationConfigConvert(app: WeChatApplication): WeApp.AppParam {
    let config: WeApp.AppParam = {};
    config.data = config.data;
    config.onLaunch = function (...args) {
        let that = this;
        app.__runtime__initialize(that);
        if(typeof(app["onLaunch"]) === "function"){
            app["onLaunch"].apply(app,args);
        }
    }
    for (let name in app) {
        let has = Reflect.hasMetadata("ignore", app, name);
        if (has) {
            continue;
        }
        if (name === "onLaunch") {
            continue;
        }
        let f = app[name];
        if (typeof (f) === "function") {
            config[name] = function (...args: any[]) {
                return (<Function>f).apply(app, args);
            }
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
                Object.defineProperty(config, name, {
                    get: () => {
                        return app[name];
                    },
                    set: (value) => {
                        app[name] = value;
                    },
                    enumerable: true,
                    configurable: true
                })
            }
            
        }
    }
    console.log(config);
    return config;
}

export interface ApplicationConstructor<T extends WeChatApplication> {
    new(...args: any[]): T
}

//========================================================
// ==================Application.Lifetime==========================
//========================================================



//========================================================
//=====================Page===============================
//========================================================

export abstract class WeChatPage {

    private __runtime__page: any;
    private __runtime__initialized: boolean = false;
    public __runtime__initialize(deep: any) {
        if (this.__runtime__initialized) {
            throw new Error(`type already inialized`);
        }
        this.__runtime__page = deep;
        this.__runtime__initialize_delayaction();
        this.__runtime__initialized = true;
    }
    private __runtime__delay_data: { [key: string]: any } = {}
    private __runtime__initialize_delayaction() {
        //let page = this.__runtime__page;
        //page.setData
        // need to findout when to copy this.data (__temporary__data)  to config
        // eg. 1. call page.setData on delayaction  ##View Error before Page.onLoad##
        //     2. set the data on target configParameter (do copy in convert function) 
    }

    @Ignore()
    private __temporary__data: { [key: string]: any } = {};
    get data(): { [key: string]: any } {
        if (this.__runtime__initialized) {
            return this.__runtime__page.data;
        }
        return this.__temporary__data;
    }
    set data(value) {
        if (this.__runtime__initialized) {
            this.__runtime__page.setData(value);
            return;
        }
        this.__temporary__data = value;
    }

    @Ignore()
    setData(partialData: { [key: string]: any }) {
        this.__runtime__page.setData(partialData);
    }

    static initPage<T extends WeChatPage>(page: WeChatPage | PageConstructor<T>) {
        let pageConfig: WeChatPage;
        if (page instanceof WeChatPage) {
            pageConfig = page;
        }
        else if (typeof (page) === "function") {
            pageConfig = new page();
        }
        else {
            throw new TypeError(`typeof app : must be a instance of WeChatApplication or a constructor of WebChatApplication`)
        }
        Page(pageConfigConvert(pageConfig))
    }
}


export function pageConfigConvert(page: WeChatPage): WeApp.PageParam {
    let config: WeApp.PageParam = {};
    config.data = config.data;
    config.onLoad = function (...args) {
        let that = this;
        page.__runtime__initialize(that);
        
        if(typeof(page["onLoad"]) === "function"){
            page["onLoad"].apply(page,args);
        }
    }
    for (let name in page) {
        let has = Reflect.hasMetadata("ignore", page, name);
        if (has) {
            continue;
        }
        if (name === "onLoad") {
            continue;
        }
        let f = page[name];
        if (typeof (f) === "function") {
            config[name] = function (...args: any[]) {
                return (<Function>f).apply(page, args);
            }
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
                Object.defineProperty(config, name, {
                    get: () => {
                        return page[name];
                    },
                    set: (value) => {
                        page[name] = value;
                    },
                    enumerable: true,
                    configurable: true
                })
            }
            
        }
    }
    console.log(config);
    return config;
}

export interface PageConstructor<T extends WeChatPage> {
    new(...args: any[]): T
}


//========================================================
// ================Page.Lifetime==========================
//========================================================

export interface OnPageLoad {
    onLoad(args: Map<string, any>): void | Promise<any>

}
export interface OnPageUnload {
    onUnload(): void | Promise<any>
}


//========================================================
// ================Component==============================
//========================================================

//========================================================
// ================Metadata==============================
//========================================================

/**
 * Tell the runtime that this method/property/field do not need map to Config Object
 */
export function Ignore() {
    return Reflect.metadata(`ignore`, true);
}

/**
 * Tell the runtime that this property/field   need to be a get/set to { Config => Class }
 * Warning: this decorator can only apply to filed/property
 */
export function MapGetSet(){
    return Reflect.metadata("nomap",true);
}