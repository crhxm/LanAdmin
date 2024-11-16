<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '../components/NavBar.vue'
import api from '../api'

const router = useRouter()
const isLogin = ref(true)
const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const errorMsg = ref('')

const toggleAuth = () => {
  isLogin.value = !isLogin.value
  username.value = ''
  password.value = ''
  confirmPassword.value = ''
  errorMsg.value = ''
}

const handleSubmit = async () => {
  try {
    loading.value = true
    errorMsg.value = ''

    if (isLogin.value) {
      const res = await api.auth.login({
        username: username.value,
        password: password.value
      })
      console.log('登录成功:', res)
      // 登录成功后跳转到后台
      router.push('/dashboard')
    } else {
      if (password.value !== confirmPassword.value) {
        throw new Error('两次输入的密码不一致')
      }
      const res = await api.auth.register({
        username: username.value,
        password: password.value
      })
      console.log('注册成功:', res)
      // 注册成功后自动切换到登录
      isLogin.value = true
      username.value = ''
      password.value = ''
    }
  } catch (error) {
    console.error(error)
    errorMsg.value = error.message || '操作失败，请重试'
  } finally {
    loading.value = false
  }
}

// 添加测试账户信息提示
const showTestAccount = () => {
  username.value = 'admin'
  password.value = '123456'
}
</script>

<template>
  <div class="container">
    <NavBar />
    
    <div class="auth-container">
      <div class="auth-wrapper">
        <div class="auth-content">
          <!-- 左侧介绍区域 -->
          <div class="auth-left">
            <div class="auth-intro">
              <h2>欢迎使用 CodeEditor</h2>
              <p>专业的代码编辑器，为开发者提供极致体验</p>
              <div class="auth-features">
                <div class="auth-feature-item">
                  <i class="icon-speed">⚡</i>
                  <div>
                    <h3>快速响应</h3>
                    <p>毫秒级响应，流畅的编辑体验</p>
                  </div>
                </div>
                <div class="auth-feature-item">
                  <i class="icon-secure">🔒</i>
                  <div>
                    <h3>安全可靠</h3>
                    <p>数据加密存储，保护您的代码安全</p>
                  </div>
                </div>
                <div class="auth-feature-item">
                  <i class="icon-cloud">☁️</i>
                  <div>
                    <h3>云端同步</h3>
                    <p>随时随地访问您的项目</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 右侧登录/注册表单 -->
          <div class="auth-right">
            <div class="auth-box">
              <div class="auth-header">
                <h2>{{ isLogin ? '欢迎回来' : '创建账号' }}</h2>
                <p class="auth-subtitle">{{ isLogin ? '使用您的账号登录' : '填写以下信息完成注册' }}</p>
              </div>
              
              <form @submit.prevent="handleSubmit">
                <div class="form-group">
                  <label for="username">用户名</label>
                  <input 
                    type="text" 
                    id="username"
                    v-model="username" 
                    required
                    placeholder="请输入用户名"
                  >
                </div>
                
                <div class="form-group">
                  <label for="password">密码</label>
                  <input 
                    type="password" 
                    id="password"
                    v-model="password" 
                    required
                    placeholder="请输入密码"
                  >
                </div>
                
                <div class="form-group" v-if="!isLogin">
                  <label>确认密码</label>
                  <input 
                    type="password" 
                    v-model="confirmPassword" 
                    required
                    placeholder="请再次输入密码"
                  >
                </div>

                <div v-if="isLogin" class="test-account-tip">
                  <p>测试账户: <a href="#" @click.prevent="showTestAccount">点击填充</a></p>
                  <p class="account-info">用户名: admin / 密码: 123456</p>
                </div>

                <p v-if="errorMsg" class="error-message">{{ errorMsg }}</p>

                <button 
                  type="submit" 
                  class="btn auth-btn"
                  :disabled="loading"
                >
                  {{ loading ? '处理中...' : (isLogin ? '登录' : '注册') }}
                </button>
              </form>

              <div class="auth-footer">
                <p class="toggle-text">
                  {{ isLogin ? '还没有账号？' : '已有账号？' }}
                  <a href="#" @click.prevent="toggleAuth">
                    {{ isLogin ? '立即注册' : '立即登录' }}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '../components/styles/form.css'; /* 导入统一样式 */

