/**
 * 系统通用处理API
 *
 * @author  hucw
 * @created 2017-07-07
 */

import App from "scripts/app";
import http from '@/http';

export default {
  /**
   * 校验短信验证码
   *
   * @param mobile
   * @param smsCode
   */
  validateSmsCode: function (mobile, smsCode) {
    return http.post(App.apihost + "/sms/validate", {
      mobile: mobile,
      code: smsCode
    });
  },

  /**
   * 获取最新有效前5条公告
   *
   * @param type 类型，可选：H | L | R
   */
  findBulletins: function (type) {
    return http.get(App.apihost + "/bulletin/top5", {
      type: type
    }, false);
  }
}
