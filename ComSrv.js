let instance = null;
class ComSrv {
    constructor() {
        if(!instance) {
            instance = this;
            let {ipcMain} = require('electron');
            this.ipcmain = ipcMain;
        }
        return instance;
    }

    get(channel, callback) {
        this.ipcmain.on(channel+'-message', callback);
    }
}

let comSrv = new ComSrv();
comSrv.get('engine', (event, msg) => {
    console.log("get msg on server");
    console.log(msg);
    event.sender.send('engine-reply', 'Feu Feu');
});