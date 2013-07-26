window.define(['NavigatorWrapper'], function(NavigatorWrapper) {
    "use strict";
    var UserMedia = function(navigator) {
        if(typeof navigator === "undefined") {
            this.navigator = new NavigatorWrapper();
        }
        else {
            this.navigator = navigator;
        }
    };

    UserMedia.prototype.hasGetUserMedia = function() {
        return this.navigator.hasGetUserMedia();
    };

    UserMedia.prototype.queryCamera = function() {
        // Not showing vendor prefixes.
        var options = {video: true, audio: true};
        this.navigator.getUserMedia(options, this.userAccepted, this.userDenied);
    };

    UserMedia.prototype.userAccepted = function(localMediaStream) {
        var video = document.querySelector('video');
        video.src = window.URL.createObjectURL(localMediaStream);

        // Note: onloadedmetadata doesn't fire in Chrome when using it with getUserMedia.
        // See crbug.com/110938.
        video.onloadedmetadata = function(e) {
            console.log('Ready to go. Do some stuff. ', e);
        };
    };

    UserMedia.prototype.userDenied = function(e) {
        console.log('Reeeejected!', e);
    };


    return UserMedia;
});

