'use strict'
;(function webpack(global, factory) {
  if (typeof exports === 'object' && typeof module === 'object') {
    module.exports = factory()
  } else if (typeof define === 'function' && define.amd) {
    define([], factory())
  } else if (typeof exports === 'function') {
    exports['Request'] = factory()
  } else {
    global['Request'] = factory()
  }
})(this, function() {
  const events = require('./../events.js')

  class Request extends events.EventEmitter {
    constructor() {
      super()

      Object.defineProperty(this, 'onsuccess', {
        set(val) {
          this.on('success', val)
        }
      })

      Object.defineProperty(this, 'onerror', {
        set(val) {
          this.on('error', val)
        }
      })
    }
  }

  return Request
})
