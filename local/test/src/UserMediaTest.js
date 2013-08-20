define(['chai', 'UserMedia','NavigatorWrapper','VideoWrapper', 'ConnectionWrapper'], function(chai, UserMedia, NavigatorWrapper, VideoWrapper, ConnectionWrapper) {

        suite('UserMedia.hasGetUserMedia', function() {
            var sut,  instanceNavigator, instanceVideo;
            setup(function() {
                instanceNavigator = new NavigatorWrapper();
                instanceVideo = new VideoWrapper();
                sut = new UserMedia(instanceVideo, instanceNavigator, {});
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
                var getMediaBackup = window.navigator.getMedia;
                window.navigator.getMedia = 1;

                var stubNavigator = sinon.stub(instanceNavigator, 'getUserMedia');
                stubNavigator.throws(new Error());

                var actual = sut.hasGetUserMedia();
                chai.assert.equal(false, actual);

                stubNavigator.restore();
                window.navigator.getMedia = getMediaBackup;
            });

            test('test_hasGetUserMedia_whenNavigatorReturnsTrue_returnTrue', function() {
                var stubNavigator = sinon.stub(instanceNavigator, 'hasGetUserMedia');
                stubNavigator.returns(true);

                var actual = sut.hasGetUserMedia();
                chai.assert.equal(true, actual);

                stubNavigator.restore();
            });


        });

        suite('UserMedia.stopUserMedia', function() {
            "use strict";
            var sut,  instanceNavigator, instanceVideo;
            setup(function() {
                instanceNavigator = new NavigatorWrapper();
                instanceVideo = new VideoWrapper();
                sut = new UserMedia(instanceVideo, instanceNavigator, {});
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

        suite('UserMedia.localQueryCamera', function() {
            "use strict";
            var sut,  instanceNavigator, instanceVideo;
            setup(function() {
                instanceNavigator = new NavigatorWrapper();
                instanceVideo = new VideoWrapper();
                sut = new UserMedia(instanceVideo, instanceNavigator, {});
            });

            teardown(function() {
                sut = null;
                instanceNavigator = null;
                instanceVideo = null;
            });
            test('test_queryCamera_whenCalled_callsGetUserMedia', function() {
                var mockNavigator = sinon.mock(instanceNavigator);
                mockNavigator.expects('getUserMedia').once();

                sut.localQueryCamera();
                mockNavigator.restore();
            });
        });

        suite('UserMedia.Publish', function() {
            "use strict";
            var sut,  instanceNavigator, instanceVideo, instancePeerConnection;
            setup(function() {
                instanceNavigator = new NavigatorWrapper();
                instanceVideo = new VideoWrapper();
                instancePeerConnection = new ConnectionWrapper({});
                sut = new UserMedia(instanceVideo, instanceNavigator, instancePeerConnection);
            });

            teardown(function() {
                sut = null;
                instanceNavigator = null;
                instanceVideo = null;
            });
            test('test_methodPublishUserMedia_whenCalled_calls', function() {
                var mockConnection = sinon.mock(instancePeerConnection);
                var expectation = mockConnection.expects('publishSDP').once();

                sut.publish();

                expectation.verify();
                mockConnection.restore();
            });


        });

});