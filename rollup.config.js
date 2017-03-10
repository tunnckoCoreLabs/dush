'use strict'

var gzip = require('rollup-plugin-gzip')
var buble = require('rollup-plugin-buble')
var uglify = require('rollup-plugin-uglify')

var config = {
  entry: 'src/index.js'
}

if (process.env.BROWSER) {
  config = Object.assign(config, {
    dest: 'dist/dush.umd.js',
    format: 'umd',
    moduleName: 'dush',
    useStrict: false,
    sourceMap: true,
    plugins: [
      buble({
        target: {
          ie: '10',
          edge: '12',
          safari: '8',
          chrome: '48',
          firefox: '44'
        }
      }),
      uglify({ compress: { warnings: false } }),
      gzip()
    ]
  })
} else {
  config = Object.assign(config, {
    plugins: [
      buble({
        target: { node: '0.10' }
      })
    ],
    targets: [
      { dest: 'dist/dush.es.js', format: 'es' },
      { dest: 'dist/dush.common.js', format: 'cjs' }
    ]
  })
}

module.exports = config
