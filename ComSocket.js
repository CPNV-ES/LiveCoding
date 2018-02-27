module.exports = class ComSocket{
    constructor(host, port){
        let net = require('net');
        //this.host = (typeof host !== 'undefined') ? this.host : 'localhost'
        //this.port = (typeof port !== 'undefined') ? this.port : '12800'
        this.host = host || 'localhost';
        this.port = port || '12800';
        //this.server = net.createServer();
        //this.server.listen(this.host, this.port);
        this.client = new net.Socket();

        this.client.connect(this.port, this.host, () => {
            console.log('connected.');
        });
        this.client.on('error', (ex) => {
           console.log('handled error');
           console.log(ex);
        });

    }

    get(channel, callback) {
        this.client.once(channel, (data) => {
            callback(data.toString('utf8'));
        });
    }

    post(channel, message) {
        this.client.write(message);
    }

    /*
    get(channel, callback){
        this.server.on('connection', (sock) => {
            console.log('CONNECTED');
            sock.on('message', (data) => {
                console.log('***');
                console.log(data);
                console.log('***');
            });
        });
    }
    post(channel, message){
        return false;
    }*/
};