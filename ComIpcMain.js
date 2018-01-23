let instance = null;
module.exports = class ComIpcMain {
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
      this.ipcmain.on(channel + this.messageChannelSuffix, (e, m) => {
        let action = callback(m);
        e.sender.send(action[0] + this.replyChannelSuffix, action[action.length - 1]);
      });
    };

    post(){
        // TODO post on ipc
    }
};

/*
const comSrv = new ComSrv();
comSrv.get('engine', (event, message) => {
   console.log("*** message from ENGINE ***");
   console.log(message);
   console.log("***");
   //TODO: parse commands

   event.sender.send('editor' + comSrv.replyChannelSuffix, message);
});

comSrv.get('editor', (event, message) => {
    console.log("*** message from EDITOR ***");
    console.log(message);
    event.sender.send('engine' + comSrv.replyChannelSuffix, message);
});
*/
