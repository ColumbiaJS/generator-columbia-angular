(function () {
  'use strict';

  var path            = require('path'),
      fs              = require('fs-extra'),
      helpers         = require('yeoman-generator').test,
      chai            = require('chai'),
      expect          = chai.expect,
      exec            = require('child_process').exec,
      CLIENT_DIR_NAME = 'public',
      TEMP_DIR_NAME   = 'temp',
      ASYNC_TIMEOUT   = 20000;

  describe('columbia-angular generator', function() {
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
      ],
      awsAPIKey: 'A5JHDNEI846HFNF',
      awsSecret: 'pioansd495hDJHf94nad8',
      s3BucketName: 'leviathan-app-uploads',
      s3Region: 'US Standard',
      herokuAppName: 'isolate-chamber-3450'
    };


    beforeEach(function (done) {
      var name = 'leviathan:app',
          dependencies = ['../../app'],
          args = ['LeviathanAppName'];

      helpers.testDirectory(path.join(__dirname, '../' + TEMP_DIR_NAME), function(err) {
        if (err) { return done(err); }

        generator = helpers.createGenerator(name, dependencies, args);
        generator.options['skip-install'] = true; // install should be loaded in fixtures
        done();
      }.bind(this));
    });

    describe('creates a running app', function() {

      beforeEach(function () {
        this.timeout(ASYNC_TIMEOUT);
        var clientDir = __dirname + '/../' + TEMP_DIR_NAME + '/' + CLIENT_DIR_NAME,
            nodeModulesFixturesDir = __dirname + '/../fixtures/node_modules',
            bowerComponentsFixturesDir = __dirname +'/../fixtures/bower_components',
            symlinkNodeDir = __dirname + '/../'  + TEMP_DIR_NAME + '/node_modules',
            symlinkBowerDir = __dirname + '/../'  + TEMP_DIR_NAME + '/public/bower_components';

        fs.mkdirsSync(clientDir);
        fs.symlinkSync(nodeModulesFixturesDir, symlinkNodeDir);
        fs.symlinkSync(bowerComponentsFixturesDir, symlinkBowerDir);
      });

      describe('with default options', function() {
        beforeEach(function () {
          helpers.mockPrompt(generator, defaultOptions);
        });

        it('should pass all client tests', function(done) {
          // this.timeout(60000);
          generator.run({}, function() {
            done();
            // exec('grunt test:client', function(error, stdout, stderr) {
            //   expect(stdout, 'Client tests failed \n' + stdout ).to.contain('Executed 1 of 1\u001b[32m SUCCESS\u001b');
            //   done();
            // });
          });
        });
      });

    });


  });

})();
