require.config({
    baseUrl: "../src",
    paths: {
        chai: '../../local/test/lib/node_modules/chai/chai',
        socketio: '../../node_modules/socket.io/node_modules/socket.io-client/dist/socket.io'
    },
    urlArgs: "bust=" + (new Date()).getTime()
});

require([
    '../../local/test/src/UserMediaTest',
    '../../local/test/src/NavigatorWrapperTest',
    '../../local/test/src/ConnectionWrapperTest',
    '../../local/test/src/ServerConnectionTest',
], function() {
    if (typeof mochaPhantomJS !== "undefined") { mochaPhantomJS.run(); }
    else { mocha.run(); }
});
