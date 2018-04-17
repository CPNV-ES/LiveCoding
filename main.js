const electron = require('electron');
const settings = require('electron-settings');
const {SettingsHandler} = require('./app/settings/assets/js/settingsHandler');
const settingsHandler = new SettingsHandler(settings);
// Access to settings for renderer process
global.settingsHandler = settingsHandler;
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const rq = require('electron-require');
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Instanciate the connexions
const ComIpcMain = rq('./ComIpcMain.js');
const ComSocket = rq('./ComSocket.js');
const Builder = rq('./Builder.js');
const innerBuilder = new Builder(new ComIpcMain());
const outerBuilder = new Builder(new ComSocket("172.17.219.131"));

function createWindow () {
    // Get window settings or default values defined in SettingsHandler
    const savedDimensions = settingsHandler.getWindowSize();
    const savedPosition = settingsHandler.getWindowPosition();

    const defaultWidth = savedDimensions.width;
    const defaultHeight = savedDimensions.height;

    // Create the browser window.
    mainWindow = new BrowserWindow({width: defaultWidth, height: defaultHeight})

    if (savedPosition !== undefined) {
        // Set the window position that have been saved
        mainWindow.setPosition(savedPosition.xPos, savedPosition.yPos);
    } else {
        // No position has been saved. Set the window to fullscreen mode
        mainWindow.maximize();
    }

    // and load the index.html of the app.
    mainWindow.loadURL(`file://${__dirname}/app/index.html`);

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // Emitted when the windows is going to be closed
    mainWindow.on('close', function () {
        outerBuilder.send(null, 'close');
        // Store the window width, height and position
        settingsHandler.saveWindowSize(mainWindow);
        settingsHandler.saveWindowPosition(mainWindow);
    })

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
});

innerBuilder.listen('engine', (message) => {
    // all messages from engine goes to the editor
    return ['editor', 'commands/' + message];
});

innerBuilder.listen('editor', (message) => {
    // outerBuilder.send(null, message, null);
    console.log('Now sending ' + message);
    outerBuilder.send(null, message, null);
    // let forgery = 'python/pacman.moveUp()'
    outerBuilder.listen('data', (data) => {
        // sending returns message
        console.log("data in.");
        console.log(data);
        console.log("=");
        let channel = "";
        let prefix = data.split("/")[0]; // split as ["{prefix}","{data-content}"]
        switch(prefix){
            case "execute":
                channel = 'engine';
                break;
            case "error":
                channel = 'editor';
            default:
                break;
        }
        // send the data to ipc-renderer
        mainWindow.webContents.send(channel + ComIpcMain.getReplyChannelSuffix(), data);
        // send dump data to processor to keep going
        outerBuilder.send(null, 'ok')
    });
    // return ['engine', 'ok'];
});
