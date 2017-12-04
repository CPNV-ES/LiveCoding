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

    get(callback){
        console.log("waiting on... : " + this.channelReply);
        this.ipcRenderer.once(this.channelReply, (e,m) => {
            console.log(e);
            console.log(m);
        });
    }
}

/*
// Use case example :
const comCliEngine = new ComCli('engine');
comCliEngine.send('my name is jeff', (event, msg) => {

    // console.log("get msg on client");
    // console.log(msg); // arg contains message

});
console.log("new communication for editor....");
const comCliEditor = new ComCli('editor');
comCliEditor.get((event, message) => {
    console.log("got message on editor");
    console.log(message);
});

*/

const comCliEditor = new ComCli('editor');
comCliEditor.get((event, message) => {
    console.log("got new message...");
    console.log(message);
});
