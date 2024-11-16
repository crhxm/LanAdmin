<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { routes } from '../config/routes'
import api from '../api'

const router = useRouter()
const userInfo = ref(null)
const showUserMenu = ref(false)
const menuTimeout = ref(null)
const isScrolled = ref(false)
const lastScrollTop = ref(0)
const isHeaderVisible = ref(true)

// 处理滚动事件
const handleScroll = () => {
  const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop
  
  // 检测是否滚动
  isScrolled.value = currentScrollTop > 0

  // 检测滚动方向
  if (currentScrollTop > lastScrollTop.value) {
    // 向下滚动
    if (currentScrollTop > 100) { // 滚动超过100px才隐藏
      isHeaderVisible.value = false
    }
  } else {
    // 向上滚动
    isHeaderVisible.value = true
  }

  lastScrollTop.value = currentScrollTop
}

// 添加和移除滚动监听
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  checkLoginStatus()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

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

// 导航处理
const handleNavClick = (path) => {
  router.push(`/dashboard/${path}`)
}

const handleHomeClick = () => {
  router.push('/')
}

const handleLogout = async () => {
  try {
    await api.auth.logout()
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
</script>

<template>
  <header 
    class="dashboard-header" 
    :class="{
      'scrolled': isScrolled,
      'header-hidden': !isHeaderVisible
    }"
  >
    <div class="header-content">
      <!-- Logo区域 -->
      <div class="header-left">
        <h1>
          <a href="#" @click.prevent="handleHomeClick" class="logo-link">
            CodeEditor
          </a>
        </h1>
      </div>

      <!-- 导航区域 -->
      <nav class="header-nav">
        <a 
          v-for="(route, key) in routes" 
          :key="key"
          href="#"
          @click.prevent="handleNavClick(route.path)"
          :class="{ active: $route.path.includes(route.path) }"
        >
          <i :class="route.iconClass">{{ route.icon }}</i>
          {{ route.name }}
        </a>
      </nav>

      <!-- 用户信息区域 -->
      <div 
        class="user-info" 
        v-if="userInfo"
        @mouseenter="handleMenuEnter"
        @mouseleave="handleMenuLeave"
      >
        <div class="user-avatar">
          <img :src="userInfo?.avatar" alt="用户头像">
          <span class="username">{{ userInfo.nickname || userInfo.username }}</span>
          <i class="icon-arrow" :class="{ 'rotate': showUserMenu }">▼</i>
        </div>
        
        <!-- 用户菜单 -->
        <div 
          v-if="showUserMenu" 
          class="user-menu"
          @mouseenter="handleMenuEnter"
          @mouseleave="handleMenuLeave"
        >
          <a 
            href="#" 
            class="menu-item"
            @click.prevent="handleNavClick('profile')"
          >
            <i class="icon-profile">👤</i>
            个人资料
          </a>
          <a 
            href="#" 
            class="menu-item"
            @click.prevent="handleNavClick('settings')"
          >
            <i class="icon-settings">⚙️</i>
            设置
          </a>
          <div class="menu-divider"></div>
          <a 
            href="#" 
            class="menu-item logout"
            @click.prevent="handleLogout"
          >
            <i class="icon-logout">🚪</i>
            退出登录
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.dashboard-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
  transition: all 0.3s ease;
  transform: translateY(0);
}

/* 滚动状态样式 */
.dashboard-header.scrolled {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

/* 隐藏状态样式 */
.dashboard-header.header-hidden {
  transform: translateY(-100%);
}

.header-content {
  width: var(--content-width);
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
}

.header-left {
  display: flex;
  align-items: center;
}

.logo-link {
  text-decoration: none;
  color: var(--primary-color);
  font-size: 1.5rem;
  font-weight: bold;
}

.header-nav {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.header-nav a {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  color: var(--text-color);
  text-decoration: none;
  border-radius: var(--border-radius);
  transition: all 0.3s ease;
}

.header-nav a:hover {
  background: var(--bg-light);
  color: var(--primary-color);
}

.header-nav a.active {
  background: var(--primary-color);
  color: var(--primary);
}

.header-nav i {
  font-size: 1.2rem;
}

.user-info {
  position: relative;
}

.user-avatar {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: var(--border-radius);
  transition: all 0.3s ease;
}

.user-avatar:hover {
  background: var(--bg-light);
}

.user-avatar img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.username {
  color: var(--text-color);
  font-weight: 500;
}

.icon-arrow {
  font-size: 0.8rem;
  color: var(--text-light);
  transition: transform 0.3s;
}

.icon-arrow.rotate {
  transform: rotate(180deg);
}

.user-menu {
  position: absolute;
  top: 100%;
  right: 0;
  width: 200px;
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  padding: 0.5rem;
  margin-top: 0.5rem;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 1rem;
  color: var(--text-color);
  text-decoration: none;
  border-radius: var(--border-radius);
  transition: all 0.3s ease;
}

.menu-item:hover {
  background: var(--bg-light);
  color: var(--primary-color);
}

.menu-divider {
  height: 1px;
  background: var(--border-color);
  margin: 0.5rem 0;
}

.logout {
  color: #dc3545;
}

.logout:hover {
  background: #fff5f5;
}

/* 暗色主题适配 */
[data-theme="dark"] .dashboard-header {
  background: var(--bg-darker);
  border-bottom: 1px solid var(--border-color);
}

[data-theme="dark"] .header-nav a {
  color: var(--text-light);
}

[data-theme="dark"] .header-nav a:hover {
  background: rgba(66, 184, 131, 0.1);
  color: var(--primary-color);
}

[data-theme="dark"] .user-menu {
  background: var(--bg-darker);
  border: 1px solid var(--border-color);
}

/* 响应式布局 */
@media (max-width: 768px) {
  .header-content {
    padding: 0 1rem;
  }

  .header-nav {
    display: none;
  }

  .username {
    display: none;
  }
}

/* 暗色主题适配 */
[data-theme="dark"] .dashboard-header.scrolled {
  background: rgba(26, 26, 26, 0.95);
}
</style> 