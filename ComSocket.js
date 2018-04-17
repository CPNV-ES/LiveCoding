module.exports = class ComSocket{

    /**
     * Communication with the Socket library
     * @param {String} host default value : localhost
     * @param {String} port default value : 12800
     */
    constructor(host, port){
        let net = require('net');
        // this.host = (typeof host !== 'undefined') ? this.host : 'localhost'
        // this.port = (typeof port !== 'undefined') ? this.port : '12800'
        this.host = host || 'localhost';
        this.port = port || '12800';
        // this.server = net.createServer();
        // this.server.listen(this.host, this.port);
        this.client = new net.Socket();

        this.client.connect(this.port, this.host, () => {
            console.log('connected.');
        });
        this.client.on('error', (ex) => {
           console.log('handled error');
           console.log(ex);
        });

    }

    /**
     * Listen on given channel. Call callback when receiving data. 
     * @param {String} channel 
     * @param {Function} callback 
     */
    get(channel, callback) {
        this.client.once(channel, (data) => {
            callback(data.toString('utf8'));
        });
    }

    /**
     * Send message on given channel.
     * @param {String} channel 
     * @param {String} message 
     */
    post(channel, message) {
        this.client.write(message);
    }

};