require(["UserMedia", "VideoWrapper"], function(UserMedia, VideoWrapper) {
    "use strict";

    var startButton = document.getElementById("startButton");
    startButton.onclick = startLocalVideo;

    var videoWrapper = new VideoWrapper(document.getElementById('localVideo'));
    var userMedia = new UserMedia(videoWrapper);

    function startLocalVideo() {
        startButton.innerHTML = "Stop";
        startButton.onclick = stopLocalVideo;

        if (userMedia.hasGetUserMedia()) {
            console.log('Good to go!');
            userMedia.queryCamera();
        } else {
            window.alert('getUserMedia() is not compatible in your browser');
        }
    }

    function stopLocalVideo() {
        startButton.innerHTML = "Start";
        startButton.onclick = startLocalVideo;

        userMedia.stopMedia();
    }
});
