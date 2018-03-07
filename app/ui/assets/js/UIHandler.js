// This class acts as a controller for the user interface
// Any change to the UI should be performed by a method of the class

'use strict'

class UIHandler {
    constructor() {
        // UI components
        this.components = {
            'commandList': $('#commandList'),
        }
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