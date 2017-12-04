class ComCli{
    /**
     *
     * @param {String} channel channel's name (ex: 'engine' or 'editor')
     */
    constructor(channel){
        this.ipcRenderer = require('electron').ipcRenderer;
        this.channelMessage = channel + "-message";
        this.channelReply = channel + "-reply"
    }

    /**
     *
     * @param {String} msg
     * @param {ListenerCallback} called when a reply is received. uses params (event, message)
     */
    send(msg, callback){
        console.log("sending... on : " + this.channelMessage);
        this.ipcRenderer.send(this.channelMessage, msg);
        this.ipcRenderer.on(this.channelReply, callback);
    }
}
