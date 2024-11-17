<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { routes } from '../config/routes'
import MenuManager from '../utils/menuManager'

const router = useRouter()
const route = useRoute()

const props = defineProps({
  userInfo: {
    type: Object,
    required: true
  }
})

// 根据当前路由设置活动菜单
const activeMenu = ref(route.path.split('/').pop() || 'overview')
// 跟踪展开的菜单
const expandedMenus = ref([])

// 监听路由变化
watch(
  () => route.path,
  (newPath) => {
    activeMenu.value = newPath.split('/').pop() || 'overview'
  }
)

// 处理菜单点击
const handleMenuClick = (route, key) => {
  if (route.children) {
    // 如果有子菜单，切换展开状态
    const index = expandedMenus.value.indexOf(key)
    if (index > -1) {
      expandedMenus.value.splice(index, 1)
    } else {
      expandedMenus.value.push(key)
    }
  } else {
    // 没有子菜单，直接导航
    router.push(`/dashboard/${route.path}`)
  }
}

// 处理子菜单点击
const handleSubMenuClick = (parentPath, childPath) => {
  router.push(`/dashboard/${parentPath}/${childPath}`)
}

// 检查菜单是否开
const isMenuExpanded = (key) => {
  return expandedMenus.value.includes(key)
}

const menuSettings = ref(MenuManager.getMenuSettings())

// 监听菜单设置变化
const handleMenuSettingsChange = (event) => {
  menuSettings.value = event.detail
  console.log('Side menu settings updated:', menuSettings.value)
}

onMounted(() => {
  window.addEventListener('menuSettingsChanged', handleMenuSettingsChange)
})

onUnmounted(() => {
  window.removeEventListener('menuSettingsChanged', handleMenuSettingsChange)
})
</script>

<template>
  <nav 
    v-if="menuSettings.showSideMenu || menuSettings.menuPosition === 'side' || menuSettings.menuPosition === 'both'"
    class="side-nav"
  >
    <div class=" card sidebar">
      <div class="user-profile">
        <img :src="userInfo?.avatar" alt="用户头像" class="avatar">
        <div class="user-info">
          <h3>{{ userInfo?.nickname || userInfo?.username }}</h3>
          <span class="role">{{ userInfo?.role === 'admin' ? '管理员' : '用户' }}</span>
        </div>
      </div>

      <nav class="menu">
        <div v-for="(route, key) in routes" :key="key" class="menu-item-wrapper">
          <!-- 主菜单项 -->
          <a 
            href="#"
            @click.prevent="handleMenuClick(route, key)"
            :class="{ 
              active: activeMenu === route.path,
              'has-children': route.children
            }"
          >
            <i :class="route.iconClass">{{ route.icon }}</i>
            {{ route.name }}
            <i v-if="route.children" 
               class="arrow-icon"
               :class="{ expanded: isMenuExpanded(key) }">
              ▼
            </i>
          </a>

          <!-- 子菜单 -->
          <div v-if="route.children" 
               class="submenu"
               :class="{ expanded: isMenuExpanded(key) }">
            <a 
              v-for="child in route.children"
              :key="child.path"
              href="#"
              @click.prevent="handleSubMenuClick(route.path, child.path)"
              :class="{ active: activeMenu === child.path }"
            >
              <i :class="child.iconClass">{{ child.icon }}</i>
              {{ child.name }}
            </a>
          </div>
        </div>
      </nav>
    </div>
  </nav>
</template>

<style scoped>
/* 侧边栏基础样式 */
.sidebar {
  width: 250px;
  min-width: 200px;
  /* position: fixed; */
  background: var(--bg-primary);
  border-right: 1px solid var(--border-color);
  padding: 1.5rem;
  /* height: calc(100vh - 100px); */
  min-height: 100%;
  margin-top: 2px;
  margin-right: 10px;
  overflow-y: auto;
  
  z-index: 90;
}

/* 用户信息区域 */
.user-profile {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--border-color);
  margin-bottom: var(--spacing-md);
  background: var(--bg-light);
  border-radius: var(--border-radius);
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--border-color);
}

.user-info h3 {
  margin: 0;
  font-size: 1rem;
  color: var(--font-color-primary);
  font-weight: 600;
}

