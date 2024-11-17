<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api'

const router = useRouter()
const userInfo = ref(null)
const showUserMenu = ref(false)
const menuTimeout = ref(null)

// 计算是否已登录
const isLoggedIn = computed(() => !!userInfo.value)

const handleNavClick = (e, path) => {
  e.preventDefault()

  // 如果是需要登录的路径，先检查登录状态
  if (path === '/dashboard' || path.startsWith('/dashboard/')) {
    if (!isLoggedIn.value) {
      router.push('/auth')
      return
    }
  }

  // 处理带有锚点的路径
  if (path.includes('#')) {
    const hash = path.split('#')[1]
    // 如果已经在首页，直接滚动
    if (router.currentRoute.value.path === '/') {
      const element = document.getElementById(hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      // 如果不在首页，先回到首页再滚动
      router.push('/').then(() => {
        setTimeout(() => {
          const element = document.getElementById(hash)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }, 100)
      })
    }
    return
  }

  router.push(path)
}

// 处理菜单显示
const handleMenuEnter = () => {
  if (menuTimeout.value) {
    clearTimeout(menuTimeout.value)
    menuTimeout.value = null
  }
  showUserMenu.value = true
}

// 处理菜单隐藏
const handleMenuLeave = () => {
  menuTimeout.value = setTimeout(() => {
    showUserMenu.value = false
  }, 300)
}

// 导航处理函数
const handleHomeClick = (e) => {
  e.preventDefault()
  router.push('/')
}

const handleAuthClick = (e, type = 'login') => {
  e.preventDefault()
  // 通过 query 参数指定是登录还是注册
  router.push({
    path: '/auth',
    query: { type }
  })
}

const handleRegisterClick = (e) => {
  handleAuthClick(e, 'register')
}

const handleDashboard = () => {
  if (!isLoggedIn.value) {
    router.push('/auth')
    return
  }
  router.push('/dashboard')
}

const handleProfile = () => {
  if (!isLoggedIn.value) {
    router.push('/auth')
    return
  }
  router.push('/dashboard/profile')
}

const handleSettings = () => {
  if (!isLoggedIn.value) {
    router.push('/auth')
    return
  }
  router.push('/dashboard/settings')
}

const handleLogout = async () => {
  try {
    await api.auth.logout()
    userInfo.value = null
    router.push('/')
  } catch (error) {
    console.error('登出失败:', error)
  }
}

// 检查登录状态
const checkLoginStatus = async () => {
  try {
    const res = await api.auth.checkLoginStatus()
    if (res.data.isLoggedIn) {
      userInfo.value = res.data.userInfo
    }
  } catch (error) {
    console.error('获取登录状态失败:', error)
  }
}

onMounted(() => {
  checkLoginStatus()
})
</script>

<template>
  <nav class="nav">
    <div class="nav-content">
      <!-- 左侧 Logo -->
      <div class="nav-left">
        <h1>
          <a href="#" @click="handleHomeClick" class="logo-link">LanAdmin</a>
        </h1>
      </div>

      <!-- 中间导航菜单 -->
      <div class="nav-center">
        <a href="#hero" @click="(e) => handleNavClick(e, '/#hero')" class="nav-link">
          <i class="icon-home">🏠</i>
          <span>主页</span>
        </a>
        <a href="#features" @click="(e) => handleNavClick(e, '/#features')" class="nav-link">
          <i class="icon-features">⚡</i>
          <span>功能</span>
        </a>
        <a href="#download" @click="(e) => handleNavClick(e, '/#download')" class="nav-link">
          <i class="icon-download">📥</i>
          <span>下载</span>
        </a>
        <a href="#docs" @click="(e) => handleNavClick(e, '/#docs')" class="nav-link">
          <i class="icon-docs">📚</i>
          <span>文档</span>
        </a>
        <a href="#about" @click="(e) => handleNavClick(e, '/#about')" class="nav-link">
          <i class="icon-about">ℹ️</i>
          <span>关于</span>
        </a>
      </div>

      <!-- 右侧用户信息 -->
      <div class="nav-right">
        <!-- 用户未登录显示登录注册按钮 -->
        <div class="auth-links" v-if="!isLoggedIn">
          <a href="#" @click="(e) => handleAuthClick(e, 'login')" class="btn btn-text">登录</a>
          <a href="#" @click="(e) => handleAuthClick(e, 'register')" class="btn btn-primary">免费注册</a>
        </div>

        <!-- 用户已登录显示用户信息 -->
        <div class="user-info" v-if="userInfo" @mouseenter="handleMenuEnter" @mouseleave="handleMenuLeave">
          <div class="user-avatar">
            <img :src="userInfo?.avatar" alt="用户头像">
            <span class="username">{{ userInfo.nickname || userInfo.username }}</span>
            <i class="icon-arrow" :class="{ 'rotate': showUserMenu }">▼</i>
          </div>

          <!-- 用户菜单 -->
          <div v-if="showUserMenu" class="user-menu" @mouseenter="handleMenuEnter" @mouseleave="handleMenuLeave">
            <a href="#" class="menu-item" @click.prevent="handleDashboard">
              <i class="icon-dashboard">🎮</i>
              控制台
            </a>
            <div class="menu-divider"></div>
            <a href="#" class="menu-item" @click.prevent="handleProfile">
              <i class="icon-profile">👤</i>
              个人资料
            </a>
            <a href="#" class="menu-item" @click.prevent="handleSettings">
              <i class="icon-settings">⚙️</i>
              设置
            </a>
            <div class="menu-divider"></div>
            <a href="#" class="menu-item logout" @click.prevent="handleLogout">
              <i class="icon-logout">🚪</i>
              退出登录
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* 导航栏基础样式 */
.nav {
  height: var(--header-height);
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: var(--shadow-sm);
  z-index: 100;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--border-color);
}

