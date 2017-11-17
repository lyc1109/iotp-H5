<style scoped lang="scss" type="text/scss">
  @import "~variables";

  .header {
    position: relative;
    z-index: 10;
    background-color: $primary;
  }
  .device-box {
   /*margin-top: rem(50px);*/
  }
  .card {
    position: relative;
    //    @extend %margin-m;
  }

  .device-type {
    position: absolute;
    top: rem(12px);
    left: rem(-7px);

    width: rem(80px);
    height: rem(30px);
    background: $transparent no-repeat;
    background-size: rem(80px) rem(30px);
    z-index: 1;
    text-align: center;
    color: $white;
    line-height: rem(28px);
    font-size: $font-size-s;
  }

  .device-type.device-type-i {
    background-image: url("/static/images/devices/tag-i.png");
  }

  .device-type.device-type-l {
    background-image: url("/static/images/devices/tag-l.png");
  }

  .device-status {
    height: rem(25px);
    line-height: 25px;
    margin-top: rem(3px);
    font-size: $font-size-s;

    i {
      font-size: 16px;
      margin-top: -3px;
    }
  }

  .flex-left{
    flex: 0 0 rem(100px);

    img{
      width: rem(90px);
      height: rem(90px);
    }
  }
  .addDevices{
    width: 100%;

    ul{
      width: 100%;
      display: inline-block;

      li{
        width: 100%;
        display: inline-block;
      }
    }
  }
  .device-btn-box .btn {
    @include border-radius(20px);
    border: rem(1px) solid $font-lighter;

    &:last-child {
      background: $primary;
      background-color: $primary;
      color: $white;
      border: rem(1px) solid $primary;
      .a-default {
        color: $white;
      }
    }
  }
</style>

