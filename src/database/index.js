'use strict'
;(function webpack(global, factory) {
  if (typeof exports === 'object' && typeof module === 'object') {
    module.exports = factory()
  } else if (typeof define === 'function' && define.amd) {
    define([], factory())
  } else if (typeof exports === 'function') {
    exports['Database'] = factory()
  } else {
    global['Database'] = factory()
  }
})(this, function() {
  const Transaction = require('./transaction.js')
  const Carrier = require('./carrier.js')
  const Request = require('./request.js')

  class Database extends Request {
    constructor(name, version) {
      super()
      this.name = name
      this.version = version

      this.open(name, version)
    }

    open(name, version) {
      let that = this

      setTimeout(function() {
        that.emit('success', { result: that }, 1)
      }, 3e3)
    }

    static open(name, version) {
      let request = new Database(name, version)

      return request
    }

    transaction() {
      return new Transaction()
    }

    print() {
      Carrier.print()
    }
  }

  return Database
})
