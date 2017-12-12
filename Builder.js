module.exports = class Builder {
    getComSrv(){
        let comsrv;
        if(this._comSrv){
            comsrv = this.comSrv;
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
};
