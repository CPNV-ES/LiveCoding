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


// Use case example :
 const comCli = new ComCli('engine');

 comCli.send('my name is jeff', (event, msg) => {
  console.log("get msg on client");
  console.log(msg); // arg contains message
});
