/*!
 * dush <https://github.com/tunnckoCore/dush>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (https://i.am.charlike.online)
 * Released under the MIT license.
 */

function dush () {
  const all = Object.create(null)
  const app = {
    all,

    on (name, handler) {
      let e = all[name] || (all[name] = [])
      e.push(handler)

      return app
    },

    once (name, handler) {
      function fn (a, b, c) {
        app.off(name, fn)
        handler(a, b, c)
      }

      return app.on(name, fn)
    },

    off (name, handler) {
      if (handler && all[name]) {
        all[name].splice(all[name].indexOf(handler) >>> 0, 1)
      } else {
        all[name] = []
      }

      return app
    },

    emit (name, a, b, c) {
      (all[name] || []).map((handler) => { handler(a, b, c) });
      (all['*'] || []).map((handler) => { handler(name, a, b, c) })

      return app
    }
  }

  return app
}

export default dush
