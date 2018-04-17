let instance = null;
module.exports = class ComIpcMain {

    /**
     * Uses the Electron ipcMain library for commmunication 
     * https://github.com/electron/electron/blob/master/docs/api/ipc-main.md
     * @param {String} messageChannelSuffix  default value : -message
     * @param {String} replyChannelSuffix default value : -reply 
     */
    constructor(messageChannelSuffix, replyChannelSuffix) {
        this.messageChannelSuffix = (typeof messageChannelSuffix !== 'undefined') ? messageChannelSuffix : ComIpcMain.getMessageChannelSuffix();
        this.replyChannelSuffix = (typeof replyChannelSuffix !== 'undefined') ? replyChannelSuffix : ComIpcMain.getReplyChannelSuffix();
        if(!instance) {
            instance = this;
            let {ipcMain} = require('electron');
            this.ipcmain = ipcMain;
        }

        return instance;
    }

    /**
     * Listen on given channel. Call callback when receiving data. 
     * @param {String} channel 
     * @param {Function} callback 
     */
    get(channel, callback) {
      this.ipcmain.on(channel + this.messageChannelSuffix, (e, m) => {
        let action = callback(m);
        if(typeof action !== 'undefined'){
            e.sender.send(action[0] + this.replyChannelSuffix, action[action.length - 1]);
        }
      });
    };

    /**
     * Send message on given channel.
     * @param {String} channel 
     * @param {String} message 
     */
    post(channel, message){
        // We actually cannot access to "mainWindow" from here.
        // So, we use a workaround in main.js which is :  
        // mainWindow.webContents.send(channel + ComIpcMain.getReplyChannelSuffix(), data);
    }

    static getMessageChannelSuffix(){
        return (typeof this.messageChannelSuffix !== 'undefined') ? this.messageChannelSuffix : '-message';
    }

    static getReplyChannelSuffix(){
        return (typeof this.replyChannelSuffix !== 'undefined') ? this.replyChannelSuffix : '-reply';
    }
};
