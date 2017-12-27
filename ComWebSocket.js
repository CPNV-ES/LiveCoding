module.exports = class ComWebSocket {
  constructor(){
    const WebSocket = require('ws');
    this.wss = new WebSocket.Server({ port: 8080 });
  }

  post(channel, message){
    this.wss.on('open', (ws) => {
      console.log('new connection !');
      ws.on('message', (mess) =>  {
        console.log('received: %s', mess);
      });
    });
  }
  
};
