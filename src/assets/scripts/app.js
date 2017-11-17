/**
 * APP通用辅助函数
 *
 * @author  hucw
 * @created 2017-06-05
 */
export default {
  appId: "iotqqdm3z2gqbajlvko",
  appSecret: "ebfa41c55ec74f2c8706309a68c695b1",

  // 环境变量
  isLocal: process.env.NODE_ENV === "local",
  isDev: process.env.NODE_ENV === "development",
  isTest: process.env.NODE_ENV === "test",
  isStage: process.env.NODE_ENV === "stage",
  isProduct: process.env.NODE_ENV === "production",

  // API地址信息
  // 基本api地址，如 http://api.xohaa.net
  basehost: process.env.HOST_BASE,
  // 通用api地址，如 http://api.xohaa.net/api/v1
  apihost: process.env.API_HOST_BASE,
  // 用户端专用api地址，如 http://api.xohaa.net/api/v1/ua
  uahost: process.env.API_HOST_UA,
  // 工单专用api地址，如 http://api.xohaa.net/api/v1/wos
  woshost: process.env.API_HOST_WOS,

  // localStorage封装
  storage: (function() {
    const namespace = "iotph5";
    const localStorage = window.localStorage;

    let getStorage = function () {
      if(localStorage.getItem(namespace) === null) {
        localStorage.setItem(namespace,'{}');
      }
      return JSON.parse(localStorage.getItem(namespace));
    };

    return {
      set: function (key, val) {
        const storage = getStorage();
        storage[key] = val;
        localStorage.setItem(namespace, JSON.stringify(storage));
      },

      get: function (key) {
        const storage = getStorage();
        return storage[key] !== undefined ? storage[key] : null;
      },

      remove: function (key) {
        const storage = getStorage();
        delete storage[key];
        localStorage.setItem(namespace, JSON.stringify(storage));
      },

      hasKey: function (key) {
        const item = this.get(key);
        return item !== null && typeof item !== undefined;
      }
    }
  }())
};
