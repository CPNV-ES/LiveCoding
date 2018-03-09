// This class acts as a controller for the code editor

'use strict'

const remote = require('electron').remote;
// Get a reference to the global SettingsHandler instance
const settingsHandler = remote.getGlobal('settingsHandler');

class EditorHandler {
    constructor(engine, frame, serverOutlet, uiHandler) {
        this.engine = engine;
        this.frame = frame;
        this.serverOutlet = serverOutlet; // Ref to the server
        this.uiHandler = uiHandler; // Ref to the UI controller

        // Controls
        this.controls = {
            'row': $('#row'),
            'col': $('#col'),
            'languagePicker': $('#languagePicker'),
            'runButton': $('#runButton'),
        }

        // Internal configuration
        this.allowCodeSubmission = true;
    }

    get languageMode() {
        return this.controls.languagePicker.val();
    }

    registerForEvents() {
        this.serverOutlet.get((event, message) => {
            // console.log(event);
            // console.log(message);

            // Get the index of the first occurence of / to detect message type
            const slashIndex = message.indexOf('/');

            // Get the type
            const messageType = message.substring(0, slashIndex);

            // console.log('messageType:');
            // console.log(messageType);

            // Get the message itself (payload)
            const payload = message.substring(slashIndex + 1, message.length);

            // console.log('FULL PAYLOAD:');
            // console.log(payload);

            // React according to the type
            switch (messageType) {
                case 'commands':
                    this.displayAvailableCommands(payload);
                    break;

                case 'error':
                    const error = this.formatErrorMessage(payload);
                    uiHandler.displayError(error);
                    break;

                default:
                    console.log('[editorHandler]: WARNING! UNHANDLED MESSAGE TYPE.');
            }
        });
    }

    /**
     *
     * Requests the UI to be updated with the provided list of cammands
     */
    displayAvailableCommands(commands) {
        // Store the commands in JSON
        const parsedCommands = JSON.parse(commands);

        // Update the UI with new commands
        uiHandler.updateCommandList(parsedCommands);
    }

    /**
     *
     * Sends code to the server for evaluation / compilation
     */
    executeCode() {
        const separator = '/';

        const chosenLanguage = this.controls.languagePicker.val();

        this.serverOutlet.send(chosenLanguage + separator + this.engine.getValue(), (e, msg) => {
        });

        // Save settings
        settingsHandler.saveEditorLanguageMode(chosenLanguage);
        settingsHandler.saveEditorContent(this.engine.getValue());
    }

    /**
     *
     * Formats an error message that will be presented to the user
     *
     * @param {String} error a JSON String representation of the error data
     */
    formatErrorMessage(jsonError) {
        let finalErrorMessage = "";

        const error = JSON.parse(jsonError);

        const errorLanguage = error.language;
        const errorMessage = error.message;
        const errorFileName = error.fileName;
        // const errorHeadersCount = error.headersCount;

        // console.log('Original message: ', error.message);
        // console.log('fileName: ', error.fileName);
        // console.log('headersCount', error.headersCount);

        // Parse the error according to the language
        switch (errorLanguage) {
            case 'php':
                finalErrorMessage = this.formatPhpErrorMessage(errorMessage, errorFileName);
                break;

            case 'ruby':
                finalErrorMessage = this.formatRubyErrorMessage(errorMessage, errorFileName);
                break;

            default:
                console.log('[editorHandler]: WARNING! UNHANDLED ERROR MESSAGE. RETURNING BASE ERROR MESSAGE');
                finalErrorMessage = errorMessage;
        }

        return finalErrorMessage;
    }

    formatPhpErrorMessage(message, fileName) {
        // Holds the error presented to the user
        let finalErrorMessage = '';

        // Split the error message words into an array
        let errorWords = message.split(' ');

        // Remove last word (aka line number) from the array
        const stringLineNumber = errorWords.pop();

        // Convert it to a number to allow operations
        const lineNumber = Number(stringLineNumber);

        // Substract the line number by the amount of headers
        // const trueLineNumber = lineNumber - errorHeadersCount;
        const trueLineNumber = lineNumber - 1; // All headers dwell on a single line, so -1

        errorWords.push(trueLineNumber.toString());

        for (let word in errorWords) {
            const currentWord = errorWords[word];

            // Replace the temp file name with a user friendly word
            if (currentWord === fileName) {
                errorWords[word] = 'editor';
            }

            finalErrorMessage += errorWords[word] + ' ';
        }

        return finalErrorMessage;
    }

