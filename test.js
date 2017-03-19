/*!
 * dush <https://github.com/tunnckoCore/dush>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (https://i.am.charlike.online)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var test = require('mukla')
var dush = require('./dist/dush.common')
var app = dush()

test('should return an instance with methods and `.all` object', function (done) {
  test.strictEqual(typeof app.all, 'object')
  test.strictEqual(typeof app.use, 'function')
  test.strictEqual(typeof app.on, 'function')
  test.strictEqual(typeof app.off, 'function')
  test.strictEqual(typeof app.once, 'function')
  test.strictEqual(typeof app.emit, 'function')
  done()
})

test('should instace has .all object that contains all handlers', function (done) {
  var fn = function () {}

  app.on('aaa', fn)
  app.on('aaa', fn)
  app.on('bbb', fn)
  app.on('ccc', fn)
  app.on('ccc', fn)
  app.on('ccc', fn)

  test.deepStrictEqual(Object.keys(app.all), ['aaa', 'bbb', 'ccc'])
  test.strictEqual(app.all.aaa.length, 2)
  test.strictEqual(app.all.bbb.length, 1)
  test.strictEqual(app.all.ccc.length, 3)
  app.emit('zzz')
  done()
})

test('should register handlers for any type of string', function (done) {
  var app = dush()
  app.on('constructor', function (a) {
    test.ok(a === 2)
  })
  app.emit('constructor', 2)
  done()
})

test('should .emit with multiple params (maximum 3)', function (done) {
  var emitter = dush()
  emitter.on('foo', function (a, b) {
    test.strictEqual(a, 'aaa')
    test.strictEqual(b, 'bbb')
  })

  emitter.emit('foo', 'aaa', 'bbb')
  done()
})

test('should .on register multiple handlers', function (done) {
  var called = 0
  var fn = function (a) {
    called++
    test.strictEqual(a, 123)
  }

  app.on('foo', fn)
  app.on('foo', fn)
  app.emit('foo', 123)

  test.strictEqual(called, 2)
  done()
})

test('should handlers added with .once be called one time only', function (done) {
  var called = 0
  app.once('bar', function () {
    called++
  })

  app.emit('bar')
  app.emit('bar')
  app.emit('bar')

  test.strictEqual(called, 1)
  done()
})

test('should .off("foo", fn) remove the handler', function (done) {
  var called = 0
  var second = 0
  var fn = function () {
    called++
  }

  app.on('qux', fn)
  app.on('qux', function () {
    second = 1
  })
  app.off('qux', fn)
  app.emit('qux')

  test.strictEqual(called, 0)
  test.strictEqual(second, 1)
  test.strictEqual(app.all.qux.length, 1)
  done()
})

test('should .off("foo") remove all "foo" handlers', function (done) {
  app
    .on('zzz', function () {})
    .on('zzz', function () {})
    .off('zzz')

  test.strictEqual(app.all.zzz.length, 0)
  done()
})

test('should all methods be chainable', function (done) {
  var called = 0
  var foo = app.on('foo', function () {})
  test.ok(foo.once)

  var bar = foo.once('bar', function () {
    called++
  })
  test.ok(bar.emit)

  var qux = bar.emit('bar')
  test.ok(qux.off)

  qux.off('bar').emit('bar')
  test.strictEqual(called, 1)
  done()
})

test('should have wildcard event', function (done) {
  var app = dush()
  app.on('*', function (name, nume) {
    test.strictEqual(name, 'haha')
    test.strictEqual(nume, 444444)
  })
  app.emit('haha', 444444)
  done()
})

test('should return app if .use(plugin) dont', function (done) {
  var app = dush()
  app
    .use(function (app) {
      app.foo = 'bar'
    })
    .use(function (app) {
      app.baz = 12345
      return app
    })
    .use(function (app) {
      app.qux = 'zzz'
    })

  test.strictEqual(app.foo, 'bar')
  test.strictEqual(app.baz, 12345)
  test.strictEqual(app.qux, 'zzz')
  done()
})

test('should not allow emitting the wildcard (issue#5)', function (done) {
  var emitter = dush()

  emitter.on('*', function (name, a, b, c) {
    test.strictEqual(name, 'foo')
    test.strictEqual(a, 1)
    test.strictEqual(b, 2)
    test.strictEqual(c, 3)
  })
  emitter.on('foo', function (a, b, c) {
    test.strictEqual(a, 1)
    test.strictEqual(b, 2)
    test.strictEqual(c, 3)
  })

  emitter.emit('*', 4, 5, 6)
  emitter.emit('foo', 1, 2, 3)
  emitter.emit('*', 555)
  done()
})

test('should not add additional arguments when emit', function (done) {
  var app = dush()
  app.on('foo', function () {
    // prev versions was calling the handler
    // with `undefined, undefined, undefined` event if
    // `.emit` don't pass any arguments...
    test.strictEqual(arguments.length, 1)
    done()
  })

  app.emit('foo', 1)
})

test('should support to emit any number of arguments', function (done) {
  dush()
    .on('zazzie', function (aa, bb, cc, dd, ee) {
      test.strictEqual(aa, 1)
      test.strictEqual(bb, 2)
      test.strictEqual(cc, 3)
      test.strictEqual(dd, 4)
      test.strictEqual(ee, 5)
      done()
    })
    .emit('zazzie', 1, 2, 3, 4, 5)
})

test('should be able to pass context to listener', function (done) {
  function listener (hi) {
    test.strictEqual(hi, 'hello world')
    test.strictEqual(this.aaa, 'bbb')
    done()
  }

  var ctx = { aaa: 'bbb' }
  var app = dush()
  app.on('ctx', listener.bind(ctx))
  app.once('ctx', listener.bind(ctx))
  app.emit('ctx', 'hello world')
})

test('should context of listener be the listener', function (done) {
  function fnc () {
    test.strictEqual(typeof this, 'function')
    done()
  }
  app.on('func', fnc)
  app.emit('func')
})

test('should be able to `.off` the `.once` listeners (issue #7)', function (done) {
  var emitter = dush()
  var called = 0

  function hello () {
    called++
  }

  emitter.once('test', hello)
  emitter.emit('test')
  emitter.emit('test')
  test.strictEqual(called, 1)
  emitter.off('test', hello)
  emitter.emit('test')
  test.strictEqual(called, 1)
  done()
})

test('should `.on` work as `.once` if third argument is true', function (done) {
  var emitter = dush()
  var calls = 0
  function fn () {
    calls++
  }
  emitter.on('onetime', fn, true)
  emitter.emit('onetime')
  test.strictEqual(calls, 1)
  done()
})

test('should `.off()` remove all listeners', function (done) {
  var app = dush()
  var fixture = function () {}
  app.on('a', fixture)
  app.once('a', fixture)
  app.on('a', fixture)
  app.on('b', fixture)
  app.once('b', fixture)
  app.on('c', fixture)

  var evts = Object.keys(app.all)
  test.strictEqual(evts.length, 3)
  test.strictEqual(app.all.a.length, 3)
  test.strictEqual(app.all.b.length, 2)
  test.strictEqual(app.all.c.length, 1)

  app.off()
  var allEvents = Object.keys(app.all)
  test.strictEqual(allEvents.length, 0)
  done()
})
