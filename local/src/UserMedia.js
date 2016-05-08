window.define(['NavigatorWrapper', 'VideoWrapper'], function(NavigatorWrapper, VideoWrapper) {
    "use strict";

    var UserMedia = function(options, video, navigator) {
        this.navigator = navigator || new NavigatorWrapper();
        this.video = video || new VideoWrapper(document.getElementById('localVideo'));
        this.options = options || {video:true, audio: true};
    };

    UserMedia.prototype.hasGetUserMedia = function() {
        return this.navigator.hasGetUserMedia();
    };

    UserMedia.prototype.localQueryCamera = function() {
        this.navigator.getUserMedia(this.options, this.userAccepted.bind(this), this.userDenied.bind(this));
    };

    UserMedia.prototype.userAccepted = function(localMediaStream) {
        this.video.startPlaying(localMediaStream);
    };

    UserMedia.prototype.stopMedia = function() {
        this.video.stopPlaying();
    };

    UserMedia.prototype.getStream = function() {
        return this.video.getStream();
    };

    UserMedia.prototype.userDenied = function(e) {
        console.log('Reeeejected!', e);
    };

    return UserMedia;
});

