/**
 * 弹窗
 *
 * @author luoyc
 * @date 2017/8/31
 */

import { MessageBox } from 'mint-ui'

export default {
  // 信息弹窗
  alert(msg){
    return MessageBox.alert(msg)
  },
  // 确认框
  confirm(msg){
    return MessageBox.confirm(msg)
  },
  // 提示框
  prompt(msg,title=''){
    return MessageBox.prompt(msg,title)
  }
}
