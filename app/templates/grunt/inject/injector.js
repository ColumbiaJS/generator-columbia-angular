(function() {
  'use strict';

  module.exports = {
    options: {},
    scripts: {
      options: {
        transform: function(filePath) {
          filePath = filePath.replace('/public/', '');
          return '<script src="' + filePath + '"></script>';
        },
        starttag: '<!-- injector:js -->',
        endtag: '<!-- endinjector -->',
        template: 'public/index.html'
      },
      files: {
        'public/index.html': [
          'public/app/app.js', // alternatively this can be specified in index.html and ignored here
          'public/app/*.js',
          '!public/app/*.spec.js',
          'public/app/components/*.js',
          '!public/app/components/*.spec.js',
          'public/app/**/*.js',
          '!public/app/**/*.spec.js',
         '!{.tmp,public}/app/**/*.spec.js',
         '!{.tmp,public}/app/**/*.mock.js'
        ]
      }
    },
    sass: {
      options: {
        transform: function(filePath) {
          filePath = filePath.replace('/public/app/', '');
          filePath = filePath.replace('.scss', '');
          return '@import \'' + filePath + '\';';
        },
        starttag: '// injector',
        endtag: '// endinjector',
        template: 'public/stylesheets/sass/style.scss'
      },
      files: {
        'public/stylesheets/sass/style.scss': [
          'public/app/**/*.{scss,sass}'
        ]
      }
    }
  };
}());
