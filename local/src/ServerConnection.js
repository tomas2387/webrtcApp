window.define(['socketio'], function(io) {
    "use strict";

    var ServerConnection = function() {
        this.socket = io.connect('http://localhost/webrtcapp/');
    };

    ServerConnection.prototype.publishMySDP = function(SDP, type) {

    };

    return ServerConnection;
});