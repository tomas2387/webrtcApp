"use strict";
require.config({
    //baseUrl: "/src"
});

require([
    'src/NavigatorWrapperTest',
    'src/UserMediaTest.js'
], function() {
    // INITIALIZE THE RUN
    mocha.run();
});
