/**
 * 环境变量定义: 本地测试环境
 * @type {{NODE_ENV: string}}
 */
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"test"',

  HOST_BASE: '"http://192.168.0.26:8310"',
  API_HOST_BASE: '"http://192.168.0.26:8310/api/v3"',
  API_HOST_UA: '"http://192.168.0.26:8310/api/v3/ua"',
  API_HOST_WOS: '"http://192.168.0.26:8310/api/v3/wos"'
});
