
var UserMedia = function(navigator) {
    if(typeof navigator === "undefined") {
        this.navigator = new NavigatorWrapper();
    }
};

UserMedia.prototype.hasGetUserMedia = function() {
    // Note: Opera is un prefixed.
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia || navigator.msGetUserMedia);
};

UserMedia.prototype.startCamera = function() {
    // Not showing vendor prefixes.
    navigator.webkitGetUserMedia({video: true, audio: true}, function(localMediaStream) {
        var video = document.querySelector('video');
        video.src = window.URL.createObjectURL(localMediaStream);

        // Note: onloadedmetadata doesn't fire in Chrome when using it with getUserMedia.
        // See crbug.com/110938.
        video.onloadedmetadata = function(e) {
            console.log('Ready to go. Do some stuff.');

            
        };
    }, function(e) {
        console.log('Reeeejected!', e);
    });
};

if(typeof exports !== "undefined") {
    exports.UserMedia = UserMedia;
}
