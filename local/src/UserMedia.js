window.define(['NavigatorWrapper', 'VideoWrapper', 'ConnectionWrapper'], function(NavigatorWrapper, VideoWrapper, ConnectionWrapper) {
    "use strict";

    var UserMedia = function(video, navigator, connection) {
        this.navigator = navigator || new NavigatorWrapper();
        this.video = video || new VideoWrapper(document.getElementById('localVideo'));
        this.connection = connection || new ConnectionWrapper();
    };

    UserMedia.prototype.hasGetUserMedia = function() {
        return this.navigator.hasGetUserMedia();
    };

    UserMedia.prototype.localQueryCamera = function() {
        // Not showing vendor prefixes.
        var options = {video: true, audio: true};
        this.navigator.getUserMedia(options, this.userAccepted.bind(this), this.userDenied.bind(this));
    };

    UserMedia.prototype.userAccepted = function(localMediaStream) {
        this.video.startPlaying(localMediaStream);
    };

    UserMedia.prototype.stopMedia = function() {
        this.video.stopPlaying();
    };

    UserMedia.prototype.userDenied = function(e) {
        console.log('Reeeejected!', e);
    };

    UserMedia.prototype.publish = function() {
        this.connection.publishSDP();
    };

    return UserMedia;
});

