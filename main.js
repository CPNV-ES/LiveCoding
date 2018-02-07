const electron = require('electron');
const settings = require('electron-settings');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const rq = require('electron-require');
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
    // Initialize default window settings
    let defaultWidth = 1200;
    let defaultHeight = 900;
    let defaultXpos = undefined;
    let defaultYpos = undefined;

    // Fetch saved windows settings, if any
    if (settings.has('mainWindow.dimensions') && settings.has('mainWindow.position')) {
        const dimensions = settings.get('mainWindow.dimensions');
        const position = settings.get('mainWindow.position');

        defaultWidth = dimensions.width;
        defaultHeight = dimensions.height;
        defaultXpos = position.x;
        defaultYpos = position.y;
    }

    // Create the browser window.
    mainWindow = new BrowserWindow({width: defaultWidth, height: defaultHeight})

    // Set the window position that have been saved, set it to fullscreen otherwise
    if (defaultXpos !== undefined && defaultYpos !== undefined) {
        mainWindow.setPosition(defaultXpos, defaultYpos);
    } else {
        mainWindow.maximize();
    }

    // and load the index.html of the app.
    mainWindow.loadURL(`file://${__dirname}/app/index.html`);

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // Emitted when the windows is going to be closed
    mainWindow.on('close', function () {
        // Fetch the current windows configuration
        const windowDimensions = mainWindow.getSize();
        const windowPosition = mainWindow.getPosition();

        // Save the window dimensions and position
        settings.set('mainWindow', {
            dimensions: {
                width: windowDimensions[0],
                height: windowDimensions[1],
            },
            position: {
                x: windowPosition[0],
                y: windowPosition[1],
            },
        });
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

const ComIpcMain = rq('./ComIpcMain.js');
const ComSocket = rq('./ComSocket.js');
const Builder = rq('./Builder.js');
const innerBuilder = new Builder(new ComIpcMain());
const outerBuilder = new Builder(new ComSocket());
/*
builder.listen('editor', (data) => {
    console.log("***");
    console.log(data);
    console.log("***");
    return ['editor', 'ok lets go !'];
});
*/

innerBuilder.listen('engine', (message) => {
    return ['editor', message];
});


innerBuilder.listen('editor', (message) => {
    outerBuilder.send(null, message, null);
    outerBuilder.listen('data', (data) => {
        // sending returns message
        console.log("RECEIVED A DATA");
        console.log(data);
        console.log("=====");
        let channel = "";
        let prefix = data.split("/")[0];
        switch(prefix){
            case "excecute":
                channel = 'engine';
                break;
            case "error":
                channel = 'editor';
            default:
                break;
        }
        mainWindow.webContents.send(channel + ComIpcMain.getReplyChannelSuffix(), data.split("/").pop());
    });
    // return ['engine', 'ok'];
});
