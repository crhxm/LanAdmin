import axios from 'axios'

// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api', // 从环境变量获取API地址
  timeout: 15000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 从localStorage获取token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    console.error('请求错误：', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    // 这里可以根据后端的响应结构定制
    if (res.code === 200) {
      return res.data
    }
    // 处理其他状态码
    if (res.code === 401) {
      // 未授权，清除token并重定向到登录页
      localStorage.removeItem('token')
      window.location.reload()
    }
    return Promise.reject(new Error(res.message || '请求失败'))
  },
  error => {
    console.error('响应错误：', error)
    return Promise.reject(error)
  }
)

export default service 