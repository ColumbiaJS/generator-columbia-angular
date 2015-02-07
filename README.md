# generator-leviathan [![Build Status](https://secure.travis-ci.org/leviathantech/generator-leviathan.png?branch=master)](https://travis-ci.org/leviathantech/generator-leviathan)

[Yeoman](http://yeoman.io) generator that scaffolds out a full stack Javascript web app using [angularjs](https://angularjs.org/), Grunt and Bower, Node and Express, MongoDB and Redis.

## Getting Started

### Using this generator:

[If you're not familiar with Yeoman and want to learn more](http://yeoman.io/learning/index.html)
[If you want to build your own generator](http://yeoman.io/authoring/index.html)

Install Yeoman:
```bash
$ npm install -g yo
```

To install generator-leviathan from npm, run:

```bash
$ npm install -g generator-leviathan
```

Finally, initiate the generator:

```bash
$ yo leviathan optionalAppName
```

### Recommended github and heroku setup:

run ```$ yo leviathan:deploy``` to setup both github and heroku automatically.

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
