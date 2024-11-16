import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { ThemeManager } from './utils/theme'

// 样式导入顺序
import './assets/styles/main.css'              // 基础变量和重置样式
import './components/styles/grid.css'          // 布局组件样式
import './components/styles/card.css'          // 卡片组件样式
import './components/styles/button.css'        // 按钮组件样式
import './assets/styles/common.css'            // 通用工具类

// 初始化主题
ThemeManager.initTheme()

const app = createApp(App)
app.use(router)
app.mount('#app')
