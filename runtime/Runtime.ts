/// <reference path="../we-app.d.ts" />

import {Reflect} from "./Reflect"
//========================================================
// ==================Application==========================
//========================================================

export abstract class WeChatApplication {
    @MapToIgnore()
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

    @MapToIgnore()
    protected __runtime__app: any;
    @MapToIgnore()
    private __runtime__initialized: boolean = false;
    @MapToIgnore()
    public __runtime__initialize(deep: any) {
        if (this.__runtime__initialized) {
            throw new Error(`type already inialized`);
        }
        this.__runtime__app = deep;
        this.__runtime__initialized = true;
        WeChatApplication.__runtime__static_current_app = this; // set currentApplication
    }

    /** Start you application 
     * @param app  instance of WechatApplction or a constructor
    */
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

    private static __runtime__static_current_app:WeChatApplication|null = null;

    /**
     * a helper method for replace wechat's @see GetGlobalApp()
     */
    static GetCurrentApp<T=WeChatApplication>():T{
        if(this.__runtime__static_current_app != null){
            return this.__runtime__static_current_app as any; // improve code experience
        }
        console.warn(`You call WechatApplication.GetCurrentApp() so early and your will get a null! `)
        return null as any;
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

export interface OnApplicationLaunch{
    onLaunch(info:WeApp.LaunchData):void;
}
export interface OnApplicationShow{
    onShow():void;///////////////////////////////////////////// Note here
}
export interface OnApplicationHide{
    onHide():void;
}
export interface OnApplicationError{
    onError(args?:any):void; ///////////////////////////////////////////// Note here
}

//========================================================
//=====================Page===============================
//========================================================

export abstract class WeChatPage {

    protected __runtime__page: any;
    private __runtime__initialized: boolean = false;
    public __runtime__initialize(deep: any) {
        if (this.__runtime__initialized) {
            throw new Error(`type already inialized`);
        }
        this.__runtime__page = deep;
        this.__runtime__initialized = true;
    }

    @MapToIgnore()
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

    @MapToIgnore()
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

export interface OnPageReady{
    onReady():void;
}
export interface OnPageShow{
    onShow():void;
}
export interface OnPageHide{
    onHide():void;
}
export interface OnPageUnload {
    onUnload(): void | Promise<any>
}
export interface OnPagePullDownRefresh{
    onPullDownRefresh():void;
}
export interface OnPageReachBottom{
    onReachBottom():void;
}
export interface OnPageShareAppMessage{
    onShareAppMessage(options:{ from: string, target: WeApp.Target }):void;
}
export interface OnPageScroll{
    onPageScroll():void;///////////////////////////////////////////// Note here
}

//========================================================
// ================Component==============================
//========================================================

/** wasn't ready for use */
export abstract class WechatComponent{
    protected __runtime__component: any;
    private __runtime__initialized: boolean = false;
    public __runtime__initialize(deep: any) {
        if (this.__runtime__initialized) {
            throw new Error(`type already inialized`);
        }
        this.__runtime__component = deep;
        this.__runtime__initialized = true;
    }

    @MapToIgnore()
    private __temporary__data: { [key: string]: any } = {};
    get data(): { [key: string]: any } {
        if (this.__runtime__initialized) {
            return this.__runtime__component.data;
        }
        return this.__temporary__data;
    }
    set data(value) {
        if (this.__runtime__initialized) {
            this.__runtime__component.setData(value);
            return;
        }
        this.__temporary__data = value;
    }

    @MapToIgnore()
    setData(partialData: { [key: string]: any }) {
        this.__runtime__component.setData(partialData);
    }

    static initComponent<T extends WechatComponent>(component: WechatComponent | ComponentConstructor<T>) {
        let componentInstance: WechatComponent;
        if (component instanceof WechatComponent) {
            componentInstance = component;
        }
        else if (typeof (component) === "function") {
            componentInstance = new component();
        }
        else {
            throw new TypeError(`typeof app : must be a instance of WeChatApplication or a constructor of WebChatApplication`)
        }
        Component(componentConfigConvert(componentInstance))
    }
}

export interface ComponentConstructor<T>{
    new(...args:any[]):T
}

export function componentConfigConvert(component:WechatComponent):WeApp.ComponentParam{
    throw new Error(`not implement`);
    
}


//========================================================
// ================Component.Lifetime=====================
//========================================================


export interface OnComponentCreated{
    created():void;
}
export interface OnComponentAttached{
    attached():void;
}
export interface OnComponentReady{
    ready():void;
}
export interface OnComponentMoved{
    moved():void;
}
export interface OnComponentDetached{
    detached():void;
}


//========================================================
// ================Metadata==============================
//========================================================

/**
 * Tell the runtime that this method/property/field need to use specified name
 * @param targetName Specified name
 */
export function MapTo(targetName:string){
    return Reflect.metadata("MapTo",targetName);
}

/**
 * Tell the runtime that this method/property/field do not need map to Config Object
 */
export function MapToIgnore() {
    return Reflect.metadata(`ignore`, true);
}

/**
 * Tell the runtime that this property/field   **must**  get/set back { Config => Class }
 * Warning: this decorator can only apply to filed/property
 */
export function MapBackGetSet(){
    return Reflect.metadata("nomap",true);
}
