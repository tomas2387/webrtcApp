require(["UserMedia"], function(UserMedia) {
    "use strict";
    var userMedia = new UserMedia();

    if (userMedia.hasGetUserMedia()) {
        console.log('Good to go!');
        userMedia.queryCamera();
    } else {
        window.alert('getUserMedia() is not compatible in your browser');
    }
});
