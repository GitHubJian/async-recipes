import IndexedDB from './indexeddb.js'

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
  initialized: false,
  initialize: function() {
    activeState.initialize.apply(activeState, arguments)
  },
  add: function() {
    activeState.add.apply(activeState, arguments)
  },
  print: function() {
    activeState.add.apply(activeState, arguments)
  }
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
  },
  add() {
    return pending.push(new Command('add', arguments))
  },
  print() {
    return pending.push(new Command('print', arguments))
  }
}

activeState = notInitializedState

export default IndexedDBWrapper
