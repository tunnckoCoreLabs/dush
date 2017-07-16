'use strict';

/*!
 * dush <https://github.com/tunnckoCore/dush>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (https://i.am.charlike.online)
 * Released under the MIT license.
 */

/**
 * > A constructor function that returns an object
 * with a few methods.
 *
 * See [JSBin Example](http://jsbin.com/mepemeluhi/edit?js,console).
 *
 * **Example**
 *
 * ```js
 * const dush = require('dush')
 * const emitter = dush()
 *
 * console.log(emitter._allEvents) // => {}
 * console.log(emitter.on) // => Function
 * console.log(emitter.once) // => Function
 * console.log(emitter.off) // => Function
 * console.log(emitter.emit) // => Function
 * ```
 *
 * @name   dush()
 * @return {Object} methods
 * @api public
 */

function dush () {
  var _allEvents = Object.create(null);
  var app = {
    /**
     * > An listeners map of all registered events
     * and their listeners. A key/value store, where 1) value
     * is an array of event listeners for the key and 2) key
     * is the name of the event.
     *
     * See [JSBin Example](http://jsbin.com/fakajazafu/edit?js,console).
     *
     * **Example**
     *
     * ```js
     * const emitter = dush()
     *
     * emitter.on('foo', () => {})
     * emitter.on('foo', () => {})
     * emitter.on('bar', () => {})
     *
     * console.log(emitter._allEvents)
     * // => { foo: [Function, Function], bar: [Functon] }
     *
     * console.log(emitter._allEvents.foo.length) // => 2
     * console.log(emitter._allEvents.bar.length) // => 1
     * ```
     *
     * @name  ._allEvents
     * @type {Object} `_allEvents` a key/value store of all events and their listeners
     * @api public
     */

    _allEvents: _allEvents,

    /**
     * > Invokes `plugin` function immediately, which is passed
     * with `app` instance. You can use it for adding more methods
     * or properties to the instance. Useful if you want to make
     * dush to work with DOM for example.
     *
     * **Example**
     *
     * ```js
     * const app = dush()
     *
     * app.on('hi', (str) => {
     *   console.log(str) // => 'Hello World!!'
     * })
     *
     * app.use((app) => {
     *   app.foo = 'bar'
     *   app.hello = (place) => app.emit('hi', `Hello ${place}!!`)
     * })
     *
     * console.log(app.foo) // => 'bar'
     * app.hello('World')
     * ```
     *
     * @name   .use
     * @param  {Function} `plugin` A function passed with `(app, options)` signature
     * @param  {Object} `options` optional, passed as second argument to `plugin` function
     * @return {Object} self "app" for chaining
     * @api public
     */

    use: function use (plugin, options) {
      var ret = plugin(app, options);
      return ret || app
    },

    /**
     * > Add `handler` for `name` event.
     *
     * See [JSBin Example](http://jsbin.com/xeketuruto/edit?js,console).
     *
     * **Example**
     *
     * ```js
     * const emitter = dush()
     *
     * emitter
     *   .on('hi', (place) => {
     *     console.log(`hello ${place}!`) // => 'hello world!'
     *   })
     *   .on('hi', (place) => {
     *     console.log(`hi ${place}, yeah!`) // => 'hi world, yeah!'
     *   })
     *
     * emitter.emit('hi', 'world')
     * ```
     *
     * @name   .on
     * @param  {String} `name` Type of event to listen for, or `'*'` for all events
     * @param  {Function} `handler` Function to call in response to given event
     * @param  {Boolean} `once` Make `handler` be called only once,
     *                          the `.once` method use this internally
     * @return {Object} self "app" for chaining
     * @api public
     */

    on: function on (name, handler, once) {
      var e = app._allEvents[name] || (app._allEvents[name] = []);

      function func () {
        if (!func.called) {
          app.off(name, func);
          handler.apply(handler, arguments);
          func.called = true;
        }
      }

      var fn = once ? func : handler;
      fn.__sourceString = handler.toString();

      e.push(fn);
      return app
    },

    /**
     * > Add `handler` for `name` event that
     * will be called only one time.
     *
     * See [JSBin Example](http://jsbin.com/teculorima/edit?js,console).
     *
     * **Example**
     *
     * ```js
     * const emitter = dush()
     * let called = 0
     *
     * emitter.once('foo', () => {
     *   console.log('called only once')
     *   called++
     * })
     *
     * emitter
     *   .emit('foo', 111)
     *   .emit('foo', 222)
     *   .emit('foo', 333)
     *
     * console.log(called) // => 1
     * ```
     *
     * @name   .once
     * @param  {String} `name` Type of event to listen for, or `'*'` for all events
     * @param  {Function} `handler` Function to call in response to given event
     * @return {Object} self "app" for chaining
     * @api public
     */

    once: function once (name, handler) {
      app.on(name, handler, true);
      return app
    },

    /**
     * > Remove `handler` for `name` event. If `handler` not
     * passed will remove **all** listeners for that `name` event.
     *
     * See [JSBin Example](http://jsbin.com/nujucoquvi/3/edit?js,console).
     *
     * **Example**
     *
     * ```js
     * const emitter = dush()
     *
     * const handler = () => {
     *   console.log('not called')
     * }
     *
     * emitter.on('foo', handler)
     * emitter.off('foo', handler)
     *
     * emitter.on('foo', (abc) => {
     *   console.log('called', abc) // => 'called 123'
     * })
     * emitter.emit('foo', 123)
     *
     * // or removing all listeners of `foo`
     * emitter.off('foo')
     * emitter.emit('foo')
     * ```
     *
     * @name   .off
     * @param  {String} `name` Type of event to listen for, or `'*'` for all events
     * @param  {Function} `handler` Function to call in response to given event
     * @return {Object} self "app" for chaining
     * @api public
     */

    off: function off (name, handler) {
      if (handler && app._allEvents[name]) {
        var fnStr = handler.toString();
        app._allEvents[name] = app._allEvents[name].filter(
          function (func) { return func.__sourceString !== fnStr; }
        );
      } else if (name) {
        app._allEvents[name] = [];
      } else {
        app._allEvents = Object.create(null);
      }

      return app
    },

    /**
     * > Invoke all handlers for given `name` event.
     * If present, `'*'` listeners are invoked too with `(type, ...rest)` signature,
     * where the `type` argument is a string representing the name of the
     * called event; and all of the rest arguments.
     *
     * See [JSBin Example](http://jsbin.com/muqujavolu/edit?js,console).
     *
     * **Example**
     *
     * ```js
     * const emitter = dush()
     *
     * emitter.on('foo', (a, b, c) => {
     *   console.log(`${a}, ${b}, ${c}`) // => 1, 2, 3
     * })
     *
     * emitter.on('*', (name, a, b, c) => {
     *   console.log(`name is: ${name}`)
     *   console.log(`rest args are: ${a}, ${b}, ${c}`)
     * })
     *
     * emitter.emit('foo', 1, 2, 3)
     * emitter.emit('bar', 555)
     * ```
     *
     * @name   .emit
     * @param  {String} `name` The name of the event to invoke
     * @param  {any} `args` Any number of arguments of any type of value, passed to each listener
     * @return {Object} self "app" for chaining
     * @api public
     */

    emit: function emit (name) {
      if (name !== '*') {
        var args = [].slice.call(arguments);(app._allEvents[name] || []).map(function (handler) {
          handler.apply(handler, args.slice(1));
        })
        ;(app._allEvents['*'] || []).map(function (handler) {
          handler.apply(handler, args);
        });
      }

      return app
    }
  };

  return app
}

module.exports = dush;
