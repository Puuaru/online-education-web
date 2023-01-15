import axios from 'axios'
import cookie from 'js-cookie'

const service = axios.create({
  baseURL: 'http://localhost:80/',
  timeout: 5000,
})

// 设置拦截器
service.interceptors.request.use((config) => {
  if (cookie.get('web-token')) {
    // 客户持有cookie时将cookie取出
    config.headers['web-token'] = cookie.get('web-token')
  }
  return config
})

export default service
