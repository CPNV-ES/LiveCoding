'use strict';

// Get a reference to the global SettingsHandler instance
const remote = require('electron').remote;
const settingsHandler = remote.getGlobal('settingsHandler');

// This instance is shared between editorHandler.js and uiHandler.js
const server = new ComCli('editor');
const uiHandler = new UIHandler(server);