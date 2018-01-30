'use strict'

class Notification {
    constructor(type, message) {
        // Holds the actual notification frame
        this.frame = null;
        this.type = type;
        this.message = message;

    }

    // Initializes events handling for the notification
    initEvents() {
        this.frame.on('click', () => {
            this.destroy();
        });
    }

    // Animates (fadeIn) the notification, appends it to the DOM
    show() {
        // Append the notification into the DOM
        const notification = $('<div class="notification ' + this.type + '"><span>' + this.message + '</span></div>');

        // Keep a ref to the notification frame
        this.frame = notification;

        // Append the notification to the DOM
        $('#wrapper').append(notification);

        this.initEvents();

        // Animate the notification
        this.frame.fadeIn("fast");
    }

    // Animates (fadeOut) the notification, removes it from the DOM afterwards
    destroy() {
        // Animate the notification
        this.frame.fadeOut( "fast", function() {
            // Remove it from the DOM
            this.remove();
            console.log('destroy now');
        });
    }
}