.auth-container {
  width: 100%;
  min-height: calc(100vh - 64px);
  margin-top: 64px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.auth-wrapper {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.auth-content {
  display: flex;
  gap: 4rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.auth-left {
  flex: 1;
  padding: 4rem;
  background: linear-gradient(135deg, #42b883 0%, #3aa876 100%);
  color: white;
}

.auth-intro h2 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: white;
}

.auth-intro p {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 3rem;
}

.auth-feature-item {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.auth-feature-item i {
  font-size: 1.5rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
}

.auth-feature-item h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: white;
}

.auth-feature-item p {
  font-size: 0.95rem;
  opacity: 0.8;
  margin: 0;
}

.auth-right {
  flex: 1;
  padding: 4rem;
  display: flex;
  align-items: center;
}

.auth-box {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.auth-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.auth-header h2 {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.auth-subtitle {
  color: #666;
  font-size: 1rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 2px solid #eee;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

input:focus {
  border-color: #42b883;
  box-shadow: 0 0 0 3px rgba(66, 184, 131, 0.1);
  outline: none;
}

.auth-btn {
  width: 100%;
  padding: 1rem;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
}

.auth-btn:hover {
  background: #3aa876;
  transform: translateY(-1px);
}

.auth-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.test-account-tip {
  margin: 1.5rem 0;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  font-size: 0.9rem;
  text-align: center;
}

.test-account-tip a {
  color: #42b883;
  text-decoration: none;
  font-weight: 500;
}

.account-info {
  color: #666;
  margin-top: 0.5rem;
  font-size: 0.85rem;
}

.error-message {
  color: #dc3545;
  text-align: center;
  margin: 1rem 0;
  font-size: 0.9rem;
}

.auth-footer {
  text-align: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
}

.toggle-text {
  color: #666;
  font-size: 0.95rem;
}

.toggle-text a {
  color: #42b883;
  text-decoration: none;
  font-weight: 500;
  margin-left: 0.5rem;
}

/* 暗色主题适配 */
[data-theme="dark"] .auth-content {
  background: rgba(40, 40, 40, 0.95);
}

[data-theme="dark"] .auth-header h2 {
  color: #e4e4e4;
}

[data-theme="dark"] .auth-subtitle,
[data-theme="dark"] .form-group label {
  color: #a0a0a0;
}

[data-theme="dark"] input {
  background: #1a1a1a;
  border-color: #333;
  color: #e4e4e4;
}

[data-theme="dark"] input:focus {
  border-color: #42b883;
  box-shadow: 0 0 0 3px rgba(66, 184, 131, 0.2);
}

[data-theme="dark"] .test-account-tip {
  background: #1a1a1a;
}

[data-theme="dark"] .toggle-text {
  color: #a0a0a0;
}

/* 响应式布局 */
@media (max-width: 1024px) {
  .auth-content {
    flex-direction: column;
    max-width: 600px;
    margin: 0 auto;
  }

  .auth-left,
  .auth-right {
    padding: 2rem;
  }
}

@media (max-width: 480px) {
  .auth-container {
    padding: 1rem;
  }

  .auth-left,
  .auth-right {
    padding: 1.5rem;
  }

  .auth-intro h2 {
    font-size: 2rem;
  }
}

/* 保持原有样式不变，在最后添加或修改暗色主题相关样式 */

/* 暗色主题适配 */
[data-theme="dark"] {
  /* 修改背景渐变 */
  .auth-container {
    background: linear-gradient(135deg, #1a1e21 0%, #2c3e50 100%);
  }

  /* 修改内容区域背景 */
  .auth-content {
    background: rgba(30, 32, 35, 0.95);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  }

  /* 左侧区域样式调整 */
  .auth-left {
    background: linear-gradient(135deg, #2d8c64 0%, #246d4d 100%);
  }

  .auth-feature-item i {
    background: rgba(255, 255, 255, 0.15);
  }

  /* 右侧表单区域 */
  .auth-header h2 {
    color: var(--font-color-white);
  }

  .auth-subtitle {
    color: var(--font-color-secondary);
  }

  .form-group label {
    color: var(--font-color-secondary);
  }

  input {
    background: var(--bg-darker);
    border-color: var(--border-color);
    color: var(--font-color-white);
  }

  input:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(66, 184, 131, 0.15);
  }

  input::placeholder {
    color: var(--font-color-light);
  }

  /* 测试账户提示框 */
  .test-account-tip {
    background: var(--bg-darker);
    border: 1px solid var(--border-color);
  }

  .test-account-tip a {
    color: var(--primary-light);
  }

  .test-account-tip a:hover {
    color: var(--primary);
  }

  .account-info {
    color: var(--font-color-light);
  }

  /* 底部切换文本 */
  .auth-footer {
    border-top-color: var(--border-color);
  }

  .toggle-text {
    color: var(--font-color-secondary);
  }

  .toggle-text a {
    color: var(--primary-light);
  }

  .toggle-text a:hover {
    color: var(--primary);
  }

  /* 按钮样式调整 */
  .auth-btn {
    background: var(--primary);
  }

  .auth-btn:hover {
    background: var(--primary-light);
  }

  .auth-btn:disabled {
    background: var(--primary-dark);
    opacity: 0.5;
  }

  /* 错误消息 */
  .error-message {
    color: var(--danger-light);
  }
}
</style>