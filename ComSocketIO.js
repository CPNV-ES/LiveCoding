module.exports = class ComSocketIO {
    constructor(){
        let server = require('http').createServer();
        this._ioServer = require('socket.io')(server);
        this._ioServer.listen(3000);
    }
    get(channel, callback){
        console.log("method called..");
        console.log("waiting for collection")
        this._ioServer.on('connection', (client) => {
            console.log('connection in !');
            client.on(channel, (message1) => {
                let action = callback();
                console.log("replying...");
                console.log(action);

                this._ioServer.emit(action[0], action[action.length - 1])
            });
            //this._ioServer.emit('chat')
        });
    }
};
