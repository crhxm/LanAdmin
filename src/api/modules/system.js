const { testConnection } = require('../dbConfig');

// 测试数据库连接
const runTest = async () => {
  await testConnection();
};

// 运行测试
runTest(); 