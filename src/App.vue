<script setup>
import './assets/styles/main.css'
import './assets/styles/common.css'
import { onErrorCaptured } from 'vue'

onErrorCaptured((err, instance, info) => {
  console.error('捕获到错误:', err)
  console.log('错误实例:', instance)
  console.log('错误信息:', info)
  return false
})
</script>

<template>
  <router-view></router-view>
</template>
