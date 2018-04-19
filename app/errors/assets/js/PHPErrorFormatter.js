'use strict'

class PHPErrorFormatter {
    /**
    *
    * Formats an error message that will be presented to the user
    *
    * @param {String} a JSON String representation of the error data returned by the server
    */
    format(jsonError) {
        const error = JSON.parse(jsonError);

        const message = error.message;
        const fileName = error.fileName;
        let lineNumber = undefined;

        let finalErrorMessage = '';

        // Split the error message words into an array
        let errorWords = message.split(' ');

        // Remove last word (aka temp file) from the array
        const tempFile = errorWords.pop();

        const tempFileAndLine = tempFile.split(':');

        if (typeof tempFileAndLine[1] !== undefined)
            lineNumber = tempFileAndLine[1];

        // Substract the line number by the amount of headers
        const trueLineNumber = lineNumber - 1; // All headers dwell on a single line, hence -1

        errorWords.push('Editor:' + trueLineNumber.toString());

        for (let word in errorWords) {
            finalErrorMessage += errorWords[word] + ' ';
        }

        return finalErrorMessage;
    }
}
