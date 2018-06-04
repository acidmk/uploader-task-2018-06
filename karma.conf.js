// Karma configuration
module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'https://code.jquery.com/jquery-3.3.1.min.js',
      './node_modules/angular/angular.js',
      './node_modules/angular-ui-router/release/angular-ui-router.js',
      './node_modules/angular-mocks/angular-mocks.js',
      'https://fast.wistia.com/assets/external/E-v1.js',
      'https://blueimp.github.io/jQuery-File-Upload/js/vendor/jquery.ui.widget.js',
      'https://blueimp.github.io/jQuery-File-Upload/js/jquery.iframe-transport.js',
      'https://blueimp.github.io/jQuery-File-Upload/js/jquery.fileupload.js',
      './js/*.js'
    ],
    exclude: [
    ],
    preprocessors: {
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  })
}
