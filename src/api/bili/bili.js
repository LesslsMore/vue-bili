import request from '@/utils/request'

export default{
  // http://127.0.0.1:8088/q?name=fs&p=1&s=10
  getPageList(word, page, size) {
    return request({
      url: `/q?name=${word}&p=${page}&s=${size}`,
      method: 'get',
    })
  }
}
