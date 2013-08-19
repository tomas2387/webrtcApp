require(["UserMedia", "VideoWrapper"], function(UserMedia, VideoWrapper) {
    "use strict";

    var startButton = document.getElementById("startButton");
    startButton.onclick = startLocalVideo;

    var localVideoWrapper = new VideoWrapper(document.getElementById('localVideo'));
    var userLocalMedia = new UserMedia(localVideoWrapper);

    function startLocalVideo() {
        startButton.innerHTML = "Stop";
        startButton.onclick = stopLocalVideo;

        if (userLocalMedia.hasGetUserMedia()) {
            console.log('Good to go!');
            userLocalMedia.localQueryCamera();
        } else {
            window.alert('getUserMedia() is not compatible in your browser');
            stopLocalVideo();
        }
    }

    function stopLocalVideo() {
        startButton.innerHTML = "Start";
        startButton.onclick = startLocalVideo;

        userLocalMedia.stopMedia();
    }

    var remoteVideoWrapper = new VideoWrapper(document.getElementById('remoteVideo'));
    var userRemoteMedia = new UserMedia(remoteVideoWrapper);

    var sendStreamButton = document.getElementById("callButton");
    sendStreamButton.onclick = sendStream;

    function sendStream() {
        //TODO
    }

    var stopStreamButton = document.getElementById("hangupButton");
    stopStreamButton.onclick = stopStream;

    function stopStream() {
        //TODO
    }
});
