module.exports = class Builder {
    getComSrv(){
        let comsrv;
        if(this._comSrv){
            comsrv = this._comSrv;
        } else {
            const rq = require('electron-require');
            const comSrvModule = rq('./ComIpcMain.js');
            comsrv = new comSrvModule();
        }
        return comsrv;
    }

    constructor(comSrv){
      this._comSrv = (typeof comSrv !== 'undefined') ? comSrv : this.getComSrv();
    }

    /**
     * Listen message on given channel.
     * @param {String} channel Receiver, example : "engine" 
     * @param {Function} callback Takes as parameter the message
     */
    listen(channel, callback){
        this._comSrv.get(channel, (message) => {
          return callback(message);
        });
    }

    /**
     * Send message on given channel. 
     * @param {String} channel Receiver, example : "engine"
     * @param {String} message Message to transmit
     */
    send(channel, message){
        // if comServer has a post method
        if(typeof this._comSrv.post !== 'undefined'){
            this._comSrv.post(channel, message);
        }        
    }

};
