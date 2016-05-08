window.define(["URLWrapper"], function(URLWrapper) {
    "use strict";

    var VideoWrapper = function(videoElement, urlWrapper) {
        this.videoElement = videoElement;
        this.URL = urlWrapper || new URLWrapper();
        this.stream = null;
    };

    VideoWrapper.prototype.startPlaying = function(stream) {
        if (typeof this.videoElement.src !== 'undefined') {
            this.videoElement.src = this.URL.createObjectURL(stream);
        } else {
            throw new Error('Error attaching stream to this.videoElement.');
        }
        
        this.stream = stream;

        // Note: onloadedmetadata doesn't fire in Chrome when using it with getUserMedia.
        // See crbug.com/110938.
        this.videoElement.onloadedmetadata = this.onLoadedMetadata;
    };

    VideoWrapper.prototype.stopPlaying = function() {
        var v = this.stream.getVideoTracks();
        v.forEach(function(mediastreamTrack) {
            mediastreamTrack.stop();
        });
        var a = this.stream.getAudioTracks();
        a.forEach(function(mediastreamTrack) {
            mediastreamTrack.stop();
        });
    };

    VideoWrapper.prototype.onLoadedMetadata = function(e) {
        console.log('Ready to go. Do some stuff. ', e);
    };

    VideoWrapper.prototype.getStream = function() {
        return this.stream;
    };

    return VideoWrapper;
});
