'use strict'

let element = {};

initDom();
initEvents();

function initDom() {
    element.frames = {
        'notification': $('#notification'),
        'error': $('#error'),
    }
    element.game = $('#game');
}

function initEvents() {
    _.each(element.frames, function(value) {
        value.on('click', function() {
            hideNotification(value);
        });
    });

    element.game.on('click', function() {
        popNotification(element.frames.notification);
    });
}

function popNotification(frame) {
    frame.fadeIn( "fast", function() {

    });
}

function hideNotification(frame) {
    frame.fadeOut( "fast", function() {

    });
}
