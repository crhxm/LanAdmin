<script setup>
import { useRouter } from 'vue-router'
import NavBar from '../components/NavBar.vue'


import api from '../api'

const router = useRouter()

const handleAuth = () => {
  router.push('/auth')
}

// 添加在线体验按钮点击处理
const handleTryOnline = async () => {
  try {
    // 检查是否已登录
    const res = await api.auth.checkLoginStatus()
    if (res.data.isLoggedIn) {
      // 已登录，直接跳转到后台
      router.push('/dashboard')
    } else {
      // 未登录，跳转到登录页
      router.push('/auth')
    }
  } catch (error) {
    console.error('检查登录状态失败:', error)
    router.push('/auth')
  }
}
</script>

<template>
  <div class="container">
    <NavBar @show-auth="handleAuth" />

    <main>
      <section id="hero" class="hero">
        <div class="hero-content">
          <h2>轻量级代码编辑器</h2>
          <p>快速、智能、高效的编程体验</p>
          <div class="hero-buttons">
            <button class="btn">立即下载</button>
            <button class="btn btn-outline" @click="handleTryOnline">在线体验</button>
          </div>
          <div class="hero-image">
            <img src="../assets/images/editor-preview.svg" alt="编辑器预览" />
          </div>
        </div>
      </section>

      <section id="features" class="features">
        <div class="features-content">
          <h2>核心功能</h2>
          <div class="feature-grid">
            <div class="feature-card">
              <i class="icon-syntax"></i>
              <h3>智能AI编程</h3>
              <p>超级语言大模型模型，自动生成代码片段。</p>
              <p>支持多种编程语言和框架，帮助开发者快速实现功能。</p>
            </div>
            <div class="feature-card">
              <i class="icon-syntax"></i>
              <h3>智能语法高亮</h3>
              <p>支持多种编程语言，自动识别语法结构，提供精准的代码高亮</p>
            </div>
            <div class="feature-card">
              <i class="icon-complete"></i>
              <h3>代码自动补全</h3>
              <p>智能提示变量、函数和API，提高编码效率</p>
            </div>
            <div class="feature-card">
              <i class="icon-debug"></i>
              <h3>调试��具</h3>
              <p>集成断点调试、变量监视等功能，快速定位问题</p>
            </div>
          </div>
        </div>
      </section>

      <section class="features-detail">
        <div class="features-content">
          <div class="feature-row">
            <div class="feature-text">
              <h3>强大的插件系统</h3>
              <p>丰富的插件生态，满足各类开发需求：</p>
              <ul>
                <li>Git 版本控制集成</li>
                <li>代码格式化工具</li>
                <li>主题定制</li>
                <li>语言服务支持</li>
              </ul>
            </div>
            <div class="feature-image">
              <img src="../assets/images/plugins.svg" alt="插件系统" />
            </div>
          </div>

          <div class="feature-row reverse">
            <div class="feature-text">
              <h3>高性能编辑体验</h3>
              <p>优化的性能表现：</p>
              <ul>
                <li>快速启动，低内存占用</li>
                <li>大文件流畅编辑</li>
                <li>实时语法检查</li>
                <li>多文件搜索替换</li>
              </ul>
            </div>
            <div class="feature-image">
              <img src="../assets/images/performance.svg" alt="性能展示" />
            </div>
          </div>
        </div>
      </section>

      <section class="download-section" id="download">
        <div class="features-content">
          <h2>选择您的平台</h2>
          <div class="download-options">
            <div class="download-card">
              <div class="platform-icon windows">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M0,3.449L9.75,2.1V11.551H0ZM10.949,1.949L24,0V11.4H10.949ZM0,12.6H9.75V22.051L0,20.699ZM10.949,12.6H24V24L11.1,22.199"/>
                </svg>
              </div>
              <h3>Windows</h3>
              <button class="btn">下载 x64</button>
            </div>
            
            <div class="download-card">
              <div class="platform-icon apple">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"/>
                </svg>
              </div>
              <h3>macOS</h3>
              <button class="btn">下载</button>
            </div>
            
            <div class="download-card">
              <div class="platform-icon linux">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.62,8.35C14.2,8.63 12.87,9.39 12.67,9.54C12.46,9.69 12.32,9.71 12.18,9.65C12.05,9.59 11.96,9.41 12.11,9.25C12.27,9.08 13.71,7.94 13.85,7.83C13.98,7.72 14.09,7.64 14.21,7.66C14.33,7.67 14.36,7.77 14.36,7.93C14.36,8.09 14.82,8.23 14.62,8.35M14.32,11.26C14.16,11.09 14.04,10.89 14.07,10.83C14.1,10.77 14.15,10.76 14.24,10.81C14.33,10.85 15.09,11.25 15.24,11.33C15.39,11.41 15.5,11.5 15.5,11.61C15.5,11.71 15.35,11.74 15.23,11.69C15.11,11.64 14.5,11.44 14.32,11.26M9.88,9.55C9.68,9.4 9.72,9.06 9.93,8.72C10.14,8.38 10.41,8.15 10.61,8.3C10.81,8.45 10.77,8.79 10.56,9.13C10.35,9.47 10.08,9.7 9.88,9.55M10.45,11.62C10.28,11.62 10.14,11.37 10.14,11.06C10.14,10.75 10.28,10.5 10.45,10.5C10.62,10.5 10.76,10.75 10.76,11.06C10.76,11.37 10.62,11.62 10.45,11.62M22,17.5V19.5C22,20.31 21.3,21 20.5,21H3.5C2.67,21 2,20.31 2,19.5V17.5C2,16.67 2.67,16 3.5,16H6.23C6.23,16 6.4,16.05 6.57,16.59C6.91,17.79 8.21,18.5 11.5,18.5C14.79,18.5 16.09,17.79 16.43,16.59C16.6,16.05 16.77,16 16.77,16H20.5C21.33,16 22,16.67 22,17.5M9.33,14.5C9.33,14.5 9.06,14.44 8.79,13.8C8.5,13.15 7.85,12.34 7.44,11.83C6.5,10.67 6.2,10.3 6.2,9.82C6.2,9.34 6.65,8.5 7.3,8.5C7.95,8.5 8.61,9.61 9.33,10C10.05,10.39 11.5,10.45 11.5,10.45C11.5,10.45 12.95,10.39 13.67,10C14.39,9.61 15.05,8.5 15.7,8.5C16.35,8.5 16.8,9.34 16.8,9.82C16.8,10.3 16.5,10.67 15.56,11.83C15.15,12.34 14.5,13.15 14.21,13.8C13.94,14.44 13.67,14.5 13.67,14.5C13.67,14.5 13.7,15.05 13.86,15.5C14,15.87 14.33,16 14.71,16H16.77C16.77,16 17.05,15.24 17.5,15.37C17.78,15.45 18.62,15.5 18.62,15.5C19.07,15.5 19.37,15.81 19.37,16.22C19.37,16.58 18.87,16.77 18.5,16.77C18.12,16.77 17.84,16.59 17.7,16.5C17.57,16.41 17.44,16.44 17.44,16.66C17.44,16.88 17.5,17 17.79,17.12C18.08,17.24 18.75,17.37 18.75,18.12C18.75,18.87 17.93,19.37 17.28,19.37C16.85,19.37 16.46,19.27 16.26,19.07C16.06,18.87 15.97,18.5 16,18.17C16.04,17.84 16.13,17.41 16.13,17.41C16.13,17.41 15.5,17.37 15.27,17.37C15.04,17.37 14.96,17.5 14.96,17.66C14.96,17.82 15.16,18.37 15.16,18.75C15.16,19.12 14.96,19.37 14.61,19.37C14.15,19.37 13.82,18.75 13.75,18.62C13.68,18.5 13.32,17.81 13.25,17.76C13.18,17.71 13.04,17.62 12.79,17.62C12.54,17.62 11.5,17.8 11.5,17.8C11.5,17.8 10.46,17.62 10.21,17.62C9.96,17.62 9.82,17.71 9.75,17.76C9.68,17.81 9.32,18.5 9.25,18.62C9.18,18.75 8.85,19.37 8.39,19.37C8.04,19.37 7.84,19.12 7.84,18.75C7.84,18.37 8.04,17.82 8.04,17.66C8.04,17.5 7.96,17.37 7.73,17.37C7.5,17.37 6.87,17.41 6.87,17.41C6.87,17.41 6.96,17.84 7,18.17C7.03,18.5 6.94,18.87 6.74,19.07C6.54,19.27 6.15,19.37 5.72,19.37C5.07,19.37 4.25,18.87 4.25,18.12C4.25,17.37 4.92,17.24 5.21,17.12C5.5,17 5.56,16.88 5.56,16.66C5.56,16.44 5.43,16.41 5.3,16.5C5.16,16.59 4.88,16.77 4.5,16.77C4.13,16.77 3.63,16.58 3.63,16.22C3.63,15.81 3.93,15.5 4.38,15.5C4.38,15.5 5.22,15.45 5.5,15.37C5.95,15.24 6.23,16 6.23,16H8.29C8.67,16 9,15.87 9.14,15.5C9.3,15.05 9.33,14.5 9.33,14.5Z"/>
                </svg>
              </div>
              <h3>Linux</h3>
              <button class="btn">下载</button>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer>
      <div class="footer-content">
        <div class="footer-grid">
          <div class="footer-section">
            <h4>产品</h4>
            <a href="#download">下载</a>
            <a href="#features">功能</a>
            <a href="#pricing">价格</a>
          </div>
          <div class="footer-section">
            <h4>文档</h4>
            <a href="#docs">使用指南</a>
            <a href="#api">API文档</a>
            <a href="#plugins">插件开发</a>
          </div>
          <div class="footer-section">
            <h4>支持</h4>
            <a href="#faq">常见问题</a>
            <a href="#community">社区</a>
            <a href="#contact">联系我们</a>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2024 CodeEditor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template> 

