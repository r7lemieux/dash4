'use strict';
var
    HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter')

exports.config = {

    // minimum:
    specs: ['*.e2e.js'],
    //
    framework: 'jasmine2',
    //seleniumAddress: 'http://localhost:4444/wd/hub',
    baseUrl: 'http://localhost:3000',
    capabilities: {
        browserName: 'chrome',
        version:''
    },
    //
    jasmineNodeOpts: {
        defaultTimeoutInterval: 3000,
        // onComplete will be called just before the driver quits.
        onComplete            : null,
        // If true, display spec names.
        isVerbose             : false,
        // If true, print colors to the terminal.
        showColors            : true,
        // If true, include stack traces in failures.
        includeStackTrace     : true,
    },

    onPrepare: function() {
        jasmine.getEnv().addReporter(
            new HtmlScreenshotReporter({
                dest:'screenshots',
                filename: 'report.html'
            })
        );
    }

};