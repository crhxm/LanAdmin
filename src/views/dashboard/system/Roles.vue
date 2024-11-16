<script setup>
import { ref } from 'vue'

const roles = ref([
  {
    id: 1,
    name: '管理员',
    level: 999,
    permissions: ['all'],
    description: '系统管理员，拥有所有权限'
  },
  {
    id: 2,
    name: 'SVIP会员',
    level: 3,
    permissions: ['read', 'write', 'upload'],
    description: 'SVIP会员，高级功能权限'
  },
  {
    id: 3,
    name: 'VIP会员',
    level: 2,
    permissions: ['read', 'write'],
    description: 'VIP会员，基础功能权限'
  },
  {
    id: 4,
    name: '普通会员',
    level: 1,
    permissions: ['read'],
    description: '普通会员，基础浏览权限'
  }
])

const editRole = ref(null)
const showEditDialog = ref(false)

const handleEdit = (role) => {
  editRole.value = { ...role }
  showEditDialog.value = true
}

const handleSave = () => {
  // 保存角色编辑
  showEditDialog.value = false
}
</script>

<template>
  <div class="page-container">
    <div class="page-header">
      <h2>角色编辑</h2>
      <button class="btn">添加角色</button>
    </div>

    <div class="roles-list">
      <div v-for="role in roles" :key="role.id" class="role-card">
        <div class="role-header">
          <h3>{{ role.name }}</h3>
          <span class="role-level">Level {{ role.level }}</span>
        </div>
        <div class="role-content">
          <p>{{ role.description }}</p>
          <div class="permissions">
            <span v-for="perm in role.permissions" 
                  :key="perm" 
                  class="permission-tag">
              {{ perm }}
            </span>
          </div>
        </div>
        <div class="role-actions">
          <button class="btn btn-small" @click="handleEdit(role)">编辑</button>
          <button class="btn btn-small btn-danger">删除</button>
        </div>
      </div>
    </div>

    <!-- 编辑对话框 -->
    <div v-if="showEditDialog" class="dialog-overlay">
      <div class="dialog">
        <h3>编辑角色</h3>
        <div class="form-group">
          <label>角色名称</label>
          <input type="text" v-model="editRole.name">
        </div>
        <div class="form-group">
          <label>等级</label>
          <input type="number" v-model="editRole.level">
        </div>
        <div class="form-group">
          <label>描述</label>
          <textarea v-model="editRole.description"></textarea>
        </div>
        <div class="dialog-actions">
          <button class="btn" @click="handleSave">保存</button>
          <button class="btn btn-outline" @click="showEditDialog = false">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.roles-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.role-card {
  background: white;
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: var(--shadow);
}

.role-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.role-level {
  background: var(--primary-color);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.9rem;
}

.role-content {
  margin-bottom: 1.5rem;
}

.permissions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.permission-tag {
  background: var(--bg-light);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
  color: var(--text-light);
}

.role-actions {
  display: flex;
  gap: 1rem;
}

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.dialog {
  background: white;
  padding: 2rem;
  border-radius: var(--border-radius);
  width: 100%;
  max-width: 500px;
}

.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

/* 暗色主题适配 */
[data-theme="dark"] .role-card {
  background: var(--bg-darker);
}

[data-theme="dark"] .dialog {
  background: var(--bg-darker);
}
</style> 