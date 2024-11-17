<script setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getDashboardRoutes } from '../config/routes'

const router = useRouter()
const route = useRoute()
const tabs = ref([])
const activeTab = ref('')

// 获取路由名称
const getRouteName = (path) => {
  const routePath = path.replace('/dashboard/', '').toLowerCase()
  const Routes = getDashboardRoutes()
  const title = findRouteNameByComponentPath(Routes, routePath)
  console.log("title", title)
  return title
}

function findRouteNameByComponentPath(routes, componentPath) {
  return routes.reduce((found, route) => {
    if (!found && route.componentPath?.toLowerCase() === componentPath) {
      return route.name;
    }
    if (!found && route.children) {
      return findRouteNameByComponentPath(route.children, componentPath);
    }
    return found;
  }, undefined) || componentPath.split('/').pop();
}



// 添加标签页
const addTab = (path) => {
  // 如果标签页已存在，直接激活
  if (tabs.value.find(tab => tab.path === path)) {
    activeTab.value = path
    return
  }
  const title = getRouteName(path)
  console.log("title", title)

  // 添加新标签页
  tabs.value.push({
    path: path,
    title:  getRouteName(path), // 使用 getRouteName 获取路由名称
    closable: path !== '/dashboard/overview' // 概览页面不可关闭
  })
  activeTab.value = path
}

// 关闭标签页
const closeTab = (path) => {
  const index = tabs.value.findIndex(tab => tab.path === path)
  if (index === -1) return

  tabs.value.splice(index, 1)

  // 如果关闭的是当前激活的标签页，需要激活其他标签页
  if (path === activeTab.value) {
    // 优先激活右侧标签页，如果没有则激活左侧标签页
    const nextTab = tabs.value[index] || tabs.value[index - 1]
    if (nextTab) {
      activeTab.value = nextTab.path
      router.push(nextTab.path)
    } else {
      // 如果没有其他标签页，跳转到概览页面
      router.push('/dashboard/overview')
    }
  }
}

// 切换标签页
const switchTab = (path) => {
  activeTab.value = path
  router.push(path)
}

// 监听路由变化
watch(
  () => route.path,
  (newPath) => {
    if (newPath.startsWith('/dashboard/')) {
      addTab(newPath)
    }
  },
  { immediate: true }
)

// 初始化概览标签页
addTab('/dashboard/overview')
</script>

<template>
  <div class="tabs-nav card">
    <div class="tabs-wrapper">
      <div
        v-for="tab in tabs"
        :key="tab.path"
        class="tab"
        :class="{ active: activeTab === tab.path }"
        @click="switchTab(tab.path)"
      >
        <span class="tab-title">{{ tab.title }}</span>
        <span
          v-if="tab.closable"
          class="tab-close"
          @click.stop="closeTab(tab.path)"
        >
          ×
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 标签页导航样式 */
.tabs-nav {
  padding: 0.5rem;
  background: var(--bg-light);
  border-bottom: 1px solid var(--border-color);
}

.tabs-wrapper {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 4px;
}

.tabs-wrapper::-webkit-scrollbar {
  height: 4px;
}

.tabs-wrapper::-webkit-scrollbar-track {
  background: transparent;
}

.tabs-wrapper::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 2px;
}

.tab {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-);
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.tab:hover {
  background: var(--bg-light);
}

.tab.active {
  background: var(--primary-lighter);
  border-color: var(--primary);
  color: var(--primary);
}

.tab-title {
  font-size: 0.9rem;
}

.tab-close {
  font-size: 1.1rem;
  width: 16px;
  height: 16px;
  line-height: 16px;
  text-align: center;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.tab-close:hover {
  background: rgba(0, 0, 0, 0.1);
  color: var(--danger);
}

/* 暗色主题适配 */
[data-theme="dark"] {
  .tab {
    background: var(--bg-darker);
  }

  .tab:hover {
    background: var(--bg-dark);
  }

  .tab.active {
    background: var(--primary-darker);
    color: white;
  }

  .tab-close:hover {
    background: rgba(255, 255, 255, 0.1);
  }
}
</style> 