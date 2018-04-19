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
}
