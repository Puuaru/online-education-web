import request from '@/utils/request'

export default {
  loginInApp(loginInfo) {
    return request({
      url: '/center/member/login',
      data: loginInfo,
      method: 'post',
    })
  },
  getMemberInfo() {
    return request({
      url: '/center/member/memberInfo',
      method: 'get',
    })
  },
  loginInGithub() {
    return request({
      url: '/center/github',
      method: 'get',
    })
  },
}
