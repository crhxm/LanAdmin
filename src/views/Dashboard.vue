<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import DashboardHeader from '../components/DashboardHeader.vue'
import SideNav from '../components/SideNav.vue'
import TabsNav from '../components/TabsNav.vue'
import api from '../api'

const router = useRouter()
const userInfo = ref(null)

// 获取用户信息
const getUserInfo = async () => {
  try {
    const res = await api.auth.checkLoginStatus()
    if (res.data.isLoggedIn) {
      console.log("res.data.userInfo", res.data.userInfo)
      userInfo.value = res.data.userInfo
    }
  } catch (error) {  
    console.error('获取用户信息失败:', error)
  }
}

onMounted(() => {
  getUserInfo()
})
</script>

<template>
  <div class="container">
    <DashboardHeader />
    
    <div class="dashboard">
      <SideNav v-if="userInfo" :user-info="userInfo" />

      <div class="main-content">
        <!-- 标签页导航 -->
        <TabsNav />

        <!-- 路由视图 -->
        <div class="page-content card">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  min-height: calc(100vh - 64px);
  margin-top: 10px;
  width: 100%;
  position: relative;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
  width: 100%;
}

.page-content {
  flex: 1;
  padding: 2rem;
  background: var(--bg-light);
}

@media (max-width: 768px) {
  .dashboard {
    flex-direction: column;
  }

  .main-content {
    margin-left: 0;
    width: 100%;
  }

  .page-content {
    padding: 1rem;
  }
}
</style>