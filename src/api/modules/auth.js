import request from '../request'; // 从 require 改为 import
//import dbConfig  from '../dbConfig';
//import mysql from 'mysql2/promise'; // 使用 promise 版本的 mysql2

const dbConfig = {
  host: 'localhost', // 数据库主机
  user: 'root', // 数据库用户名
  password: '123456', // 数据库密码
  database: 'gweb', // 数据库名称
  port: 3306 // 数据库端口，默认为 3306
}


const AVATAR_CONFIG = {
  admin: '/avatars/admin-avatar.svg',    // 管理员头像
  svip: '/avatars/svip-avatar.svg',      // SVIP会员头像
  vip: '/avatars/vip-avatar.svg',        // VIP会员头像
  normal: '/avatars/normal-avatar.svg'    // 普通会员头像
}

// 会员等级配置
const VIP_LEVELS = {
  ADMIN: { level: 999, name: '管理员', avatar: AVATAR_CONFIG.admin },
  SVIP: { level: 3, name: 'SVIP会员', avatar: AVATAR_CONFIG.svip },
  VIP: { level: 2, name: 'VIP会员', avatar: AVATAR_CONFIG.vip },
  NORMAL: { level: 1, name: '普通会员', avatar: AVATAR_CONFIG.normal }
}

// 模拟测试账户数据
const TEST_ACCOUNTS = [
  {
    username: 'admin',
    password: '123456',
    token: 'admin_token',
    userInfo: {
      id: 1,
      username: 'admin',
      nickname: '系统管理员',
      role: 'admin',
      vipLevel: VIP_LEVELS.ADMIN.level,
      vipName: VIP_LEVELS.ADMIN.name,
      avatar: VIP_LEVELS.ADMIN.avatar,
      email: 'admin@example.com',
      registerTime: '2024-01-01',
      lastLoginTime: '2024-02-20 15:30:00',
      status: 'active'
    }
  },
  {
    username: 'svip',
    password: '123456',
    token: 'svip_token',
    userInfo: {
      id: 2,
      username: 'svip',
      nickname: 'SVIP用户',
      role: 'user',
      vipLevel: VIP_LEVELS.SVIP.level,
      vipName: VIP_LEVELS.SVIP.name,
      avatar: VIP_LEVELS.SVIP.avatar,
      email: 'svip@example.com',
      registerTime: '2024-01-15',
      lastLoginTime: '2024-02-20 14:30:00',
      status: 'active'
    }
  },
  {
    username: 'vip',
    password: '123456',
    token: 'vip_token',
    userInfo: {
      id: 3,
      username: 'vip',
      nickname: 'VIP用户',
      role: 'user',
      vipLevel: VIP_LEVELS.VIP.level,
      vipName: VIP_LEVELS.VIP.name,
      avatar: VIP_LEVELS.VIP.avatar,
      email: 'vip@example.com',
      registerTime: '2024-02-01',
      lastLoginTime: '2024-02-20 13:30:00',
      status: 'active'
    }
  },
  {
    username: 'user',
    password: '123456',
    token: 'user_token',
    userInfo: {
      id: 4,
      username: 'user',
      nickname: '普通用户',
      role: 'user',
      vipLevel: VIP_LEVELS.NORMAL.level,
      vipName: VIP_LEVELS.NORMAL.name,
      avatar: VIP_LEVELS.NORMAL.avatar,
      email: 'user@example.com',
      registerTime: '2024-02-15',
      lastLoginTime: '2024-02-20 12:30:00',
      status: 'active'
    }
  }
]

export default {

  // 用户登录
  login(data) {
    return new Promise(async (resolve, reject) => {
      //console.log(JSON.stringify({ username: data.username, password: data.password }));
      // 请求url = "http://localhost:5173/auth/login" 
      const url = "http://localhost:5173/auth/login";
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: data.username, password: data.password })
      });

      const result = await response.json();



      const  account = TEST_ACCOUNTS.find(acc => acc.username === data.username && acc.password === data.password);
      console.log("account",account);

      if (result) {
        const userInfo = {
          username: result.username,
          password: result.password,
          token: 'admin_token',
          userInfo: result
         };      

        // 存储 token 和用户信息
        localStorage.setItem('token',userInfo.token);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));

        resolve({
          code: 200,
          data: userInfo,
          message: '登录成功'
        });
      } else {
        reject({
          code: 401,
          message: '用户名或密码错误'
        });
      }
    });
  },

  // 用户注册
  register(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (data.username === TEST_ACCOUNTS[0].username) {
          reject({
            code: 400,
            message: '用户名已存在'
          })
        } else {
          resolve({
            code: 200,
            data: {
              username: data.username,
              token: 'new_user_token'
            },
            message: '注册成功'
          })
        }
      }, 500)
    })
  },

  // 用户登出
  logout() {
    return new Promise(resolve => {
      setTimeout(() => {
        // 清除本地存储的用户信息
        localStorage.removeItem('token')
        localStorage.removeItem('userInfo')
        resolve({
          code: 200,
          message: '登出成功'
        })
      }, 300)
    })
  },

  // 刷新token
  refreshToken() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          code: 200,
          data: {
            token: 'refreshed_token_' + Date.now()
          }
        })
      }, 300)
    })
  },

  // 检查登录状态
  checkLoginStatus() {
    return new Promise((resolve) => {
      const token = localStorage.getItem('token')
      const userInfo = localStorage.getItem('userInfo')

      if (token && userInfo) {
        // 找到对应的用户数据
        const user = TEST_ACCOUNTS.find(account => account.token === token)
        if (user) {
          resolve({
            code: 200,
            data: {
              isLoggedIn: true,
              userInfo: user.userInfo
            }
          })
        } else {
          resolve({
            code: 200,
            data: {
              isLoggedIn: false,
              userInfo: null
            }
          })
        }
      } else {
        resolve({
          code: 200,
          data: {
            isLoggedIn: false,
            userInfo: null
          }
        })
      }
    })
  }
}


// CREATE TABLE user (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   username VARCHAR(50) NOT NULL UNIQUE,
//   nickname VARCHAR(100) NOT NULL,
//   role ENUM('admin', 'user', 'guest') NOT NULL,
//   vipLevel INT NOT NULL,
//   vipName VARCHAR(50) NOT NULL,
//   avatar VARCHAR(255),
//   email VARCHAR(100) NOT NULL UNIQUE,
//   registerTime DATETIME NOT NULL,
//   lastLoginTime DATETIME,
//   status ENUM('active', 'inactive', 'banned') NOT NULL DEFAULT 'active'
// );