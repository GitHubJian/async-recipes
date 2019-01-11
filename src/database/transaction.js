import Store from './store.js'

export default class Transaction {
  constructor() {}

  objectStore(store) {
    return new Store(store)
  }
}
