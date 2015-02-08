'use strict';

// Karma configuration
// Generated on Fri May 09 2014 12:50:38 GMT-0400 (EDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: 'public/app/',

    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'mocha', 'chai', 'sinon-chai'],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      // endbower
      '../../test/test-app.js',
      '**/*.module.js',
      '**/*.js',
      '../../test/specs/**/*.js',
      '../../test/specs/**/**/*.js',
      '**/**/*.html',
      '**/*.html'   // load html files for directives so it can process them
    ],

    // list of files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '**/*.html': ['ng-html2js'],
      '**/**/*.html': ['ng-html2js'],
      // '**/*.js': ['coverage'],
      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      // '*.js': ['coverage'],
      '**/*.js': ['coverage']
    },

    ngHtml2JsPreprocessor: {
       // strip this from the file path
       stripPrefix: 'public/',
       // prepend this to the
       prependPrefix: '/partials/',

      // setting this option will create only a single module that contains templates
      // from all the files, so you can load them all with module('foo')
      // i.e.      moduleName: 'app'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['dots', 'progress', 'html', 'osx', 'coverage'],

    htmlReporter: {
      outputDir: 'coverage'
      // templatePath: __dirname+'/jasmine_template.html'
    },
    coverageReporter: {
      root: 'public/app',
      type: 'lcov',
      // dir: process.env.CIRCLE_ARTIFACTS || '../../CIRCLE_ARTIFACTS'
      dir: '../../coverage',
      subdir: 'report'
      // instrumenter: {
      //   '**/*.js': 'istanbul' // Force the use of the Istanbul instrumenter to cover CoffeeScript files
      // }
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_WARN,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
