require.config({
    baseUrl: "/local/src/",
    paths: {
        chai: '/node_modules/chai/chai',
        socketio: '/node_modules/socket.io-client/socket.io'
    },
    urlArgs: "hash=" + (new Date()).getTime()
});

require([
    '/local/test/src/UserMediaTest.js',
    '/local/test/src/NavigatorWrapperTest.js',
    '/local/test/src/ConnectionWrapperTest.js',
    '/local/test/src/ServerConnectionTest.js'
], function() {
    if (typeof mochaPhantomJS !== "undefined") { mochaPhantomJS.run(); }
    else { mocha.run(); }
});
