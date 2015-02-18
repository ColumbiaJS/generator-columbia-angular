(function () {
  'use strict';

  var path            = require('path'),
      fs              = require('fs-extra'),
      helpers         = require('yeoman-generator').test,
      assert          = require('yeoman-generator').assert,
      chai            = require('chai'),
      expect          = chai.expect,
      exec            = require('child_process').exec,
      CLIENT_DIR_NAME = 'public',
      TEMP_DIR_NAME   = 'temp',
      ASYNC_TIMEOUT   = 20000;

  describe('columbia-angular generator creation', function () {
    var generator;
    var defaultOptions = {
      build: 'grunt',
      stylesheet: 'sass',
      angularModules: [
        'angular-animate',
        'angular-resource',
        'angular-cookies',
        'angular-mocks',
        'angular-sanitize'
      ]
    };

    beforeEach(function (done) {
      var name = 'columbia-angular:app',
          dependencies = ['../../app'],
          args = ['ApplicationName'];
      helpers.testDirectory(path.join(__dirname, '../' + TEMP_DIR_NAME), function (err) {
        console.log('\n\nTESTDIR CALLED\n\n');
        if (err) {
          console.log(err);
          return done(err);
        }

        console.log('NO ERROR');

        generator = helpers.createGenerator(name, dependencies, args);
        generator.options.skipInstall = true; // install should be loaded in fixtures
        done();
      }.bind(this));
    });

    it('creates expected files', function (done) {
      var expected = [
        // add files you expect to exist here.
        '.jshintrc',
        '.editorconfig',
        'bower.json',
        'package.json'
      ];

      helpers.mockPrompt(generator, defaultOptions);
      generator.options.skipInstall = true;
      generator.run({}, function () {
        helpers.assertFile(expected);
        done();
      });
    });

    // it('runs the compass task and creates a style.css file', function(done) {
    //   var expected = ['public/stylesheets/css/style.css'];
    //   helpers.mockPrompt(generator, defaultOptions);
    //   generator.options.skipInstall = true;
    //   generator.run({}, function() {
    //     helpers.assertFile(expected);
    //     done();
    //   });
    // });

    it('contains the app name in the README.md', function(done) {
      helpers.mockPrompt(generator, defaultOptions);
      generator.options.skipInstall = true;
      generator.run({}, function () {
        assert.fileContent('README.md', /Application Name/);
        done();
      });
    });

    it('contains the app name in the package.json', function(done) {
      helpers.mockPrompt(generator, defaultOptions);
      generator.options.skipInstall = true;
      generator.run({}, function () {
        assert.fileContent('package.json', /application-name/);
        done();
      });
    });
  });
})();
