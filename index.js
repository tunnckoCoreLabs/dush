/*!
 * dush <https://github.com/tunnckoCore/dush>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var o = 'outerHTML'
var l = 'EventListener'
var p = 'prototype'
var op = Object[p]
var has = op.hasOwnProperty

module.exports = Dush

function Dush ($) {
  if (!(this instanceof Dush)) {
    return new Dush($)
  }
  $ = $ || this
  $._e = $._e || {}
  $._d = function (v) {
    v = op.toString.call(v)
    return /(?:HTML)?(?:.*)Element/gi.test(v)
  }
  $.on = function (n, f, e, i) {
    $._e[n] = $._e[n] || []
    $._e[n].push(f)

    if (e && $._d(e)) {
      f[o] = e[o]
      i = e['add' + l]
      i ? i(n, f, 0) : e.attachEvent('on' + n, f)
    }
    return $
  }
  $.off = function (n, f, e, i) {
    if (!has.call($._e, n)) {return $}
    $._e[n].splice($._e[n].indexOf(f), 1)

    if (e && $._d(e)) {
      i = e['remove' + l]
      i ? i(n, f, 0) : e.detachEvent('on' + n, f)
    }
    return $
  }
  $.once = function (n, f, e) {
    function h () {
      $.off(n, h, e)
      return f.apply(e, arguments)
    }
    return $.on(n, h, e)
  }
  $.emit = function (n, a, e, i, f, d) {
    if (!has.call($._e, n)) {return $}
    a = [].slice.call(arguments, 1)
    e = a[a.length - 1]
    d = $._d(e)
    e = d ? e : $
    a = d ? a.slice(0, -1) : a

    for (i = 0; i < $._e[n].length; i++) {
      f = $._e[n][i]
      if (d && f[o] !== e[o]) {
        continue
      }
      f.apply(e, a)
    }
    return $
  }
  $.mixin = function (r, s, c, k, j) {
    s = s || $
    c = r.constructor
    for (k in s) c[k] = s[k]
    c[p] = Object.create(s[p])
    for (j in r) c[p][j] = r[j]
    c.__super__ = p[p]
    return c
  }
}
