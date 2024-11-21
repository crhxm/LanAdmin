<script setup>
import { ref, onMounted, computed } from 'vue'
import api from '../../api'

const userInfo = ref({
    username: '',
    nickname: '',
    email: '',
    avatar: '',
    vipLevel: 0,
    vipName: '',
    registerTime: '',
    lastLoginTime: '',
    role: ''
})

const passwordForm = ref({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
})

const loading = ref(false)
const message = ref('')

// 添加VIP等级配置
const vipStyles = {
    999: { color: '#f1c40f', background: '#2c3e50' }, // 管理员
    3: { color: '#e056fd', background: '#8e44ad' },   // SVIP
    2: { color: '#3498db', background: '#2980b9' },   // VIP
    1: { color: '#95a5a6', background: '#7f8c8d' }    // 普通会员
}

// 获取VIP样式
const getVipStyle = computed(() => {
    return vipStyles[userInfo.value.vipLevel] || vipStyles[1]
})

// 获取用户信息
const getUserInfo = async () => {
    try {
        // 先从localStorage获取
        const storedUserInfo = localStorage.getItem('userInfo')
        if (storedUserInfo) {
            userInfo.value = JSON.parse(storedUserInfo)
        }

        // 然后通过API更新
        const res = await api.auth.checkLoginStatus()
        if (res.data.isLoggedIn && res.data.userInfo) {
            userInfo.value = res.data.userInfo
            console.log('当前用户信息:', userInfo.value)  // 添加日志
        }
    } catch (error) {
        console.error('获取用户信息失败:', error)
    }
}

// 更新个人信息
const updateProfile = async () => {
    try {
        loading.value = true
        // 调用API更新用户信息
        message.value = '个人信息更新成功'
    } catch (error) {
        message.value = '更新失败: ' + error.message
    } finally {
        loading.value = false
    }
}

// 修改密码
const changePassword = async () => {
    try {
        loading.value = true
        if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
            throw new Error('两次输入的密码不一致')
        }
        // 调用API修改密码
        message.value = '密码修改成功'
        passwordForm.value = { oldPassword: '', newPassword: '', confirmPassword: '' }
    } catch (error) {
        message.value = '修改失败: ' + error.message
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    getUserInfo()
})
</script>

