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
  app.on('varructor', function (a) {
    test.ok(a === 2)
  })
  app.emit('varructor', 2)
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

test('should handler should not get 4th param', function (done) {
  var app = dush()
  app.once('quxie', function (a, b, c, d) {
    test.strictEqual(a, 1)
    test.strictEqual(b, 2)
    test.strictEqual(c, 3)
    test.strictEqual(d, undefined)
  })
  app.emit('quxie', 1, 2, 3, 4)
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
