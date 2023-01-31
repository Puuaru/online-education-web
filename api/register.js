import request from '@/utils/request'

export default {
  sendEmail(email) {
    return request({
      url: `/center/email/${email}`,
      method: 'get',
    })
  },
  register(memberVo) {
    return request({
      url: '/center/member/register',
      data: memberVo,
      method: 'post',
    })
  },
}
