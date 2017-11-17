/**
 * 加载中提示
 *
 * @author  hucw
 * @created 2017-06-16
 */
import {Indicator} from "mint-ui";

let _isLoading = false;

export default {
  show: function () {
    if(_isLoading) {
      return;
    }
    _isLoading = true;
    Indicator.open();
  },

  hide: function () {
    if(!_isLoading) {
      return;
    }
    _isLoading = false;
    Indicator.close();
  }
}
