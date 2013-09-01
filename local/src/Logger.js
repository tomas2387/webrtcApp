window.define(function() {
    "use strict";

    var Logger = function(logListElement) {
        this.logger = logListElement;
    };

    Logger.prototype.log = function(message) {
        var divLog = document.createElement("div");
        divLog.innerHTML = Date.now() + " - " + message;
        this.logger.appendChild(divLog);
    };

    return Logger;
});