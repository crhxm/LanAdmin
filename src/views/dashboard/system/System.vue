<script setup>
import { ref } from 'vue'

// 系统概览数据
const systemInfo = ref({
  serverStatus: {
    status: 'running',
    uptime: '23天15小时',
    cpu: '32%',
    memory: '45%',
    disk: '60%'
  },
  userStats: {
    total: 1280,
    active: 356,
    newToday: 25,
    online: 168
  },
  securityInfo: {
    lastBackup: '2024-02-20 15:30:00',
    lastScan: '2024-02-20 12:00:00',
    threats: 0,
    updates: 2
  },
  recentActivities: [
    { time: '2024-02-20 15:45', type: 'login', user: 'admin', status: 'success' },
    { time: '2024-02-20 15:30', type: 'config', user: 'admin', status: 'success' },
    { time: '2024-02-20 15:15', type: 'backup', user: 'system', status: 'success' },
    { time: '2024-02-20 14:50', type: 'login', user: 'user123', status: 'failed' }
  ]
})

// 添加活动类型处理函数
const getActivityTypeClass = (type) => {
  switch (type) {
    case 'login': return 'status-success'
    case 'config': return 'status-warning'
    case 'backup': return 'status-info'
    default: return ''
  }
}

const getActivityTypeName = (type) => {
  switch (type) {
    case 'login': return '登录'
    case 'config': return '配置'
    case 'backup': return '备份'
    default: return type
  }
}
</script>

<template>
  <div class="page-container">
    <div class="page-header">
      <h2 class="title">系统概览</h2>
      <span class="status-badge" :class="systemInfo.serverStatus.status === 'running' ? 'status-success' : 'status-danger'">
        系统状态: {{ systemInfo.serverStatus.status === 'running' ? '运行中' : '异常' }}
      </span>
    </div>

    <!-- 状态卡片 -->
    <div class="grid grid-3">
      <!-- 服务器状态 -->
      <div class="card">
        <div class="card-header">
          <h3 class="subtitle">服务器状态</h3>
          <i class="icon">🖥️</i>
        </div>
        <div class="card-content">
          <div class="status-item">
            <span>运行时间</span>
            <span>{{ systemInfo.serverStatus.uptime }}</span>
          </div>
          <div class="status-item">
            <span>CPU使用率</span>
            <div class="progress-bar">
              <div class="progress" :style="{ width: systemInfo.serverStatus.cpu }"></div>
              <span>{{ systemInfo.serverStatus.cpu }}</span>
            </div>
          </div>
          <div class="status-item">
            <span>内存使用</span>
            <div class="progress-bar">
              <div class="progress" :style="{ width: systemInfo.serverStatus.memory }"></div>
              <span>{{ systemInfo.serverStatus.memory }}</span>
            </div>
          </div>
          <div class="status-item">
            <span>磁盘使用</span>
            <div class="progress-bar">
              <div class="progress" :style="{ width: systemInfo.serverStatus.disk }"></div>
              <span>{{ systemInfo.serverStatus.disk }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 用户统计 -->
      <div class="card">
        <div class="card-header">
          <h3 class="subtitle">用户统计</h3>
          <i class="icon">👥</i>
        </div>
        <div class="card-content">
          <div class="grid grid-2">
            <div class="stat-card">
              <span class="stat-value">{{ systemInfo.userStats.total }}</span>
              <span class="stat-label">总用户数</span>
            </div>
            <div class="stat-card">
              <span class="stat-value">{{ systemInfo.userStats.active }}</span>
              <span class="stat-label">活跃用户</span>
            </div>
            <div class="stat-card">
              <span class="stat-value">{{ systemInfo.userStats.newToday }}</span>
              <span class="stat-label">今日新增</span>
            </div>
            <div class="stat-card">
              <span class="stat-value">{{ systemInfo.userStats.online }}</span>
              <span class="stat-label">当前在线</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 安全信息 -->
      <div class="card">
        <div class="card-header">
          <h3 class="subtitle">安全信息</h3>
          <i class="icon">🔒</i>
        </div>
        <div class="card-content">
          <div class="security-info">
            <div class="info-item">
              <span>最后备份</span>
              <span>{{ systemInfo.securityInfo.lastBackup }}</span>
            </div>
            <div class="info-item">
              <span>安全扫描</span>
              <span>{{ systemInfo.securityInfo.lastScan }}</span>
            </div>
            <div class="info-item">
              <span>安全威胁</span>
              <span class="status-badge status-success">{{ systemInfo.securityInfo.threats }}</span>
            </div>
            <div class="info-item">
              <span>待更新</span>
              <span class="status-badge status-warning">{{ systemInfo.securityInfo.updates }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 最近活动 -->
    <div class="card">
      <h3 class="subtitle">最近活动</h3>
      <div class="activity-list">
        <div v-for="(activity, index) in systemInfo.recentActivities" 
             :key="index"
             class="activity-item"
        >
          <span class="text-light">{{ activity.time }}</span>
          <span class="status-badge" :class="getActivityTypeClass(activity.type)">
            {{ getActivityTypeName(activity.type) }}
          </span>
          <span class="text-primary">{{ activity.user }}</span>
          <span class="status-badge" :class="activity.status === 'success' ? 'status-success' : 'status-danger'">
            {{ activity.status === 'success' ? '成功' : '失败' }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.status-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.activity-item {
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem;
  background: var(--bg-light);
  border-radius: var(--border-radius);
  margin-bottom: 0.5rem;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style> 