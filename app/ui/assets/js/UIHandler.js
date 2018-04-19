// This class acts as a controller for the user interface
// Any change to the UI should be performed by a method of the class

'use strict'

class UIHandler {
    constructor(serverOutlet) {
        this.serverOutlet = serverOutlet;
        this.editor;

        // UI components
        this.components = {
            'editorFrame': $('#editor'),
            'row': $('#row'),
            'col': $('#col'),
            'commandList': $('#commandList'),
            'languagePicker': $('#languagePicker'),
            'runButton': $('#runButton'),
        }

        // App initialization
        this.initUI();
        this.registerForEvents();
    }

    // Let this react to builder events
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
            console.log(payload);

            // React according to the message type
            switch (messageType) {
                case 'commands':
                    // Display the game's commands
                    const parsedCommands = JSON.parse(payload);
                    this.updateCommandList(parsedCommands);
                    break;

                case 'error':
                    // Handle any error that occured during execution
                    const errorFormatter = ErrorFormatterFactory.create(this.chosenLanguage);
                    const message = errorFormatter.format(payload);
                    this.displayError(message);
                    break;

                default:
                    console.log('[editorHandler]: WARNING! UNHANDLED MESSAGE TYPE.');
            }
        });
    }

    /**
     *
     * Initializes UI component events, style and behaviour
     */
    initUI() {
        // Params: Editor engine, uiHandler, serverOutlet
        this.editor = new EditorHandler(ace.edit('editor'), this, this.serverOutlet);
        this.editor.init();

        this.components.editorFrame.css('fontSize', '14px');

        // Define the selected language in the language picker
        const initialLanguage = settingsHandler.getEditorLanguageMode();
        const targetLanguage = $('option[data-language="' + initialLanguage + '"]');
        targetLanguage.prop('selected', true);

        this.components.languagePicker.on('change', (e) => {
            const pickedLanguage = $(e.currentTarget).val();
            this.editor.updateLanguageMode(pickedLanguage);
        });

        this.components.runButton.on('click', () => this.editor.executeCode());
    }

    /**
     *
     * Updates the front-end cursor column and row labels
     *
     * @param {Object} cursor object
     *
     * @see EditorHandler.updateCursorLabels()
     */
    updateCursorLabels(cursorInfo) {
        this.components.row.html(cursorInfo.row);
        this.components.col.html(cursorInfo.column);
    }

    /**
     *
     * Updates the front-end commands list with the provided list of commands
     *
     * @param {String} commands a JSON list of commands
     */
    updateCommandList(commands) {
        _.each(commands, (command) => {
            this.components.commandList.append('<span class="command">' + command + '<span>');
        });
    }

    // TODO
    enableRunButton(state) {
        this.components.runButton.prop('disabled', state);
    }

    get chosenLanguage() {
        return this.components.languagePicker.val();
    }

    /**
     *
     * Displays an error pop-up with the provided message and title
     *
     * @param {String} message a String representation of the error message
     * @param {String} title an optional title that will be given to the pop-up
     */
    displayError(message, title = null) {
        let error;

        if (title === null) {
            error = new Notification('error', message);
        } else {
            error = new Notification('error', message, title)
        }

        error.show();
    }
}
