(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
      i ? e['add' + l](n, f, 0) : e.attachEvent('on' + n, f)
    }
    return $
  }
  $.off = function (n, f, e, i) {
    if (!has.call($._e, n)) {return $}
    $._e[n].splice($._e[n].indexOf(f), 1)

    if (e && $._d(e)) {
      i = e['remove' + l]
      i ? e['remove' + l](n, f, 0) : e.detachEvent('on' + n, f)
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
}
Dush.mixin = function (r, s, c, k, j) {
  s = s || Dush
  c = r.constructor
  for (k in s) c[k] = s[k]
  c[p] = Object.create(s[p])
  for (j in r) c[p][j] = r[j]
  c.__super__ = p[p]
  return c
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy5udm0vdmVyc2lvbnMvaW8uanMvdjMuMC4wL2xpYi9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiFcbiAqIGR1c2ggPGh0dHBzOi8vZ2l0aHViLmNvbS90dW5uY2tvQ29yZS9kdXNoPlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNSBDaGFybGlrZSBNaWtlIFJlYWdlbnQgPEB0dW5uY2tvQ29yZT4gKGh0dHA6Ly93d3cudHVubmNrb2NvcmUudGspXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4gKi9cblxuLyoganNoaW50IGFzaTp0cnVlICovXG5cbid1c2Ugc3RyaWN0J1xuXG52YXIgbyA9ICdvdXRlckhUTUwnXG52YXIgbCA9ICdFdmVudExpc3RlbmVyJ1xudmFyIHAgPSAncHJvdG90eXBlJ1xudmFyIG9wID0gT2JqZWN0W3BdXG52YXIgaGFzID0gb3AuaGFzT3duUHJvcGVydHlcblxubW9kdWxlLmV4cG9ydHMgPSBEdXNoXG5cbmZ1bmN0aW9uIER1c2ggKCQpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIER1c2gpKSB7XG4gICAgcmV0dXJuIG5ldyBEdXNoKCQpXG4gIH1cbiAgJCA9ICQgfHwgdGhpc1xuICAkLl9lID0gJC5fZSB8fCB7fVxuICAkLl9kID0gZnVuY3Rpb24gKHYpIHtcbiAgICB2ID0gb3AudG9TdHJpbmcuY2FsbCh2KVxuICAgIHJldHVybiAvKD86SFRNTCk/KD86LiopRWxlbWVudC9naS50ZXN0KHYpXG4gIH1cbiAgJC5vbiA9IGZ1bmN0aW9uIChuLCBmLCBlLCBpKSB7XG4gICAgJC5fZVtuXSA9ICQuX2Vbbl0gfHwgW11cbiAgICAkLl9lW25dLnB1c2goZilcblxuICAgIGlmIChlICYmICQuX2QoZSkpIHtcbiAgICAgIGZbb10gPSBlW29dXG4gICAgICBpID0gZVsnYWRkJyArIGxdXG4gICAgICBpID8gZVsnYWRkJyArIGxdKG4sIGYsIDApIDogZS5hdHRhY2hFdmVudCgnb24nICsgbiwgZilcbiAgICB9XG4gICAgcmV0dXJuICRcbiAgfVxuICAkLm9mZiA9IGZ1bmN0aW9uIChuLCBmLCBlLCBpKSB7XG4gICAgaWYgKCFoYXMuY2FsbCgkLl9lLCBuKSkge3JldHVybiAkfVxuICAgICQuX2Vbbl0uc3BsaWNlKCQuX2Vbbl0uaW5kZXhPZihmKSwgMSlcblxuICAgIGlmIChlICYmICQuX2QoZSkpIHtcbiAgICAgIGkgPSBlWydyZW1vdmUnICsgbF1cbiAgICAgIGkgPyBlWydyZW1vdmUnICsgbF0obiwgZiwgMCkgOiBlLmRldGFjaEV2ZW50KCdvbicgKyBuLCBmKVxuICAgIH1cbiAgICByZXR1cm4gJFxuICB9XG4gICQub25jZSA9IGZ1bmN0aW9uIChuLCBmLCBlKSB7XG4gICAgZnVuY3Rpb24gaCAoKSB7XG4gICAgICAkLm9mZihuLCBoLCBlKVxuICAgICAgcmV0dXJuIGYuYXBwbHkoZSwgYXJndW1lbnRzKVxuICAgIH1cbiAgICByZXR1cm4gJC5vbihuLCBoLCBlKVxuICB9XG4gICQuZW1pdCA9IGZ1bmN0aW9uIChuLCBhLCBlLCBpLCBmLCBkKSB7XG4gICAgaWYgKCFoYXMuY2FsbCgkLl9lLCBuKSkge3JldHVybiAkfVxuICAgIGEgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSlcbiAgICBlID0gYVthLmxlbmd0aCAtIDFdXG4gICAgZCA9ICQuX2QoZSlcbiAgICBlID0gZCA/IGUgOiAkXG4gICAgYSA9IGQgPyBhLnNsaWNlKDAsIC0xKSA6IGFcblxuICAgIGZvciAoaSA9IDA7IGkgPCAkLl9lW25dLmxlbmd0aDsgaSsrKSB7XG4gICAgICBmID0gJC5fZVtuXVtpXVxuICAgICAgaWYgKGQgJiYgZltvXSAhPT0gZVtvXSkge1xuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuICAgICAgZi5hcHBseShlLCBhKVxuICAgIH1cbiAgICByZXR1cm4gJFxuICB9XG59XG5EdXNoLm1peGluID0gZnVuY3Rpb24gKHIsIHMsIGMsIGssIGopIHtcbiAgcyA9IHMgfHwgRHVzaFxuICBjID0gci5jb25zdHJ1Y3RvclxuICBmb3IgKGsgaW4gcykgY1trXSA9IHNba11cbiAgY1twXSA9IE9iamVjdC5jcmVhdGUoc1twXSlcbiAgZm9yIChqIGluIHIpIGNbcF1bal0gPSByW2pdXG4gIGMuX19zdXBlcl9fID0gcFtwXVxuICByZXR1cm4gY1xufVxuIl19
