/**
 * 用户设备API
 *
 * @author  hucw
 * @created 2017-07-07
 */

import App from "scripts/app";
import http from '@/http';

export default {
  /**
   * 拉取设备状态信息
   *
   * @param iotDeviceIds 智能设备ID
   */
  fetchStatus: function (iotDeviceIds = "") {
    return http.get(App.apihost + "/iot/waterdevice/status", {
      deviceIds: iotDeviceIds
    }, false);
  }
}
