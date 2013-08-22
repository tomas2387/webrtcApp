module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({
        default: {
            tasks: 'shell:mocha-phantomjs'
        },

        shell: {
            'mocha-phantomjs': {
                command: 'mocha-phantomjs http://localhost/webrtcapp/local/test/testRunner.html',
                options: {
                    stdout: true,
                    stderr: true
                }
            },
            server: {
                command: 'node server/src/server.js',
                options: {
                    stdout: true,
                    stderr: true
                }
            }
        },
        watch: {
            jsFiles: {
                files: ['**/*.js'],
                tasks: ['shell:mocha-phantomjs']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-shell');
};
