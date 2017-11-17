/**
 * Vue Http 请求组件
 *
 * @author hucw
 * @date   2017-01-06
 */
import axios from 'axios';
import Vue from 'vue';
import store from './store';
import loading from "scripts/loading";
import types from './store/mutation-types';

// 常量配置
const isProduct = process.env.NODE_ENV === "production";
const requestTimeOut = process.env.REQUEST_TIME_OUT;

// 设置ContentType
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 打印请求参数
// axios.defaults.transformRequest = [function (data) {
//   if (data && !isProduct) {
//     console.log('请求参数：' + JSON.stringify(data));
//   }
//   return data;
// }];

// http request 拦截器
axios.interceptors.request.use(
  (config) => {
    const token = store.getters[types.oauth.getAuthToken];
    if (token !== null && token !== "") {
      config.headers['x-requested-from'] = "apiHttpRequest";
      config.headers['x-auth-token'] = token;
    }
    config.headers.apiRequest = true;
    return config;
  },
  (err) => Promise.reject(err));

// ========================================================
// http response 拦截器

// 错误消息广播
let emitError = (errorMsg) => {
  let msg = "抱歉，系统出现未知异常。";
  if(errorMsg && errorMsg !== null && errorMsg !== "") {
    msg = "系统异常：" + errorMsg;
  }
  Vue.bus.emit("toast-error", msg);
};

/**
 * 显示Loading
 *
 * @param isShowLoading 是否显示loading
 */
let showLoading = function(isShowLoading) {
  if(!isShowLoading) {
    return;
  }
  loading.show();
};

/**
 * 隐藏Loading
 */
let hideLoading = function() {
  loading.hide();
};

axios.interceptors.response.use(
  (response) => {
    hideLoading();
    const respData = response.data;

    if(respData && store) {
      let _code = respData.returnCode || respData.code || '';
      store.commit(types.common.setErrorCode, _code);
    }

    // 状态码为0表示请求成功，否则失败
    if(respData.code === 0 || respData.returnCode === 0) {
      if(respData.data !== null) {
        return respData.data;
      }
      return respData;
    } else {
      // 未授权登录
      // if(respData.httpStatusCode === 401 || respData.code === 1200) {
      //   Vue.bus.emit("oauth");
      // } else {
      //   emitError((respData.returnMsg || respData.errMsg) + "(" + (respData.returnCode || respData.code) + ")");
      // }
      if(respData.httpStatusCode === 401 || respData.code === 1200) {
        Vue.bus.emit("oauth");
      } else {
        if((respData.httpStatusCode === 404 || respData.httpStatusCode === 500) && store) {
          store.commit(types.common.setErrorCode, respData.httpStatusCode);
        }
        emitError((respData.returnMsg || respData.errMsg) + "(" + (respData.returnCode || respData.code) + ")");
      }

      return Promise.reject(respData);
    }
  },
  (error) => {
    hideLoading();

    const response = error.response;
    let errMsg = "";

    if(!isProduct) {
      console.log("系统请求异常...");
      console.log(JSON.stringify(error));
    }

    if(response && store) {
      let _code = response.data.returnCode || '';
      store.commit(types.common.setErrorCode, _code);
    }

    if(response && response.data){
      let _code = response.data.returnCode || response.data.code;
      // 未授权登录
      if(response.data.httpStatusCode === 401 || response.data.returnCode === 1200 || response.data.code === 1200) {
        Vue.bus.emit("oauth");
      } else {
        // 其它错误信息处理
        if(response.data.returnMsg) {
          errMsg = response.data.returnMsg + "(" + response.data.returnCode + ")";
        } else if(response.data.errMsg) {
          errMsg = response.data.errMsg + "(" + response.data.code + ")";
        }
      }
    }
    emitError(errMsg);
    return Promise.reject(response)
  }
);

export default {

  /**
   * POST 请求
   *
   * @param url
   * @param params
   * @param isShowLoading
   * @param data
   * @returns {AxiosPromise}
   */
  post: function (url, params = {}, isShowLoading = true, data = {}) {
    showLoading(isShowLoading);

    return axios({
      method: 'POST',
      url: url,
      params: params,
      data: data,
      timeout: requestTimeOut
    })
  },

  /**
   * GET 请求
   *
   * @param url
   * @param params
   * @param isShowLoading
   * @returns {AxiosPromise}
   */
  get: function (url, params = {}, isShowLoading = true) {
    showLoading(isShowLoading);

    return axios({
      method: 'GET',
      url: url,
      params: params,
      timeout: requestTimeOut
    });
  },

  /**
   * DELETE请求
   *
   * @param url
   * @param params
   * @param isShowLoading
   */
  del: function (url, params = {}, isShowLoading = true) {
    showLoading(isShowLoading);

    return axios({
      method: 'DELETE',
      url: url,
      params: params,
      timeout: requestTimeOut
    });
  },

  /**
   * PUT 请求
   *
   * @param url
   * @param parmas
   * @param isShowLoading
   */
  put: function (url, params = {}, isShowLoading = true) {
    showLoading(isShowLoading);

    return axios({
      method: 'PUT',
      url: url,
      params: params,
      timeout: requestTimeOut
    });
  },

  /**
   * AJAX请求，自行组装参数
   *
   * @param options
   * @param isShowLoading
   */
  ajax: function (options = {}, isShowLoading = true) {
    showLoading(isShowLoading);

    return axios(options);
  }
};
