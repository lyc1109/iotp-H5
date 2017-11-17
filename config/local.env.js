/**
 * 环境变量定义: 开发
 * @type {{NODE_ENV: string}}
 */
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

// 本地IP地址
let localHost = "http://localhost";
try{
  const localConf = require("../local.conf");
  if(localConf) {
    localHost = localConf;
  }
} catch(e) {
  // do nothing
}

module.exports = merge(prodEnv, {
  NODE_ENV: '"local"',
  LOCAL_HOST: '"'+ localHost +'"',

  HOST_BASE: '"/baseUrl"',
  API_HOST_BASE: '"/api"',
  API_HOST_UA: '"/api/ua"',
  API_HOST_WOS: '"/api/wos"'
});
