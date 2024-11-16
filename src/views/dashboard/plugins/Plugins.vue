<script setup>
const plugins = [
  { 
    name: 'Git 集成', 
    status: 'active',
    description: '版本控制系统集成插件'
  },
  {
    name: '代码格式化',
    status: 'active',
    description: '自动格式化代码工具'
  }
]

const handleConfigure = (plugin) => {
  console.log('配置插件:', plugin)
}

const handleToggle = (plugin) => {
  console.log('切换插件状态:', plugin)
}
</script>

<template>
  <div class="page-container">
    <h2>插件管理</h2>
    <div class="plugins-grid">
      <div 
        v-for="plugin in plugins"
        :key="plugin.name" 
        class="plugin-card"
      >
        <div class="plugin-header">
          <h3>{{ plugin.name }}</h3>
          <span class="plugin-status" :class="plugin.status">
            {{ plugin.status === 'active' ? '已启用' : '已禁用' }}
          </span>
        </div>
        <p>{{ plugin.description }}</p>
        <div class="plugin-actions">
          <button 
            class="btn btn-small"
            @click="handleConfigure(plugin)"
          >配置</button>
          <button 
            class="btn btn-small btn-outline"
            @click="handleToggle(plugin)"
          >
            {{ plugin.status === 'active' ? '禁用' : '启用' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template> 