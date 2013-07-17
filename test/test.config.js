require.config({
    // ...paths and stuff
});

require([
    // FILE(S) BEING TESTED
    'src/*'
], function() {
    // INITIALIZE THE RUN
    mocha.run();
});
