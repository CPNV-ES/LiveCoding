class ErrorFormatterFactory {
    /**
    *
    * Returns a new instance of a language formatter depending on the language parameter
    *
    * @param {String} a String representation of the error's language
    */
    static create(language) {
        switch (language.toLowerCase()) {
            case 'php':
                return new PHPErrorFormatter();
                break;

            case 'ruby':
                return new RubyErrorFormatter();
                break;

            default:
                console.log('[ErrorFactory]: WARNING! UNHANDLED LANGUAGE.');
                return false;
        }
    }
}