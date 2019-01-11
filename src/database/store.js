import events from './../events.js'
import carrier from './carrier.js'
import Request from './request.js'

export default class Store extends events.EventEmitter {
  constructor() {
    super()

    Object.defineProperty(this, 'onsuccess', {
      set(val) {
        this.on('success', val)
      }
    })

    Object.defineProperty(this, 'onerror', {
      set(val) {
        this.on('error', val)
      }
    })
  }

  add(obj) {
    let request = new Request()

    setTimeout(function() {
      carrier.push(
        obj,
        function() {
          request.emit('success', arguments)
        },
        function() {
          request.emit('error', arguments)
        }
      )
    }, 1e3)

    return request
  }
}
