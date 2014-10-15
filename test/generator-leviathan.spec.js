(function () {
  'use strict';

  var path            = require('path'),
      fs              = require('fs-extra'),
      helpers         = require('yeoman-generator').test,
      chai            = require('chai'),
      expect          = chai.expect,
      exec            = require('child-process').exec,
      CLIENT_DIR_NAME = 'public',
      TEMP_DIR_NAME   = 'temp2'
      ASYNC_TIMEOUT   = 20000;

  describe('leviathan generator', function() {
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
      var name = 'leviathan:app',
          dependencies = ['../../app'],
          args = ['LeviathanAppName'];

      helpers.testDirectory(path.join(__dirname, 'temp2'), function(err) {
        if (err) { return done(err); }

        generator = helpers.createGenerator(name, dependencies, args);
        generator.options['skip-install'] = true; // install should be loaded in fixtures
        done();
      }.bind(this));
    });

    describe('creates a running app', function() {
      this.timeout(ASYNC_TIMEOUT);
      fs.mkdirSync(__dirname + '/' + TEMP_DIR_NAME + '/' + CLIENT_DIR_NAME);
      fs.symlinkSync(__dirname + '/fixtures/node_modules', __dirname + '/'  + TEMP_DIR_NAME + '/node_modules');
      fs.symlinkSync(__dirname +'/fixtures/bower_components', __dirname +'/'  + TEMP_DIR_NAME + '/client/bower_components');
    });

    describe('with default options', function() {
      beforeEach(function () {
        helpers.mockPrompt(generator, defaultOptions);
      });

      it('should pass all client tests', function(done) {
        this.timeout(60000);
        generator.run({}, function() {
          exec('grunt test:client', function(error, stdout, stderr) {
            expect(stdout, 'Client tests failed \n' + stdout ).to.contain('Executed 1 of 1\u001b[32m SUCCESS\u001b');
            done();
          })
        })
      });
    });
  });

})();
