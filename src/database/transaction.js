'use strict'
;(function webpack(global, factory) {
  if (typeof exports === 'object' && typeof module === 'object') {
    module.exports = factory()
  } else if (typeof define === 'function' && define.amd) {
    define([], factory())
  } else if (typeof exports === 'function') {
    exports['Transaction'] = factory()
  } else {
    global['Transaction'] = factory()
  }
})(this, function() {
  const Store = require('./store.js')

  class Transaction {
    constructor() {}

    objectStore(store) {
      return new Store(store)
    }
  }

  return Transaction
})
