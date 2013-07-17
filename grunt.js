module.exports = function(grunt) {
    grunt.initConfig({
        shell: {
            'mocha-phantomjs': {
                command: 'mocha-phantomjs http://localhost:8000/webrtcApp/scripts/test/testRunner.html',
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
