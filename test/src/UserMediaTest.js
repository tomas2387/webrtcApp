define(['chai', 'UserMedia','NavigatorWrapper'],
    function(chai, UserMedia, NavigatorWrapper) {
        suite('NavigatorWrapper.hasGetUserMedia', function() {
            var sut, mockNavigator, instanceNavigator;
            setup(function() {
                instanceNavigator = new NavigatorWrapper();
                mockNavigator = sinon.mock(instanceNavigator);
                sut = new UserMedia(instanceNavigator);
            });

            teardown(function() {
                mockNavigator.restore();
                sut = null;
                instanceNavigator = null;
            });

            test('test_hasGetUserMedia_whenCalled_CallsNavigatorWrapper', function() {
                mockNavigator.expects('getUserMedia').once().withArgs();
                sut.hasGetUserMedia();
            });

            test('test_hasGetUserMedia_whenNavigatorThrowsException_returnFalse', function() {
                var stubNavigator = sinon.stub(instanceNavigator, 'getUserMedia');
                stubNavigator.throws(new Error());

                var actual = sut.hasGetUserMedia();
                chai.assert.equal(false, actual);

                stubNavigator.restore();
            });

            test('test_hasGetUserMedia_whenNavigatorReturnsTrue_returnTrue', function() {
                var stubNavigator = sinon.stub(instanceNavigator, 'hasGetUserMedia');
                stubNavigator.returns(true);

                var actual = sut.hasGetUserMedia();
                chai.assert.equal(true, actual);

                stubNavigator.restore();

            });

        });

});