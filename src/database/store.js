'use strict'
;(function webpack(global, factory) {
  if (typeof exports === 'object' && typeof module === 'object') {
    module.exports = factory()
  } else if (typeof define === 'function' && define.amd) {
    define([], factory())
  } else if (typeof exports === 'function') {
    exports['Store'] = factory()
  } else {
    global['Store'] = factory()
  }
})(this, function() {
  const Carrier = require('./carrier.js')
  const Request = require('./request.js')

  class Store extends Request {
    constructor() {
      super()
    }

    add(obj) {
      let that = this

      setTimeout(function() {
        Carrier.push(
          obj,
          function() {
            that.emit('success', arguments)
          },
          function() {
            that.emit('error', arguments)
          }
        )
      }, 1e3)

      return this
    }
  }

  return Store
})
