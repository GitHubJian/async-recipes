import Database from './database/index.js'

export default class IndexedDB {
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
      IndexedDB.DB = request.result
      // 通知初始化完成
      IndexedDB.initialized = true
      callback()
    }
  }

  add(obj) {
    let request = IndexedDB.DB.transaction()
      .objectStore()
      .add(obj)

    request.onsuccess = function(event) {
      console.log(event)
      IndexedDB.DB.print()
    }

    request.onerror = function(event, obj) {
      console.log(`未入库：${obj}`)
    }
  }
}

IndexedDB.initialized = false
IndexedDB.DB = null
