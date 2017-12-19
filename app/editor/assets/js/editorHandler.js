// This class acts as a controller for the code editor

'use strict'

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

    getAvailableCommands(callback) {
        this.serverOutlet.get((event, message) => {
            let commands = JSON.parse(message);

            this.availableCommands = message;

            callback(message);
        });
    }

    /**
     *
     * Requests the UI to be updated with the provided list of cammands
     */
    displayAvailableCommands(commands) {
        // Store the commands in JSON
        commands = JSON.parse(commands).availableCommands;

        // Update the UI with new commands
        uiHandler.updateCommandList(commands);
    }

    /**
     *
     * Sends code to the server for evaluation / compilation
     */
    executeCode() {
        try {
            eval(this.engine.getValue());
        } catch (e) {
            console.log(e.message);
            // if (e instanceof SyntaxError) {

            // }
        }

        // this.serverOutlet.send(this.engine.getValue(), (e, msg) => {
        // });
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
    updateContent(language) {
        this.engine.setValue(_editorDefaultContent[language]);
        this.engine.getSession().setMode('ace/mode/' + language);
    }

    /**
     *
     * Initializes control event listners
     */
    initEventListners() {
        this.controls.languagePicker.on('change', (e) => {
            const pickedLanguage = $(e.currentTarget).val();
            this.updateContent(pickedLanguage);
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

// Editor placeholder content
const _editorDefaultContent = {
    'swift': "// Type your code right here!\nfunc sayHello() {\n\tprint(\"Hello World!\")\n}",
    'java': "// Type your code right here!\npublic void function sayHello() {\n\tSystem.out.println(\"Hello World!\");\n}",
    'javascript': "// Type your code right here!\nfunction sayHello() {\n\tconsole.log('Hello World!');\n}",
};

const uiHandler = new UIHandler();
const editor = new EditorHandler(ace.edit('editor'), $('#editor'), new ComCli('editor'));

// Editor config
editor.engine.setTheme('ace/theme/monokai');
editor.engine.getSession().setMode('ace/mode/javascript');
editor.engine.$blockScrolling = Infinity;

// Content config
editor.frame.css( 'fontSize', '14px' );
editor.engine.setShowPrintMargin(false);

// Initial content
editor.engine.setValue(_editorDefaultContent.javascript);

// Initialise event listeners
editor.initEventListners();


editor.getAvailableCommands(editor.displayAvailableCommands);
