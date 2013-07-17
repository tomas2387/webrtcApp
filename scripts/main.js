require(["src/UserMedia"], function(UserMedia) {
    var userMedia = new UserMedia();

    if (userMedia.hasGetUserMedia()) {
        console.log('Good to go!');
        userMedia.startCamera();
    } else {
        alert('getUserMedia() is not supported in your browser');
    }
});
