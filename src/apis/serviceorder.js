/**
 * 服务订单API
 *
 * @author  hucw
 * @created 2017-07-07
 */

import App from "scripts/app";
import http from '@/http';

export default {

  /**
   * 提交订单
   *
   * @param formData 订单数据
   */
  create: function (formData = {}) {
    return http.get(App.uahost + "/serviceorder/submit", formData);
  }
}
