
define(['chai', 'ServerConnection'], function(chai, ServerConnection) {
    suite('ConnectionWrapper.publishSDP', function() {
        "use strict";

        setup(function() {
            this.sut = new ServerConnection();
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

            this.sut.SDPReceived('hola');

            expectation.verify();
            stub.restore();
        });
    });
});