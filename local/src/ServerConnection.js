window.define(['socketio'], function(io) {
    "use strict";

    var ServerConnection = function(socket) {
        var urlServer = location.origin + ':8081';

        this.socket = socket || io.connect(urlServer);
        this.emit('username', {username: navigator.userAgent});
    };

    ServerConnection.prototype.publishMySDP = function(socketId, SDP, type) {
        console.log("Going to publish my SDP!", socketId, SDP, type);
        this.emit('publishSDP', { socketid: socketId, data:{sdp: SDP, type: type }});
    };

    ServerConnection.prototype.answerMySDP = function(socketId, SDP, type) {
        console.log("Going to publish my Answer SDP!");
        this.emit('answerSDP', { socketid: socketId, data:{ sdp: SDP, type: type }});
    };

    ServerConnection.prototype.postIceToTheOtherPeer = function(socketId, candidate, sdpMLineIndex) {
        console.log("* post Ice to the other peer", candidate, sdpMLineIndex);
        var ice = { candidate: candidate, sdplineindex: sdpMLineIndex };
        this.emit('publishIce', {socketid: socketId, data: ice });
    };

    ServerConnection.prototype.emit = function(event, data) {
        this.socket.emit(event, data);
    };

    ServerConnection.prototype.on = function(event, callback) {
        this.socket.on(event, callback);
    };

    ServerConnection.prototype.disconnect = function() {
        this.socket.disconnect();
        this.socket = null;
    };

    return ServerConnection;
});
