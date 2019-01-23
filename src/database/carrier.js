'use strict'
;(function webpack(global, factory) {
  if (typeof exports === 'object' && typeof module === 'object') {
    module.exports = factory()
  } else if (typeof define === 'function' && define.amd) {
    define([], factory())
  } else if (typeof exports === 'function') {
    exports['Carrier'] = factory()
  } else {
    global['Carrier'] = factory()
  }
})(this, function() {
  const data = []
  const max = 5

  return {
    push(obj, successCallback, errorCallback) {
      try {
        if (data.length > max) {
          throw new Error('Storage is full')
        } else {
          data.push(obj)
          successCallback(`Carrier Data: ${data.length - 1}`, obj)
        }
      } catch (e) {
        errorCallback(e, obj)
      }
    },
    print() {
      console.log(`Carrier: 当前已经存在 ${data.length} 条数据`)
    }
  }
})
