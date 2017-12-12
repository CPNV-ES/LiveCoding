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
}