const express = require('express')
const cors = require('cors')
const app = express()
const data  = require("./data")
// 启用 CORS
app.use(cors({
  origin: '*', // Vue 开发服务器地址
  credentials: true
}))

app.use(express.json())

// 模拟用户数据
const users = [
  { username: 'admin', password: '123456', nickname: '管理员', avatar: 'https://example.com/avatar.png' }
]

const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost', // 数据库主机
  user: 'root', // 数据库用户名
  password: '123456', // 数据库密码
  database: 'gweb', // 数据库名称
  port: 3306 // 数据库端口，默认为 3306
};

const testConnection = async () => {
  const connection = await mysql.createConnection(dbConfig);
  try {
    await connection.connect();
    console.log('数据库连接成功！');

    // 查询 user 表的所有数据
    const [rows] = await connection.query('SELECT * FROM user');
    console.log('用户数据:', rows); // 打印用户数据

  } catch (error) {
    console.error('数据库连接失败:', error.message);
  } finally {
    await connection.end(); // 关闭数据库连接
  }
}
testConnection();


// 路由
app.post('/auth/login', async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  var user = null;
  const connection = await mysql.createConnection(dbConfig);
  try {
    await connection.connect();
    console.log('数据库连接成功！');

    // 查询 user 表的所有数据
    const [rows] = await connection.query('SELECT * FROM user WHERE username = ? AND password = ?', [username, password]);
    if(rows.length != 0){
      user = rows[0];
    }
   
    console.log('用户数据:', rows,user); // 打印用户数据

  } catch (error) {
    console.error('数据库连接失败:', error.message);
    // 使用模拟数据
    user= data.find(user => user.username === username && user.password === password)
  } finally {
    await connection.end(); // 关闭数据库连接
  }



  if (user) {
    // 登录成功，返回用户信息
    res.json({
      success: true,
      message: '登录成功',
      data: user
    })
  } else {
    // 登录失败
    res.status(401).json({
      success: false,
      message: '用户名或密码错误'
    })
  }
})

app.post('/auth/register', (req, res) => {
  // 处理注册逻辑
  res.json({
    success: true,
    message: '注册成功'
  })
})

app.post('/auth/logout', (req, res) => {
  // 处理登出逻辑
  res.json({
    success: true,
    message: '登出成功'
  })
})

app.get('/auth/status', (req, res) => {
  // 处理登录状态检查
  res.json({
    success: true,
    isLoggedIn: false // 这里可以根据实际情况返回登录状态
  })
})


// 启动服务器
app.listen(5173, () => {
  console.log('API server running at http://localhost:5173')
}) 