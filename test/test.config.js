require.config({
    baseUrl: "../scripts/src",
    paths: {
        chai: '../../test/lib/node_modules/chai/chai'
    }
});

require([
    '../../test/src/UserMediaTest'
], function() {
    if (typeof mochaPhantomJS !== "undefined") { mochaPhantomJS.run(); }
    else { mocha.run(); }
});
