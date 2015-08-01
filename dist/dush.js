(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
 * dush <https://github.com/tunnckoCore/dush>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

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
  $.on = function (n, f, e) {
    $._e[n] = $._e[n] || []
    $._e[n].push(f)

    if (e && $._d(e)) {
      f[o] = e[o]
      e['add' + l] ? e['add' + l](n, f, 0) : e.attachEvent('on' + n, f)
    }
    return $
  }
  $.off = function (n, f, e) {
    if (!has.call($._e, n)) {return $}
    $._e[n].splice($._e[n].indexOf(f), 1)

    if (e && $._d(e)) {
      e['remove' + l] ? e['remove' + l](n, f, 0) : e.detachEvent('on' + n, f)
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy5udm0vdmVyc2lvbnMvaW8uanMvdjIuNC4wL2xpYi9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyohXG4gKiBkdXNoIDxodHRwczovL2dpdGh1Yi5jb20vdHVubmNrb0NvcmUvZHVzaD5cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUgQ2hhcmxpa2UgTWlrZSBSZWFnZW50IDxAdHVubmNrb0NvcmU+IChodHRwOi8vd3d3LnR1bm5ja29jb3JlLnRrKVxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICovXG5cbid1c2Ugc3RyaWN0J1xuXG52YXIgbyA9ICdvdXRlckhUTUwnXG52YXIgbCA9ICdFdmVudExpc3RlbmVyJ1xudmFyIHAgPSAncHJvdG90eXBlJ1xudmFyIG9wID0gT2JqZWN0W3BdXG52YXIgaGFzID0gb3AuaGFzT3duUHJvcGVydHlcblxubW9kdWxlLmV4cG9ydHMgPSBEdXNoXG5cbmZ1bmN0aW9uIER1c2ggKCQpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIER1c2gpKSB7XG4gICAgcmV0dXJuIG5ldyBEdXNoKCQpXG4gIH1cbiAgJCA9ICQgfHwgdGhpc1xuICAkLl9lID0gJC5fZSB8fCB7fVxuICAkLl9kID0gZnVuY3Rpb24gKHYpIHtcbiAgICB2ID0gb3AudG9TdHJpbmcuY2FsbCh2KVxuICAgIHJldHVybiAvKD86SFRNTCk/KD86LiopRWxlbWVudC9naS50ZXN0KHYpXG4gIH1cbiAgJC5vbiA9IGZ1bmN0aW9uIChuLCBmLCBlKSB7XG4gICAgJC5fZVtuXSA9ICQuX2Vbbl0gfHwgW11cbiAgICAkLl9lW25dLnB1c2goZilcblxuICAgIGlmIChlICYmICQuX2QoZSkpIHtcbiAgICAgIGZbb10gPSBlW29dXG4gICAgICBlWydhZGQnICsgbF0gPyBlWydhZGQnICsgbF0obiwgZiwgMCkgOiBlLmF0dGFjaEV2ZW50KCdvbicgKyBuLCBmKVxuICAgIH1cbiAgICByZXR1cm4gJFxuICB9XG4gICQub2ZmID0gZnVuY3Rpb24gKG4sIGYsIGUpIHtcbiAgICBpZiAoIWhhcy5jYWxsKCQuX2UsIG4pKSB7cmV0dXJuICR9XG4gICAgJC5fZVtuXS5zcGxpY2UoJC5fZVtuXS5pbmRleE9mKGYpLCAxKVxuXG4gICAgaWYgKGUgJiYgJC5fZChlKSkge1xuICAgICAgZVsncmVtb3ZlJyArIGxdID8gZVsncmVtb3ZlJyArIGxdKG4sIGYsIDApIDogZS5kZXRhY2hFdmVudCgnb24nICsgbiwgZilcbiAgICB9XG4gICAgcmV0dXJuICRcbiAgfVxuICAkLm9uY2UgPSBmdW5jdGlvbiAobiwgZiwgZSkge1xuICAgIGZ1bmN0aW9uIGggKCkge1xuICAgICAgJC5vZmYobiwgaCwgZSlcbiAgICAgIHJldHVybiBmLmFwcGx5KGUsIGFyZ3VtZW50cylcbiAgICB9XG4gICAgcmV0dXJuICQub24obiwgaCwgZSlcbiAgfVxuICAkLmVtaXQgPSBmdW5jdGlvbiAobiwgYSwgZSwgaSwgZiwgZCkge1xuICAgIGlmICghaGFzLmNhbGwoJC5fZSwgbikpIHtyZXR1cm4gJH1cbiAgICBhID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXG4gICAgZSA9IGFbYS5sZW5ndGggLSAxXVxuICAgIGQgPSAkLl9kKGUpXG4gICAgZSA9IGQgPyBlIDogJFxuICAgIGEgPSBkID8gYS5zbGljZSgwLCAtMSkgOiBhXG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgJC5fZVtuXS5sZW5ndGg7IGkrKykge1xuICAgICAgZiA9ICQuX2Vbbl1baV1cbiAgICAgIGlmIChkICYmIGZbb10gIT09IGVbb10pIHtcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cbiAgICAgIGYuYXBwbHkoZSwgYSlcbiAgICB9XG4gICAgcmV0dXJuICRcbiAgfVxuICAkLm1peGluID0gZnVuY3Rpb24gKHIsIHMsIGMsIGssIGopIHtcbiAgICBzID0gcyB8fCAkXG4gICAgYyA9IHIuY29uc3RydWN0b3JcbiAgICBmb3IgKGsgaW4gcykgY1trXSA9IHNba11cbiAgICBjW3BdID0gT2JqZWN0LmNyZWF0ZShzW3BdKVxuICAgIGZvciAoaiBpbiByKSBjW3BdW2pdID0gcltqXVxuICAgIGMuX19zdXBlcl9fID0gcFtwXVxuICAgIHJldHVybiBjXG4gIH1cbn1cbiJdfQ==
