module.exports = class ComWebSocket {
    constructor(){
        //pass
        const WebSocket = require('ws');
        this.wss = new WebSocket.Server({ port: 8080 });
    }

    post(channel, message){
        console.log('waiting for co.. tru tru');
        this.wss.on('open', (ws) => {
            console.log('new connection !');
            ws.on('message', (mess) =>  {
                console.log('received: %s', mess);
            });
        });
    }

};