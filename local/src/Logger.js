window.define(function() {
    "use strict";

    var Logger = function(logListElement) {
        this.logger = logListElement;
    };

    Logger.prototype.log = function(message) {
        var d = new Date();

        var curr_hour = d.getHours();
        var curr_min = d.getMinutes();
        var curr_sec = d.getSeconds();
        
        var divLog = document.createElement("div");
        divLog.innerHTML = "["+curr_hour+":"+curr_min+":"+curr_sec+ "] - " + message;
        this.logger.appendChild(divLog);
    };

    return Logger;
});