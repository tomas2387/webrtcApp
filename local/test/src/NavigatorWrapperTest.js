
define(['chai', 'UserMedia','NavigatorWrapper','VideoWrapper'], function(chai, UserMedia, NavigatorWrapper, VideoWrapper) {
    suite('NavigatorWrapper.getCorrectUserMediaMethod', function() {

        test('test_getCorrectGetUserMediaMethod_whenCalledWithMethodEnabled_shouldReturnThatMethod', function() {
            var windowNavigator = { msGetUserMedia: function() { console.log('msGetUserMedia'); }};
            var sut = new NavigatorWrapper(windowNavigator);
            var actual = sut.getCorrectGetUserMediaMethod();
            chai.assert.equal(actual.toString(), "function () { console.log('msGetUserMedia'); }");
        });

        test('test_getCorrectGetUserMediaMethod_whenCalledWithoutMethodEnabled_shouldReturnNull', function() {
            var mozMethod = window.navigator.mozGetUserMedia;
            var webkitMethod = window.navigator.webkitGetUserMedia;
            var normalMethod = window.navigator.getUserMedia;

            window.navigator.mozGetUserMedia = null;
            window.navigator.webkitGetUserMedia = null;
            window.navigator.getUserMedia = null;

            var sut = new NavigatorWrapper();
            var actual = sut.getCorrectGetUserMediaMethod();
            chai.assert.equal(null, actual);

            window.navigator.mozGetUserMedia = mozMethod;
            window.navigator.webkitGetUserMedia = webkitMethod;
            window.navigator.getUserMedia = normalMethod;
        });
    });

    suite('NavigatorWrapper.hasGetUserMedia', function() {
        "use strict";

        test('test_hasGetUserMedia_whenCalledWithUserMedia_shouldReturnTrue', function() {
            var windowNavigator = { msGetUserMedia: function() { console.log('msGetUserMedia'); }};
            var sut = new NavigatorWrapper(windowNavigator);
            var actual = sut.hasGetUserMedia();
            chai.assert.equal(actual, true);
        });

        test('test_hasGetUserMedia_whenCalledWithNoUserMedia_shouldReturnFalse', function() {
            var mozMethod = window.navigator.mozGetUserMedia;
            var webkitMethod = window.navigator.webkitGetUserMedia;
            var normalMethod = window.navigator.getUserMedia;

            window.navigator.mozGetUserMedia = null;
            window.navigator.webkitGetUserMedia = null;
            window.navigator.getUserMedia = null;

            var sut = new NavigatorWrapper();
            var actual = sut.hasGetUserMedia();
            chai.assert.equal(actual, false);

            window.navigator.mozGetUserMedia = mozMethod;
            window.navigator.webkitGetUserMedia = webkitMethod;
            window.navigator.getUserMedia = normalMethod;
        });
    });

    suite('NavigatorWrapper.getUserMedia', function() {
        "use strict";
        test('test_getUserMedia_whenCalledWithNoUserMedia_shouldThrowError', function() {
            var mozMethod = window.navigator.mozGetUserMedia;
            var webkitMethod = window.navigator.webkitGetUserMedia;
            var normalMethod = window.navigator.getUserMedia;

            window.navigator.mozGetUserMedia = null;
            window.navigator.webkitGetUserMedia = null;
            window.navigator.getUserMedia = null;

            var sut = new NavigatorWrapper(), thrownException = false;
            try {sut.getUserMedia();}
            catch(e) {thrownException = true;}

            if(!thrownException) {
                sinon.assert.fail("Did not throw exception");
            }

            window.navigator.mozGetUserMedia = mozMethod;
            window.navigator.webkitGetUserMedia = webkitMethod;
            window.navigator.getUserMedia = normalMethod;
        });

        test('test_getUserMedia_whenCalledWithUserMedia_shouldCallThatMethod', function() {
            var spy = sinon.spy();
            var windowNavigator = {
                mozGetUserMedia: spy
            };
            var sut = new NavigatorWrapper(windowNavigator);
            sut.getUserMedia();

            chai.assert.isTrue(spy.calledOnce);
        });
    });
});