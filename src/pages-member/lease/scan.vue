<!-- 扫码租赁 -->
<template>
  <div class="full-height bg-white valign-center" style="justify-content: center;">
    <div class="flex" style="flex-direction: column">
      <img src="/static/images/empty/no-device.png" width="250"/>
      <mt-button class="btn btn-sm btn-round btn-primary" @click="scanQRCode()">扫码租赁</mt-button>
    </div>
  </div>
</template>

<script type="text/javascript">
  import types from "@/store/mutation-types";

  export default {
    name: 'lease-scan',
    created() {
      let that = this;
      that.$store.state.hideLoading = true;

      // 处理jssdk签名,兼容history模式
      let _ua = navigator.userAgent.toLowerCase();
      let _href = location.href.split('#')[0];

      // 如果是ios微信浏览器
      if (/iphone|ipad|ipod/.test(_ua)) {
        let _temp = that.$store.getters[types.common.getEnterURL];
        if (!_temp) {
          that.$store.commit(types.common.setEnterURL, _href);
          that.$router.go(0);
        } else {
          that.scanQRCode();
        }
      } else {
        that.scanQRCode();
      }
    },
    methods: {
      /**
       * 扫一扫添加设备
       */
      scanQRCode() {
        let that = this;
        let nav = navigator && navigator.userAgent.toLowerCase();
        if(nav && nav.match(/MicroMessenger/i) && nav.match(/MicroMessenger/i)[0] === 'micromessenger') {
          that.$wechat.deviceScan(that);
        } else if(nav && nav.match(/Alipay/i) && nav.match(/Alipay/i)[0] === 'alipay') {
          that.$alipay.deviceScan(that);
        } else {
          that.$messenger.error('请在微信或支付宝内打开此页面!');
        }
      },
    }
  }
</script>
