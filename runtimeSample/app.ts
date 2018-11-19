import { WeChatApplication } from './runtime/Runtime';

class Application extends WeChatApplication{
    globalData = {
        abc : 0,
        def : "hello",
        g : {
            a : 1,
            b : "2"
        }
    }
    onLaunch(info: WeApp.LaunchData): void | Promise<any> {
        this.globalData.abc = 1; //full intellisence support

        wx.showModal({
            title:`abc:`,
            content:`${this.globalData.abc}`,
            success:()=>{
                let a = WeChatApplication.GetCurrentApp().globalData.g.a ; // no intellisence.
                let b = WeChatApplication.GetCurrentApp<Application>().globalData.g.b  // has intellisence

                wx.showModal({
                    title:`g:`,
                    content:`a:${a},b:${b}`
                })
            }
        })

        
    }
}

WeChatApplication.bootstrap(Application);