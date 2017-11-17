/**
 * 支付宝基础配置
 *
 * @author  huanglh
 * @created 2017-11-04
 */

import toast from './toast';
import App from '@/assets/scripts/app'

export default {
  /**
   * 初始化支付宝环境
   * @param _self
   * @param _callback
   */
  init: function (_self,_callback) {
    let nav = navigator && navigator.userAgent.toLowerCase().match(/Alipay/i);
    if (nav && nav[0] === "alipay") {
      // 如果jsbridge已经注入则直接调用
      if (window.ap) {

        // ap.scan('qr',function(res) {
          // toast.success(res);
          _callback && _callback();
        // });
      } else {
        // 如果没有注入则监听注入的事件
        document.addEventListener('AlipayJSBridgeReady', _callback, false);
      }
    } else {
      toast.error('请在支付宝内打开此页面！');
    }
  },
  /**
   * 扫二维码
   * @param needResult        默认为0，扫描结果由微信处理，1则直接返回扫描结果，
   * @param scanType          可以指定扫二维码还是一维码，默认二者都有
   * @param success           回调函数
   */
  scanQRCode: function (_callback) {
    ap.scan('qr',function (res) {
      _callback && _callback(res);
    })
  },
  deviceScan: function (_self) {
    _self.$alipay.init(_self,function() {
      _self.$alipay.scanQRCode(function (res) {
        let _code = res.code;

        if(res) {
          //提示弹窗
          let tipsAlert = function(_tip) {
            _self.$messagebox({
              title: '提示',
              message: _tip
            });
          }
          //错误弹窗
          let errorAlert = function(_tip = '数据异常！请联系管理员') {
            _self.$toast.error(_tip);
          }

          if(_code) {
            _self.$http.get(`${_self.$apihost}/devices/${_code}/scan`)
              .then((data) => {
                let _result = data.scanResult;                                  // 扫码结果
                let _deviceType = data.deviceType;                              // 设备类型
                let _leaseProductId = data.leaseProductId;                      // 租赁产品id
                let _productId = data.productId;                                // 产品id
                let _deviceId = data.deviceEntityId;                            // 设备id
                let _userDeviceId = data.userDeviceEntityId;                    // 用户设备id
                let _leaseAct = Number(data.leaseAction);                       // 下一步的租赁操作,针对扫码结果为20的租赁设备

                //激活码相关操作
                let activeEvent = function (_activeCode) {
                  let _actLen = _activeCode.length;

                  let _activeEvent = function (value) {
                    if(value) {
                      _self.$http.post(`${_self.$apihost}/lease/devices/${_deviceId}/activate`,{
                        activation_code: value
                      })
                        .then(() => {
                          _self.$http.get(`${_self.$apihost}/userdevices`,{
                            page_no: 1,
                            page_size: 1,
                            page_sort: 'createdDate_desc'
                          })
                            .then((data) => {
                              if(data.totalElements > 0) {
                                let _temp = data.fileList[0];
                                _self.$router.push({ path: `/devices/usrDevice_${_temp.id}/device_${_temp.device && _temp.device.id}/iwater`});
                              }
                            })
                        })
                    }
                  }
                  if(_actLen === 1) {                                     // 激活码只有一哥则自动填
                    _self.$messagebox({
                      title: '激活设备',
                      message: '激活码为' + _activeCode[0] + ',是否激活该设备？',
                      showCancelButton: true
                    }).then((action) => {
                      if(action === 'confirm') {
                        _activeEvent(_activeCode[0]);
                      }
                    })
                  } else if(_actLen > 1) {
                    let _activeHtml = `<ul id="code-list">`;
                    for(let i = 0; i<_actLen; i++) {
                      _activeHtml += `<li class="padding-s color-primary code-li" data-key="${_activeCode[i]}">${_activeCode[i]}</li>`;
                    }
                    _activeHtml += `</ul>`;

                    _self.$messagebox({
                      title: "请选择激活码激活设备",
                      message: _activeHtml,
                      showCancelButton: true
                    }).then((action) => {
                      if(action === 'confirm') {
                        let _selectedCode = _self.$store.getters[types.common.getActiveCode];
                        if(_selectedCode) {
                          _activeEvent(_selectedCode);
                        } else {
                          return false;
                        }
                      }
                    });

                    let T = function (el) {
                      el.addEventListener('click', function (event) {
                        let target = event.target;
                        if(target.className.indexOf('code-li') > -1 && target.nodeName === 'LI') {

                          let _key = target.getAttribute('data-key');
                          _self.$store.commit(types.common.setActiveCode, _key);
                          let _temp = document.getElementsByClassName('code-li');
                          for (let i = 0, len = _temp.length; i < len; i++) {
                            _temp[i].setAttribute('style', 'background: #fff');
                          }
                          target.setAttribute('style', 'background: #f3f3f3');
                        }
                      });
                      document.getElementsByClassName('code-li')[0].click;
                    }

                    _self.$nextTick(() => {
                      let thatList = document.getElementsByClassName('mint-msgbox');
                      if(thatList && thatList[0]) {
                        T(thatList[0]);
                      }
                    });
                  }
                }

                if(_result !== null && _result !== '' && _result !== undefined) {
                  if(_result === 99) {                                          // 该二维码不是系统授权的
                    tipsAlert('该设备二维码无效！');
                  } else if(_result === 98) {                                   // 该二维码相应的产品配置或租赁产品配置不存在
                    tipsAlert('用户产品配置无效！');
                  } else if(_result === 95) {                                   // 如果该设备为普通设备，那么转入到设备绑定
                    if(_deviceType) {                                           // 如果为非普通设备，提示配网
                      if(_deviceType === 'C') {
                        if(_productId) {
                          _self.$http.get(`${_self.$apihost}/products/${_productId}`)
                            .then((res) => {
                              let _params = {
                                name: res.name,
                                id: res.id,
                                itemCode: res.itemCode,
                                coverImage: res.coverImage
                              };
                              _self.$router.replace({
                                path: `devices/bind`,
                                query: {
                                  data: encodeURIComponent(JSON.stringify(_params))
                                }
                              });
                            });
                        } else {
                          errorAlert();
                        }
                      } else if(_deviceType === 'L' || _deviceType === 'I') {
                        tipsAlert('该设备尚未注册,请先使用配网工具进行配网注册');
                      }
                    } else {
                      errorAlert();
                    }
                  } else if(_result === 20) {                                   // 该设备为未绑定或未激活设备
                    if(_deviceType) {
                      if(_deviceType === 'I') {                                 // 如果智能设备，则直接绑定
                        if(_code) {
                          _self.$messagebox({
                            title: '提示',
                            message: '是否确定绑定该设备？',
                            showCancelButton: true
                          }).then((action) => {
                            if(action === 'confirm') {
                              _self.$http.post(`${_self.$apihost}/userdevices/${_code}/bind`)
                                .then((data) => {
                                  _self.$toast.success('绑定成功！');
                                  let _usrDeId = data && data.id;
                                  let _deId = data && data.device && data.device.id;
                                  setTimeout(function () {
                                    _self.$router.push({ path: `/devices/usrDevice_${_usrDeId}/device_${_deId}/iwater` });
                                  },1000);
                                });
                            }
                          });
                        } else {
                          errorAlert();
                        }
                      } else if(_deviceType === 'L') {                          // 如果租赁设备，则根据leaseAction进行下一步操作
                        if(_leaseAct !== undefined && _leaseAct !== null && _leaseAct !== '' && _deviceId) {
                          if(_leaseAct === 0) {                                 // 该设备需要使用激活码进行激活
                            if(_code) {                                         // 根据扫码获取的deviceId获取该用户可用的激活码
                              _self.$http.get(`${_self.$apihost}/lease/activationcodes/available/${_code}`)
                                .then((code) => {
                                  if(code && JSON.stringify(code) !== '[]') {   // 如果有激活码则让用户选择
                                    activeEvent(code);
                                  } else {                                      // 否则提示用户先去支付相应的租赁订单
                                    errorAlert('请先支付相应的租赁订单！');
                                  }
                                })
                            } else {
                              errorAlert();
                            }
                          } else if(_leaseAct === 10) {                          // 该设备需要直接支付（不论该用户是否有租赁订单和激活码）
                            if(_leaseProductId) {
                              if(_deviceId) {
                                // 兼容ios微信
                                window.location.href = `/userdevices/pay/deposit/${_deviceId}?scanId=${_code}`;
                                // _self.$router.push({
                                //   path: `/userdevices/pay/deposit/${_deviceId}`,
                                //   query: {
                                //     scanId: _code,
                                //   }
                                // });
                              } else if(_userDeviceId) {
                                _self.$http.get(`${_self.$apihost}/userdevices/${_userDeviceId}`)
                                  .then((res) => {
                                    let deviceId = res.device && res.device.id;

                                    if(deviceId) {
                                      // 兼容ios微信
                                      window.location.href = `/userdevices/pay/deposit/${_deviceId}?scanId=${_code}`;
                                      // _self.$router.push({
                                      //   padth: `/userdevices/pay/deposit/${deviceId}`,
                                      //   query: {
                                      //     scanId: _code,
                                      //   }
                                      // });
                                    }
                                  });
                              } else {
                                errorAlert();
                              }
                            }
                          } else {
                            errorAlert();
                          }
                        } else {
                          errorAlert();
                        }
                      } else {
                        errorAlert();
                      }
                    } else {
                      errorAlert();
                    }
                  } else if(_result === 10) {                                   // 未授权设备,用户需要提交授权申请到设备拥有者
                    if(_code) {
                      _self.$messagebox({
                        title: '提示',
                        message: '是否确定申请授权查看控制该设备？',
                        showCancelButton: true
                      }).then((action) => {
                        if(action === 'confirm') {
                          _self.$http.post(`${_self.$apihost}/userdevices/${_code}/submit-authorization`)
                            .then(() => {
                              _self.$messenger.success('申请发送成功!');
                            });
                        }
                      });
                    } else {
                      errorAlert();
                    }
                  } else if(_result === 12) {                                   // 授权中设备,用户已提交授权申请到设备拥有者
                    tipsAlert('正在申请授权中,请耐心等待！');
                  } else if(_result === 16) {                                   // 无权设备,拥有者拒绝授权给该用户
                    tipsAlert('您无权查看该设备！');
                  } else if(_result === 0) {                                     // 正常设备,用户可以查看设备详情
                    if(_userDeviceId && _deviceType) {
                      if(_deviceType === 'C') {
                        _self.$router.push(`/devices/${_userDeviceId}/view`);
                      } else {
                        if(!_deviceId) {
                          _self.$http.get(`${_self.$apihost}/userdevices/${_userDeviceId}`)
                            .then((res) => {
                              let deviceId = res.device && res.device.id;

                              if(deviceId) {
                                _self.$router.push({ path: `/devices/usrDevice_${_userDeviceId}/device_${deviceId}/iwater` });
                              }
                            });
                        } else {
                          _self.$router.push({ path: `/devices/usrDevice_${_userDeviceId}/device_${_deviceId}/iwater` });
                        }
                      }
                    } else {
                      errorAlert();
                    }
                  } else {
                    errorAlert();
                  }
                } else {
                  errorAlert();
                }
              })
          } else {
            errorAlert();
          }
        }
      });
    });
  }
}
