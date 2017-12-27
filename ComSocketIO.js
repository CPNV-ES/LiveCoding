module.exports = class ComSocketIO {
    constructor(){
        let server = require('http').createServer();
        this._ioServer = require('socket.io')(server);
        this._ioServer.listen(3000);
    }
    get(channel, callback){
        this._ioServer.on('connection', (client) => {
            client.on(channel, (message1) => {
                let action = callback();
                this._ioServer.emit(action[0], action[action.length - 1])
            });
            //this._ioServer.emit('chat')
        });
    }
};
