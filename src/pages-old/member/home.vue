<style scoped lang="scss" type="text/scss">
  @import '~variables';

  .member-bg{
    padding: 25px;
    /*background-image: url("/assets/images/member_bg.png");*/
    background-color: $primary;
    /*background-color: #2F8CFC;*/
    background-image: -webkit-linear-gradient(top, #2F8CFC, #03A9F4); /* Chrome 10-25, iOS 5+, Safari 5.1+ */
    background-image:         linear-gradient(to bottom, #2F8CFC, #03A9F4); /* Chrome 26, Firefox 16+, IE 10+, Opera */
  }
  .apply{
    padding: 10px 15px 10px 15px;
    font-size: 16px;
    border: 1px solid #eaeaea;
    background-color: #f5f7fa;
    position: relative;
  }
  #listContainer{
    .list-item{
      padding: 15px 10px;
      background-color: $white;
    }
  }

  .label-iot-device{
    background-color: $blue-2;
    font-size: $s;
    border-radius: 12px;
    font-weight: normal;
  }
  .label-iot-device-lease{
    background: $cyan;
  }


  .device-img{
    float: left;
    width: 80px;
    height: 80px;
    text-align: center;
    position: relative;

    .img-rounded{
      margin: 0 auto;
    }

    .device-status{
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;

      background-color: rgba(0,0,0,.3);
      color: $white;
      padding: rem(5px) 0;
      font-size: $s;
      @extend %text-wrapper;
    }

    .device-offline{
      color: $gray;
    }
  }

  .device-actions{
    float: right;
    width: 80px;
    height: 80px;
    line-height: 100px;
  }

  .device-infos{
    width: 100%;
    padding-left: 90px;
    padding-right: 90px;
    height: 80px;
    overflow: hidden;
  }
  .img-box {
    flex: 0 0 11.7%;

    .img-thumbnail {
      width: 100%;
      height: 100%;
    }
  }
  .device-btn-box .btn {
    @include border-radius(rem(20px));
    border: rem(1px) solid $font-lighter;

    &:last-child {
      background-color: $primary;
      color: $white;
      border: rem(1px) solid $primary;
      .a-default {
        color: $white;
      }
    }
  }
  .addDevices{
    width: 100%;
  }
</style>
<template>
  <div>
    <!--<div class="apply" id="applyAuth" v-if="#lists.size(applyAuthDevices)} == 1" th:object="${applyAuthDevices[0]">-->
    <!--<div class="font-s apply-left color-red-1 font-m">-->
    <!--<i class="fa fa-bell-o" aria-hidden="true"></i> <b th:text="*{userNick} + '('+*{userMobile}+')'"></b>申请授权设备：<span th:text="*{deviceName">奥浮尔管线机（温冰热式） 壁挂式</span>-->
    <!--</div>-->
    <!--<div class="padding align-right">-->
    <!--<button class="btn  btn-success accept margin-right" data:id="*{id">同意</button>-->
    <!--<button class="btn  btn-danger reject" data:id="*{id">拒绝</button>-->
    <!--</div>-->

    <!--</div>-->
    <!--<div class="apply" v-if="#lists.size(applyAuthDevices)} > 1">-->
    <!--<router-link href="/jbr/devices/auth/list">-->
    <!--<div class="font-s apply-left font-m color-red-1">-->
    <!--<i class="fa fa-bell-o" aria-hidden="true"></i> <span>您有<span th:text="${#lists.size(applyAuthDevices)"></span>条申请授权记录</span>-->
    <!--</div>-->
    <!--</router-link>-->
    <!--<div style="position: absolute;top:8px;right: 10px;">-->
    <!--<router-link href="/jbr/devices/auth/list" class="btn btn-xs btn-danger">点击查看</router-link>-->
    <!--</div>-->

    <!--</div>-->
    <div class="member-bg">
      <div class="align-center">
        <img class="img-circle" :src="curUser.avatar === null ? $filters.avatar('/static/images/avatar.png') : $filters.avatar(curUser.avatar)" width="80px" height="80px"/>
      </div>
      <div class="align-center text-white margin-top-m">
        <div class="font-l color-white font-bold-400">{{ curUser.nickname }}</div>
      </div>
    </div>
    <div class="bg-white align-center padding-m">
      <div class="flex">
        <div class="flex-item col-min">
          <router-link to="/serviceOrder">
            <i class="fa fa-wrench fa-lg color-green-1"></i>
            <div class="font-s margin-top">服务订单</div>
          </router-link>
        </div>
        <div class="flex-item col-min">
          <router-link to="/jbr/lease/product">
            <i class="fa fa-shopping-bag fa-lg color-pink-1"></i>
            <div class="font-s margin-top" data-toggle="tpl" data-res-key="lease">租赁中心</div>
          </router-link>
        </div>
        <div class="flex-item col-min">
          <router-link :to="{ path: `/my/edit` }">
            <i class="fa fa-user fa-lg color-blue-2"></i>
            <div class="font-s margin-top">个人信息</div>
          </router-link>
        </div>
      </div>
    </div>

    <!--服务订单-->
    <div v-if="serviceOrderList && serviceOrderList.length > 0">
      <!--<div class="padding-m border-bottom bg-white">
          <i class="fa fa-history fa-lg color-pink-1 valign-middle"></i>&nbsp;&nbsp;<span class="valign-middle text-normal">进行中订单</span>
      </div>-->

      <div class="divider">进行中订单</div>

      <ul class="orders">
        <li v-for="item in serviceOrderList" class="bg-white padding">
          <router-link
            :to="{ path: `/serviceorder/${item.id}/view` }">
            <div class="order-info flex">
              <div class="img-box">
                <img class="img-thumbnail" :src="$filters.img(item.productImage)"/>
              </div>

              <div class="product-info flex-item">
                <div class="margin-left">
                  <div class="text-wrapper">{{ item.productName }}</div>
                  <div class="font-s font-light margin-top" v-if="item.orderType === 'common' || item.orderType === 'returnDeposit'">产品型号：<span>{{ item.productItemCode }}</span></div>
                  <div class="font-s font-light margin-top" v-if="item.orderType === 'lease' || item.orderType === 'business'">产品代码：<span>{{ item.leaseProduct.code }}</span></div>
                </div>
              </div>
            </div>

            <div class="order-field">
              <div class="pull-right">
                <i class="fa fa-clock-o font-lighter fa-lg"></i>
                <div class="font-s" style="margin-top: 4px;">
                  <status :order="item" type="list" :statusList="statusList"></status>
                </div>
              </div>
              <div class="product-field-info">
                服务类型：
                <span :class="{ 'color-green-1': item.orderType !== 'lease','color-yellow-1': item.orderType === 'lease' }">{{ item.shopServiceName }}</span>
                <div class="padding-top-s" v-if="item.orderType !== 'business'">
                  预约时间：<span>{{ $filters.formatDate(item.serviceDate,'MM-DD') }}</span> <span class="margin-left-s">{{ item.serviceTime }}</span>
                </div>
                <div class="padding-top-s" v-if="item.orderType === 'business'">
                  公司名称：<span>{{ item.leaseCompany }}</span>
                </div>
              </div>
            </div>
          </router-link>

          <div class="order-foot padding-top">
            <div class="pull-right" style="width: auto;">
              <action :order="item" type="list" :statusList="statusList"></action>
              <!--<div th:include="layouts-tpl/tplActions::serviceOrder(${item}, 'list')"/>-->
            </div>
            <div class="font-light font-s">订单号：{{ item.orderId }}</div>
          </div>
        </li>
      </ul>
    </div>

    <!--用户设备-->
    <div id="purchasedProducts">
      <div class="divider">
        <span data-toggle="tpl" data-res-key="userdevice">已购产品</span>
        <div class="pull-right" style="margin-top: -6px;">
          <button type="button" class="btn btn-link" style="background: 0 none;border: 0 none;" id="btnAddProduct" @click="addDevices = true">添加产品</button>
        </div>
      </div>

      <div id="listContainer" class="list-container">
        <div class="list-item clearfix" v-for="item in deviceList">

          <router-link :to="{ path: item.device.deviceType === 'C' ? `/devices/${item.id}/view` : `/devices/${item.device.id}`,query: item.device.deviceType === 'C' ? {} : { id: item.id } }" class="margin-bottom" style="display: inline-block;">
            <div class="pull-left device-img img-box">
              <img class="img-thumbnail" :src="$filters.img(item.device.productImage)"/>

              <div v-if="item.device.deviceType === 'L' && !item.device.iotDevice.activedAt">
                <div class="device-status">设备未激活</div>
              </div>

              <div v-if="item.device.deviceType !== 'L' || (item.device.deviceType === 'L' && item.device.iotDevice.activedAt)">

                <div v-if="item.device.iotDevice !== null && item.device.iotDevice.locked">
                  <div class="device-status device-offline color-red-1">设备已锁定</div>
                </div>

                <div v-if="item.device.iotDevice !== null && !item.device.iotDevice.locked">
                  <div v-if="item.device.iotDevice.online">
                    <div class="device-status device-online" v-if="item.device.iotDevice.powerOn">设备在线</div>
                    <div class="device-status device-offline" v-if="!item.device.iotDevice.powerOn">设备关机</div>
                  </div>

                  <div class="device-status device-offline" v-if="!item.device.iotDevice.online">设备离线</div>
                </div>
              </div>
            </div>


            <div style="margin-left: 95px;">
              <div class="text-wrapper">
                <span class="label color-white label-iot-device" v-if="item.device.deviceType ===  'I'">智能产品</span>
                <span class="label color-white label-iot-device label-iot-device-lease"
                      v-if="item.device.deviceType ===  'L'">租赁产品</span>
                <span>{{ item.device.deviceName }}</span>
              </div>

              <div class="font-s font-second margin-top" v-if="item.device.deviceType === 'C'">
                产品型号：<span>{{ item.device.deviceitemCode }}</span>

                <div class="font-s font-second margin-top-s" v-if="item.device.deviceType !== 'L'">
                  购买日期：<span>{{ $filters.formatDate(item.device.devicepurchasedDate) }}</span>
                </div>
              </div>

              <div class="font-s font-second margin-top-s" v-if="item.device.deviceType !== 'C'">
                <div>SN：<span>{{ item.device.iotDevice.deviceId }}</span></div>
                <div>MAC：<span>{{ item.device.iotDevice.deviceMac }}</span></div>

                <div v-if="item.device.deviceType === 'L'">
                  <div v-if="item.device.iotDevice.activedAt">
                    <span>到期日期</span>：
                    <span v-if="item.device.deviceleaseDueDate !== null">{{ $filters.formatDate(item.device.deviceleaseDueDate) }}</span>
                  </div>
                  <div v-if="!item.device.iotDevice.activedAt">
                    购买日期：<span v-if="item.device.devicepurchasedDate !== null">{{ $filters.formatDate(item.device.devicepurchasedDate) }}</span>
                  </div>
                </div>
                <div v-if="item.device.deviceType !== 'L'">
                  购买日期：<span v-if="item.device.devicepurchasedDate !== null">{{ $filters.formatDate(item.device.devicepurchasedDate) }}</span>
                </div>
              </div>
            </div>
          </router-link>
          <hr class="dash" style="margin-top: 0;"/>
          <div class="align-right device-btn-box">
            <!--<div v-if="item.device.deviceType === 'L' && !item.device.iotDevice.activedAt">-->
            <!--<router-link :to="{ path: `/devices/${item.device.id}` }" class="btn btn-primary-outline btn-round btn-sm">去激活设备</router-link>-->
            <!--</div>-->
            <button type="button" class="btn btn-sm">
              <router-link class="a-default" :to="{ path: `/serviceOrder/create`,query: getDeviceParams(item) }">
                一键报修
              </router-link>
            </button>
            <button v-if="item.device && item.device.deviceType === 'L' && !item.device.company"
                    type="button" class="btn btn-sm margin-right"
                    @click.stop="recharge(item)">续费</button>
          </div>
        </div>

        <!--<div class="list-item" v-if="not ${devices} or ${#lists.isEmpty(devices)">-->
        <!--<div class="font-second align-center padding">暂无绑定设备信息</div>-->
        <!--</div>-->

        <div class="list-item align-center" v-if="deviceList && deviceList.length >= 5">
          <router-link class="btn btn-default btn-sm" to="/jbr/devices">查看全部</router-link>
        </div>

        <mt-popup v-model="addDevices" position="bottom" class="addDevices" @click.stop="chooseDevicesPopup=false">
          <slot>
            <ul>
              <li class="border-bottom">
                <button type="button" class="btn btn-block font-m padding-m" @click.stop="scanQRCode">扫一扫</button>
              </li>
              <li @click.stop="chooseDevicesPopup=true">
                <router-link :to="{ path: '/devices/choose' }">
                  <button type="button" class="btn btn-block font-m padding-m">手工录入</button>
                </router-link>
              </li>
            </ul>
          </slot>
        </mt-popup>
      </div>
    </div>
  </div>
</template>
<script>
  import types from '@/store/mutation-types'
  import AppPage from '@/components/layouts/app-page'
  import Status from '@/pages-member/tpl/tpl-status'
  import Action from '@/pages-member/tpl/tpl-action'

  export default {
    name: '',
    data (){
      return {
        serviceOrderList: [],
        deviceList: [],
        // 状态数据
        statusList: [],
        addDevices: false,
      }
    },
    created(){
      this.pageLoaded()
    },
    methods: {
      pageLoaded(){
        // 服务订单列表获取
        this.$http.get(`${this.$apihost}/serviceorders`,{
          page_size: 15,
          type: 'jxz',
          page_sort: 'serviceDate_desc'
        })
          .then((res) => {
            this.serviceOrderList = res.fileList
          })

        this.$http.get(`${this.$apihost}/serverorders/const/status`)
          .then((status) => {
            this.statusList = status;
          })

        // 用户设备列表获取
        this.$http.get(`${this.$apihost}/userdevices`,{
          page_size: 5
        })
          .then((res) => {
            this.deviceList = res.fileList
          })
      },
      /**
       * 获取跳转传递参数
       *
       * @param userDevice
       */
      getDeviceParams (userDevice) {
        return {
          id: userDevice.id,
          deviceId: userDevice.device.id,
          deviceName: userDevice.device.deviceName,
          productId: userDevice.device.productId,
          productImage: userDevice.device.productImage,
          itemCode: userDevice.device.itemCode,
          purchasedDate: this.$filters.formatDate(userDevice.device.purchasedDate),
          deviceType: userDevice.device.deviceType,
        }
      },
      /**
       * 续费
       * @param item
       */
      recharge(item) {
        this.$store.commit("hideLoading");
        this.$router.push({
          path: `/userdevices/pay/deposit/${item.device.id}`,
          query: {
            id: item && item.id,
            orderId: item.device && item.device.leaseProductId
          }
        });
      },
      /**
       * 扫一扫添加设备
       */
      scanQRCode() {
        let that = this;
        that.addDevices = false;

        let nav = navigator && navigator.userAgent.toLowerCase();
        if(nav && nav.match(/MicroMessenger/i) && nav.match(/MicroMessenger/i)[0] === 'micromessenger') {
          that.$wechat.deviceScan(that);
        } else if(nav && nav.match(/Alipay/i) && nav.match(/Alipay/i)[0] === 'alipay') {
          that.$alipay.deviceScan(that);
        } else {
          that.$messenger.error('请在微信或支付宝内打开此页面!');
        }
      },
    },
    computed: {
      // 获取当前用户信息
      curUser (){
        return this.$store.getters[types.oauth.getCurUser]
      }
    },
    components: {
      AppPage,
      Status,
      Action
    }
  }
</script>
