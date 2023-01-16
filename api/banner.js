import request from '@/utils/request'

export default {
  getBanner() {
    return request({
      url: `/cms/`,
      method: 'get',
    })
  },
}
