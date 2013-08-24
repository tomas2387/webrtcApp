
define(['chai', 'ServerConnection'], function(chai, ServerConnection) {
    suite('ServerConnection.publishMySDP', function() {
        "use strict";

        setup(function() {
            this.fakeSocket = {
                socket: {
                    connected: true
                },
                emit: function() {}
            };
            this.socketMock = sinon.mock(this.fakeSocket);
            this.sut = new ServerConnection(this.fakeSocket);
        });

        teardown(function() {
            this.socketMock.restore();
            this.socketMock = null;
        });

        test('test_publishMySDP_whenCalled_shouldCallServerWithSocket', function() {
            var expectation = this.socketMock.expects('emit').once();
            this.sut.publishMySDP(null, null);
            expectation.verify();
        });
    });
});