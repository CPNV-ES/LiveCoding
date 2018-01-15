module.exports = class ComSocketIO {
  constructor(){
    let server = require('http').createServer();
    this._ioServer = require('socket.io')(server);
    this._ioServer.listen(4000);
  }

  get(channel, callback){
    this._ioServer.on('connection', (client) => {
      console.log("connection in !")

      client.on(channel, (message) => {
        let action = callback();
        this._ioServer.emit(action[0], action[action.length - 1])
      });
    });
  }
};
