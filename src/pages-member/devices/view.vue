<style scoped lang="scss" type="text/scss">
  @import "~variables";

  .header {
    width: 100%;
    overflow: hidden;
    justify-content: center;
  }
  .img-thumbnail {
    width: auto;
    max-width: fit-content;
    height: 100%;
    border: none;
  }
  .app-footer {
    &>div {
      @include border(top);

      .btn-box {
        float: right;
        height: rem(50px);

        .btn {
          @include border-radius(20px);
          border: rem(1px) solid $font-lighter;

          &:last-child {
            background: $primary;
            background-color: $primary;
            color: $white;
            border: rem(1px) solid $primary;
          }
        }
      }
    }
  }
  .logs-recharge {
    width: 100%;
    height: 100%;
  }
</style>
<style lang="scss" type="text/scss">
  .devices-view-address {
    .flex:first-child {
      align-items: flex-start;
      .cell-value {
        text-align: left;
        word-wrap: break-word;
        word-break: break-all;
        white-space: normal!important;
      }
    }
  }
</style>
<template>
  <div>
    <!--设备详情页面-->
    <app-view :has-footer="true">
      <!--设备图片-->
      <!--<div class="padding-xxl bg-white flex">-->
        <!--<div class="header valign-center border-radius">-->
          <!--<img class="img-thumbnail" v-lazy="$filters.img(deviceImg,'!w200')" width="200" height="200" />-->
        <!--</div>-->
      <!--</div>-->
      <!--设备详情-->
      <div class="padding-left-m bg-white">
        <!--<v-cell-group>-->
        <div @click="editDevice('name')">
          <v-cell title="设备别名"
                  :value="entity.deviceName"
                  :isLink="true"
                  class="cell padding-m padding-left-zero">
          </v-cell>
        </div>
        <v-cell v-if="entity.itemCode"
                title="产品型号"
                :value="entity.itemCode"
                class="cell padding-m padding-left-zero">
        </v-cell>
        <v-cell v-if="entity.deviceType != 'C'"
                title="设备编码"
                :value="entity.deviceId"
                class="cell padding-m padding-left-zero"></v-cell>
        <v-cell v-if="entity.deviceType != 'C'"
                title="设备MAC"
                :value="(entity.iotDevice && entity.iotDevice.deviceMac ? entity.iotDevice.deviceMac : '')"
                class="cell padding-m padding-left-zero"></v-cell>
        <v-cell v-if="entity.company"
                title="公司名称"
                :value="entity.company"
                class="cell padding-m padding-left-zero"></v-cell>
        <div v-if="specOptions && specOptions.length > 0" class="padding-m padding-left-zero border-bottom">
          商品规格
          <div class="text-wrapper margin-top-m">
            <span v-for="spec in specOptions"
                  class="font-light margin-top margin-left">
            *{{ spec.name }}：{{ spec.value }}
          </span>
          </div>
        </div>
        <v-cell title="安装地址"
                :value="(entity.address && entity.address.fullAddress ? entity.address.fullAddress : '无')"
                class="cell padding-m padding-left-zero devices-view-address"></v-cell>
        <!--</v-cell-group>-->
      </div>
      <div v-if="entity.deviceType === 'L'" class="padding-left-m bg-white margin-top">
        <v-cell v-if="entity.leaseDeposit"
                title="押金"
                :value="Number(entity.leaseDeposit/100).toFixed(2)"
                class="cell padding-m padding-left-zero"></v-cell>
        <v-cell v-if="entity.leaseStartDate"
                title="租赁起始日"
                :value="$filters.formatDate(entity.leaseStartDate)"
                class="cell padding-m padding-left-zero"></v-cell>
        <v-cell v-if="entity.leaseDueDate"
                title="租赁到期日"
                :value="$filters.formatDate(entity.leaseDueDate)"
                class="cell padding-m padding-left-zero"></v-cell>
        <router-link v-if="entity.leaseOrderEntityId"
                     class="a-default"
                     :to="'/serviceorder/' + entity.leaseOrderEntityId +'/view'">
          <v-cell title="租赁详情" :isLink="true"
                  :value="entity.leaseOrderId"
                  class="cell padding-m padding-left-zero"></v-cell>
        </router-link>
        <div @click="showRechargeLogs">
          <v-cell title="缴费记录" :isLink="true"
                  class="cell padding-m padding-left-zero"></v-cell>
        </div>
      </div>
      <div v-else-if="entity.deviceType !== 'L'" class="padding-left-m bg-white margin-top">
        <v-cell title="购买日期"
                :value="entity.purchasedDate ? $filters.formatDate(entity.purchasedDate) : '无'"
                class="cell padding-m padding-left-zero"></v-cell>
        <div @click.stop="editDevice('date')">
          <v-cell title="发票日期"
                  :isLink="true"
                  :value="entity.invoiceDate ? $filters.formatDate(entity.invoiceDate) : '无'"
                  class="cell padding-m padding-left-zero"></v-cell>
        </div>
        <v-cell title="保修期"
                :value="entity.warrantyPeriod ? $filters.formatDate(entity.warrantyPeriod) : '无'"
                class="cell padding-m padding-left-zero"></v-cell>
        <!--<v-cell title="发票图片"-->
                <!--class="cell padding-m padding-left-zero">-->
          <!--<img  v-if="entity.invoiceImagePath"-->
                <!--v-lazy="$filters.img(entity.invoiceImagePath,'!w100')"-->
                <!--class="img-thumbnail" width="60" height="40"-->
                <!--@click="showImg()">-->
          <!--<span v-else>无</span>-->
        <!--</v-cell>-->
        <div class="flex padding-right-m" @click.stop="editDevice('pic')">
          <div class="title">发票图片</div>
          <div v-if="entity.invoiceImagePath" class="margin-left-xxl padding-left-s square-uploadimg flex-item align-right">
            <v-image :imgShowList="[entity.invoiceImagePath]" :isUpload="false" :imgRight="true"></v-image>
          </div>
          <div v-else class="padding-m padding-right-s align-right flex-item">无</div>
          <i class="fa fa-angle-right font-lighter font-s"></i>
        </div>
      </div>

      <div class="padding-left-m margin-top bg-white">
        <div @click.stop="serviceOrder()">
          <v-cell title="设备服务订单" :isLink="true"
                  :value="orderCount + '个订单'"
                  class="cell padding-m padding-left-zero"></v-cell>
        </div>
        </router-link>
        <router-link v-if="isOwner" class="a-default" :to="'/devices/' + entity.id +'/oauth'">
          <v-cell title="授权管理"
                  :value="'已授权'+ authorizeCount +'人'"
                  class="cell padding-m padding-left-zero" :isLink="true"></v-cell>
        </router-link>
      </div>
      <div class="padding-left-m bg-white margin-top" @click="restoreDevice">
        <v-cell title="恢复出厂设置" class="cell padding-m padding-left-zero" :isLink="true"></v-cell>
      </div>
      <!--底部操作按钮-->
      <div slot="footer">
        <div class="valign-center btn-box">
          <!--<button type="button" class="btn btn-sm margin-right" @click="editDevice">编辑信息</button>-->
          <!--个人租赁设备的拥有者没有解绑按钮-->
          <button v-if="!(entity.deviceType === 'L' && isOwner)" type="button" class="btn btn-sm margin-right" @click="unbind()">解绑</button>

          <button type="button" class="btn btn-sm margin-right" @click="repair">一键报修</button>
          <button v-if="entity.deviceType == 'L' && isOwner " style="display: none;" type="button" class="btn btn-sm margin-right">退租</button>
          <button v-if="entity.deviceType == 'L' && !entity.company"
                  type="button" class="btn btn-sm margin-right"
                  @click.stop="recharge()">续费</button>
        </div>
      </div>
    </app-view>

    <!-- 缴费记录 -->
    <mt-popup v-model="feePopup"
              popup-transition="popup-fade" class="logs-recharge">
      <logs-recharge @cancel="feePopup = false" :logs="logs"></logs-recharge>
    </mt-popup>

  </div>
