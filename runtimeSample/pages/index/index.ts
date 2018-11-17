import { WeChatPage, OnPageLoad } from "../../runtime/Runtime";

class IndexPage extends WeChatPage implements OnPageLoad {

    data = {
        showClick: false,
        word:"need init"
    }

    onLoad(args: Map<string, any>): void | Promise<any> {
        console.log(this.data.word);
        this.setData({
            word: "hello world"
        })
        console.log("onload");
        
    }

    clickme() {
        console.log(`clickme clicked`);
        this.setData({
            showClick: true
        });
        console.log(`clickme setDataed`);
    }
}

WeChatPage.initPage(IndexPage);