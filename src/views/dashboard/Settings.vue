<script setup>
import { ref, onMounted } from 'vue'
import { ThemeManager } from '../../utils/theme'

const settings = ref({
  systemName: 'CodeEditor',
  themeMode: ThemeManager.getThemeMode(),
  themeColor: ThemeManager.getThemeColor(),
  language: 'zh_CN',
  fontSize: '14',
  fontSizes: ['12', '13', '14', '15', '16', '18', '20'],
  themeModes: [
    { id: 'light', name: '亮色主题', icon: '☀️' },
    { id: 'dark', name: '暗色主题', icon: '🌙' }
  ],
  themeColors: Object.values(ThemeManager.themes),
  languages: [
    { id: 'zh_CN', name: '简体中文' },
    { id: 'en_US', name: 'English' }
  ]
})

const handleSave = () => {
  console.log('保存设置:', settings.value)
}

const handleThemeModeChange = (mode) => {
  settings.value.themeMode = mode
  ThemeManager.setThemeMode(mode)
}

const handleThemeColorChange = (themeId) => {
  settings.value.themeColor = themeId
  ThemeManager.setThemeColor(themeId)
}

onMounted(() => {
  settings.value.themeMode = ThemeManager.getThemeMode()
  settings.value.themeColor = ThemeManager.getThemeColor()
})
</script>

<template>
  <div class="page-container">
    <div class="page-header">
      <h2 class="title">系统设置</h2>
      <button class="btn btn-primary" @click="handleSave">保存设置</button>
    </div>

    <div class="grid">
      <!-- 基础设置 -->
      <div class="card">
        <h3 class="subtitle">基础设置</h3>
        <div class="form-section">
          <div class="form-group">
            <label>系统名称</label>
            <input 
              type="text" 
              v-model="settings.systemName"
              class="form-control"
            >
          </div>

          <div class="form-group">
            <label>界面语言</label>
            <select 
              v-model="settings.language"
              class="form-control"
            >
              <option 
                v-for="lang in settings.languages"
                :key="lang.id"
                :value="lang.id"
              >
                {{ lang.name }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label>字体大小</label>
            <select 
              v-model="settings.fontSize"
              class="form-control"
            >
              <option 
                v-for="size in settings.fontSizes"
                :key="size"
                :value="size"
              >
                {{ size }}px
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- 主题设置 -->
      <div class="card">
        <h3 class="subtitle">主题设置</h3>
        
        <!-- 主题模式选择 -->
        <div class="theme-options grid grid-2">
          <div 
            v-for="theme in settings.themeModes"
            :key="theme.id"
            class="theme-card card"
            :class="{ active: settings.themeMode === theme.id }"
            @click="handleThemeModeChange(theme.id)"
          >
            <div class="theme-icon">{{ theme.icon }}</div>
            <div class="theme-info">
              <h4>{{ theme.name }}</h4>
              <span class="text-light">
                {{ settings.themeMode === theme.id ? '当前使用' : '点击切换' }}
              </span>
            </div>
          </div>
        </div>

        <!-- 主题颜色选择 -->
        <h4 class="subtitle mt-4">主题色彩</h4>
        <div class="theme-colors grid grid-4">
          <div 
            v-for="theme in settings.themeColors"
            :key="theme.id"
            class="color-card card"
            :class="{ active: settings.themeColor === theme.id }"
            @click="handleThemeColorChange(theme.id)"
          >
            <div class="color-icon" :style="{ background: theme.colors.primary }">
              {{ theme.icon }}
            </div>
            <div class="color-name">{{ theme.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- 
<style scoped>
@import '../../components/styles/form.css';
/* 只保留特定样式 */
.theme-card {
  cursor: pointer;
  transition: all 0.3s ease;
}

.theme-card:hover {
  transform: translateY(-2px);
}

.theme-card.active {
  border-color: var(--primary);
  background: rgba(66, 184, 131, 0.5);
}

.theme-icon {
  font-size: 1.5rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-info {
  flex: 1;
}

.theme-colors {
  margin-top: 1rem;
}

.color-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  cursor: pointer;
  border-radius: var(--border-radius);
  transition: all 0.3s ease;
}

.color-card:hover {
  transform: translateY(-2px);
}




.color-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: white;
  transition: transform 0.3s ease;
}

.color-card:hover .color-icon {
  transform: scale(1.1);
}

.color-name {
  font-size: 0.9rem;
  color: var(--font-color-regular);
}

.mt-4 {
  margin-top: 1.5rem;
}



/* 主题颜色选择样式 */
.color-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  cursor: pointer;
  border-radius: var(--border-radius);
  transition: all 0.3s ease;
}

.color-card.active {
  background: rgba(66, 184, 131, 0.5); /* 选中颜色的背景 */
}

.color-card:hover {
  transform: translateY(-2px);
}

.color-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: white;
  transition: transform 0.3s ease;
}

.color-card:hover .color-icon {
  transform: scale(1.1);
} 
</style>  -->


<style scoped>
@import '../../components/styles/form.css';

/* 主题卡片样式 */
.theme-card {
  cursor: pointer;
  transition: all 0.3s ease;
}

.theme-card:hover {
  transform: translateY(-2px);
}

.theme-card.active {
  border-color: var(--primary);
  background: rgba(66, 184, 131, 0.5);
}

/* 主题图标样式 */
.theme-icon {
  font-size: 1.5rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 主题信息样式 */
.theme-info {
  flex: 1;
}

/* 主题颜色选择样式 */
.theme-colors {
  margin-top: 1rem;
}

.color-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  cursor: pointer;
  border-radius: var(--border-radius);
  transition: all 0.3s ease;
}

.color-card.active {
  background: rgba(66, 184, 131, 0.5); /* 选中颜色的背景 */
}

.color-card:hover {
  transform: translateY(-2px);
}

/* 颜色图标样式 */
.color-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: white;
  transition: transform 0.3s ease;
}

.color-card:hover .color-icon {
  transform: scale(1.1);
}

.color-name {
  font-size: 0.9rem;
  color: var(--font-color-regular);
}

.mt-4 {
  margin-top: 1.5rem;
}
</style>