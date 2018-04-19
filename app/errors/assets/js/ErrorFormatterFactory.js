class ErrorFormatterFactory {
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