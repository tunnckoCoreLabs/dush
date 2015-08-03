/*!
 * dush <https://github.com/tunnckoCore/dush>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var test = require('assertit')
var Dush = require('./index')

test('dush:', function () {
  test('should listen `.on` custom event `.emit` few times', function (done) {
    var emitter = new Dush()
    var count = 0
    var results = []

    emitter
      .on('custom', function onCustom (a, b) {
        count++
        results.push([a, b])
      })
      .emit('custom', 'foo', 123)
      .emit('custom', 'bar')
      .emit('custom')

    test.equal(count, 3)
    test.deepEqual(results[0], ['foo', 123])
    test.deepEqual(results[1], ['bar', undefined])
    test.deepEqual(results[2], [undefined, undefined])
    done()
  })
  test('should listen `.once` custom event `.emit` few times', function (done) {
    var emitter = new Dush()
    var count = 0

    emitter
      .once('custom', function () {
        count++
      })
      .emit('custom')
      .emit('custom')
      .emit('custom')

    test.equal(count, 1)
    done()
  })
  test('should `.off` event listener after second `.emit`', function (done) {
    var emitter = new Dush()
    var count = 0

    function handler () {
      if (count === 2) {
        emitter.off('custom', handler)
        return
      }
      count++
    }

    emitter
      .on('custom', handler)
      .emit('custom')
      .emit('custom')
      .emit('custom')
      .emit('custom')

    test.equal(count, 2)
    done()
  })
  test('should `this` at `.on/.once` be Dush when not DOM usage', function (done) {
    var emitter = new Dush()

    emitter
      .on('custom', function () {
        test.equal(typeof this.once, 'function')
        done()
      })
      .emit('custom')
  })
  test('should support multiple `.on` event', function (done) {
    var emitter = new Dush()
    var count = 0

    function handler () {
      count++
    }

    emitter
      .on('custom', handler)
      .on('custom', handler)
      .on('custom', handler)
      .emit('custom')

    test.equal(count, 3)
    done()
  })
  test('should mixin correctly', function (done) {
    function App () {
      Dush.call(this)
      this.foo = 'bar'
    }

    Dush.mixin(App.prototype)

    App.prototype.hello = function () {
      var self = this
      this.on('hi', function (hi) {
        test.equal(self.foo, 'bar')
        test.equal(hi, 'world')
        done()
      })
      return this
    }

    var app = new App()
    app
      .hello()
      .emit('hi', 'world')
  })
})
