/*!
 * dush <https://github.com/tunnckoCore/dush>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (https://i.am.charlike.online)
 * Released under the MIT license.
 */

'use strict'

/**
 * > A constructor function that returns an object
 * with a few methods.
 *
 * **Example**
 *
 * ```js
 * const dush = require('dush')
 * const emitter = dush()
 *
 * console.log(emitter.all) // => {}
 * console.log(emitter.on) // => Function
 * console.log(emitter.once) // => Function
 * console.log(emitter.off) // => Function
 * console.log(emitter.emit) // => Function
 * ```
 *
 * @name   dush
 * @return {Object} methods
 * @api public
 */

function dush () {
  const all = Object.create(null)
  const app = {
    /**
     * > An listeners map of all registered events
     * and their listeners. A key/value store, where 1) value
     * is an array of event listeners for the key and 2) key
     * is the name of the event.
     *
     * **Example**
     *
     * ```js
     * const dush = require('dush')
     * const emitter = dush()
     *
     * emitter.on('foo', () => {})
     * emitter.on('foo', () => {})
     * emitter.on('bar', () => {})
     *
     * console.log(emitter.all)
     * // => { foo: [Function, Function], bar: [Functon] }
     * ```
     */
    all,

    /**
     * > Add `handler` for `name` event.
     *
     * **Example**
     *
     * ```js
     * emitter
     *   .on('hi', (place) => {
     *     console.log('hello', place) // => 'hello world'
     *   })
     *   .on('hi', (place) => {
     *     console.log('hello', place) // => 'hello world'
     *   })
     *
     * emitter.emit('hi', 'world')
     * ```
     *
     * @name   .on
     * @param  {String} `name` Type of event to listen for, or `'*'` for all events
     * @param  {String} `handler` Function to call in response to given event
     * @return {Object} The `dush` instance for chaining
     * @api public
     */

    on (name, handler) {
      let e = all[name] || (all[name] = [])
      e.push(handler)

      return app
    },

    /**
     * > Add `handler` for `name` event that
     * will be called only one time
     *
     * **Example**
     *
     * ```js
     * const called = 0
     *
     * emitter.once('foo', () => {
     *   console.log('called only once')
     *   called++
     * })
     *
     * emitter
     *   .emit('foo')
     *   .emit('foo')
     *   .emit('foo')
     *
     * console.log(called) // => 1
     * ```
     *
     * @name   .once
     * @param  {String} `name` Type of event to listen for, or `'*'` for all events
     * @param  {String} `handler` Function to call in response to given event
     * @return {Object} The `dush` instance for chaining
     * @api public
     */

    once (name, handler) {
      function fn (a, b, c) {
        app.off(name, fn)
        handler(a, b, c)
      }

      return app.on(name, fn)
    },

    /**
     * > Remove `handler` for `name` event. If `handler` not
     * passed will remove **all** listeners for that `name` event.
     *
     * **Example**
     *
     * ```js
     * const handler = () => {
     *   console.log('not called')
     * }
     *
     * emitter
     *   .on('foo', handler)
     *   .on('foo', (abc) => {
     *     console.log('called', abc) // => 'called 123'
     *   })
     *   .off('foo', handler)
     *   .emit('foo', 123)
     *
     * // or removing all listeners of `foo`
     * emitter.off('foo')
     * emitter.emit('foo')
     * ```
     *
     * @name   .off
     * @param  {String} `name` Type of event to listen for, or `'*'` for all events
     * @param  {String} `handler` Function to call in response to given event
     * @return {Object} The `dush` instance for chaining
     * @api public
     */

    off (name, handler) {
      if (handler && all[name]) {
        all[name].splice(all[name].indexOf(handler) >>> 0, 1)
      } else {
        all[name] = []
      }

      return app
    },

    /**
     * > Invoke all handlers for given `name` event.
     * If present, `'*'` listeners are invoked too with `(type, ...rest)` signature,
     * where the `type` argument is a string representing the name of the
     * called event; and all of the rest arguments
     *
     * **Example**
     *
     * ```js
     * emitter.on('*', (name, a, b, c) => {
     *   console.log('name is', name)
     *   console.log('rest args', a, b, c)
     * })
     *
     * emitter.on('foo', (a, b, c) => {
     *   console.log(a, b, c) // => 1 2  3
     * })
     *
     * emitter.emit('foo', 1, 2, 3)
     * emitter.emit('bar', 555)
     * ```
     *
     * @name   .emit
     * @param  {String} `name` The name of the event to invoke
     * @param  {any} `args` Any number of arguments of any type of value, passed to each listener
     * @return {Object} The `dush` instance for chaining
     * @api public
     */

    emit (name, a, b, c) {
      (all[name] || []).map((handler) => { handler(a, b, c) });
      (all['*'] || []).map((handler) => { handler(name, a, b, c) })

      return app
    }
  }

  return app
}

export default dush
