<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { routes } from '../config/routes'
import api from '../api'
import MenuManager from '../utils/menuManager'

const router = useRouter()
const route = useRoute()
const userInfo = ref(null)
const showUserMenu = ref(false)
const menuTimeout = ref(null)
const isScrolled = ref(false)
const lastScrollTop = ref(0)
const isHeaderVisible = ref(true)
const activeMenu = ref('')
const activeSubmenu = ref('')
const activeSubMenuId = ref(null)
const menuSettings = ref(MenuManager.getMenuSettings())

// 监听菜单设置变化
const handleMenuSettingsChange = (event) => {
  menuSettings.value = event.detail
  console.log('Header menu settings updated:', menuSettings.value)
}

// 添加和移除滚动监听
onMounted(() => {
  //window.addEventListener('scroll', handleScroll)
  checkLoginStatus()
  // 添加菜单设置变化监听
  window.addEventListener('menuSettingsChanged', handleMenuSettingsChange)
})

onUnmounted(() => {
  //window.removeEventListener('scroll', handleScroll)
  // 移除菜单设置变化监听
  window.removeEventListener('menuSettingsChanged', handleMenuSettingsChange)
})

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
  }, 100)
}

// 导航处理
const handleNavClick = (path) => {
  router.push(`/dashboard/${path}`)
}

// 菜单点击处理

const handleMenuClick = (route) => {
  if (activeSubMenuId.value === route.path) {
    activeSubMenuId.value = null
  } else {
    activeSubMenuId.value = route.path
  }
  if (!route.children) {
    handleNavClick(route.path)
  }
}

// 添加鼠标移入处理
const handleMenuMouseEnter = (route) => {
  if (route.children) {
    activeSubMenuId.value = route.path
  }
}

// 添加鼠标移出处理
const handleMenuMouseLeave = () => {
  activeSubMenuId.value = null
}





// 二级菜单点击处理
const handleSubMenuClick = (parentPath, child) => {
  activeMenu.value = parentPath
  activeSubmenu.value = child.path
  //console.log(parentPath,child.path)
  handleNavClick(parentPath+"/"+child.path)
  //
  activeSubMenuId.value = null
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

// 监听路由变化以更新激活状态
watch(() => route.path, (newPath) => {
  const path = newPath.split('/').pop()
  activeMenu.value = path
  
  // 添加空值检查
  if (routes && Array.isArray(routes)) {
    routes.forEach(route => {
      if (route.children) {
        const child = route.children.find(child => child.path === path)
        if (child) {
          activeSubmenu.value = child.path
        }
      }
    })
  }
})
</script>

<template>
  <header 
    v-if="menuSettings.showTopMenu || menuSettings.menuPosition === 'top' || menuSettings.menuPosition === 'both'"
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
          GameAdmin v1.0{{ version }}
          </a>
        </h1>
      </div>

      <!-- 导航区域 -->
      <nav class="header-nav">
        <div v-for="route in routes" :key="route.path" class="nav-item" @mouseenter="handleMenuMouseEnter(route)"
          @mouseleave="handleMenuMouseLeave">
          <div class="nav-title" @click="handleMenuClick(route)" :class="{ 'active': activeMenu === route.path }">
            <span class="nav-icon" :class="route.iconClass">{{ route.icon }}</span>
            <span class="nav-text">{{ route.name }}</span>
            <i v-if="route.children" class="arrow-icon" :class="{ 'rotated': activeSubMenuId === route.path }">▼</i>
          </div>

          <div v-if="route.children" class="sub-menu card" style="padding: 5px;" :class="{ 'visible': activeSubMenuId === route.path }">
            <div v-for="child in route.children" :key="child.path" class="sub-menu-item"
              :class="{ 'active': activeSubmenu === child.path }" @click="handleSubMenuClick(route.path, child)">
              <span class="sub-menu-icon" :class="child.iconClass">{{ child.icon }}</span>
              <span class="sub-menu-text">{{ child.name }}</span>
            </div>
          </div>
        </div>
      </nav>

      <!-- 用户信息区域 -->
      <div class="user-info" v-if="userInfo" @mouseenter="handleMenuEnter" @mouseleave="handleMenuLeave">
        <div class="user-avatar">
          <img :src="userInfo?.avatar" alt="用户头像">
          <span class="username">{{ userInfo.nickname || userInfo.username }}</span>
          <i class="icon-arrow" :class="{ 'rotate': showUserMenu }">▼</i>
        </div>

        <!-- 用户菜单 -->
        <div v-if="showUserMenu" class="user-menu" @mouseenter="handleMenuEnter" @mouseleave="handleMenuLeave">
          <a href="#" class="menu-item" @click.prevent="handleNavClick('profile')">
            <i class="icon-profile">👤</i>
            个人资料
          </a>
          <a href="#" class="menu-item" @click.prevent="handleNavClick('settings')">
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
  </header>
</template>

<style scoped>

.dashboard-header {
  /* position: fixed; */
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

.dashboard-header.scrolled {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.dashboard-header.header-hidden {
  transform: translateY(-100%);
}

.header-content {
  max-width:  var(--content-width);
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

.nav-item {
  position: relative;
  cursor: pointer;
}

.nav-title {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 4px;
  transition: all 0.3s;
}

.nav-title:hover {
  background: var(--bg-light);
}

.nav-title.active {
  color: var(--primary-color);
  background: var(--bg-light);
}

.arrow-icon {
  font-size: 12px;
  margin-left: 4px;
  transition: transform 0.3s;
}

.arrow-icon.rotated {
  transform: rotate(180deg);
}

.sub-menu {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 150px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s;
  z-index: 1000;
}

.sub-menu.visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.sub-menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  transition: all 0.3s;
}

.sub-menu-item:hover {
  background: var(--bg-light);
}

.sub-menu-item.active {
  color: var(--primary-color);
  background: var(--bg-light);
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
  border-radius: 4px;
  transition: all 0.3s;
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
  border-radius: 4px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
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
  border-radius: 4px;
  transition: all 0.3s;
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

[data-theme="dark"] .dashboard-header.scrolled {
  background: rgba(26, 26, 26, 0.95);
}

[data-theme="dark"] .sub-menu {
  background: var(--bg-darker);
  border: 1px solid var(--border-color);
}

/* 响应式布局 */
@media (max-width: 768px) {
  .header-content {
    padding: 0 1rem;
  }

  .nav-text {
    display: none;
  }

  .sub-menu {
    left: auto;
    right: 0;
  }

  .username {
    display: none;
  }
}
</style>