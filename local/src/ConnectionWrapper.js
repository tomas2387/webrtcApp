window.define(['ServerConnection', 'UserMedia'], function(ServerConnection, UserMedia) {
    "use strict";

    var ConnectionWrapper = function(logger, serverConnection, localMedia, remoteMedia, peerConnection) {
        this.logger = logger;
        this.serverConnection = serverConnection || new ServerConnection();
        this.localMedia = localMedia || new UserMedia();
        this.remoteMedia = remoteMedia || new UserMedia();

        this.serverConnection.on('SDPReceived', this.SDPReceived.bind(this));
        this.serverConnection.on('AnswerSDPReceived', this.answerSDPReceived.bind(this));
        this.serverConnection.on('ICEReceived', this.ICEReceived.bind(this));

        this.otherPeer = null;

        this.remoteDescriptionAdded = false;

        this.peerConnection = peerConnection || null;
    };

    ConnectionWrapper.prototype.getPeerConnection = function () {
        if(!this.peerConnection) {
            if (window.webkitRTCPeerConnection) {
                this.peerConnection = new window.webkitRTCPeerConnection({"iceServers": [{"url": "stun:stun.l.google.com:19302"}]});
            }
            else if (window.mozRTCPeerConnection) {
                this.peerConnection = new window.mozRTCPeerConnection({"iceServers": [{"url": "stun:stun.services.mozilla.com"}]});
            }
            else {
                throw new Error("Peer Connection is not supported in this browser!");
            }
        }

        this.peerConnection.onicecandidate = this.onIceCandidate.bind(this);
        this.peerConnection.onaddstream = this.onAddStream.bind(this);
        this.peerConnection.onconnecting = this.onSessionConnecting.bind(this);
        this.peerConnection.onopen = this.onSessionOpened.bind(this);
        this.peerConnection.onremovestream = this.onRemoteStreamRemoved.bind(this);
        this.logger.log("Adding my stream to the peerConnection");
        this.peerConnection.addStream(this.localMedia.getStream());
    };

    ConnectionWrapper.prototype.getRTCSessionDescription = function () {
        if (window.mozRTCSessionDescription) {
            return mozRTCSessionDescription;
        }
        else if (window.webkitRTCSessionDescription) {
            return webkitRTCSessionDescription;
        }

        return window.RTCSessionDescription;
    };

    ConnectionWrapper.prototype.getRTCIceCandidate = function () {
        if (window.mozRTCIceCandidate) {
            return window.mozRTCIceCandidate;
        }

        return window.RTCIceCandidate;
    };

    ConnectionWrapper.prototype.publishSDP = function(userId) {
        this.getPeerConnection();
        this.logger.log("Creating offer SDP");
        this.otherPeer = userId;
        var options = { 'mandatory': { 'OfferToReceiveAudio': true, 'OfferToReceiveVideo': true } };
        this.peerConnection.createOffer(this.MySDPReceived.bind(this), this.createOfferFailed.bind(this), options);
    };

    ConnectionWrapper.prototype.MySDPReceived = function(sessionDescription) {
        this.logger.log("Set local description SDP");
        this.peerConnection.setLocalDescription(sessionDescription);
        this.serverConnection.publishMySDP(this.otherPeer, sessionDescription.sdp, sessionDescription.type);
        this.logger.log("SDP sent to "+this.otherPeer);
    };

    ConnectionWrapper.prototype.createOfferFailed = function(error) {
        this.logger.log("Create offer failed "+error.message);
        throw new Error("Create offer failed: "+error);
    };

    ConnectionWrapper.prototype.SDPReceived = function(data) {
        this.getPeerConnection();
        this.otherPeer = data.id;
        this.logger.log("Received SDP from "+this.otherPeer);

        this.logger.log("Set remote description SDP from "+this.otherPeer);
        var rtcSessionDescription = this.getRTCSessionDescription();
        this.peerConnection.setRemoteDescription(
            new rtcSessionDescription(data.data), this.remoteDescriptionSetted.bind(this)
        );
    };

    ConnectionWrapper.prototype.remoteDescriptionSetted = function() {
        this.logger.log("Creating answer for "+this.otherPeer);
        var options = { 'mandatory': { 'OfferToReceiveAudio': true, 'OfferToReceiveVideo': true } };
        this.peerConnection.createAnswer(this.myAnswerCreated.bind(this), this.createOfferFailed.bind(this), options);

        this.remoteDescriptionAdded = true;
    };

    ConnectionWrapper.prototype.answerSDPReceived = function(data) {
        this.otherPeer = data.id;
        this.logger.log("Answer SDP Received from "+this.otherPeer);
        this.logger.log("Set remote description SDP from "+this.otherPeer);
        var rtcSessionDescription = this.getRTCSessionDescription();
        var sessionDescription = new rtcSessionDescription(data.data);
        this.peerConnection.setRemoteDescription(sessionDescription);
        this.remoteDescriptionAdded = true;
    };

    ConnectionWrapper.prototype.ICEReceived = function(data) {
        if(!this.remoteDescriptionAdded) return;

        this.logger.log("ICE candidate received. Adding candidate");
        var candidate = data.data;
        var params = {sdpMLineIndex: candidate.sdplineindex, candidate: candidate.candidate};
        var rtcIceCandidate = this.getRTCIceCandidate();
        var iceCandidate = new rtcIceCandidate(params);
        this.peerConnection.addIceCandidate(iceCandidate);
    };

    ConnectionWrapper.prototype.myAnswerCreated = function(sessionDescription) {
        this.logger.log("Set local description SDP and sending to the other peer "+this.otherPeer);
        this.peerConnection.setLocalDescription(sessionDescription);
        this.serverConnection.answerMySDP(this.otherPeer, sessionDescription.sdp, sessionDescription.type);
    };

    ConnectionWrapper.prototype.onIceCandidate = function(event) {
        if (event && event.candidate) {
            var candidate = event.candidate;
            this.logger.log("Sending Ice candidate to the other peer");
            this.serverConnection.postIceToTheOtherPeer(this.otherPeer, candidate.candidate, candidate.sdpMLineIndex);
        }
        else {
            this.logger.log("End of ice candidates");
        }
    };

    ConnectionWrapper.prototype.onAddStream = function(event) {
        this.logger.log("Received stream "+event);
        if (!event) {
            return;
        }
        this.remoteMedia.userAccepted(event.stream);
    };

    ConnectionWrapper.prototype.onSessionConnecting = function() {
        this.logger.log("ON Session connecting...");
    };

    ConnectionWrapper.prototype.onSessionOpened = function() {
        this.logger.log("ON Session opened...");
    };

    ConnectionWrapper.prototype.onRemoteStreamAdded = function(event) {
        this.logger.log("ON Remote stream added...");
        console.log(event);
    };

    ConnectionWrapper.prototype.onRemoteStreamRemoved = function() {
        this.logger.log("ON Remote stream removed...");
    };

    return ConnectionWrapper;
});