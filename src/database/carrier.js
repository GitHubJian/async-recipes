const data = []
const max = 5

export default {
  push(obj, successCallback, errorCallback) {
    try {
      if (data.length > max) {
        throw new Error('Storage is full')
      } else {
        data.push(obj)
        successCallback(`Carrier Data: ${data.length - 1}`)
      }
    } catch (e) {
      errorCallback(e, obj)
    }
  },
  print() {
    console.log(`Carrier: 当前已经存在 ${data.length} 条数据`)
  }
}
