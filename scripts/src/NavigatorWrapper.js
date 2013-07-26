window.define(function() {
    "use strict";
    var NavigatorWrapper = function() {
        window.navigator.GetMedia = null;
        this.possibleMethods = [
            'getUserMedia',
            'webkitGetUserMedia',
            'mozGetUserMedia',
            'msGetUserMedia'
        ];
    };

    NavigatorWrapper.prototype.getCorrectGetUserMediaMethod = function () {
        for(var i = 0, len = this.possibleMethods.length; i < len; ++i) {
            var method = window.navigator[this.possibleMethods[i]];
            if(method) {
                return method;
            }
        }

        return null;
    };

    NavigatorWrapper.prototype.hasGetUserMedia = function () {
        window.navigator.GetMedia = this.getCorrectGetUserMediaMethod();
        return window.navigator.GetMedia !== null;
    };


    NavigatorWrapper.prototype.getUserMedia = function(options, callback, errorCallback) {
        options = options || {video:true, audio:true};
        callback = callback || function(){};
        errorCallback = errorCallback || function(){};

        if(typeof window.navigator.GetMedia === "function") {
            return window.navigator.GetMedia(options, callback, errorCallback);
            //return window.navigator.mozGetUserMedia(options, callback, errorCallback);
        }

        if(!this.hasGetUserMedia()) {
            throw new Error('UserMedia is not compatible with your browser!');
        }

        return this.getUserMedia(options, callback, errorCallback);
    };

    return NavigatorWrapper;
});

