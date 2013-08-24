window.define(['ServerConnection'], function(ServerConnection) {
    "use strict";

    var ConnectionWrapper = function(peerConnection, serverConnection) {
        if(typeof peerConnection === "undefined") {
            if(window.webkitRTCPeerConnection) {
                this.peerConnection = new window.webkitRTCPeerConnection({ "iceServers": [{ "url": "stun:stun.l.google.com:19302" }] });
            }
            else if(window.mozRTCPeerConnection) {
                this.peerConnection = new window.mozRTCPeerConnection({ "iceServers": [{ "url": "stun:stun.services.mozilla.com" }] });
            }
            else {
                throw new Error("Peer Connection is not supported in this browser!");
            }
        }
        else {
            this.peerConnection = peerConnection;
        }

        this.serverConnection = serverConnection || new ServerConnection();
    };

    ConnectionWrapper.prototype.publishSDP = function() {
        var options = { 'mandatory': { 'OfferToReceiveAudio': true, 'OfferToReceiveVideo': true } };
        this.peerConnection.createOffer(this.SDPReceived.bind(this), this.createOfferFailed, options);
    };

    ConnectionWrapper.prototype.SDPReceived = function(sessionDescription) {
        this.peerConnection.setLocalDescription(sessionDescription);
        this.serverConnection.publishMySDP(sessionDescription.sdp, sessionDescription.type);
    };

    ConnectionWrapper.prototype.createOfferFailed = function(error) {
        throw new Error("Create offer failed: "+error);
    };

    return ConnectionWrapper;
});