.role {
  font-size: 0.85rem;
  color: var(--font-color-light);
}

/* 菜单样式 */
.menu {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  width: 100%;
  background: var(--bg-light);
  padding: var(--spacing-sm);
  border-radius: var(--border-radius);
}

.menu-item-wrapper {
  width: 100%;
  margin-bottom: 0.3rem;
}

/* 主菜单项样式 */
.menu a {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 1rem;
  color: var(--font-color-regular);
  text-decoration: none;
  border-radius: var(--border-radius);
  transition: all 0.3s ease;
  font-size: 0.95rem;
  font-weight: 500;
  background: var(--bg-primary);  /* 白色背景 */
  width: 100%;
  box-shadow: var(--shadow-sm);
}

/* 主菜单项悬浮状态 */
.menu a:hover {
  background: var(--nav-hover-bg);
  color: var(--primary);
  transform: translateX(5px);
}

/* 主菜单项选中状态 */
.menu a.active {
  background: var(--primary);     /* 使用主题色背景 */
  color: white;                   /* 白色文字 */
  font-weight: 600;
  box-shadow: var(--shadow);
}

/* 菜单图标 */
.menu i {
  font-size: 1.2rem;
  width: 24px;
  text-align: center;
  color: var(--font-color-light);
  transition: color 0.3s ease;
}

.menu a:hover i {
  color: var(--primary);
}

.menu a.active i {
  color: white;  /* 选中状态图标为白色 */
}

/* 子菜单样式 */
.has-children {
  position: relative;
  padding-right: 2rem;
}

.arrow-icon {
  position: absolute;
  right: 1rem;
  font-size: 0.8rem;
  color: var(--font-color-light);
  transition: transform 0.3s ease;
}

.arrow-icon.expanded {
  transform: rotate(180deg);
}

.submenu {
  max-height: 0;
  overflow: hidden;
  transition: all 0.3s ease;
  margin-left: 1rem;
  width: calc(100% - 1rem);
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.submenu.expanded {
  max-height: 200px;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
}

/* 子菜单项样式 */
.submenu a {
  padding: 0.6rem 1rem;
  font-size: 0.9rem;
  color: var(--font-color-light);
  background: var(--bg-primary);
  opacity: 0.9;
}

.submenu a:hover {
  background: var(--nav-hover-bg);
  color: var(--primary);
  opacity: 1;
}

.submenu a.active {
  background: var(--primary);  /* 子菜单选中也使用主题色 */
  color: white;
  font-weight: 600;
  opacity: 1;
}

/* 滚动条样式 */
.sidebar::-webkit-scrollbar {
  width: 4px;
}

.sidebar::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 2px;
}

.sidebar:hover::-webkit-scrollbar-thumb {
  background: var(--font-color-lighter);
}

/* 暗色主题适配 */
[data-theme="dark"] .sidebar {
  background: var(--bg-darker);
  border-right-color: var(--border-color);
}

[data-theme="dark"] .menu {
  background: var(--bg-dark);
}

[data-theme="dark"] .menu a {
  background: var(--bg-darker);
  color: var(--font-color-secondary);
}

[data-theme="dark"] .menu a:hover {
  background: var(--nav-hover-bg);
  color: var(--primary-light);
}

[data-theme="dark"] .menu a.active {
  background: var(--primary-dark);  /* 暗色主题下使用深色主题色 */
  color: white;
}

[data-theme="dark"] .submenu a {
  background: var(--bg-darker);
}

[data-theme="dark"] .submenu a:hover {
  background: var(--nav-hover-bg);
  color: var(--primary-light);
}

[data-theme="dark"] .submenu a.active {
  background: var(--primary-dark);
  color: white;
}

[data-theme="dark"] .user-profile {
  background: var(--bg-dark);
}

/* 响应式布局 */
@media (max-width: 1920px) {
  .sidebar {
    left: calc(50% - 960px + 130px);
    transform: none;
  }
}

@media (max-width: 1440px) {
  .sidebar {
    left: 0;
  }
}

@media (max-width: 768px) {
  .sidebar {
    position: relative;
    width: 100%;
    height: auto;
    top: 0;
    left: 0;
    transform: none;
    border-right: none;
    border-bottom: 1px solid var(--border-color);
    padding: 1rem;
  }
}
</style> 