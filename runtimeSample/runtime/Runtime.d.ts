/// <reference path="../../we-app.d.ts" />
export declare abstract class WeChatApplication {
    private __temporary__globalData;
    globalData: {
        [key: string]: any;
    };
    protected __runtime__app: any;
    private __runtime__initialized;
    __runtime__initialize(deep: any): void;
    /** Start you application
     * @param app  instance of WechatApplction or a constructor
    */
    static bootstrap<T extends WeChatApplication>(app: WeChatApplication | ApplicationConstructor<T>): void;
    private static __runtime__static_current_app;
    /**
     * a helper method for replace wechat's @see GetGlobalApp()
     */
    static GetCurrentApp<T = WeChatApplication>(): T;
}
export declare function applicationConfigConvert(app: WeChatApplication): WeApp.AppParam;
export interface ApplicationConstructor<T extends WeChatApplication> {
    new (...args: any[]): T;
}
export interface OnApplicationLaunch {
    onLaunch(info: WeApp.LaunchData): void;
}
export interface OnApplicationShow {
    onShow(): void;
}
export interface OnApplicationHide {
    onHide(): void;
}
export interface OnApplicationError {
    onError(args?: any): void;
}
export declare abstract class WeChatPage {
    protected __runtime__page: any;
    private __runtime__initialized;
    __runtime__initialize(deep: any): void;
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
export interface OnPageReady {
    onReady(): void;
}
export interface OnPageShow {
    onShow(): void;
}
export interface OnPageHide {
    onHide(): void;
}
export interface OnPageUnload {
    onUnload(): void | Promise<any>;
}
export interface OnPagePullDownRefresh {
    onPullDownRefresh(): void;
}
export interface OnPageReachBottom {
    onReachBottom(): void;
}
export interface OnPageShareAppMessage {
    onShareAppMessage(options: {
        from: string;
        target: WeApp.Target;
    }): void;
}
export interface OnPageScroll {
    onPageScroll(): void;
}
/** wasn't ready for use */
export declare abstract class WechatComponent {
    protected __runtime__component: any;
    private __runtime__initialized;
    __runtime__initialize(deep: any): void;
    private __temporary__data;
    data: {
        [key: string]: any;
    };
    setData(partialData: {
        [key: string]: any;
    }): void;
    static initComponent<T extends WechatComponent>(component: WechatComponent | ComponentConstructor<T>): void;
}
export interface ComponentConstructor<T> {
    new (...args: any[]): T;
}
export declare function componentConfigConvert(component: WechatComponent): WeApp.ComponentParam;
export interface OnComponentCreated {
    created(): void;
}
export interface OnComponentAttached {
    attached(): void;
}
export interface OnComponentReady {
    ready(): void;
}
export interface OnComponentMoved {
    moved(): void;
}
export interface OnComponentDetached {
    detached(): void;
}
/**
 * Tell the runtime that this method/property/field need to use specified name
 * @param targetName Specified name
 */
export declare function MapTo(targetName: string): {
    (target: Function): void;
    (target: any, propertyKey: string | symbol): void;
};
/**
 * Tell the runtime that this method/property/field do not need map to Config Object
 */
export declare function MapToIgnore(): {
    (target: Function): void;
    (target: any, propertyKey: string | symbol): void;
};
/**
 * Tell the runtime that this property/field   **must**  get/set back { Config => Class }
 * Warning: this decorator can only apply to filed/property
 */
export declare function MapBackGetSet(): {
    (target: Function): void;
    (target: any, propertyKey: string | symbol): void;
};
//# sourceMappingURL=Runtime.d.ts.map