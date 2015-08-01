# [dush][author-www-url] [![npmjs.com][npmjs-img]][npmjs-url] [![The MIT License][license-img]][license-url] 

> :clap: Minimalist [npm.im/dual-emitter][dual-emitter] observer - event handling for the browser (IE8+) and nodejs.

[![code climate][codeclimate-img]][codeclimate-url] [![standard code style][standard-img]][standard-url] [![travis build status][travis-img]][travis-url] [![coverage status][cov-img]][cov-url] [![dependency status][david-img]][david-url]


## Install
```
npm i dush --save
npm test
```


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
