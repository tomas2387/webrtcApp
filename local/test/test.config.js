require.config({
    baseUrl: "../local/src",
    paths: {
        chai: '../../test/lib/node_modules/chai/chai'
    },
    urlArgs: "bust=" + (new Date()).getTime()
});

require([
    '../../test/src/UserMediaTest',
    '../../test/src/NavigatorWrapperTest',
    '../../test/src/ConnectionWrapperTest',
], function() {
    if (typeof mochaPhantomJS !== "undefined") { mochaPhantomJS.run(); }
    else { mocha.run(); }
});
