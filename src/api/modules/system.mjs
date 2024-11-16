import request from '../request.js'; // 确保包含 .js 扩展名
import { testConnection } from '../dbConfig.js'; // 同样确保包含 .js 扩展名

// 测试数据库连接
const runTest = async () => {
  await testConnection();
};

// 运行测试
runTest(); 