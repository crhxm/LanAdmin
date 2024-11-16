const express = require('express')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3001

// 提供 dist 目录中的静态文件
app.use(express.static(path.join(__dirname, 'dist')))

// 所有请求都返回 index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
}) 