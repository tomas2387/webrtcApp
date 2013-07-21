window.define(function() {
    "use strict";
    var NavigatorWrapper = function() {
        this.methodGetUserMedia = null;
        this.possibleMethods = [
            navigator.getUserMedia,
            navigator.webkitGetUserMedia,
            navigator.mozGetUserMedia,
            navigator.msGetUserMedia
        ];
    };

    NavigatorWrapper.prototype.getCorrectGetUserMediaMethod = function () {
        for(var i = 0, len = this.possibleMethods.length; i < len; ++i) {
            var method = this.possibleMethods[i];
            if(method) {
                return method;
            }
        }

        return null;
    };

    NavigatorWrapper.prototype.getUserMedia = function(options, callback, errorCallback) {
        if(typeof this.methodGetUserMedia === "function") {
            return this.methodGetUserMedia(options, callback, errorCallback);
        }

        this.methodGetUserMedia = this.getCorrectGetUserMediaMethod();

        if(this.methodGetUserMedia === null) {
            throw new Error("GetUserMedia is not compatible!");
        }

        return this.getUserMedia();
    };

    return NavigatorWrapper;
});

