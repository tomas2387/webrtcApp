var LoggerShell = function() {
};

LoggerShell.prototype.log = function() {
    "use strict";
    var d = new Date();

    var curr_hour = d.getHours();
    var curr_min = d.getMinutes();
    var curr_sec = d.getSeconds();
    console.log.apply(console, ["["+curr_hour+":"+curr_min+":"+curr_sec+ "]-"].concat(Array.prototype.slice.call(arguments)));
};

module.exports = LoggerShell;

