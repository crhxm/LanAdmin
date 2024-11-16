import request from '../request'
import config from '../config'

export default {
  // 获取用户信息
  getProfile() {
    return request({
      url: config.urls.user.profile,
      method: 'get'
    })
  },

  // 更新用户信息
  updateProfile(data) {
    return request({
      url: config.urls.user.update,
      method: 'put',
      data
    })
  },

  // 修改密码
  changePassword(data) {
    return request({
      url: config.urls.user.password,
      method: 'put',
      data
    })
  }
} 