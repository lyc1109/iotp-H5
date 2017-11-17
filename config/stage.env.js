/**
 * 环境变量定义: 仿真测试环境
 * @type {{NODE_ENV: string}}
 */
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"stage"',

  // 测试服务器内网IP
  HOST_BASE: '"http://t.apih5.xohaa.net"',
  API_HOST_BASE: '"http://t.apih5.xohaa.net/api/v3"',
  API_HOST_UA: '"http://t.apih5.xohaa.net/api/v3/ua"',
  API_HOST_WOS: '"http://t.apih5.xohaa.net/api/v3/wos"'
});
