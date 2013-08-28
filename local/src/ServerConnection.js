window.define(['socketio'], function(io) {
    "use strict";

    var ServerConnection = function(socket) {
        if(typeof socket === "undefined") {
            this.socket = null;
        }
        else {
            var urlServer = location.origin + ':8081';
            this.socket = io.connect(urlServer);
        }
    };

    ServerConnection.prototype.publishMySDP = function(SDP, type) {
        console.log("going to publish", socket);
        this.socket.emit('publishSDP', { sdp: SDP, type: type });
    };

    return ServerConnection;
});