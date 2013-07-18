window.define(function() {
    "use strict";
    var NavigatorWrapper = function() {
        this.methodGetUserMedia = null;
    };

    NavigatorWrapper.prototype.getUserMedia = function() {
        if(typeof this.methodGetUserMedia === "function") {
            return this.methodGetUserMedia();
        }

        if(navigator.getUserMedia) {
            this.methodGetUserMedia = navigator.getUserMedia;
        }
        else if(navigator.webkitGetUserMedia) {
            this.methodGetUserMedia = navigator.webkitGetUserMedia;
        }
        else if(navigator.mozGetUserMedia) {
            this.methodGetUserMedia = navigator.mozGetUserMedia;
        }
        else if(navigator.msGetUserMedia) {
            this.methodGetUserMedia = navigator.msGetUserMedia;
        }
        else {
            throw new Error("GetUserMedia is not compatible!");
        }

        return this.getUserMedia();
    };

    return NavigatorWrapper;
});

