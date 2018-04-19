'use strict'

class RubyErrorFormatter {
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
}
