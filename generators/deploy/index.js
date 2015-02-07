(function () {
  'use strict';
  var util = require('util'),
      deployPrompts = require('./prompts/deployPrompts'),
      yeoman = require('yeoman-generator'),
      exec = require('child_process').exec,
      chalk = require('chalk'),
      path = require('path');

  function DeployGenerator() {
    yeoman.generators.Base.apply(this, arguments);

    this.sourceRoot(path.join(__dirname, './templates')); // not sure this is needed
    this.argument('name', { type: String, required: false });
    try {
      this.appname = require(path.join(process.cwd(), 'bower.json')).name;
    } catch (e) {
      this.appname = path.basename(process.cwd());
    }
    this.appname = this._.slugify(this.appname);
    this.filters = this.config.get('filters') || {};
  }

  util.inherits(DeployGenerator, yeoman.generators.NamedBase);

  DeployGenerator.prototype.promptForDeploy = function promptForDeploy() {
    deployPrompts.prompt(this);
    // this.log(chalk.bold('HEROKU APP NAME: ' + this.herokuAppName));
  };

  DeployGenerator.prototype.verifyHerokuToolbelt = function verifyHerokuToolbelt() {
    if (this.abort) { return; } // if any func sets abort we return on all
    var done = this.async();

    exec('heroku --version', function (err) {
      if (err) {
        this.log.error('You don\'t have the Heroku Toolbelt installed. ' +
                       'Grab it from https://toolbelt.heroku.com/');
        this.abort = true;
      }
      done();
    }.bind(this));
  };

  DeployGenerator.prototype.verifyHub = function verifyHub() {
    if (this.abort) { return; }
    var done = this.async();

    exec('hub --version', function (err) {
      if (err) {
        this.log.error('You don\'t have hub installed. ' +
                       'Install with:');
        this.log(chalk.bold.blue('$ brew install hub'));
        this.abort = true;
      }
      done();
    }.bind(this));
  };

  DeployGenerator.prototype.setupGithubRepo = function setupGithubRepo() {
    if (this.abort) { return; }
    var done = this.async();
    //  hub init
    // $ hub add . && hub commit -m "initial commit"
    // $ hub create optional_org_name/repo_name -d "description of repo"
    // $ hub push origin master
    this.spawnCommand('hub', ['init'])
      .on('exit', this.emit.bind(this, 'initComplete'));


    this.on('initComplete', function() {
      this.spawnCommand('hub', ['add', '.'])
        .on('exit', this.emit.bind(this, 'hubAddComplete'));
    });

    this.on('hubAddComplete', function() {
      this.spawnCommand('hub', ['commit', '-m', 'initial commit'])
        .on('exit', this.emit.bind(this, 'hubCommitComplete'));
    });

    this.on('hubCommitComplete', function() {
      var args = ['create'];
      if (this.repoName) { args.push(this.repoName); }
      if (this.makePrivate) { args.push('-p'); }
      args.push('-d');
      args.push('Fullstack MEAN application (AngularJS, Node, Express, MongoDB.');
      this.log(chalk.bold.cyan('invoking hub with args: '));
      this.log(chalk.bold.yellow(args));
      this.spawnCommand('hub', args)
        .on('exit', this.emit.bind(this, 'hubCreateComplete'));
    });

    this.on('hubCreateComplete', function() {
      this.spawnCommand('hub', ['push', 'origin', 'master'])
        .on('exit', this.emit.bind(this, 'githubSetupComplete'));
    });

    this.on('githubSetupComplete', function() {
      done();
    });
  };

  DeployGenerator.prototype.deployRepoInit = function deployRepoInit() {
    if (this.abort) { return; }
    var done = this.async();

    this.log(chalk.bold('\nInitializing deployment repo'));
    this.mkdir('dist');
    var child = exec('git init', { cwd: 'dist' }, function (err, stdout, stderr) {
      if (err) { done(err); }
      done();
    }.bind(this));
    child.stdout.on('data', function(data) { console.log(data.toString()); });
  };

  DeployGenerator.prototype.herokuCreate = function herokuCreate() {
    if (this.abort) { return; }
    var done = this.async();
    // var regionParams = (this.region !== 'us') ? ' --region ' + this.region : '';
    var regionParams = '';

    this.log(chalk.bold('Creating heroku app and setting node environment'));
    this.log(chalk.bold('HEROKU APP NAME' + this.herokuAppName));
    var command = 'heroku apps:create ' + this.herokuAppName + regionParams +
                  ' && heroku config:set NODE_ENV=production';
    var child = exec(command, { cwd: 'dist' }, function (err, stdout, stderr) {
      if (err) {
        this.abort = true;
        this.log.error(err);
      } else {
        this.log('stdout: ' + stdout);
      }
      done();
    }.bind(this));

    child.stdout.on('data', function(data) {
      var output = data.toString();
      this.log(output);
    }.bind(this));
  };

  DeployGenerator.prototype.copyProcfile = function copyProcfile() {
    if (this.abort) { return; }
    var done = this.async();
    this.log(chalk.bold('Creating Procfile'));
    this.copy('Procfile', 'dist/Procfile');
    this.conflicter.resolve(function (err) {
      done();
    });
  };

  DeployGenerator.prototype.gruntBuild = function gruntBuild() {
    if (this.abort) { return; }
    var done = this.async();

    this.log(chalk.bold('\nBuilding dist folder, please wait...'));
    var child = exec('grunt build', function (err, stdout) {
      done();
    }.bind(this));
    child.stdout.on('data', function(data) {
      this.log(data.toString());
    }.bind(this));
  };

  DeployGenerator.prototype.gitCommit = function gitInit() {
    if (this.abort) { return; }
    var done = this.async();

    this.log(chalk.bold('Adding files for initial commit'));
    var child = exec('git add -A && git commit -m "Initial commit"', { cwd: 'dist' }, function (err, stdout, stderr) {
      if (stdout.search('nothing to commit') >= 0) {
        this.log('Re-pushing the existing "dist" build...');
      } else if (err) {
        this.log.error(err);
      } else {
        this.log(chalk.green('Done, without errors.'));
      }
      done();
    }.bind(this));

    child.stdout.on('data', function(data) {
      this.log(data.toString());
    }.bind(this));
  };

  DeployGenerator.prototype.syncConfigVars = function syncConfigVars() {
    if (this.abort) { return; }
    var done = this.async();

    this.log(chalk.bold.cyan('Pushing local config vars to heroku'));
    var child = exec('heroku config:push', { cwd: 'dist' }, function (err, stdout, stderr) {
      if (err) {
        console.log(chalk.bold.red('You may need to install heroku-config plugin:'));
        console.log(chalk.bold.red('$ heroku plugins:install git://github.com/ddollar/heroku-config.git'));
        console.log(err);
      }
      done();
    }.bind(this));
    child.stderr.on('data', function (data) {
      this.log(data.toString());
      this.log('Failed to start child process.');
    });
    child.stdout.on('data', function(data) {
      this.log(data.toString());
    }.bind(this));
  };

  DeployGenerator.prototype.addOnForMongoLab = function addOnForMongoLab() {
    if (this.abort) { return; }
    var done = this.async();
    if (this.useMongoLabAddOn) {
      this.log(chalk.bold.cyan('Adding MongoLab to app through heroku'));
      var child = exec('heroku addons:add mongolab', { cwd: 'dist' }, function (err, stdout, stderr) {
        if (err) { this.log.error(err); }
        done();
      }.bind(this));
      child.stderr.on('data', function (data) {
        this.log('Heroku [hopefully standard] reporting errors...  Please continue to wait...');
      });
      child.stdout.on('data', function(data) {
        this.log(data.toString());
      }.bind(this));
    } else {
      done();
    }
  };

  DeployGenerator.prototype.gitForcePush = function gitForcePush() {
    if (this.abort) { return; }
    var done = this.async();

    this.log(chalk.bold('\nUploading your initial application code.\n This may take '+chalk.cyan('several minutes')+' depending on your connection speed...'));

    var child = exec('git push -f heroku master', { cwd: 'dist' }, function (err, stdout, stderr) {
      if (err) {
        this.log.error(err);
      } else {
        var hasWarning = false;

        if(this.filters.mongoose) {
          this.log(chalk.yellow('\nBecause you\'re using mongoose, you must add mongoDB to your heroku app.\n\t' + 'from `/dist`: ' + chalk.bold('heroku addons:add mongohq') + '\n'));
          hasWarning = true;
        }

        if(this.filters.facebookAuth) {
          this.log(chalk.yellow('You will need to set environment variables for facebook auth. From `/dist`:\n\t' +
          chalk.bold('heroku config:set FACEBOOK_ID=appId\n\t') +
          chalk.bold('heroku config:set FACEBOOK_SECRET=secret\n')));
          hasWarning = true;
        }
        if(this.filters.googleAuth) {
          this.log(chalk.yellow('You will need to set environment variables for google auth. From `/dist`:\n\t' +
          chalk.bold('heroku config:set GOOGLE_ID=appId\n\t') +
          chalk.bold('heroku config:set GOOGLE_SECRET=secret\n')));
          hasWarning = true;
        }
        if(this.filters.twitterAuth) {
          this.log(chalk.yellow('You will need to set environment variables for twitter auth. From `/dist`:\n\t' +
          chalk.bold('heroku config:set TWITTER_ID=appId\n\t') +
          chalk.bold('heroku config:set TWITTER_SECRET=secret\n')));
          hasWarning = true;
        }

        this.log(chalk.green('\nYour app should now be live. To view it run\n\t' + chalk.bold('cd dist && heroku open')));
        if(hasWarning) {
          this.log(chalk.green('\nYou may need to address the issues mentioned above and restart the server for the app to work correctly.'));
        }

        this.log(chalk.yellow('After app modification run:\n\t' + chalk.bold('grunt build') +
        '\nThen deploy with:\n\t' + chalk.bold('grunt buildcontrol:heroku')));
      }
      done();
    }.bind(this));

    child.stderr.on('data', function (data) {
      console.log('Heroku [hopefully standard] reporting errors...  Please continue to wait...');
    });
    child.stdout.on('data', function(data) {
      this.log(data.toString());
    }.bind(this));
  };

  module.exports = DeployGenerator;
})();