<style>
/* 容器基础样式 */
.container {
  width: 100%;
  max-width: var(--content-width);
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 主要内容区域 */
main {
  flex: 1;
  padding-top: var(--header-height);
}

/* Hero 区域样式 */
.hero {
  padding: var(--spacing-xl) 0;
  background: linear-gradient(to bottom, var(--bg-primary), var(--bg-light));
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
  text-align: center;
}

.hero h2 {
  font-size: 3rem;
  margin-bottom: var(--spacing-md);
  color: var(--font-color-primary);
}

.hero p {
  font-size: 1.5rem;
  color: var(--font-color-secondary);
  margin-bottom: var(--spacing-lg);
}

.hero-buttons {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
  margin-bottom: var(--spacing-xl);
}

.hero-image {
  max-width: 800px;
  margin: 0 auto;
  box-shadow: var(--shadow-lg);
  border-radius: var(--border-radius);
  overflow: hidden;
}

.hero-image img {
  width: 100%;
  height: auto;
  display: block;
}

/* 特性区域样式 */
.features {
  padding: var(--spacing-xl) 0;
  background: var(--bg-light);
}

.features-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
}

.features h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: var(--spacing-xl);
  color: var(--font-color-primary);
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

.feature-card {
  background: var(--bg-primary);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  text-align: center;
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-card i {
  font-size: 2.5rem;
  color: var(--primary);
  margin-bottom: var(--spacing-md);
}

.feature-card h3 {
  font-size: 1.5rem;
  margin-bottom: var(--spacing-sm);
  color: var(--font-color-primary);
}

.feature-card p {
  color: var(--font-color-secondary);
  line-height: 1.6;
}

/* 特性详情区域 */
.features-detail {
  padding: var(--spacing-xl) 0;
}

.feature-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xl);
  align-items: center;
  margin-bottom: var(--spacing-xl);
}

