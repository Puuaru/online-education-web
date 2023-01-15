import request from '@/utils/request'

export default {
  getIndexInfo() {
    return request({
      url: `/edu/front/index`,
      method: 'get',
    })
  },
}
