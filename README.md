# generator-columbia-angular

[Yeoman](http://yeoman.io) generator that scaffolds out a full stack Javascript web app using [angularjs](https://angularjs.org/), Grunt and Bower, Node and Express, MongoDB and Redis.

## Getting Started

### Using this generator:

Pre-reqs:

This generator uses Sass with Compass for preprocessing stylesheets.  In order to make use of this feature, you need to have ruby, sass and compass installed.  I personally use rbenv for managing ruby.  I also use nvm for managing node:

brew install rbenv
brew install rbenv-gem-rehash

1. Install MongoDB
2. Install ruby
3. Install Sass and Compass
4. Install hub: `$ brew install hub` or for windows you may have to install hub from source: https://github.com/github/hub.  For Windows users, you may also be able to install it through Chcolatey [using this project](https://github.com/twsouthwick/github-cli-nuget)
5. While we're at it, let's just install a bunch of useful gems:

```sh
gem install sass
gem install compass
```

```sh
# you may have to install compass with the --pre flag and compass-rails
gem install compass --pre
gem install compass-rails
gem install bundler foreman pg rails thin --no-rdoc --no-ri
gem install redcarpet pygments.rb
```

You also need to have grunt-cli and blower installed globally.  Here are my current global npm installs:

- babel@4.1.1
- bower@1.3.12 invalid
- generator-angular@0.11.1
- generator-angular-fullstack@2.0.13
- generator-angularfire@0.9.1-4
- generator-columbia-angular@1.1.11 -> /Users/lev/git/github/columbiajs/generator-columbia-angular
- generator-karma@0.9.0
- gh@1.9.4
- grunt-cli@0.1.13
- gulp@3.8.11
- instant-markdown-d@0.1.0
- karma-cli@0.0.4
- mocha@2.1.0
- npm@2.5.1
- opn@1.0.1
- yeoman@0.9.6
- yo@1.4.5

[If you're not familiar with Yeoman and want to learn more](http://yeoman.io/learning/index.html)
[If you want to build your own generator](http://yeoman.io/authoring/index.html)

Finally, make sure you don't need sudo privileges to run either `gem install` or `npm install`:

http://www.wenincode.com/installing-node-jsnpm-without-sudo/

http://www.johnpapa.net/how-to-use-npm-global-without-sudo-on-osx/

For gems, use rbenv

Install Yeoman:
```bash
$ npm install -g yo
```

To install generator-columbia-angular from npm, run:

```bash
$ npm install -g generator-columbia-angular
```

Finally, initiate the generator:

```bash
$ yo columbia-angular optionalAppName
```

Before you actually can run the app, you need to make sure that mongodb is running.  In a separate terminal run `$ sudo mongod`, then run `$ grunt`.

### Recommended github and heroku setup:

run ```$ yo columbia-angular:deploy``` to setup both github and heroku automatically.

**Note:** If your version of git is out of date, heroku may refuse to create your app for the reasons specified at https://blog.heroku.com/archives/2014/12/24/update_your_git_clients_on_windows_and_os_x and you may have to first update git. If you choose to do this with homebrew, which I recommend (for making upgrading in the future easier), you may have to set your path to use /usr/local/bin/ before using /usr/bin/ (the default).  You can do this by running:

`$ brew sh`

and should get the following message:

```sh
Your shell has been configured to use Homebrew's build environment:
this should help you build stuff. Notably though, the system versions of
gem and pip will ignore our configuration and insist on using the
environment they were built under (mostly). Sadly, scons will also
ignore our configuration.
When done, type `exit'.
brew \[\033[1;32m\]\w\[\033[0m\]$
```

Then restart your terminal.  If that doesn't fix your issue, refer to [this homebrew issue thread for additional workarounds](https://github.com/Homebrew/homebrew/issues/29843):


The command uses the following to setup Github:

```zsh
$ hub init
$ hub add . && hub commit -m "initial commit"
$ hub create optional_org_name/repo_name -d "description of repo"
$ hub push origin master
```

And to setup Heroku, it runs grunt build, copies over the Procfile, initializes the dist/ dir as a separate repository, and runs:

```zsh
$ heroku apps:create herokuAppName && heroku config:set NODE_ENV=production
$ git add -A && git commit -m "Initial commit"
$ git push heroku master
```

all of which you can of course do at the command line, provided you have both [hub](https://github.com/github/hub) and the [heroku toolbelt](https://toolbelt.heroku.com/) installed.

[More info on working with node in Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction)

The deploy generator also uses a plugin called heroku-config to push your local .env file to heroku.  Install it with:

```zsh
$ heroku plugins:install git://github.com/ddollar/heroku-config.git
```

Deployment requires that you have a remote mongo database to connect to.  You can use heroku addons to create one:

```zsh
 heroku addons:add mongolab
```

or you can [setup a mongolab account] and create one online. If you do this, just make sure to set the MONGOLAB_URI on heroku to the URI for accessing that db.


## Versioning and releases

This project uses semantic versioning and github for releases.  Releases can be created automatically using the grunt bump task, which will create a conventional changelog as well as a release.  For more, see:

[grunt-release](https://github.com/geddski/grunt-release)
[github on creating releases](https://help.github.com/articles/creating-releases/)
[grunt-conventional-changelog](https://github.com/btford/grunt-conventional-changelog)
[commit conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit)
[node-semver](https://github.com/npm/node-semver)


To create new releases with changelogs using the autorelease as it currently stands:

1. ```$ grunt bump:releaseType```
2. ```$ grunt autorelease:releaseType```

Release type should be one of patch, minor, major, or prerelease

running grunt bump simply bumps the version, which enables conventional changelog to use the correct latest version when generating its changelog.  grunt autorelease then does the following:

1. runs the "changelog" task
  * Generates changelog from previous version to HEAD...
  * Parses commits since last version
  * updates CHANGELOG.md updated

2. runs the "addchangelog" task:
  * stages CHANGELOG.md
  * committs CHANGELOG.md

3. runs the "release:patch" (release) task:
  * stages package.json
  * commits package.json
  * creates new git tag: v0.2.8
  * pushes to remote git repo
  * pushes new tag 0.2.8 to remote git repo

To then test the production version:
```$ grunt build```
```$ grunt serve:prod```

To then commit and push the production version to heroku:
```$ cd dist```
```$ git status```
```$ git add --all```

And normally we include a message like:
```$ git commit -m "feat(v0.2.3): dist build for v0.2.3"```
```$ git push heroku master```


Inspirations:

* Originally forked from [leviathantech/generator-leviathan](https://github.com/leviathantech/generator-leviathan)
* Codebase inspired by and originally based off of [DaftMonk/generator-angular-fullstack](https://github.com/DaftMonk/generator-angular-fullstack)


### Publishing to npm

Go to https://www.npmjs.com/ and click on "create account".
You must have an account on npm in order to publish modules

#### Before publishing

1. Test the version locally by:
  a. linking the module to npm by running `$ npm link` inside the repo root
  b. linking to the linked module by running `$ npm link <module-name>` from inside the directory you wish to use it in.
2. Once you're ready to publish, run `$ npm unlink` inside repo root and `$npm unlink <module-name>` inside test dir so you don't still have the local version linked in.
3. if this is the first time publishing run `$ npm publish`.
4.  Otherwise, you must bump the version before running this command.  This should be done using the grunt bump and grunt autorelease commands specified above (eventually this should also publish to npm automatically).
