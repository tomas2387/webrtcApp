
define(['chai', 'UserMedia','NavigatorWrapper','VideoWrapper'], function(chai, UserMedia, NavigatorWrapper, VideoWrapper) {
    suite('NavigatorWrapper.getCorrectUserMediaMethod', function() {
        "use strict";

        test('test_getCorrectGetUserMediaMethod_whenCalledWithMethodEnabled_shouldReturnThatMethod', function() {
            var windowNavigator = { msGetUserMedia: function() { console.log('msGetUserMedia'); }};
            var sut = new NavigatorWrapper(windowNavigator);
            var actual = sut.getCorrectGetUserMediaMethod();
            chai.assert.equal(actual.toString(), "function () { console.log('msGetUserMedia'); }");
        });

        test('test_getCorrectGetUserMediaMethod_whenCalledWithoutMethodEnabled_shouldReturnNull', function() {
            var sut = new NavigatorWrapper();
            var actual = sut.getCorrectGetUserMediaMethod();
            chai.assert.equal(null, actual);
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
            var sut = new NavigatorWrapper();
            var actual = sut.hasGetUserMedia();
            chai.assert.equal(actual, false);
        });
    });

    suite('NavigatorWrapper.getUserMedia', function() {
        "use strict";
        test('test_getUserMedia_whenCalledWithNoUserMedia_shouldThrowError', function() {
            var sut = new NavigatorWrapper(), thrownException = false;
            try {sut.getUserMedia();}
            catch(e) {thrownException = true;}

            if(!thrownException) {
                sinon.assert.fail("Did not throw exception");
            }
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