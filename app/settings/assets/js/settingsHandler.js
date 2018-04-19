/*
The purpose of this class is to provide a layer of abstraction for storing settings
and avoid updating code in all the classes which use storage functionalities.
*/

'use strict'

class SettingsHandler {
    constructor(settings) {
        // Electron-settings lib
        this.settingsEngine = settings;

        // Default BrowserWindow settings
        this.windowDefaultWidth = 1200;
        this.windowDefaultHeight = 900;

        // Default Editor settings
        this.editorDefaultLanguage = 'javascript';
        this.editorDefaultContent = "";
    }

    /**
     *
     * Saves the BrowserWindow dimensions
     *
     * @param {Object} mainWindow the app mainWindow instance
     */
    saveWindowSize(mainWindow) {
        // Get the current windows size
        const windowSize = mainWindow.getSize();

        // Save the window size
        this.settingsEngine.set('mainWindow.size', {
                width: windowSize[0],
                height: windowSize[1],
            },
        );
    }

    /**
     *
     * Saves the BrowserWindow position
     *
     * @param {Object} mainWindow the app mainWindow instance
     */
    saveWindowPosition(mainWindow) {
        // Get the current window position
        const windowPosition = mainWindow.getPosition();

        // Save the window position
        this.settingsEngine.set('mainWindow.position', {
                x: windowPosition[0],
                y: windowPosition[1],
            },
        );
    }

    /**
     *
     * Saves the editor language mode
     *
     * @param {String} language a string representing the active language for the editor
     */
    saveEditorLanguageMode(language) {
        this.settingsEngine.set('editor.language', language);
    }

    /**
     *
     * Saves the editor content
     *
     * @param {String} language a string representing the editor content
     */
    saveEditorContent(content) {
        this.settingsEngine.set('editor.content', content);
    }

    /**
     *
     * Fetches the saved BrowserWindow size
     *
     * @returns Returns an object with width and height properties for the BrowserWindow
     */
    getWindowSize() {
        // Fetch saved windows settings, if any
        if (this.settingsEngine.has('mainWindow.size')) {
            const size = this.settingsEngine.get('mainWindow.size');

            return {
                'width': size.width,
                'height': size.height,
            };
        }

        // Return default values
        return {
            'width': this.windowDefaultWidth,
            'height': this.windowDefaultHeight,
        };
    }

    /**
     *
     * Fetches the saved BrowserWindow x and y position coordinates
     *
     * @returns Returns an object with xPos and yPos properties for the BrowserWindow coordinates
     */
    getWindowPosition() {
        if (this.settingsEngine.has('mainWindow.position')) {
            const position = this.settingsEngine.get('mainWindow.position');

            return {
                'xPos': position.x,
                'yPos': position.y,
            }
        }

        return undefined;
    }

    /**
     *
     * Fetches the saved Language use by the language dropdown and syntax highlighting
     *
     * @returns Returns a String representation of the language
     */
    getEditorLanguageMode() {
        if (this.settingsEngine.has('editor.language')) {
            return this.settingsEngine.get('editor.language');
        }

        return this.editorDefaultLanguage;
    }

    /**
     *
     * Fetches the code that has been typed in the editor
     *
     * @returns Returns a String representation of the editor content
     */
    getEditorContent() {
        if (this.settingsEngine.has('editor.content')) {
            return this.settingsEngine.get('editor.content');
        }

        return this.editorDefaultContent;
    }
}

module.exports.SettingsHandler = SettingsHandler;
