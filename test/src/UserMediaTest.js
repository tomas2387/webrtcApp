define(['chai', 'UserMedia','NavigatorWrapper','VideoWrapper'], function(chai, UserMedia, NavigatorWrapper, VideoWrapper) {

        suite('NavigatorWrapper.hasGetUserMedia', function() {
            var sut,  instanceNavigator, instanceVideo;
            setup(function() {
                instanceNavigator = new NavigatorWrapper();
                instanceVideo = new VideoWrapper();
                sut = new UserMedia(instanceNavigator, instanceVideo);
            });

            teardown(function() {
                sut = null;
                instanceNavigator = null;
                instanceVideo = null;
            });

            test('test_hasGetUserMedia_whenCalled_CallsNavigatorWrapper', function() {
                var mockNavigator = sinon.mock(instanceNavigator);
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

        suite('NavigatorWrapper.stopUserMedia', function() {
            "use strict";
            var sut,  instanceNavigator, instanceVideo;
            setup(function() {
                instanceNavigator = new NavigatorWrapper();
                instanceVideo = new VideoWrapper();
                sut = new UserMedia(instanceNavigator, instanceVideo);
            });

            teardown(function() {
                sut = null;
                instanceNavigator = null;
                instanceVideo = null;
            });
            test('test_stopUserMedia_whenCalled_callsStopPlaying', function() {
                var mockVideo = sinon.mock(instanceVideo);
                mockVideo.expects('stopPlaying').once();

                sut.stopMedia();

                mockVideo.restore();
            });
        });

        suite('NavigatorWrapper.queryCamera', function() {
            "use strict";
            var sut,  instanceNavigator, instanceVideo;
            setup(function() {
                instanceNavigator = new NavigatorWrapper();
                instanceVideo = new VideoWrapper();
                sut = new UserMedia(instanceNavigator, instanceVideo);
            });

            teardown(function() {
                sut = null;
                instanceNavigator = null;
                instanceVideo = null;
            });
            test('test_queryCamera_whenCalled_callsGetUserMedia', function() {
                var mockNavigator = sinon.mock(instanceNavigator);
                mockNavigator.expects('getUserMedia').once();

                sut.queryCamera();

                mockNavigator.restore();
            });
        });

});