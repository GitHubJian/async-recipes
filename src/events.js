'use strict'
;(function webpack(global, factory) {
  if (typeof exports === 'object' && typeof module === 'object') {
    module.exports = factory()
  } else if (typeof define === 'function' && define.amd) {
    define([], factory())
  } else if (typeof exports === 'function') {
    exports['Events'] = factory()
  } else {
    global['Events'] = factory()
  }
})(this, function() {
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

    emit(event) {
      let handles = this.events[event]
      if (!handles || handles.length === 0) {
        return
      }

      let args = Array.prototype.slice.call(arguments, 1)
      handles.map(handle => {
        handle.apply(null, args)
      })
    }
  }

  return {
    EventEmitter
  }
})
