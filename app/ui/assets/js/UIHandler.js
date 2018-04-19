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

    /**
     *
     * Enables this class react to Builder events
     */
    registerForEvents() {
        this.serverOutlet.get((event, message) => {
            // Get the index of the first occurence of / to detect message type
            const slashIndex = message.indexOf('/');

            // Get the type
            const messageType = message.substring(0, slashIndex);

            // Get the message itself (payload)
            const payload = message.substring(slashIndex + 1, message.length);

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

        this.setEditorFontSize(14);

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
     * Sets the editor font-size to the value passed by parameter
     * if it is a number
     *
     * @param {number} the new font-size
     */
    setEditorFontSize(value) {
        // Make sure the value is a number
        if (!isNaN(value))
            this.components.editorFrame.css('fontSize',  value + 'px');
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

    /**
     *
     * Enables or disables the run button depending on what is passed by parameter
     *
     * @param {Boolean} the specifying whether the run button should be disabled or not
     */
    enableRunButton(state) {
        this.components.runButton.prop('disabled', state);
    }


    /**
     *
     * Simple getter that returns the language that has been chosen in the UI
     */
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
