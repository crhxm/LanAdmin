export default {
  // API基础路径
  baseURL: import.meta.env.VITE_API_URL || '/api',
  
  // API版本
  version: 'v1',
  
  // 接口超时时间
  timeout: 15000,
  
  // 接口路径
  urls: {
    auth: {
      login: '/auth/login',
      register: '/auth/register',
      logout: '/auth/logout',
      refresh: '/auth/refresh'
    },
    user: {
      profile: '/user/profile',
      update: '/user/update',
      password: '/user/password'
    },
    system: {
      config: '/system/config',
      version: '/system/version'
    }
  }
} 