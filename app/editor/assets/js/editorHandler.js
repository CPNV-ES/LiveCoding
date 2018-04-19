// This class acts as a controller for the code editor

'use strict'

class EditorHandler {
    constructor(engine, uiHandler, serverOutlet) {
        this.engine = engine;
        this.uiHandler = uiHandler; // Ref to the UI controller
        this.serverOutlet = serverOutlet; // Ref to the server
        this.allowCodeSubmission = true; // Internal configuration

        this.init();
    }

    /**
     *
     * Initializes the editor with default settings and behaviour
     */
    init() {
        // Get saved editor settings if any or default values from SettingsHandler
        const initialLanguage = settingsHandler.getEditorLanguageMode();
        const initialContent = settingsHandler.getEditorContent();

        this.engine.setTheme('ace/theme/monokai');
        this.engine.$blockScrolling = Infinity;
        this.engine.setShowPrintMargin(false);
        // Define the language mode for syntax highlighting and editor content
        this.engine.getSession().setMode({path:'ace/mode/' + initialLanguage, inline:true});
        this.engine.setValue(initialContent);

        this.initEventListners();
    }

    /**
     *
     * Sends code to the server for evaluation / compilation
     */
    executeCode() {
        const separator = '/';
        const chosenLanguage = this.uiHandler.chosenLanguage;

        this.serverOutlet.send(chosenLanguage + separator + this.engine.getValue(), (e, msg) => {
        });

        // Save settings
        settingsHandler.saveEditorLanguageMode(chosenLanguage);
        settingsHandler.saveEditorContent(this.engine.getValue());
    }

    /**
     *
     * Updates the front-end labels indicating the active editor row and column
     */
    updateCursorLabels() {
        const cursorInfo = this.engine.getSession().selection.getCursor();
        this.uiHandler.updateCursorLabels(cursorInfo);
    }

    /**
     *
     * Updates the UI to allow or prevent code submission according to
     * the editor content
     *
     * @param {Boolean} locked indicates whether the UI should allow code submissions or not
     */
    setUIMode(locked) {
        this.uiHandler.enableRunButton(!locked);
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
     * Initializes editor event listners
     */
    initEventListners() {
        this.engine.getSession().selection.on('changeCursor', () => this.updateCursorLabels());

        this.engine.getSession().on('change', (e) => {
            // console.log(e);

            // Make sure the editor has content before allowing submissions
            this.allowCodeSubmission = this.engine.getValue() !== '';
            this.setUIMode(this.allowCodeSubmission);
        });
    }
}
