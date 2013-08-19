window.define(function() {
    "use strict";

    var URLWrapper = function() {};

    URLWrapper.prototype.createObjectURL = function(stream) {
        return window.URL.createObjectURL(stream);
    };

    return URLWrapper;
});