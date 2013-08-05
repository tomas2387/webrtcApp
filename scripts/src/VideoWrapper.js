window.define(["URLWrapper"], function(URLWrapper) {
    "use strict";

    var VideoWrapper = function(videoElement, urlWrapper) {
        this.videoElement = videoElement;
        this.URL = urlWrapper || new URLWrapper();
    };

    VideoWrapper.prototype.startPlaying = function(stream) {
        this.videoElement.src = this.URL.createObjectURL(stream);
        this.stream = stream;

        // Note: onloadedmetadata doesn't fire in Chrome when using it with getUserMedia.
        // See crbug.com/110938.
        this.video.onloadedmetadata = this.onLoadedMetadata;
    };

    VideoWrapper.prototype.stopPlaying = function() {
        this.stream.stop();
    };

    VideoWrapper.prototype.onLoadedMetadata = function(e) {
        console.log('Ready to go. Do some stuff. ', e);
    };

    return VideoWrapper;
});
