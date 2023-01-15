import request from '@/utils/request'

export default {
  getBannerIndex() {
    return request({
      url: `/cms/`,
      method: 'get',
    })
  },
}
