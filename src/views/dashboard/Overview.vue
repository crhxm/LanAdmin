<script setup>
import { ref } from 'vue'

const overviewData = ref({
  stats: {
    projects: { value: 128, trend: '+15%', status: 'up' },
    users: { value: 2560, trend: '+8.5%', status: 'up' },
    storage: { value: '1.2TB', trend: '+12%', status: 'up' },
    performance: { value: '98%', trend: '-2%', status: 'down' }
  },
  recentActivities: [
    { time: '10分钟前', action: '项目创建', user: '张三', project: 'Vue项目模板' },
    { time: '30分钟前', action: '代码提交', user: '李四', project: 'React组件库' },
    { time: '1小时前', action: '项目部署', user: '王五', project: '后台管理系统' }
  ],
  systemStatus: {
    cpu: '32%',
    memory: '45%',
    disk: '60%',
    network: '25MB/s'
  }
})
</script>

<template>
  <div class="page-container">
    <div class="page-header">
      <h2 class="title">系统概览</h2>
      <div class="actions">
        <button class="btn btn-primary">刷新数据</button>
      </div>
    </div>

    <!-- 统计卡片 -->
    <div class="grid grid-4">
      <div class="stat-card">
        <h3 class="subtitle">项目总数</h3>
        <div class="stat-value">{{ overviewData.stats.projects.value }}</div>
        <div class="stat-trend" :class="{ 'trend-up': overviewData.stats.projects.status === 'up' }">
          {{ overviewData.stats.projects.trend }}
        </div>
      </div>
      <div class="stat-card">
        <h3 class="subtitle">用户数量</h3>
        <div class="stat-value">{{ overviewData.stats.users.value }}</div>
        <div class="stat-trend" :class="{ 'trend-up': overviewData.stats.users.status === 'up' }">
          {{ overviewData.stats.users.trend }}
        </div>
      </div>
      <div class="stat-card">
        <h3 class="subtitle">存储空间</h3>
        <div class="stat-value">{{ overviewData.stats.storage.value }}</div>
        <div class="stat-trend" :class="{ 'trend-up': overviewData.stats.storage.status === 'up' }">
          {{ overviewData.stats.storage.trend }}
        </div>
      </div>
      <div class="stat-card">
        <h3 class="subtitle">系统性能</h3>
        <div class="stat-value">{{ overviewData.stats.performance.value }}</div>
        <div class="stat-trend" :class="{ 'trend-up': overviewData.stats.performance.status === 'up' }">
          {{ overviewData.stats.performance.trend }}
        </div>
      </div>
    </div>

    <!-- 系统状态 -->
    <div class="card">
      <h3 class="subtitle">系统状态</h3>
      <div class="status-grid">
        <div class="status-item">
          <span>CPU使用率</span>
          <div class="progress-bar">
            <div class="progress" :style="{ width: overviewData.systemStatus.cpu }"></div>
            <span>{{ overviewData.systemStatus.cpu }}</span>
          </div>
        </div>
        <div class="status-item">
          <span>内存使用</span>
          <div class="progress-bar">
            <div class="progress" :style="{ width: overviewData.systemStatus.memory }"></div>
            <span>{{ overviewData.systemStatus.memory }}</span>
          </div>
        </div>
        <div class="status-item">
          <span>磁盘使用</span>
          <div class="progress-bar">
            <div class="progress" :style="{ width: overviewData.systemStatus.disk }"></div>
            <span>{{ overviewData.systemStatus.disk }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 最近活动 -->
    <div class="card">
      <h3 class="subtitle">最近活动</h3>
      <div class="activity-list">
        <div v-for="(activity, index) in overviewData.recentActivities" 
             :key="index"
             class="activity-item"
        >
          <span class="text-light">{{ activity.time }}</span>
          <span class="text-primary">{{ activity.user }}</span>
          <span class="status-badge status-info">{{ activity.action }}</span>
          <span class="text-secondary">{{ activity.project }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.status-grid {
  display: grid;
  gap: 1.5rem;
}

.status-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.trend-up {
  color: var(--success);
}

.trend-down {
  color: var(--danger);
}

.activity-item {
  display: grid;
  grid-template-columns: auto auto auto 1fr;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.activity-item:last-child {
  border-bottom: none;
}
</style> 