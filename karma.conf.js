// Karma configuration
// Generated on Fri Sep 27 2013 14:24:45 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',

    // frameworks to use
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'app/components/angular/angular.js',
      'app/components/angular-route/angular-route.js',
      'app/components/angular-touch/angular-touch.js',
      'app/components/angular-mobile-nav/mobile-nav.js',
      'app/components/angular-localstorage/angular-local-storage.js',
      'app/components/angular-bootstrap/ui-bootstrap-tpls.js',
      'app/components/angular-mocks/angular-mocks.js',
      'app/scripts/config/config.js',
      'app/scripts/services/services.js',
      'app/scripts/*.js',
      'app/scripts/**/*.js',
      'test/mock/**/*.js',
      'test/spec/**/*.js',
      'app/views/**/*.html'
    ],


    // list of files to exclude
    exclude: [

    ],

    preprocessors: {
      'app/views/**/*.html': 'ng-html2js',
      'app/scripts/**/**/*.js': ['coverage']
    },

    ngHtml2JsPreprocessor: {
      // strip this from the file path
      stripPrefix: 'app/'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress', 'coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true
  });
};