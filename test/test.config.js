require.config({
    // ...paths and stuff
});

require([
    // FILE(S) BEING TESTED
    'src/test.backbone-gcl'
], function() {
    // INITIALIZE THE RUN
    mocha.run();
});
