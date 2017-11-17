/**
 * 弱消息提示
 *
 * @author  hucw
 * @created 2017-06-22
 */
import Vue from 'vue';
import _ from 'lodash';

// https://github.com/noru/vue-easy-toast
import Toast from 'vue-easy-toast/dist/vue-easy-toast-lite.min.js';
import 'vue-easy-toast/dist/vue-easy-toast.css';

Vue.use(Toast);

const toastConf = {
  horizontalPosition: "center",
  verticalPosition: "top",
  duration: 3000,
  transition: "slide-down"
};

export default {
  success: function (msg) {
    Vue.toast(msg, _.assign(toastConf, {
      className: "toast toast-success",
      verticalPosition: "top",
      transition: "slide-down"
    }));
  },

  error: function (msg) {
    Vue.toast(msg, _.assign(toastConf, {
      className: "toast toast-error",
      verticalPosition: "top",
      transition: "slide-down"
    }));
  },

  warn: function (msg) {
    Vue.toast(msg, _.assign(toastConf, {
      className: "toast toast-warn",
      verticalPosition: "top",
      transition: "slide-down"
    }));
  },

  info: function (msg) {
    Vue.toast(msg, _.assign(toastConf, {
      className: "toast toast-info",
      verticalPosition: "top",
      transition: "slide-down"
    }));
  },

  toast: function (msg) {
    Vue.toast(msg, _.assign(toastConf, {
      className: "toast toast-bottom",
      verticalPosition: "bottom",
      transition: "slide-up"
    }));
  }
}
