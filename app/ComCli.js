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
        this.ipcrenderer.send(this.channelMessage, msg);
        this.ipcrenderer.on(this.channelReply, callback);
    }

    get(callback){
        this.ipcrenderer.on(this.channelReply, callback);
    }
}

const comCliEditor = new ComCli('editor');
comCliEditor.get((event, message) => {
    let commands = JSON.parse(message);
    //TODO: display commands.
    // to Raph. : https://stackoverflow.com/questions/6453295/javascript-callback-how-to-return-the-result

    comCliEditor.send(commands['availableCommands'][0], (e, msg) => {
    });
    setTimeout(() => {
        comCliEditor.send(commands['availableCommands'][0], (e, msg) => {
        });
    }, 2000);

});