    formatRubyErrorMessage(message, fileName) {
        // Holds the error presented to the user
        let finalErrorMessage = '';

        // Split the error message words into an array
        let errorWords = message.split(' ');

        // Get and remove the first word, which contains the filename and line number
        const firstWord = errorWords.splice(0, 1)[0];

        // Split the first word into an array
        let firstWordArray = firstWord.split(':');

        const lineNumber = firstWordArray[1];

        // Replace the filename with a user friendly word
        firstWordArray.splice(0, 1, 'Editor');

        // All headers dwell on a single line, so substract lineNumber by 1
        firstWordArray.splice(1, 1, Number(lineNumber) - 1);

        // Newer version of the first word
        let formattedFirstWord = '';

        // Rebuild the first word
        for (let word in firstWordArray) {
            formattedFirstWord += firstWordArray[word] + ':';
        }

        // Add the newly formatted word into the original message array
        errorWords.splice(0, 0, formattedFirstWord);

        // Build the final error message
        for (let word in errorWords) {
            finalErrorMessage += errorWords[word] + ' ';
        }

        return finalErrorMessage;
    }

    /**
     *
     * Updates the front-end labels indicating the active editor row and column
     *
     * @param {Number} row
     * @param {Number} col
     */
    updateCursor() {
        const cursorInfo = this.engine.getSession().selection.getCursor();

        this.controls.row.html(cursorInfo.row);
        this.controls.col.html(cursorInfo.column);
    }

    /**
     *
     * Updates the UI to allow or prevent code submission according to
     * the editor content
     *
     * @param {Boolean} locked indicates whether the UI should allow code submissions or not
     */
    updateUI(locked) {
        if (locked) {
            console.log('Unlock UI');
        } else {
            console.log('Lock UI');
        }

        this.controls.runButton.prop('disabled', !locked);
    }

    /**
     *
     * Updates the editor mode and content according to the provided language
     *
     * @param {String} language indicates the language the editor is handling
     */
    updateLanguageMode(language) {
        this.engine.getSession().setMode({path:"ace/mode/"+ language, inline:true});
    }

    /**
     *
     * Initializes control event listners
     */
    initEventListners() {
        this.controls.languagePicker.on('change', (e) => {
            const pickedLanguage = $(e.currentTarget).val();
            this.updateLanguageMode(pickedLanguage);
        });

        this.controls.runButton.on('click', () => this.executeCode());

        this.engine.getSession().selection.on('changeCursor', () => this.updateCursor());

        this.engine.getSession().on('change', (e) => {
            // console.log(e);

            // Make sure the editor has content before allowing submissions
            this.allowCodeSubmission = this.engine.getValue() !== '';
            this.updateUI(this.allowCodeSubmission);
        });
    }
}


const uiHandler = new UIHandler();
const editor = new EditorHandler(ace.edit('editor'), $('#editor'), new ComCli('editor'));

// Editor config
editor.engine.setTheme('ace/theme/monokai');
editor.engine.$blockScrolling = Infinity;

editor.frame.css('fontSize', '14px');
editor.engine.setShowPrintMargin(false);

// Get saved editor settings if any or default values from SettingsHandler
const initialLanguage = settingsHandler.getEditorLanguageMode();
const initialContent = settingsHandler.getEditorContent();

// Define the selected language in the language picker
const targetLanguage = $('option[value="' + initialLanguage + '"]');
targetLanguage.prop('selected', true);

// Define the language mode for syntax highlighting and editor content
editor.engine.getSession().setMode({path:'ace/mode/' + initialLanguage, inline:true});
editor.engine.setValue(initialContent);

// Initialise event listeners
editor.initEventListners();

// Let the editor react to events
editor.registerForEvents();