.nav-content {
  width: var(--content-width);
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* 左侧 Logo */
.nav-left {
  flex: 0 0 200px; /* 固定宽度 */
}

.logo-link {
  text-decoration: none;
  color: var(--font-color-primary);
  font-size: 1.5rem;
  font-weight: 600;
  transition: color 0.3s ease;
}

/* 中间导航菜单 */
.nav-center {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-md);
}

.nav-center a {
  text-decoration: none;
  color: var(--font-color-regular);
  padding: 0.5rem 0.8rem;
  border-radius: var(--border-radius);
  transition: all 0.3s ease;
  font-weight: 500;
}

.nav-center a:hover {
  color: var(--primary);
  background: var(--nav-hover-bg);
}

/* 右侧用户信息 */
.nav-right {
  /*flex: 0 0 200px;  固定宽度 */
  display: flex;
  justify-content: flex-end;
}

/* 用户信息区域 */
.user-info {
  position: relative;
  margin-left: var(--spacing-md);
}

.user-avatar {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: var(--border-radius);
  transition: all 0.3s ease;
  background: transparent;
}

.user-avatar:hover {
  background: var(--nav-hover-bg);
}

.user-avatar img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--border-color);
}

.username {
  color: var(--font-color-primary);
  font-weight: 500;
}

.icon-arrow {
  font-size: 0.8rem;
  color: var(--font-color-light);
  transition: transform 0.3s ease;
}

.icon-arrow.rotate {
  transform: rotate(180deg);
}

/* 用户菜单样式 */
.user-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  width: 220px;
  background: var(--bg-primary);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  padding: 0.5rem;
  z-index: 1000;
  border: 1px solid var(--border-color);
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 1rem;
  color: var(--font-color-primary);
  text-decoration: none;
  border-radius: var(--border-radius);
  transition: all 0.3s ease;
  font-size: 0.95rem;
  cursor: pointer;
}

.menu-item:hover {
  background: var(--nav-hover-bg);
  transform: translateX(4px);
}

.menu-item i {
  font-size: 1.2rem;
  opacity: 0.9;
}

/* 特殊菜单项样式 */
.menu-item .icon-dashboard {
  color: var(--primary);
}

.menu-item .icon-profile {
  color: var(--info);
}

.menu-item .icon-settings {
  color: var(--warning);
}

.menu-item.logout {
  color: var(--danger);
}

.menu-item.logout:hover {
  background: rgba(231, 76, 60, 0.1);
}

.menu-divider {
  height: 1px;
  background-color: var(--border-color);
  margin: 0.5rem 0;
}

/* 暗色主题适配 */
[data-theme="dark"] {
  .nav {
    background: rgba(31, 33, 41, 0.95);
    border-bottom: 1px solid var(--border-color);
  }

  .user-menu {
    background: var(--bg-darker);
    border-color: var(--border-color);
  }

  .menu-item {
    color: var(--font-color-secondary);
  }

  .menu-item:hover {
    background: var(--nav-hover-bg);
    color: var(--primary-light);
  }

  .user-avatar img {
    border-color: var(--border-color);
  }
}

/* 响应式调整 */
@media (max-width: 768px) {
  .nav-left {
    flex: 0 0 100px;
  }
  
  .nav-right {
    flex: 0 0 100px;
  }
  
  .nav-center {
    gap: var(--spacing-sm);
  }
  
  .username {
    display: none;
  }
}

/* 导航链接样式优化 */
.nav-link {
  display: flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  color: var(--font-color-regular);
  padding: 8px 16px;
  border-radius: var(--border-radius);
  transition: all 0.3s ease;
  font-weight: 500;
  position: relative;
}

.nav-link:hover {
  color: var(--primary);
  background: var(--nav-hover-bg);
  transform: translateY(-1px);
}

.nav-link i {
  font-size: 1.1rem;
  opacity: 0.8;
}

.nav-link span {
  font-size: 0.95rem;
}

/* 登录注册按钮样式 */
.auth-links {
  display: flex;
  align-items: center;
  gap: 12px;
}

.btn {
  padding: 8px 20px;
  border-radius: var(--border-radius);
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  text-decoration: none;
  cursor: pointer;
}

.btn-text {
  color: var(--font-color-regular);
  background: transparent;
}

.btn-text:hover {
  color: var(--primary);
  background: var(--nav-hover-bg);
}

.btn-primary {
  color: white;
  background: var(--primary);
  border: 1px solid var(--primary);
}

.btn-primary:hover {
  background: var(--primary-dark);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(var(--primary-rgb), 0.25);
}

/* 暗色主题适配 */
[data-theme="dark"] {
  .nav-link {
    color: var(--font-color-secondary);
  }

  .nav-link:hover {
    color: var(--primary-light);
  }

  .btn-text {
    color: var(--font-color-secondary);
  }

  .btn-text:hover {
    color: var(--primary-light);
    background: var(--nav-hover-bg);
  }

  .btn-primary {
    background: var(--primary);
    border-color: var(--primary);
  }

  .btn-primary:hover {
    background: var(--primary-light);
  }
}

/* 响应式调整 */
@media (max-width: 768px) {
  .nav-link {
    padding: 8px 12px;
  }

  .nav-link span {
    display: none;
  }

  .btn {
    padding: 6px 12px;
    font-size: 0.9rem;
  }
}
</style>