
define(['chai', 'UserMedia','ConnectionWrapper', 'ServerConnection'], function(chai, UserMedia, ConnectionWrapper, ServerConnection) {
    suite('ConnectionWrapper.publishSDP', function() {
        "use strict";

        setup(function() {
            var fakePeerConnection = {
                createOffer: function(callback, failureCallback, options) {},
                setLocalDescription: function(SDP) {},
                addStream: function() {}
            };
            this.mockPeerConnection = sinon.mock(fakePeerConnection);

            var fakeLogger = {
                log: function() {}
            };

            this.serverConnection = new ServerConnection({emit:function(){},on:function(){}});
            this.sut = new ConnectionWrapper(fakeLogger, this.serverConnection, null, null, fakePeerConnection);
        });

        teardown(function() {
            this.mockPeerConnection.restore();
        });

        test('test_publishSDP_whenCalled_shouldCallCreateOffer', function() {
            var expectation = this.mockPeerConnection.expects('createOffer').once();
            this.sut.publishSDP();
            expectation.verify();
        });

        test('test_SDPReceived_whenCalled_shouldCallSetLocalDescriptionWithSDP', function() {
            var expectation = this.mockPeerConnection.expects('setLocalDescription').once().withArgs('hola');
            var stub = sinon.stub(this.serverConnection, 'publishMySDP').returns(true);

            this.sut.MySDPReceived('hola');

            expectation.verify();
            stub.restore();
        });
    });
});