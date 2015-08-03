# [dush][author-www-url] [![npmjs.com][npmjs-img]][npmjs-url] [![The MIT License][license-img]][license-url] 

> :clap: Minimalist [npm.im/dual-emitter][dual-emitter] observer - event handling for the browser (IE8+) and nodejs.

[![code climate][codeclimate-img]][codeclimate-url] [![standard code style][standard-img]][standard-url] [![travis build status][travis-img]][travis-url] [![coverage status][cov-img]][cov-url] [![dependency status][david-img]][david-url]

*PRs welcome for client-side tests*

## Install
```
npm i dush --save
npm test
```


## Features
- minimal, yet simple to use - [demo in jsbin](http://jsbin.com/qiqirunoju/1/edit?js,console,output)
- zero dependencies - just [1.5kb minified](./dist/dush.standalone.min.js)
- works on every browser, should **even works on IE8**
- works on the server with just `require('dush')`
- plays well with [browserify.org](http://browserify.org)
- have `.on`, `.off`, `.once` and `.emit` methods


## Use it
- [dist/dush.min.js](./dist/dush.min.js) (*1.5kb*)
- [dist/dush.standalone.min.js](./dist/dush.standalone.min.js) (*1.7kb*)
- [dush on JSDelivr CDN](http://www.jsdelivr.com/#!dush)


## Usage
> For more use-cases see the [tests](./test.js)

```js
var dush = require('dush')

function handler (numbers) {
  console.log(numbers)
}

dush()
  .on('custom', handler)
  .emit('custom', 123)
  .emit('custom', 456)


// or even listen DOM events
var emitter = dush()
var el = document.body.querySelector('.link')

function onClick (e) {
  e.preventDefault()
  emitter.off('click', onClick, el)
  console.log('can be clicked one time only')
}

function onMouseOver (e) {
  e.preventDefault()
  console.log('only once on hover')
}

emitter
  .on('click', onClick, el)
  .on('custom', console.log)
  .once('mouseover', onMouseOver, el)
  .emit('custom', Math.random())
  .emit('custom', Math.random())
  .emit('custom', Math.random())
```


### Dush.mixin
> You can mixin `Dush` (prototype) into your app/class.

**Example**

```js
var Dush = require('dush')

function App () {
  Dush.call(this)
  this.foo = 'bar'
}

Dush.mixin(App.prototype)

App.prototype.hello = function () {
  var self = this
  this.on('hi', function (hi) {
    console.log(self.foo, hi)
  })
  return this
}

var app = new App()
app
  .hello() //=> 'bar world'
  .emit('hi', 'world')
```


## Related
- [benz](https://github.com/tunnckocore/benz): Compose your control flow with absolute elegance. Support async/await, callbacks, thunks, generators, promises, observables, child… [more](https://github.com/tunnckocore/benz)
- [browserify](https://github.com/substack/node-browserify): browser-side require() the node way
- [dual-emitter](https://github.com/tunnckocore/dual-emitter): :tropical_drink: EventEmitter done right and no dependencies. For nodejs and the browser (>= IE8). Can… [more](https://github.com/tunnckocore/dual-emitter)
- [j140](https://github.com/tunnckoCore/j140): Javascript template engine in just 140 bytes, for browser and node - by Jed Schmidt
- [minigrid](https://github.com/henriquea/minigrid): Minimal 2kb zero dependency cascading grid layout
- [riot](https://muut.com/riotjs/): A React- like, 3.5K user interface library
- [uglify-js](http://lisperator.net/uglifyjs): JavaScript parser, mangler/compressor and beautifier toolkit
- [vez](https://github.com/tunnckocore/vez): Middleware composition at new level. Ultimate alternative to `ware`, `plugins`, `koa-compose` and `composition` packages. Allows… [more](https://github.com/tunnckocore/vez)


## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/tunnckoCore/dush/issues/new).  
But before doing anything, please read the [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines.


## [Charlike Make Reagent](http://j.mp/1stW47C) [![new message to charlike][new-message-img]][new-message-url] [![freenode #charlike][freenode-img]][freenode-url]

[![tunnckocore.tk][author-www-img]][author-www-url] [![keybase tunnckocore][keybase-img]][keybase-url] [![tunnckoCore npm][author-npm-img]][author-npm-url] [![tunnckoCore twitter][author-twitter-img]][author-twitter-url] [![tunnckoCore github][author-github-img]][author-github-url]

[dual-emitter]: https://github.com/tunnckoCore/dual-emitter

[npmjs-url]: https://www.npmjs.com/package/dush
[npmjs-img]: https://img.shields.io/npm/v/dush.svg?label=dush

[license-url]: https://github.com/tunnckoCore/dush/blob/master/LICENSE.md
[license-img]: https://img.shields.io/badge/license-MIT-blue.svg


[codeclimate-url]: https://codeclimate.com/github/tunnckoCore/dush
[codeclimate-img]: https://img.shields.io/codeclimate/github/tunnckoCore/dush.svg

[cov-url]: https://codeclimate.com/github/tunnckoCore/dush
[cov-img]: https://img.shields.io/codeclimate/coverage/github/tunnckoCore/dush.svg

[travis-url]: https://travis-ci.org/tunnckoCore/dush
[travis-img]: https://img.shields.io/travis/tunnckoCore/dush.svg

[coveralls-url]: https://coveralls.io/r/tunnckoCore/dush
[coveralls-img]: https://img.shields.io/coveralls/tunnckoCore/dush.svg

[david-url]: https://david-dm.org/tunnckoCore/dush
[david-img]: https://img.shields.io/david/dev/tunnckoCore/dush.svg

[standard-url]: https://github.com/feross/standard
[standard-img]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg


[author-www-url]: http://www.tunnckocore.tk
[author-www-img]: https://img.shields.io/badge/www-tunnckocore.tk-fe7d37.svg

[keybase-url]: https://keybase.io/tunnckocore
[keybase-img]: https://img.shields.io/badge/keybase-tunnckocore-8a7967.svg

[author-npm-url]: https://www.npmjs.com/~tunnckocore
[author-npm-img]: https://img.shields.io/badge/npm-~tunnckocore-cb3837.svg

[author-twitter-url]: https://twitter.com/tunnckoCore
[author-twitter-img]: https://img.shields.io/badge/twitter-@tunnckoCore-55acee.svg

[author-github-url]: https://github.com/tunnckoCore
[author-github-img]: https://img.shields.io/badge/github-@tunnckoCore-4183c4.svg

[freenode-url]: http://webchat.freenode.net/?channels=charlike
[freenode-img]: https://img.shields.io/badge/freenode-%23charlike-5654a4.svg

[new-message-url]: https://github.com/tunnckoCore/messages
[new-message-img]: https://img.shields.io/badge/send%20me-message-green.svg
