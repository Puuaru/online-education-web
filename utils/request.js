import axios from 'axios'
import cookie from 'js-cookie'

const service = axios.create({
  baseURL: 'http://localhost:80/',
  timeout: 5000,
})

// 设置拦截器
service.interceptors.request.use((config) => {
  if (cookie.get('token')) {
    // 客户持有名为token的cookie时将其取出放入请求头
    config.headers['token'] = cookie.get('token')
  }
  return config
})

export default service
