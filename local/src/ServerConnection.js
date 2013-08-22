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
            this.socket = io.connect(this.urlServer, "{ name: 'tomas' }");

            console.log(this.socket.socket);
            console.log(this.socket.socket.connected);
            if(this.socket.socket.connected === false) {
                console.log("is false");
                throw new Error("Server is down or has not started yet!");
            }
            else {
                console.log("is not");
            }
        }
    };

    ServerConnection.prototype.publishMySDP = function(SDP, type) {
        this.connect();

    };

    return ServerConnection;
});