.feature-row.reverse {
  direction: rtl;
}

.feature-row.reverse .feature-text {
  direction: ltr;
}

.feature-text h3 {
  font-size: 2rem;
  margin-bottom: var(--spacing-md);
  color: var(--font-color-primary);
}

.feature-text p {
  font-size: 1.1rem;
  color: var(--font-color-secondary);
  margin-bottom: var(--spacing-md);
}

.feature-text ul {
  list-style: none;
  padding: 0;
}

.feature-text li {
  margin-bottom: var(--spacing-sm);
  color: var(--font-color-regular);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.feature-text li::before {
  content: "✓";
  color: var(--primary);
  font-weight: bold;
}

.feature-image img {
  width: 100%;
  height: auto;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
}

/* 下载区域样式 */
.download-section {
  padding: var(--spacing-xl) 0;
  background: var(--bg-light);
}

.download-options {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-lg);
  margin-top: var(--spacing-lg);
}

.download-card {
  background: var(--bg-primary);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius);
  text-align: center;
  box-shadow: var(--shadow);
  transition: transform 0.3s ease;
}

.download-card:hover {
  transform: translateY(-5px);
}

.download-card i {
  font-size: 3rem;
  color: var(--primary);
  margin-bottom: var(--spacing-md);
}

.download-card h3 {
  margin-bottom: var(--spacing-md);
  color: var(--font-color-primary);
}

