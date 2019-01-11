class EventEmitter {
  constructor() {
    this.events = {}
  }
  on(event, handle) {
    if (!handle) {
      return
    }

    if (this.events[event]) {
      this.events[event].push(handle)
    } else {
      this.events[event] = [handle]
    }
  }

  emit(event, args) {
    let handles = this.events[event]
    if (!handles || handles.length === 0) {
      return
    }

    handles.map(handle => {
      handle.apply(null, args)
    })
  }
}

export default {
  EventEmitter
}
