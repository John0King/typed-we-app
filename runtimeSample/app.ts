import { WeChatApplication } from './runtime/Runtime';

class Application extends WeChatApplication{
    onLaunch(info: WeApp.LaunchData): void | Promise<any> {
        this.globalData.abc = 1;
    }
}

WeChatApplication.bootstrap(Application);