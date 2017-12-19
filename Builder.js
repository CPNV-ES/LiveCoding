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

    constructor(comSrv) {
        this._comSrv = (typeof comSrv !== 'undefined') ? comSrv : this.getComSrv();
    }

    listen(channel, callback){
        this._comSrv.get(channel, (e, m) => {
            let action = callback(m);
            console.log('sending %s message to', action[action.length - 1]);
            console.log(action[0]);
            console.log('***');
            e.sender.send(action[0] + this._comSrv.replyChannelSuffix, action[action.length - 1]);
        });
    }
};
