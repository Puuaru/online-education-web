import request from '@/utils/request'

export default {
  loginInApp(memberVo) {
    return request({
      url: '/center/member/login',
      data: memberVo,
      method: 'post',
    })
  },
  getMemberInfo() {
    return request({
      url: '/center/member/memberInfo',
      method: 'get',
    })
  }
}
