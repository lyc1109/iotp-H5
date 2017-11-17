<style scoped lang="scss" type="text/scss">
  @import '~variables';
  .popup-window{
    .popup-window-content{
      .popup-window-title{
        position: relative;
        width: auto;
        background: transparent;
        border: none;
        text-align: right;
        .close{
          font-size: 28px;
          line-height: 25px;
        }
      }
    }

  }
  .qrcode{
    text-align: center;
    margin-top: 50%;
  }
  .btn {
    border: rem(1px) solid $font-lighter;
    @extend %margin-left-s;
    @include border-radius(15px);
    &:last-child {
      background: $primary;
      background-color: $primary;
      color: $white;
      border: rem(1px) solid $primary;
    }
  }
  /*<!--.btn-default {-->*/
    /*<!--background-color: $white;-->*/
    /*<!--border-color: rgba($blue-3,.35);-->*/
    /*<!--color: $primary-light;-->*/
  /*<!--}-->*/
  .copy-tag {
    border: 1px solid $primary;
    padding: rem(1px) rem(3px);
    min-width: 20px;
    display: inline-block;
  }
</style>

<template>
  <div>
    <div v-if="order && order.status !== null">
      <mt-button class="btn btn-sm"
                 v-if="type === 'view'"
                 @click.stop="back">返回</mt-button>
      <mt-button class="btn btn-sm"
                 v-if="type === 'del' && order.status < 70"
                 @click.stop="delDevice(order)">删除设备</mt-button>
      <mt-button class="btn btn-sm"
                 v-if="(order.status === 45 || order.status === 41 || (order.status === 40 && (order.orderType === 'install' || order.deviceType === 'L'))) && type === 'view'"
                 @click.stop="addDevice()">添加设备</mt-button>
      <mt-button class="btn btn-sm"
                 v-if="(order.status === 45 || order.status === 41 || (order.status === 40 && order.deviceType === 'L')) && type !== 'copy-btn'"
                 @click.stop="finished">结束工单</mt-button>
      <mt-button class="btn btn-sm"
                 v-if="(order.status === 20 || order.status === 30) && type === 'view'"
                 @click.stop="reject">拒绝工单</mt-button>
      <mt-button class="btn btn-sm"
                 v-if="(order.status === 20 || order.status === 30) && (type === 'list' || type === 'view')"
                 @click.stop="transfer">转单</mt-button>
      <mt-button class="btn btn-sm"
                 v-if="(order.status === 20 || order.status === 30) && type !== 'copy-btn'"
                 @click.stop="process">开始执行</mt-button>
      <mt-button class="btn btn-sm"
                 v-if="(order.status === 40 && order.deviceType !== 'L') && type !== 'copy-btn'"
                 @click.stop="valuation">工单计价</mt-button>
      <mt-button class="btn btn-sm"
                 v-if="order.status === 60 && type !== 'copy-btn'"
                 @click.stop="receipt">现金收款</mt-button>
      <mt-button class="btn btn-sm"
                 v-if="order.status === 60 && order.orderType === 'common' && type === 'view'"
                 @click.stop="revaluation">重新计价</mt-button>
      <!--<mt-button class="btn btn-primary btn-sm"
                 v-show="order.status === 41 && order.deviceEntityId !== null && order.orderType === 'lease' && type === 'view'"
                 @click.stop="experience">
        暂时不开发
        15天体验
      </mt-button>-->
    </div>

    <span class="copy-tag font-s margin-left-s color-primary border-radius"
          v-if="type === 'copy-btn'"
          @click.stop="copyAddress(address)">复制</span>
  </div>
</template>

