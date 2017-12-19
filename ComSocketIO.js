module.exports = class ComSocketIO {
    constructor(){
        let server = require('http').createServer();
        this._ioServer = require('socket.io')(server);
        this._ioServer.listen(3000);
    }
    listen(){
        console.log('wait..')
        this._ioServer.on('connection', (client) => {
            console.log('connection in !');
            client.on('chat', (data)=>{
                console.log(data);
            });
        })
    }


};