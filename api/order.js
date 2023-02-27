import request from '@/utils/request'

export default {
  saveOrder(courseId) {
    return request({
      url: `/order/operation/${courseId}`,
      method: 'post',
    })
  },

  getOrder(orderNo) {
    return request({
      url: `/order/operation/${orderNo}`,
      method: 'get',
    })
  },

  savePayLog(orderNo) {
    return request({
      url: `/order/pay-log/${orderNo}`,
      method: 'post',
    })
  },

  isPurchased(courseId) {
    return request({
      url: `/order/operation/isPurchased/${courseId}`,
      method: 'get'
    })
  }
}