<template>
  <div>
    <div class="header padding-m flex" @click="addDevice()" style="display: none1">
      <div class="flex-item font-l font-white">我的设备</div>
      <div class="ripple padding-left padding-right">
        <i class="iconfont icon-iot-add font-white icon-xxl"></i>
      </div>
    </div>
    <app-view class="has-nav device-main" :hasPullRefresh="true" :pullRefresh="pullRefresh">
      <app-page type="device"
                :url="page.url"
                :params="page.params"
                :storeMutation="page.storeMutation"
                :storeGetter="page.storeGetter"
                @loaded="onPageLoaded"
                class="device-box bg">
        <div v-for="(item,index) in fileList"
             v-if="fileList.length > 0"
             class="card margin-m">
          <div class="device-type device-type-i" v-if="item.device.deviceType === 'I'"> 智能设备 </div>
          <div class="device-type device-type-l" v-if="item.device.deviceType === 'L'"> 租赁设备 </div>

          <div class="flex padding ripple" @click="deviceDetail(item,index)">
            <div class="flex-left">
              <img class="img-thumbnail" :src=" $filters.img(item.device.productImage, '!wh100') " v-lazy="$filters.img(item.device.productImage, '!wh100')"/>
            </div>
            <div class="flex-item padding-left">
              <div class="text-title text-wrapper"> {{item.device.deviceName}} </div>

              <!--<div class="device-status">-->
              <!--&lt;!&ndash;<div class="color-danger" v-if="item.device.deviceType === 'L' && !item.device.leaseProductActived">&ndash;&gt;-->
              <!--&lt;!&ndash;<i class="fa fa-ban"></i> 待激活&ndash;&gt;-->
              <!--&lt;!&ndash;</div>&ndash;&gt;-->

              <div v-if="item.deviceType === 'I' || item.device.deviceType === 'L'">
                <div class="color-danger" v-if="item.device.iotDevice != null && item.device.iotDevice.locked">
                  <i class="fa fa-lock"></i> 已锁机
                </div>

                <div v-if="item.device.iotDevice != null && !item.device.iotDevice.locked">
                  <div v-if="item.device.iotDevice.online">
                        <span class="color-success" v-if="item.device.iotDevice.powerOn"><i
                          class="fa fa-wifi"></i> 在线</span>
                    <span class="color-danger" v-if="!item.device.iotDevice.powerOn"><i class="fa fa-power-off"></i> 已关机</span>
                  </div>
                  <div v-if="!item.device.iotDevice.online">
                    <span class="color-danger"><i class="fa fa-exclamation-triangle"></i> 已离线</span>
                  </div>
                </div>
              </div>
              <!--</div>-->


              <div class="font-s font-light margin-top" v-if="item.device.deviceType === 'C'">
                <div class="margin-bottom-s">产品型号：{{item.device.itemCode}}</div>
                <div>购买日期：{{ $filters.formatDate(item.device.purchasedDate) }}</div>
              </div>

              <div class="font-s font-light margin-top" v-if="item.device.deviceType !== 'C'">
                <div class="margin-bottom-s" v-if="item.device && item.device.deviceId">SN：{{item.device && item.device.deviceId}}</div>
                <div class="margin-bottom-s" v-if="item.device && item.device.iotDevice">MAC：{{ item.device && item.device.iotDevice && item.device.iotDevice.deviceMac }}</div>
                <div>
                  <span v-if="item.device.deviceType === 'L'">租赁到期日：{{ $filters.formatDate(item.device.leaseDueDate) }}</span>
                  <span v-if="item.device.deviceType === 'I'">购买日期：{{ $filters.formatDate(item.device.purchasedDate) }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-gray-1 padding flex device-btn-box">
            <div class="flex-item"></div>
            <div>
              <!--<button type="button" class="btn btn-sm btn-danger btn-round"-->
              <!--v-if="item.device.deviceType === 'L' && !item.device.leaseProductActived" @click="activeDevice(item.device.id)">-->
              <!--去激活设备-->
              <!--</button>-->
              <button class="btn btn-sm margin-right">
                <router-link class="a-default" :to="{ path: '/serviceorder/create', query: getDeviceParams(item)}">
                  一键报修
                </router-link>
              </button>
              <button v-if="item.device && item.device.deviceType === 'L' && !item.device.company"
                      type="button" class="btn btn-sm margin-right"
                      @click.stop="recharge(item)">续费</button>
            </div>
          </div>
        </div>
      </app-page>
    </app-view>

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

    <app-nav navId="devices"></app-nav>
  </div>
</template>

<script>
  import AppView from "@/components/layouts/app-view";
  import AppPage from '@/components/layouts/app-page';
  import AppNav from '@/pages-member/nav';
  import toast from '@/assets/scripts/toast'

  import types from "@/store/mutation-types";

  export default {
    name: "nav-device",
    data: function () {
      return {
        // 下拉刷新数据
        pullRefresh: {
          params: {
          },
          events: {
            topMethod: this.getListData,
          }
        },
        addDevices: false,
        // 列表数据
        fileList: [],
        justOneIotDevice: true,
        chooseDevicesPopup: false,
        selectedCode: '',
      }
    },
    computed: {
      page () {
        return {
          url: this.$apihost + "/userdevices",
          params: {
            page_size: 4,
            page_sort: 'createdDate_desc',
          },
          storeMutation: types.userDevices.setPageData,
          storeGetter: ''
//          storeGetter: types.userDevices.getPageData
        }
      }
    },
    beforeRouteLeave(to,from,next) {
      this.$bus.off('page-refresh');
      let position = window.scrollY;
      this.$store.commit('saveDevicePosition', position) //离开路由时把位置存起来
      next()
    },
    created() {
      if(this.$store.state.refresh) {
        this.$router.go(0);
      }
      // 处理jssdk签名,兼容history模式
      let _href = location.href.split('#')[0];
      let _temp = this.$store.getters[types.common.getEnterURL];
      if (!_temp) {
        this.$store.commit(types.common.setEnterURL, _href);
      }
    },
    mounted() {
      this.$nextTick(() => {
        let position = this.$store.state.device_position //返回页面取出来
        window.scroll(0, position);
      })
    },
    methods: {
      /**
       * 获取分页数据
       */
      getListData() {
        this.$bus.emit('page-refresh');
      },
      /**
       * 页面加载后操作
       * @param fileList
       */
      onPageLoaded (fileList) {
        this.$store.commit("hideLoading");
        this.fileList = fileList;
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
       *  进入设备详情
       */
      deviceDetail(device, index) {
        this.$store.state.showLoading = true;
        if (this.fileList[index].device.iotDeviceType === 'iWater') {
          this.$router.push(`/devices/usrDevice_${device.id}/device_${device.device.id}/iwater`);
        } else {
          this.$router.push(`/devices/${device.id}/view`);
        }
      },
      addDevice() {
        this.addDevices = true;
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
    },
    components: {
      AppNav,
      AppPage,
      AppView,
    },
  };
</script>
