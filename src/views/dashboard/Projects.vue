<script setup>
const projects = [
  { id: 1, name: '示例项目 1', description: '这是一个示例项目描述...' },
  { id: 2, name: '示例项目 2', description: '另一个项目描述...' }
]

const handleEdit = (project) => {
  console.log('编辑项目:', project)
}

const handleDelete = (project) => {
  console.log('删除项目:', project)
}
</script>

<template>
  <div class="page-container">
    <h2>项目管理</h2>
    <div class="project-list">
      <div 
        v-for="project in projects"
        :key="project.id" 
        class="project-card"
      >
        <h3>{{ project.name }}</h3>
        <p>{{ project.description }}</p>
        <div class="project-actions">
          <button 
            class="btn btn-small"
            @click="handleEdit(project)"
          >编辑</button>
          <button 
            class="btn btn-small btn-danger"
            @click="handleDelete(project)"
          >删除</button>
        </div>
      </div>
    </div>
  </div>
</template> 