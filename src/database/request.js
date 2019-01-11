import events from './../events.js'

export default class Request extends events.EventEmitter {
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
}
