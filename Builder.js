module.exports = class Builder {
    getComSrv(){
        let comsrv;
        if(this._comSrv){
            comsrv = this._comSrv;
        } else {
            const rq = require('electron-require');
            const comSrvModule = rq('./ComSrv.js');
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
            e.sender.send(action[0] + this._comSrv.replyChannelSuffix, action[action.length - 1]);
        });
    }
};
