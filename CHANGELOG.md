<a name="1.1.4"></a>
### 1.1.4 (2015-02-07)


#### Bug Fixes

* **_package.json:** bump version of grunt-ng-annotate to 0.9.2 to successfully annotate app ([2ec363ab](https://github.com/columbiajs/generator-columbia-angular/commit/2ec363ab37a28f74b86914fe5da677d7dc2f2d2a))


<a name="1.1.3"></a>
### 1.1.3 (2015-02-07)


<a name="1.1.2"></a>
### 1.1.2 (2015-02-07)


#### Bug Fixes

* **index.js:**
  * yeoman logger doesn't seem to be available in deploy child process, so log to co ([700051db](https://github.com/columbiajs/generator-columbia-angular/commit/700051db77bd11ffcd67216b2820e621bca55824))
  * install npm and then bower to get correct messages for bower conflicts ([9a2ec76b](https://github.com/columbiajs/generator-columbia-angular/commit/9a2ec76b7c60c3f43b2a4652ebbe5be2902f6200))
* **injector.js:** add in file checks to prevent injecting tests into index.html, which then get ug ([1ce74df2](https://github.com/columbiajs/generator-columbia-angular/commit/1ce74df27a4a3d0abcb2753c817d25cb30b2d7f2))
* **lvAuthWidget.spec.js:** modify test for displayLogin so all tests pass, closes #16 ([eb44fa4f](https://github.com/columbiajs/generator-columbia-angular/commit/eb44fa4f6d900b3ebb746ad5927d0b0e3885748a))
* **lvUserService.spec.js:** rename improperly named spec file, closes #26 ([ba11a914](https://github.com/columbiajs/generator-columbia-angular/commit/ba11a914f7b56385296b2c0e1f17ce26669ac717))
* **nav-menu.html:** fix broken nav dropdown with new require attributes from angular-bootstrap, fixe ([ec1a14b3](https://github.com/columbiajs/generator-columbia-angular/commit/ec1a14b365c908f907cd7d320994057324467eda))
* **package.json:** fix repository info so that the url enables conventional changelog to generate t ([c1e1a07e](https://github.com/columbiajs/generator-columbia-angular/commit/c1e1a07e167490f7c0f0b0292f65357dee88540b))
* **style.scss:** use protocol-related url (by not specifying http) so it can be loaded in secure  ([d7f72ff6](https://github.com/columbiajs/generator-columbia-angular/commit/d7f72ff6e6e343ae3685d8e70e0c261b975fe88b))


#### Features

* **_package.json:** use organizationname for github url, update repo description, closes #13 ([393d9f1c](https://github.com/columbiajs/generator-columbia-angular/commit/393d9f1c03febfaca0d63a54e1a7a04c2c54b3ee))
* **externalServicesPrompts.js:** add organizationname (github username or organization) to prompts ([e82b6833](https://github.com/columbiajs/generator-columbia-angular/commit/e82b68337263b246649462697e9c5db566c49090))


<a name="1.1.1"></a>
### 1.1.1 (2014-11-23)


#### Bug Fixes

* **Gruntfile:** add grunt-conventional-changelog to just-in-time static mappings for template ap ([c3f7d34d](https://github.com/leviathantech/generator-leviathan/commit/c3f7d34dcb3e90bd7d36115b870cabfe226ccdab))
* **UserDataService.spec:** misspelled jshint comment ([2c79d7f3](https://github.com/leviathantech/generator-leviathan/commit/2c79d7f3e9631c25b713aea03662bcf03fa71f12))
* **changelog:** changelog not automatically committed and pushed during bump ([c4b59535](https://github.com/leviathantech/generator-leviathan/commit/c4b595357c6f17fdb6975e9949386f46c640f667))
* **config:** fix gruntfile to ensure dev server runs with devlopment db ([937cde81](https://github.com/leviathantech/generator-leviathan/commit/937cde811fbceddec2d69421a9675ecf11dea3a8))


#### Features

* **db:** add custom mongoose plugins for timestamps and paranoidDelete on models ([3f7d7db6](https://github.com/leviathantech/generator-leviathan/commit/3f7d7db61008b7328ddf2483ff4220edcf4aeac1))
* **grunt:** upgrade Gruntfile and tasks ([6c492b3c](https://github.com/leviathantech/generator-leviathan/commit/6c492b3cc5140c50afd325e57d4aa5348d0695cb))
* **releases:** add grunt-conventional-changelog and grunt-release to automate version releases  ([0f81f02d](https://github.com/leviathantech/generator-leviathan/commit/0f81f02d5518cb3b979d983225022c54d9b04eb8))
* **user:** add UserDataService for seeding and searching user ([bd631ded](https://github.com/leviathantech/generator-leviathan/commit/bd631dedd8c8978784decd9b40d4f03e3a6ccc84))
* **user.model:** add timestamps plugin, add accountStatus, require lowercase for email, improve c ([ac20ea15](https://github.com/leviathantech/generator-leviathan/commit/ac20ea15efbc7f251f0279baa0205cfcd55be688))


<a name="1.0.0"></a>
## 1.0.0 (2014-11-04)


#### Bug Fixes

* **deployPrompts:** fix string parsing in deployPrompts and give useful message on heroku push ([ab60f303](https://github.com/leviathantech/generator-leviathan/commit/ab60f30385ff7b0c1453ab31016ed9393876aca5))
* **errors:** add temporary errors module for handling server-side errors ([da819829](https://github.com/leviathantech/generator-leviathan/commit/da81982940cb3588ebafcea303a443cc1e215366))
* **gruntfile:** remove extra semicolon from config mochaTest ([6418a0d5](https://github.com/leviathantech/generator-leviathan/commit/6418a0d5cf4837410813ec0cbe85000b9bb909ba))
* **server.js:** surround with iife, export for require ([0488adf1](https://github.com/leviathantech/generator-leviathan/commit/0488adf155ef56d6134db04f1285d75cedf5b8a0))


#### Features

* **Gruntfile:** add mochaTest task and multiple targets to grunt test ([8e584a9b](https://github.com/leviathantech/generator-leviathan/commit/8e584a9b20b6a39830f5302fa0810e512f071bb5))
* **auth.service:** add role to token payload and hasRole check for route middleware ([a5fc0520](https://github.com/leviathantech/generator-leviathan/commit/a5fc0520966840594723f7aff5ed7adb608d58a1))
* **config:** add config for test, add test db, add morgan formatting ([ec335289](https://github.com/leviathantech/generator-leviathan/commit/ec3352897db9d06db33052da728ffabe8b7b51d4))
* **user:** add full user capabilities and server-side tests ([4578d8d7](https://github.com/leviathantech/generator-leviathan/commit/4578d8d7f0fb746ea4860ad1fca41a1d5fd7224c))
* **versioning:** add grunt task bump:type for running conventional changelog and release tasks ([c51ec138](https://github.com/leviathantech/generator-leviathan/commit/c51ec138f01782cb01b9708401b321c751a3f35a))


<a name="1.0.0"></a>
## 1.0.0 (2014-10-19)
