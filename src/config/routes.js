// 路由配置
export const routes = {
  overview: {
    path: 'overview',
    name: '系统信息',
    componentPath: 'Overview',
    icon: '📊',
    iconClass: 'icon-dashboard',
    children: [
      {
        path: 'Run',
        name: '运行系统',
        componentPath: 'Overview/Run',
        icon: '👥',
        iconClass: 'icon-roles'
      },
      {
        path: 'accounts',
        name: '测试修改',
        componentPath: 'system/Accounts',
        icon: '👤',
        iconClass: 'icon-accounts'
      }]
  },
  profile: {
    path: 'profile',
    name: '个人资料',
    componentPath: 'Profile',
    icon: '🎭',
    iconClass: 'icon-profile'
  },
  projects: {
    path: 'projects',
    name: '项目管理',
    componentPath: 'Projects',
    icon: '📁',
    iconClass: 'icon-folder'
  },
  system: {
    path: 'system',
    name: '系统管理',
    componentPath: 'system/System',
    icon: '⚙️',
    iconClass: 'icon-system',
    children: [
      {
        path: 'roles',
        name: '角色编辑',
        componentPath: 'system/Roles',
        icon: '👥',
        iconClass: 'icon-roles'
      },
      {
        path: 'accounts',
        name: '账号管理',
        componentPath: 'system/Accounts',
        icon: '👤',
        iconClass: 'icon-accounts'
      }
    ]
  },
  settings: {
    path: 'settings',
    name: '系统设置',
    componentPath: 'Settings',
    icon: '🛠️',
    iconClass: 'icon-settings'
  }
}

// 获取所有路由配置
export const getDashboardRoutes = () => {
  const allRoutes = []
  
  // 处理路由配置
  Object.keys(routes).forEach(key => {
    const route = routes[key]
    // 添加主路由
    allRoutes.push({
      path: route.path,
      name: key,
      component: () => {
        if (route.componentPath.includes('/')) {
          const [folder, file] = route.componentPath.split('/')
          return import(`../views/dashboard/${folder}/${file}.vue`)
        }
        return import(`../views/dashboard/${route.componentPath}.vue`)
      }
    })

    // 如果有子路由，也添加进去
    if (route.children) {
      route.children.forEach(child => {
        allRoutes.push({
          path: `${route.path}/${child.path}`,
          name: `${route.path}-${child.path}`,
          component: () => {
            const [folder, file] = child.componentPath.split('/')
            return import(`../views/dashboard/${folder}/${file}.vue`)
          }
        })
      })
    }
  })

  return allRoutes
} 