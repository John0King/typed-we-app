/// <reference path="../../we-app.d.ts" />
export declare abstract class WeChatApplication {
    private __temporary__globalData;
    globalData: {
        [key: string]: any;
    };
    abstract onLaunch(info: WeApp.LaunchData): void | Promise<any>;
    onShow?(info: WeApp.LaunchData): any;
    private __runtime__app;
    private __runtime__initialized;
    __runtime__initialize(deep: any): void;
    static bootstrap<T extends WeChatApplication>(app: WeChatApplication | ApplicationConstructor<T>): void;
}
export declare function applicationConfigConvert(app: WeChatApplication): WeApp.AppParam;
export interface ApplicationConstructor<T extends WeChatApplication> {
    new (...args: any[]): T;
}
export declare abstract class WeChatPage {
    private __runtime__page;
    private __runtime__initialized;
    __runtime__initialize(deep: any): void;
    private __runtime__delay_data;
    private __runtime__initialize_delayaction;
    private __temporary__data;
    data: {
        [key: string]: any;
    };
    setData(partialData: {
        [key: string]: any;
    }): void;
    static initPage<T extends WeChatPage>(page: WeChatPage | PageConstructor<T>): void;
}
export declare function pageConfigConvert(page: WeChatPage): WeApp.PageParam;
export interface PageConstructor<T extends WeChatPage> {
    new (...args: any[]): T;
}
export interface OnPageLoad {
    onLoad(args: Map<string, any>): void | Promise<any>;
}
export interface OnPageUnload {
    onUnload(): void | Promise<any>;
}
/**
 * Tell the runtime that this method/property/field do not need map to Config Object
 */
export declare function Ignore(): {
    (target: Function): void;
    (target: any, propertyKey: string | symbol): void;
};
/**
 * Tell the runtime that this property/field   need to be a get/set to { Config => Class }
 * Warning: this decorator can only apply to filed/property
 */
export declare function MapGetSet(): {
    (target: Function): void;
    (target: any, propertyKey: string | symbol): void;
};
//# sourceMappingURL=Runtime.d.ts.map