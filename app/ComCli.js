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
     * @param {Function} Called when a reply is received. Uses params (event, message)
     */
    send(msg, callback){
        this.ipcrenderer.send(this.channelMessage, msg);
        this.ipcrenderer.on(this.channelReply, callback);
    }

    /**
     *
     * @param {Function} Uses params (event, message)
     */
    get(callback){
        this.ipcrenderer.on(this.channelReply, callback);
    }
}

/* Usage example */
const engineComCli = new ComCli('engine');
const editorComCli = new ComCli('editor');
/*
editorComCli.send('php/pacman->moveUp();', (e,m)=>{
});
*/
engineComCli.get((event, msg) => {
    console.log("***");
    console.log(msg);
    console.log("***");
});