<template>
    <div class="page-container">
        <div class="page-header">
            <h2 class="title">个人资料</h2>
            <div v-if="message" class="status-badge"
                :class="{ 'status-success': !message.includes('失败'), 'status-danger': message.includes('失败') }">
                {{ message }}
            </div>
        </div>

        <div class="profile-layout">
            <!-- 左侧：用户信息和密码修改 -->
            <div class="profile-main">
                <!-- 基本信息卡片 -->
                <div class="card">
                    <div class="profile-header">
                        <div class="avatar-section">
                            <img :src="userInfo.avatar" alt="用户头像" class="avatar">
                            <button class="btn btn-outline btn-small">更换头像</button>
                        </div>
                        <div class="user-meta">
                            <h3 class="subtitle">{{ userInfo.nickname || userInfo.username }}</h3>
                            <span class="status-badge"
                                :style="{ background: getVipStyle.background, color: getVipStyle.color }">
                                {{ userInfo.vipName }}
                            </span>
                        </div>
                    </div>
                    <div class="divider"></div>
                    <div class="form-section">
                        <div class="form-group">
                            <label>用户名</label>
                            <input type="text" v-model="userInfo.username" disabled class="form-control">
                        </div>
                        <div class="form-group">
                            <label>昵称</label>
                            <input type="text" v-model="userInfo.nickname" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>邮箱</label>
                            <input type="email" v-model="userInfo.email" class="form-control">
                        </div>
                        <button class="btn btn-primary" @click="updateProfile" :disabled="loading">
                            {{ loading ? '保存中...' : '保存修改' }}
                        </button>
                    </div>
                </div>

                <!-- 修改密码卡片 -->
                <div class="card">
                    <h3 class="subtitle">修改密码</h3>
                    <div class="form-section">
                        <div class="form-group">
                            <label>当前密码</label>
                            <input type="password" v-model="passwordForm.oldPassword" class="form-control" id="oldPassword">
                            <label for="oldPassword">什么设置</label>
                            <div class="form-group">
                                <label>当前密码</label>
                                <input type="password" v-model="passwordForm.oldPassword" class="form-control">
                            </div>
                           
                        </div>
                        <div class="form-group">
                            <label>新密码</label>
                            <input type="password" v-model="passwordForm.newPassword" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>确认新密码</label>
                            <input type="password" v-model="passwordForm.confirmPassword" class="form-control">
                        </div>
                        <button class="btn btn-primary" @click="changePassword" :disabled="loading">
                            {{ loading ? '修改中...' : '修改密码' }}
                        </button>
                    </div>
                </div>
            </div>

            <!-- 右侧：会员信息和权益 -->
            <div class="profile-side">
                <!-- 会员信息卡片 -->
                <div class="card">
                    <h3 class="subtitle">会员信息</h3>
                    <div class="vip-card" :style="{ borderColor: getVipStyle.color }">
                        <div class="vip-header" :style="{ background: getVipStyle.background }">
                            <h4>{{ userInfo.vipName }}</h4>
                            <span class="vip-level">Level {{ userInfo.vipLevel }}</span>
                        </div>
                        <div class="vip-content">
                            <div class="info-item">
                                <span class="text-light">注册时间</span>
                                <span>{{ userInfo.registerTime }}</span>
                            </div>
                            <div class="info-item">
                                <span class="text-light">最后登录</span>
                                <span>{{ userInfo.lastLoginTime }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 会员权益卡片 -->
                <div class="card">
                    <h3 class="subtitle">会员权益</h3>
                    <div class="benefits-list">
                        <div class="benefit-item">
                            <div class="benefit-icon">✨</div>
                            <div class="benefit-info">
                                <h4>专属技术支持</h4>
                                <p class="text-light">获得优先的技术支持服务</p>
                            </div>
                        </div>
                        <div class="benefit-item">
                            <div class="benefit-icon">🚀</div>
                            <div class="benefit-info">
                                <h4>优先使用新功能</h4>
                                <p class="text-light">抢先体验最新功能</p>
                            </div>
                        </div>
                        <div class="benefit-item">
                            <div class="benefit-icon">💾</div>
                            <div class="benefit-info">
                                <h4>更大的存储空间</h4>
                                <p class="text-light">享受更多的存储容量</p>
                            </div>
                        </div>
                        <div class="benefit-item">
                            <div class="benefit-icon">🎨</div>
                            <div class="benefit-info">
                                <h4>自定义主题</h4>
                                <p class="text-light">个性化界面设置</p>
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
.profile-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    align-items: start;
}

.profile-main {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.profile-side {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    position: sticky;
    top: 84px;
}

.profile-header {
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-bottom: 1.5rem;
}

.avatar-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
}

.avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid var(--primary);
    padding: 2px;
    background: white;
}

.user-meta {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.vip-card {
    border: 2px solid;
    border-radius: var(--border-radius);
    overflow: hidden;
    transition: all 0.3s ease;
}

.vip-header {
    padding: 1.2rem;
    color: white;
    text-align: center;
}

.vip-content {
    padding: 1.2rem;
}

.info-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.8rem;
}

.benefits-list {
    display: flex;
    flex-direction: column;
    height: 515px;
    gap: 1rem;
}

.benefit-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: var(--bg-light);
    border-radius: var(--border-radius);
    transition: all 0.3s ease;
}

.benefit-item:hover {
    transform: translateX(5px);
}

.benefit-icon {
    font-size: 1.5rem;
    padding: 0.8rem;
    background: white;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
    flex-shrink: 0;
}

.benefit-info {
    flex: 1;
}

.benefit-info h4 {
    margin: 0 0 0.5rem 0;
    font-size: 1rem;
}

/* 暗色主题适配 */
[data-theme="dark"] .benefit-icon {
    background: var(--bg-darker);
}

[data-theme="dark"] .avatar {
    background: var(--bg-darker);
}

/* 响应式布局 */
@media (max-width: 1200px) {
    .profile-layout {
        grid-template-columns: 1fr;
    }

    .profile-side {
        position: static;
    }
}

@media (max-width: 768px) {
    .profile-header {
        flex-direction: column;
        text-align: center;
    }

    .benefit-item {
        flex-direction: column;
        text-align: center;
    }
}


</style>