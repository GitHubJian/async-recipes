const EventEmitter = require('events')

class Test extends EventEmitter {
  constructor() {
    super()
    this.connected = true
  }

  findAll() {
    console.log(123)
  }
}

exports.createClient = function() {
  return new Test()
}
