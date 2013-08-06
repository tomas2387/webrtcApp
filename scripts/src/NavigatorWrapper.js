window.define(function() {
    "use strict";
    var NavigatorWrapper = function(windowNavigator) {
        this.windowNavigator = windowNavigator || window.navigator;
        this.windowNavigator.GetMedia = null;
        this.possibleMethods = [
            'getUserMedia',
            'webkitGetUserMedia',
            'mozGetUserMedia',
            'msGetUserMedia'
        ];
    };

    NavigatorWrapper.prototype.getCorrectGetUserMediaMethod = function () {
        for(var i = 0, len = this.possibleMethods.length; i < len; ++i) {
            var method = this.windowNavigator[this.possibleMethods[i]];
            if(method) {
                return method;
            }
        }
        return null;
    };

    NavigatorWrapper.prototype.hasGetUserMedia = function () {
        this.windowNavigator.GetMedia = this.getCorrectGetUserMediaMethod();
        return this.windowNavigator.GetMedia !== null;
    };

    NavigatorWrapper.prototype.getUserMedia = function(options, callback, errorCallback) {
        options = options || {video:true, audio:true};
        callback = callback || function(){};
        errorCallback = errorCallback || function(){};

        if(typeof this.windowNavigator.GetMedia === "function") {
            return this.windowNavigator.GetMedia(options, callback, errorCallback);
        }

        if(!this.hasGetUserMedia()) {
            throw new Error('UserMedia is not compatible with your browser!');
        }

        return this.getUserMedia(options, callback, errorCallback);
    };

    return NavigatorWrapper;
});

