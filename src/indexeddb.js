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
  const Database = require('./database/index.js')

  class IndexedDB {
    constructor(name = 'filesystem', version = 1) {
      this.name = name
      this.version = version
    }

    initialize(callback) {
      let request = Database.open(this.name, this.version)

      request.onerror = function(event) {
        IndexedDB.DB = null
      }

      request.onsuccess = function(event) {
        IndexedDB.DB = event.result
        // 通知初始化完成
        IndexedDB.initialized = true
        callback()
      }
    }

    add(obj) {
      let request = IndexedDB.DB.transaction()
        .objectStore()
        .add(obj)

      request.onsuccess = function(result) {
        let [msg] = result

        console.log(`已入库：${msg}`)
      }

      request.onerror = function(result) {
        let [err] = result
        
        console.log(`未入库：${err}`)
      }
    }

    print() {
      IndexedDB.DB.print()
    }
  }

  IndexedDB.initialized = false
  IndexedDB.DB = null

  return IndexedDB
})
