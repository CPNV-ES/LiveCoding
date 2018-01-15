const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const rq = require('electron-require');
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
    // Create the browser window on full screen.
    mainWindow = new BrowserWindow();
    //mainWindow.maximize();

    // and load the index.html of the app.
    mainWindow.loadURL(`file://${__dirname}/app/index.html`);

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

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

// What is the builder propose ? Let's decompose it in 6 easy steps.
// 1. get language from editor
// 2. start language processor thread
// 3. tell engine thread is ready
// 4. send available commands form engine to builder
// 5. wait for commands, then send to processor
// 6. wait instructions from processor, then send to builder

const ComIpcMain = rq('./ComIpcMain.js');
const Builder = rq('./Builder.js');
let builder = new Builder(new ComIpcMain());
/*
builder.listen('editor', (data) => {
  console.log("***");
  console.log(data);
  console.log("***");
  return ['editor', 'ok lets go !'];
});
*/

builder.listen('engine', (message) => {
    console.log('***');
    console.log('new message form engine');
    console.log(message);
    console.log('***');
    return ['builder', message];
});

builder.listen('builder', (message) => {
    console.log('***');
    console.log('new message form builder');
    console.log(message);
    console.log('***');
    return ['engine', message];
});