</template>

<script>
  import AppView from '@/components/layouts/app-view.vue'
  import types from '@/store/mutation-types'
  import VCell from '@/components/ui/v-cell.vue'
  import logsRecharge from "./recharge-logs.vue"
  import VImage from '@/components/ui/v-image';

  export default {
    name: "devices-view",
    data() {
      return {
        // 设备图片
        deviceImg: '',
        // 设备数据
        entity: {},
        // 授权人数
        authorizeCount: 0,
        // 服务订单数量
        orderCount: 0,
        // 缴费记录弹窗是否显示
        feePopup: false,
        // 设备日志
        logs: '',
        // 是否是设备拥有者
        isOwner: '',
        // 设备规格数据
        specOptions: {},
        // 设备id
        renewId: '',
      }
    },
    created() {
      //获取基本信息
      this.$http.get(this.$apihost + '/userdevices/' + this.$route.params.id)
        .then((data) => {
          let _temp = data.device;
          this.entity = _temp;
          this.renewId = this.entity.id
          this.deviceImg = _temp.productImage;
          this.isOwner = data.userRole && data.userRole === 'Owner';
          //授权人数
          this.$http.get(this.$apihost + '/userdevices/' + _temp.id + '/authorizations/count')
            .then((authorcount) => {
              this.authorizeCount = authorcount;
            })
          //订单数量
          this.$http.get(this.$apihost + '/devices/' + _temp.id + '/serviceorders/count')
            .then((listcount) => {
              this.orderCount = listcount;
            })
          //缴费记录
          this.$http.get(this.$apihost + '/lease/devices/' + _temp.id + '/rechargeorders')
            .then((logs) => {
              this.logs = logs;
            })
          //产品规格描述
          if(_temp.productSpecId && _temp.productSpecId !== '') {
            this.$http.get(this.$apihost + '/productspecs/' + _temp.productSpecId)
              .then((spec) => {
                this.specOptions = spec.specItems;
              })
          }
        })
      this.$store.commit("hideLoading");
    },
    beforeRouteLeave(to,from,next) {
      if(from.fullPath === '/devices/bind') {
        this.$router.replace('/devices');
      } else {
        next();
      }
    },
    computed: {
      imgShowList() {
        let _img = [];
        if(this.entity && this.entity.invoiceImagePath) {
          _img.push(this.$filters.img(this.entity.invoiceImagePath,'!w100'));
        }
        return _img;
      }
    },
    methods: {
      /**
       * 编辑设备信息
       * @param type
       */
      editDevice(type) {
        let _type = 'name';

        if(type) {
          _type = type;
        }
        this.$store.commit("showLoading");
        this.$router.push({
          path: `/devices/${this.$route.params.id}/edit`,
          query: {
            type: _type
          }
        });
      },
      /**
       * 一键报修
       */
      repair() {
        this.$store.commit("showLoading");
        let _temp = this.entity;
        this.$router.push({ path: '/serviceorder/create', query: {
          id: _temp.id,
          deviceId: _temp.deviceId,
          deviceName: _temp.deviceName,
          productId: _temp.productId,
          productImage: _temp.productImage,
          itemCode: _temp.itemCode,
          purchasedDate: this.$filters.formatDate(_temp.purchasedDate)
        }});
      },
      /**
       * 显示缴费记录
       */
      showRechargeLogs() {
        this.feePopup = true;
      },
      /**
       * 恢复出厂设置
       */
      restoreDevice() {
        let _temp = this.entity && this.entity.iotDevice;
//        if(_temp && !_temp.online) {
          this.$messagebox({
            title: '提示',
            message: '是否恢复出厂设置？',
            showCancelButton: true
          }).then((action) => {
            if(action === 'confirm') {
              this.$http.post(this.$apihost + '/waterdevices/' + this.entity.id + '/instruction/restore')
                .then((res) => {
                  this.$http.get(this.$apihost + '/waterdevices/' + this.entity.id + '/instruction/restore')
                    .then((code) => {
                      this.$toast.success('成功恢复出厂设置!');
                    })
                })
            }
          })
//        } else {
//          this.$messagebox({
//            title: '提示',
//            message: '设备离线中，无法恢复出厂设置哟~'
//          });
//        }
      },
      /**
       * 查看服务订单详细
       */
      serviceOrder() {
        this.$store.commit("showLoading");
//        if(this.orderCount > 0) {
          this.$router.push(`/devices/${this.entity.id}/orderlist`);
//        } else {
//          this.$messagebox({
//            title: '提示',
//            message: '暂无服务订单哟~'
//          });
//        }
      },
      /**
       * 放大图片
       * @param index
       */
      showImg() {
        this.$bus.emit('v-show-img', 0);
      },
      /**
       * 续费
       */
      recharge() {
        this.$store.commit("hideLoading");
        let _id = this.$route.params && this.$route.params.id;
        this.$router.push({
          path: `/userdevices/pay/deposit/${this.renewId}`,
          query: {
            id: _id,
            orderId: this.entity.leaseProductId
          }
        });
      },
      /**
       * 解绑
       */
      unbind() {
        let that = this;
        that.$messagebox({
          title: '提示',
          message: '是否解绑该设备吗？',
          showCancelButton: true
        }).then((action) => {
          if(action === 'confirm') {
            let _usrDeviceId = that.$route.params.id;

            if(_usrDeviceId) {
              that.$http.post(`${that.$apihost}/userdevices/${_usrDeviceId}/unbind`)
                .then((res) => {
                  that.$toast.success('解绑成功！');
                  setTimeout(function () {
                    that.$store.state.refresh = true;
                    that.$router.replace('/devices');
                  }, 1500);
                })
            }
          }
        })
      }
    },
    components: {
      AppView,
      VCell,
      logsRecharge,
      VImage,
    }
  }
</script>
