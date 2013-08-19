window.define(function() {
    "use strict";
    var NavigatorWrapper = function(windowNavigator) {
        this.windowNavigator = windowNavigator || window.navigator;
        this.windowNavigator.getMedia = this.getCorrectGetUserMediaMethod();
    };

    NavigatorWrapper.prototype.getCorrectGetUserMediaMethod = function () {
        var possibleMethods = [
            'getUserMedia',
            'webkitGetUserMedia',
            'mozGetUserMedia',
            'msGetUserMedia'
        ];
        for(var i = 0, len = possibleMethods.length; i < len; ++i) {
            if(this.windowNavigator[possibleMethods[i]]) {
                return this.windowNavigator[possibleMethods[i]];
            }
        }
        return null;
    };

    NavigatorWrapper.prototype.hasGetUserMedia = function () {
        return (typeof this.windowNavigator.getMedia === "function");
    };

    NavigatorWrapper.prototype.getUserMedia = function(options, callback, errorCallback) {
        options = options || {video:true, audio:true};
        callback = callback || function(){};
        errorCallback = errorCallback || function(){};

        if(this.hasGetUserMedia()) {
            return this.windowNavigator.getMedia(options, callback, errorCallback);
        }

        throw new Error('UserMedia is not compatible with your browser!');
    };

    return NavigatorWrapper;
});

