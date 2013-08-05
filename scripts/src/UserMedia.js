window.define(['NavigatorWrapper', 'VideoWrapper'], function(NavigatorWrapper, VideoWrapper) {
    "use strict";

    var UserMedia = function(navigator, video) {
        this.navigator = navigator || new NavigatorWrapper();
        this.video = video || new VideoWrapper(document.getElementById('localVideo'));
    };

    UserMedia.prototype.hasGetUserMedia = function() {
        return this.navigator.hasGetUserMedia();
    };

    UserMedia.prototype.queryCamera = function() {
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

    return UserMedia;
});

