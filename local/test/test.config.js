require.config({
    baseUrl: "../src",
    paths: {
        chai: '../../local/test/lib/node_modules/chai/chai'
    },
    urlArgs: "bust=" + (new Date()).getTime()
});

require([
    '../../local/test/src/UserMediaTest',
    '../../local/test/src/NavigatorWrapperTest',
    '../../local/test/src/ConnectionWrapperTest',
], function() {
    if (typeof mochaPhantomJS !== "undefined") { mochaPhantomJS.run(); }
    else { mocha.run(); }
});
