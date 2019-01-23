'use strict'
;(function webpack(global, factory) {
  if (typeof exports === 'object' && typeof module === 'object') {
    module.exports = factory()
  } else if (typeof define === 'function' && define.amd) {
    define([], factory())
  } else if (typeof exports === 'function') {
    exports['IndexedDB'] = factory()
  } else {
    global['IndexedDB'] = factory()
  }
})(this, function() {
  const IndexedDB = require('./indexeddb.js')

  let indexedDB = new IndexedDB()
  let activeState // 当前状态
  let initializedState = indexedDB

  class Command {
    constructor(command, args) {
      this.command = command
      this.args = args
    }
  }

  let IndexedDBWrapper = {
    initialized: false
  }

  let pending = []
  let notInitializedState = {
    initialize: function(callback) {
      indexedDB.initialize(function() {
        IndexedDBWrapper.initialized = true
        activeState = initializedState

        pending.forEach(function({ command, args }) {
          indexedDB[command].apply(null, args)
        })

        pending = []

        callback && callback()
      })
    }
  }

  Object.getOwnPropertyNames(IndexedDB.prototype).forEach(p => {
    if (p !== 'constructor') {
      IndexedDBWrapper[p] = function() {
        activeState[p].apply(activeState, arguments)
      }

      if (p !== 'initialize') {
        notInitializedState[p] = function() {
          return pending.push(new Command(p, arguments))
        }
      }
    }
  })

  activeState = notInitializedState

  return IndexedDBWrapper
})