/* 页脚样式 */
footer {
  
  color: var(--font-color-white);
  padding: var(--spacing-xl) 0;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
}

.footer-section h4 {
  font-size: 1.2rem;
  margin-bottom: var(--spacing-md);
  color: var(--font-color-white);
}

.footer-section a {
  display: block;
  color: var(--font-color-light);
  text-decoration: none;
  margin-bottom: var(--spacing-sm);
  transition: color 0.3s ease;
}

.footer-section a:hover {
  color: var(--primary);
}

.footer-bottom {
  text-align: center;
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--border-color);
  color: var(--font-color-light);
}

/* 响应式适配 */
@media (max-width: 1024px) {
  .feature-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .feature-row {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }
  
  .feature-row.reverse {
    direction: ltr;
  }
  
  .download-options {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero h2 {
    font-size: 2rem;
  }
  
  .hero p {
    font-size: 1.2rem;
  }
  
  .feature-grid {
    grid-template-columns: 1fr;
  }
  
  .download-options {
    grid-template-columns: 1fr;
  }
  
  .footer-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }
  
  .hero-buttons {
    flex-direction: column;
  }
}

/* 暗色主题适配 */
[data-theme="dark"] {
  .hero {
    background: linear-gradient(to bottom, var(--bg-dark), var(--bg-darker));
  }
  
  .feature-card,
  .download-card {
    background: var(--bg-darker);
  }
  
  footer {
    background: var(--bg-darker);
  }
}

/* 平台图标样式 */
.platform-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto var(--spacing-md);
  display: flex;
  align-items: center;
  justify-content: center;
}

.platform-icon svg {
  width: 100%;
  height: 100%;
  transition: all 0.3s ease;
}

/* Windows 图标样式 */
.platform-icon.windows {
  color: #00A4EF;
}

.download-card:hover .platform-icon.windows svg {
  transform: scale(1.1);
  color: #0078D4;
}

/* Apple 图标样式 */
.platform-icon.apple {
  color: #555555;
}

.download-card:hover .platform-icon.apple svg {
  transform: scale(1.1);
  color: #000000;
}

/* Linux 图标样式 */
.platform-icon.linux {
  color: #F0B034;
}

.download-card:hover .platform-icon.linux svg {
  transform: scale(1.1);
  color: #E0A010;
}

/* 下载卡片样式优化 */
.download-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--spacing-xl);
}

.download-card h3 {
  font-size: 1.5rem;
  margin-bottom: var(--spacing-md);
}

.download-card .btn {
  min-width: 120px;
}

/* 暗色主题适配 */
[data-theme="dark"] {
  .platform-icon.windows {
    color: #0078D4;
  }
  
  .platform-icon.apple {
    color: #FFFFFF;
  }
  
  .platform-icon.linux {
    color: #FFB700;
  }
}
</style> 