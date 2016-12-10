module.exports = function(config) {
    config.set({
        basePath: './../../../',
        autoWatch: true,
        frameworks: ['jasmine'],
        browsers: ['Chrome'],
        plugins: [
            'karma-chrome-launcher',
            'karma-junit-reporter',
            'karma-jasmine'
        ],
        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        },
        files: [
            'dist/date-time.min.js',
            'tests/**/*.js'
        ]
    });
};
