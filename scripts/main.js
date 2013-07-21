require(["src/UserMedia"], function(UserMedia) {
    "use strict";
    var userMedia = new UserMedia();

    if (userMedia.hasGetUserMedia()) {
        console.log('Good to go!');
        userMedia.queryCamera();
    } else {
        window.alert('getUserMedia() is not supported in your browser');
    }
});
