window.define(['socketio'], function(io) {
    "use strict";

    var ServerConnection = function(socket) {
        if(typeof socket === "undefined") {
            this.socket = null;
        }
        else {
            this.socket = socket;
        }
        this.urlServer = 'http://localhost:8080/connection';
    };

    ServerConnection.prototype.connect = function() {
        if(this.socket === null) {
            this.socket = io.connect(this.urlServer);
            if(this.socket.socket.connected === false) {
                throw new Error("Server is down or has not started yet!");
            }
            else {

            }
        }
    };

    ServerConnection.prototype.publishMySDP = function(SDP, type) {
        this.connect();
        this.socket.emit('publishSDP', { sdp: SDP, type: type });

    };

    return ServerConnection;
});