require(["src/UserMedia"], function(userMedia) {
    if (userMedia.hasGetUserMedia()) {
        console.log('Good to go!');
        userMedia.startCamera();
    } else {
        alert('getUserMedia() is not supported in your browser');
    }
});
