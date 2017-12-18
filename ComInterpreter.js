module.exports = class ComInterpreter {
    constructor(){
        //pass
        const WebSocket = require('ws');
        this.wss = new WebSocket.Server({ port: 8080 });

    }
    post(channel, message){
        this.wss.on('connection', function connection(ws) {
            ws.on('message', function incoming(message) {
                console.log('received: %s', message);
            });
        });
    }

};