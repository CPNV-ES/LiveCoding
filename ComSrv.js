let instance = null;
class ComSrv {
    constructor(messageChannelSuffix, replyChannelSuffix) {
        this.messageChannelSuffix = (typeof messageChannelSuffix !== 'undefined') ? this.messageChannelSuffix : '-message';
        this.replyChannelSuffix = (typeof replyChannelSuffix !== 'undefined') ? this.replyChannelSuffix : '-reply';
        if(!instance) {
            instance = this;
            let {ipcMain} = require('electron');
            this.ipcmain = ipcMain;
        }
        return instance;
    }

    get(channel, callback) {
        console.log("getting on :" + channel + this.messageChannelSuffix);
        this.ipcmain.on(channel + this.messageChannelSuffix, callback);
    }
}

const comSrv = new ComSrv();
comSrv.get('engine', (event, message) => {
   console.log("*** message from engine ***");
   console.log(message);
   console.log("***");
   //TODO: parse commands
   event.sender.send('editor'+comSrv.replyChannelSuffix, message);
});