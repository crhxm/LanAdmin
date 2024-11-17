<script setup>
import { ref, onMounted } from 'vue'
import { ThemeManager } from '../../utils/theme'
import MenuManager from '../../utils/menuManager'

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
  ],
  menuSettings: {
    showTopMenu: true,
    showSideMenu: true,
    menuPosition: 'top',
    menuPositions: [
      { id: 'top', name: '顶部菜单', icon: '⬆️' },
      { id: 'side', name: '侧边菜单', icon: '➡️' },
      { id: 'both', name: '双菜单', icon: '⚡' }
    ]
  }
})

const handleSave = () => {
  // 保存菜单设置
  MenuManager.saveMenuSettings(settings.value.menuSettings)
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

const handleMenuSettingChange = (setting, value) => {
  settings.value.menuSettings[setting] = value
  MenuManager.saveMenuSettings(settings.value.menuSettings)
}

onMounted(() => {
  settings.value.themeMode = ThemeManager.getThemeMode()
  settings.value.themeColor = ThemeManager.getThemeColor()
  const menuSettings = MenuManager.getMenuSettings()
  settings.value.menuSettings = {
    ...settings.value.menuSettings,
    ...menuSettings
  }
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
          <!-- <div class="form-group">
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
          </div>-->
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

      <!-- 菜单设置 -->
      <div class="card">
        <h3 class="subtitle">菜单设置</h3>
        <div class="menu-settings">
          <!-- 菜单位置选择 -->
          <div class="form-section">
            <!-- <h4 class="section-title">菜单位置</h4> -->
            <div class="menu-position-options grid grid-3">
              <div
                v-for="position in settings.menuSettings.menuPositions"
                :key="position.id"
                class="position-card card"
                :class="{ active: settings.menuSettings.menuPosition === position.id }"
                @click="handleMenuSettingChange('menuPosition', position.id)"
              >
                <div class="position-icon">{{ position.icon }}</div>
                <div class="position-info">
                  <h4>{{ position.name }}</h4>
                  <span class="text-light">
                    {{ settings.menuSettings.menuPosition === position.id ? '当前使用' : '点击切换' }}
                  </span>
                </div>
              </div>
            </div>
          </div>




        </div>
      </div>
    </div>
  </div>
</template>


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
  /* border-color: var(--primary); */
  /* background: rgba(66, 184, 131, 0.5); */
  background: var(--primary-lighter);
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
  background: var(--primary-lighter);
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

/* 添加菜单设置相关样式 */
.menu-settings {
  padding: 1rem 0;
}

.section-title {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: var(--font-color-primary);
}

.menu-position-options {
  gap: 1rem;
  margin-bottom: 2rem;
}

.position-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.position-card:hover {
  transform: translateY(-2px);
}

.position-card.active {
  background: var(--primary-lighter);
}

.position-icon {
  font-size: 1.5rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.position-info h4 {
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

.menu-toggles {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.toggle-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.toggle-label input[type="checkbox"] {
  width: 20px;
  height: 20px;
}

.toggle-text {
  font-size: 0.95rem;
  color: var(--font-color-regular);
}

/* 暗色主题配 */
[data-theme="dark"] {
  .position-card.active {
    background: var(--primary-darker);
  }

  .section-title {
    color: var(--font-color-white);
  }

  .toggle-text {
    color: var(--font-color-secondary);
  }
}
</style>