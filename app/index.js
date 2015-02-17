(function () {
  'use strict';

  var path                    = require('path'),
      yeoman                  = require('yeoman-generator'),
      yosay                   = require('yosay'),
      chalk                   = require('chalk'),
      leviathanLion           = require('../leviathan_say/leviathan-lion'),
      buildPrompts            = require('./prompts/buildPrompts'),
      clientPrompts           = require('./prompts/clientPrompts'),
      externalServicesPrompts = require('./prompts/externalServicesPrompts'),
      keyGenerator            = require('../utils/keyGenerator');


  var ColumbiaAngularGenerator = yeoman.generators.Base.extend({
    init: function () {
      this.argument('name', { type: String, required: false });
      this.appname = this.name || path.basename(process.cwd());
      this.appname = this._.camelize(this._.slugify(this._.humanize(this.appname)));
      this.scriptAppName = this.appname;
      this.appSecret = keyGenerator.appSecret();
      this.tokenSecret = keyGenerator.tokenSecret();
      this.log('APP_SECRET: ' + this.appSecret);
      this.log('TOKEN_SECRET: ' + this.tokenSecret);
      this.pkg = require('../package.json');
      this.filters = {};
    },

    welcome: function() {
      // Have Leviathan greet the user.
      this.log(leviathanLion('WELCOME TO THE LEVIATHAN'));
      this.log('This generator creates an an AngularJS app with ' +
               ' an express server and a MongoDB data store.');
    },

    // buildPrompts: function () {
    //   buildPrompts.prompt(this); // pass in generator to buildPrompts module
    // },

    // clientPrompts: function () {
    //   clientPrompts.prompt(this);
    // },

    // externalServicesPrompts: function () {
    //   externalServicesPrompts.prompt(this);
    // },
    // replaces currently unnecessary prompts
    cannedResponses: function () {
      this.build = 'Grunt';
      this.filters.Grunt = true;
      this.stylesheet = 'Sass';
      this.filters.Sass = true;
      this.angularModules = ['angular-animate', 'angular-resource', 'angular-mocks', 'angular-sanitize'];
      this.organizationname = 'default';
      this.mandrillAPIKey   = 'mandrillAPIKey';
      this.awsAPIKey        = 'awsAPIKey';
      this.awsSecret        = 'awsSecret';
      this.s3BucketName     = 's3BucketName';
      this.s3Region         = 's3Region';
      this.adminLogin       = 'adminLogin';
      this.adminPassword    = 'adminPassword';
    },

    saveSettings: function() {
      this.config.set('filters', this.filters);
      this.config.forceSave(); // make sure saving is done b4 calling hook
    },

    writing: function () {
      this.mkdir('server');
      this.mkdir('public');
      this.mkdir('public/app');
      this.mkdir('public/stylesheets');
      this.mkdir('test');
      this.mkdir('grunt');
      this.mkdir('dist');

      this.log('APP NAME:');
      this.log(this.appname);
      this.log(this.sourceRoot());
      this.log(this.destinationRoot());
      this._processDirectory(this.sourceRoot(), this.destinationRoot());
    },

    install: function() {
      this.on('end', function () {
        this.npmInstall('', {}, function () {
          this.emit('npmInstalled');
        }.bind(this));
      });

      this.on('npmInstalled', function () {
        this.bowerInstall('', {}, function () {
          this.emit('dependenciesInstalled');
        }.bind(this)).on('error', this._bowerFailedCallback);
      });

      // Now you can bind to the dependencies installed event
      this.on('dependenciesInstalled', function() {
        this.spawnCommand('grunt', ['compass'], this._gruntFailedCallback)
          .on('error', this._gruntFailedCallback);
      });

    },
    _bowerFailedCallback: function(err) {
      if (err) { this.log(chalk.bold(err)); }
      this.log('BOWER TASK FAILED');
    },
    _gruntFailedCallback: function(err) {
      if (err) { this.log(chalk.bold(err)); }
      this.log('GRUNT COMPASS TASK FAILED');
    }

  });

  ColumbiaAngularGenerator.prototype._processDirectory = function(source, destination) {
      var root = this.isPathAbsolute(source) ? source : path.join(this.sourceRoot(), source);
      var files = this.expandFiles('**', { dot: true, cwd: root });
      this.log(files);
      for (var i = 0; i < files.length; i++) {
          var f = files[i];
          var src = path.join(root, f);
          var dest;
          if(path.basename(f).indexOf('_') === 0){
              dest = path.join(destination, path.dirname(f), path.basename(f).replace(/^_/, ''));
              this.template(src, dest);
              this.log('creating template from: ' + src);
          }
          else{
            if(path.basename(f).indexOf('.') < 0) {
              // it's a dotfile
              this.log('\n\n CREATING DOTFILE');
              f = '.' + f;
              dest = path.join(destination, f);
              this.log(dest);
            } else {
              dest = path.join(destination, f);
            }
            this.copy(src, dest);
            this.log('creating copy from: ' + src);
            this.log('creating copy to:   ' + dest);
          }
      }
  };

  module.exports = ColumbiaAngularGenerator;

})();
