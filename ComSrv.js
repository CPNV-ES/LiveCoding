let instance = null;
class ComSrv {
    constructor(messageChannel, replyChannel) {
        this.messageChannel = (typeof messageChannel !== 'undefined') ? this.messageChannel : '-message';
        this.replyChannel = (typeof replyChannel !== 'undefined') ? this.replyChannel : '-reply';
        if(!instance) {
            instance = this;
            let {ipcMain} = require('electron');
            this.ipcmain = ipcMain;
        }
        return instance;
    }

    get(channel, callback) {
        this.ipcmain.on(channel + this.messageChannel, callback);
    }
}

const comSrv = new ComSrv();

comSrv.get('engine', (event, msg) => {
    console.log("get commands from engine");
    console.log(msg);
    console.log("sending to : editor" + comSrv.replyChannel);

    event.sender.send('editor' + comSrv.channelReply, msg);
});


