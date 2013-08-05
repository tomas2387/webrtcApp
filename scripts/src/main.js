require(["UserMedia", "VideoWrapper"], function(UserMedia, VideoWrapper) {
    "use strict";

    var startButton = document.getElementById("startButton");
    startButton.onclick = startVideo;

    var userMedia = new UserMedia();

    function startVideo() {
        startButton.innerHTML = "Stop";
        startButton.onclick = stopVideo;

        if (userMedia.hasGetUserMedia()) {
            console.log('Good to go!');
            userMedia.queryCamera();
        } else {
            window.alert('getUserMedia() is not compatible in your browser');
        }
    }

    function stopVideo() {
        startButton.innerHTML = "Start";
        startButton.onclick = startVideo;

        userMedia.stopMedia();
    }
});