<script>
  import types from "@/store/mutation-types";
  import Vue from 'vue';
  import VueClipboard from 'v-clipboard';
  Vue.use(VueClipboard);

  export default {
    name: "actions",
    props: ["type","order","address"],
    computed: {
      // 当前店铺
      curShop () {
        return this.$store.getters[types.oauth.getCurShop];
      }
    },
    methods: {
      /**
       * 开始执行
       */
      process() {
        this.$messagebox({
          title: '提示',
          message: '是否确定开始此工单?',
          showCancelButton: true
        }).then((action) => {
          if(action === 'confirm') {
            this.$http.post(this.$woshost + "/workorders/" + this.order.id + "/process")
              .then((resp) => {
                this.$toast.success('操作成功');
                setTimeout(() => {
                  location.reload();
                }, 600);
              })
          }
        })
      },
      /**
       * 删除设备
       */
      delDevice(item) {
        let that = this;
        if(that.type === 'del') {
          that.$http.del(`${that.$woshost}/workorders/${that.$route.params.id}/devices`,{
            device_id: item && item.deviceId
          })
            .then(() => {
              that.$toast.success('删除设备成功！');
              setTimeout(() => {
                location.reload();
              }, 500);
            })
            .catch((err) => {
              if(err && err.errMsg) {
                that.$toast.error(err.errMsg);
              }
              return false;
            })
        }
      },
      /**
       * 扫码添加设备
       */
      addDevice: function () {
        let that = this;

        that.$wechat.init(that, function () {
          that.$wechat.scanQRCode({
            needResult: 1,
            scanType: ["qrCode", "barCode"],
            success: function (res) {
              let _code = res.resultStr;

              if(_code) {
                // 通过设备编码判断设备是否在线
                that.$http.get(`${that.$basehost}/open/v3/devices/${_code}/online`)
                  .then((isonline) => {
                    let _isonline = isonline;
                    // 测试环境
                    if(window.location.host === '192.168.0.146:8000' || window.location.host === 't.m.xohaa.net') {
                      _isonline = true;
                    }
                    // 测试账号
                    if(that.curShop && that.curShop.id === 'n6ZR6p') {
                      _isonline = true;
                    }
                    if(_isonline) {
                      // 设备在线才添加设备
                      that.$http.post(`${that.$woshost}/workorders/${that.order.id}/devices`, {
                        device_id: _code
                      })
                        .then(() => {
                          that.$toast.success('添加设备成功！');
                          setTimeout(() => {
                            location.reload();
                          }, 500);
                        })
                        .catch((err) => {
                          if(err && err.errMsg) {
                            that.$toast.error(err.errMsg);
                          }
                          return false;
                        })
                    } else {
                      that.$toast.error('请确保设备在线！');
                    }
                  })
              }
            }
          })
        })
      },
      /**
       * 结束工单
       */
      finished() {
        let that = this;
        // 租赁/装机数量
        let _count = 0;
        // 设备数量
        let _temp = Number(this.order.deviceDataLen);
        let _title = '';
        let _type = this.order.orderType;

        if(_type === 'lease' || _type === 'install') {
          _count = this.order.deviceCount;
          if(_type === 'lease') {
            _title = '租赁';
          } else if(_type === 'install') {
            _title = '装机';
          }

          if(Number(_count) !== _temp) {
            that.$messagebox('提示','结束工单前请扫码添加和' + _title + '数量一致的设备！');
            return false;
          }
        }
        that.$messagebox({
          title: '提示',
          message: '是否确定结束工单?',
          showCancelButton: true
        }).then((action) => {
          if(action === 'confirm') {
            that.$http.post(`${that.$woshost}/workorders/${this.order.id}/finished`)
              .then((resp) => {
                that.$toast.success('操作成功');
                setTimeout(() => {
                  location.reload();
                }, 600);
              })
          }
        })
      },
      /**
       * 拒绝
       */
      reject() {
        let options = {
          showInput: true,
          showCancelButton: true,
          inputPlaceholder: "请输入拒绝原因",
          inputValidator(value) {
            if(value === null || value.replace(/^\s+|\s+$/g,"").length === 0){
              return "请填写内容";
            }
          }
        };
        this.$messagebox.prompt(" ","请输入拒绝原因",options).then(({ value, action }) => {
          if(action === 'confirm') {
            let reason = {
              'reject_reason': value
            };
            this.$http.post(this.$woshost + "/workorders/" + this.order.id + "/reject",reason)
              .then((resp) => {
                this.$toast.success('操作成功');
                this.$store.commit(types.wos.setPageData, null);
                this.$router.go(-1);
              })
          }
        });
      },
      /**
       * 转单
       */
      transfer() {
        this.$emit("transferModel");
      },
      /**
       * 工单计价
       */
      valuation() {
        this.$router.push({path: '/wos/workOrder/'+ this.order.id +'/valuation'});
      },
      /**
       * 现金收款
       */
      receipt() {
        this.$messagebox({
          title: '提示',
          message: '是否确定该工单已收款?',
          showCancelButton: true
        }).then((action) => {
          if(action === 'confirm'){
            this.$http.post(`${this.$woshost}/workorders/${this.order.id}/collect-payment`)
              .then((resp) => {
                this.$toast.success('操作成功');
                setTimeout(() => {
                  location.reload();
                }, 600);
              });
          }
        });
      },
      /**
       * 重新计价
       */
      revaluation() {
        this.$router.push({path: '/wos/workOrder/'+ this.order.id +'/valuation'});
      },
      /**
       * 15天体验
       */
      experience() {
        this.$messagebox({
          title: '提示',
          message: '是否授权15天体验期?',
          showCancelButton: true
        }).then((action) => {
          if(action === 'confirm') {
            let params = {
              deviceEntityId: ''
            };
            this.$http.post(this.$woshost + '/workorders/' + this.order.id + 'f15d', params)
              .then((res) => {
                this.$toast.success('操作成功');
                setTimeout(() => {
                  location.reload();
                }, 600);
              });
          }
        });
      },
      /**
       * 返回
       */
      back() {
        history.back()
      },
      /**
       * 复制地址
       * @param _text 地址内容
       */
      copyAddress(_text) {
        this.$nextTick(() => {
          this.$clipboard(_text);
          this.$messenger.success('复制成功');
        })
      },
    }
  }
</script>
