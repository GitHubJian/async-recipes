const IndexedDBWrapper = require('./indexedDBWrapper.js')

IndexedDBWrapper.initialize(function() {
  console.log('完成')
})

try {
  IndexedDBWrapper.add({ id: 0 })
  IndexedDBWrapper.add({ id: 1 })
  IndexedDBWrapper.add({ id: 2 })
  IndexedDBWrapper.add({ id: 3 })
  IndexedDBWrapper.add({ id: 4 })
  IndexedDBWrapper.add({ id: 5 })
  IndexedDBWrapper.add({ id: 6 })
  IndexedDBWrapper.add({ id: 7 })
} catch (e) {
  IndexedDBWrapper.print()
}
