const test = require('./index.js')

let client = test.createClient()

function runFind() {
  client.findAll()
}

module.exports = function findAll() {
  if (client.connected) {
    runFind()
  } else {
    client.once('connected', runFind)
  }
}
