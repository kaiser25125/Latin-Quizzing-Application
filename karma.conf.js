// Karma configuration
// Generated on Tue Mar 07 2017 11:04:18 GMT-0500 (EST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
	'node_modules/jquery/dist/jquery.js',
	'lib/angular.js',
	'lib/angular-route.js',
	"lib/angular-mocks.js",
	'client/js/latinQuiz.js',
    'client/angularjs-datetime-picker.js',
	'client/directives/fillInTheBlank.html',
	'client/directives/longAnswer.html',
	'client/directives/multipleAnswer.html',
	'client/directives/multipleChoice.html',   
	'client/directives/trueFalse.html',
	"test.js"
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor

      preprocessors: {
	  'client/directives/fillInTheBlank.html':'ng-html2js',
	  'client/directives/longAnswer.html':'ng-html2js',
	  'client/directives/multipleAnswer.html':'ng-html2js',
	  'client/directives/multipleChoice.html':'ng-html2js',   
    'client/directives/trueFalse.html':'ng-html2js'
      },
      
      
      // test results reporter to use
      // possible values: 'dots', 'progress'
      // available reporters: https://npmjs.org/browse/keyword/karma-reporter
      reporters: ['progress'],
      
      
      // web server port
      port: 9876,
      
      
    // enable / disable colors in the output (reporters and logs)
      colors: true,
      
      
      // level of logging
      // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
      logLevel: config.LOG_INFO,

      
      // enable / disable watching file and executing tests whenever any file changes
      autoWatch: true,
      
      
    // start these browsers
      // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
      browsers: ['Chrome'],
      
      
      // Continuous Integration mode
      // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,
      
      // Concurrency level
      // how many browser should be started simultaneous
      concurrency: Infinity
  })
}
