<script setup>
import { ref } from 'vue'

const accounts = ref([
  {
    id: 1,
    username: 'admin',
    nickname: '系统管理员',
    role: '管理员',
    status: 'active',
    lastLogin: '2024-02-20 15:30:00'
  },
  {
    id: 2,
    username: 'svip',
    nickname: 'SVIP用户',
    role: 'SVIP会员',
    status: 'active',
    lastLogin: '2024-02-20 14:30:00'
  },
  {
    id: 3,
    username: 'vip',
    nickname: 'VIP用户',
    role: 'VIP会员',
    status: 'active',
    lastLogin: '2024-02-20 13:30:00'
  },
  {
    id: 4,
    username: 'user',
    nickname: '普通用户',
    role: '普通会员',
    status: 'active',
    lastLogin: '2024-02-20 12:30:00'
  }
])

const handleStatusChange = (account) => {
  account.status = account.status === 'active' ? 'inactive' : 'active'
}
</script>

<template>
  <div class="page-container">
    <div class="page-header">
      <h2>账号管理</h2>
      <div class="header-actions">
        <input type="text" placeholder="搜索用户..." class="search-input">
        <button class="btn">添加账号</button>
      </div>
    </div>

    <div class="accounts-table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>用户名</th>
            <th>昵称</th>
            <th>角色</th>
            <th>状态</th>
            <th>最后登录</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="account in accounts" :key="account.id">
            <td>{{ account.id }}</td>
            <td>{{ account.username }}</td>
            <td>{{ account.nickname }}</td>
            <td>{{ account.role }}</td>
            <td>
              <span class="status-badge" 
                    :class="{ active: account.status === 'active' }">
                {{ account.status === 'active' ? '正常' : '禁用' }}
              </span>
            </td>
            <td>{{ account.lastLogin }}</td>
            <td>
              <div class="table-actions">
                <button class="btn btn-small">编辑</button>
                <button 
                  class="btn btn-small"
                  :class="account.status === 'active' ? 'btn-warning' : 'btn-success'"
                  @click="handleStatusChange(account)"
                >
                  {{ account.status === 'active' ? '禁用' : '启用' }}
                </button>
                <button class="btn btn-small btn-danger">删除</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
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

.header-actions {
  display: flex;
  gap: 1rem;
}

.search-input {
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  width: 200px;
}

.accounts-table {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid var(--border-color);
}

th {
  background: var(--bg-light);
  font-weight: 500;
}

.status-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.9rem;
  background: #dc3545;
  color: white;
}

.status-badge.active {
  background: #28a745;
}

.table-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-warning {
  background: #ffc107;
  color: #000;
}

.btn-success {
  background: #28a745;
}

/* 暗色主题适配 */
[data-theme="dark"] th {
  background: var(--bg-darker);
}

[data-theme="dark"] .search-input {
  background: var(--bg-darker);
  color: var(--text-color);
}
</style> 