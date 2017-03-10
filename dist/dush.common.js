'use strict';

/*!
 * dush <https://github.com/tunnckoCore/dush>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (https://i.am.charlike.online)
 * Released under the MIT license.
 */

function dush () {
  var all = Object.create(null);
  var app = {
    all: all,

    on: function on (name, handler) {
      var e = all[name] || (all[name] = []);
      e.push(handler);

      return app
    },

    once: function once (name, handler) {
      function fn (a, b, c) {
        app.off(name, fn);
        handler(a, b, c);
      }

      return app.on(name, fn)
    },

    off: function off (name, handler) {
      if (handler && all[name]) {
        all[name].splice(all[name].indexOf(handler) >>> 0, 1);
      } else {
        all[name] = [];
      }

      return app
    },

    emit: function emit (name, a, b, c) {
      (all[name] || []).map(function (handler) { handler(a, b, c); });
      (all['*'] || []).map(function (handler) { handler(name, a, b, c); });

      return app
    }
  };

  return app
}

module.exports = dush;
