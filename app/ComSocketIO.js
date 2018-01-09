class ComSocketIO{
  constructor(channel, messageChannelSuffix, replyChannelSuffix){
    this.socket = require('socket.io-client')('http://localhost:5656');
    this.messageChannelSuffix = (typeof messageChannelSuffix !== 'undefined') ? this.messageChannelSuffix : '-message';
    this.replyChannelSuffix = (typeof replyChannelSuffix !== 'undefined') ? this.replyChannelSuffix : '-reply';
    this.channel = channel;
    this.channelMessage = channel + this.messageChannelSuffix;
    this.channelReply = channel + this.replyChannelSuffix;
  }

  send(msg, callback){
    // console.log("waiting for conenction...")
    // this.socket.on('connection', (client) => {
    //   console.log("connection in !");
      // this.socket.emit(this.channel, msg, callback);
      this.socket.emit(this.channel, msg, callback);
    // });
  }
}

console.log("GO");
const comSocketIO = new ComSocketIO('editor');
comSocketIO.send('feu', (data) =>{
  console.log("***");
  console.log(data);
  console.log("***");
})
console.log("GO");
