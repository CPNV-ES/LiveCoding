class ComCli{

    /**
     *
     * @param {String} channel channel's name (ex: 'engine' or 'editor')
     * @param {String} [messageChannelSuffix='-message'] optional suffix for message channel
     * @param {String} [replyChannelSuffix='-reply'] optional suffix for reply channel
     */
    constructor(channel, messageChannelSuffix, replyChannelSuffix){
        this.ipcrenderer = require('electron').ipcRenderer;
        this.messageChannelSuffix = (typeof messageChannelSuffix !== 'undefined') ? this.messageChannelSuffix : '-message';
        this.replyChannelSuffix = (typeof replyChannelSuffix !== 'undefined') ? this.replyChannelSuffix : '-reply';

        this.channelMessage = channel + this.messageChannelSuffix;
        this.channelReply = channel + this.replyChannelSuffix;
    }

    /**
     *
     * @param {String} msg
     * @param {Function} Called when a reply is received. uses params (event, message)
     */
    send(msg, callback){
        console.log("sending... on : " + this.channelMessage);
        this.ipcrenderer.send(this.channelMessage, msg);
        this.ipcrenderer.on(this.channelReply, callback);
    }

    get(callback){
        console.log("waiting on... : " + this.channelReply);
        this.ipcrenderer.on(this.channelReply, callback);
    }
}

let commands = {
    "enigne1": [
        "cmd1",
        "cmd2",
        "cmd3"
    ]
};

const comCliEngine = new ComCli('engine');
comCliEngine.send(JSON.stringify(commands), (event, message) => {
    console.log('*** response on engine ***');
    console.log(message);
    console.log("***");
});

const comCliEditor = new ComCli('editor');
comCliEditor.get((event, message) => {
    console.log('*** response on editor ***');
    console.log(message);
    console.log("***");
});

