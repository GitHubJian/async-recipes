import Transaction from './transaction.js'
import Carrier from './carrier.js'
import Request from './request.js'

export default class Database {
  constructor(name, verion) {
    this.name = name
    this.version = verion
  }

  static open(name, version) {
    let request = new Request()

    setTimeout(function() {
      let db = new Database(name, version)
      request.result = db

      request.emit('success', {})
    }, 3e3)

    return request
  }

  transaction() {
    return new Transaction()
  }

  print() {
    Carrier.print()
  }
}
