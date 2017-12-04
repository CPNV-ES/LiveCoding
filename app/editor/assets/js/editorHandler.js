'use strict'

let _editor = null;

let el = {};

// Editor placeholder content
const _editorDefaultContent = {
    'swift': "// Type your code right here!\nfunc sayHello() {\n\tprint(\"Hello World!\")\n}",
    'java': "// Type your code right here!\npublic void function sayHello() {\n\tSystem.out.println(\"Hello World!\");\n}",
    'javascript': "// Type your code right here!\nfunction sayHello() {\n\tconsole.log('Hello World!');\n}",
};

initDom();
initEditor();
initEvents();


/**
 *
 * Initializes DOM element
 */
function initDom() {
    el.editor = $('#editor');
    el.gameFrame = $('#gameFrame');
    el.languagePicker = $('#languagePicker');
    el.row = $('#row');
    el.col = $('#col');
    el.runButton = $('#runButton');
}

/**
 *
 * Initializes the editor with a default config and key bindings
 */
function initEditor() {
    // Editor config
    _editor = ace.edit('editor');
    _editor.setTheme('ace/theme/monokai');
    _editor.getSession().setMode('ace/mode/javascript');
    _editor.$blockScrolling = Infinity;

    // Content config
    el.editor.css( 'fontSize', '14px' );
    _editor.setShowPrintMargin(false);

    // Initial content
    _editor.setValue(_editorDefaultContent.javascript);

    // Register key bindings
    _editor.commands.addCommand({
        name: 'executeCode',
        bindKey: {win: 'Ctrl-F5',  mac: 'Command-F5'},
        exec: function(editor) {
            executeCode();
        },
        readOnly: true // false if this command should not apply in readOnly mode
    });
}

function executeCode() {
    console.log(_editor.getSession().getMode());
    console.log(_editor.getValue());
    // interpreter.eval(_editor.getValue());
}

/**
 *
 * Updates the front-end labels indicating the active editor row and column
 *
 * @param {Number} row
 * @param {Number} col
 */
function updateCursor(row, col) {
    el.row.html(row);
    el.col.html(col);
}

/**
 *
 * Prepares events to be triggered
 */
function initEvents() {
    el.languagePicker.on('change', function() {
        const pickedLanguage = $(this).val();
        _editor.setValue(_editorDefaultContent[pickedLanguage]);
        _editor.getSession().setMode('ace/mode/' + pickedLanguage);
    });

    el.runButton.on('click', function() {
        executeCode();
    });

    _editor.getSession().selection.on('changeCursor', function(e) {
        const cursorInfo = _editor.selection.getCursor();
        updateCursor(cursorInfo.row, cursorInfo.column);
    });

}
