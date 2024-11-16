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