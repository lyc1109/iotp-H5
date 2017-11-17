<style scoped lang="scss" type="text/scss">
</style>

<template>
  <div class="full-height valign-center">
    <div class="align-center block-center font-light">
      <div class="inline-block">
        <mt-spinner type="double-bounce" color="#bbbec4" :size="28"></mt-spinner>
      </div>
      <p class="margin-top">正在为您跳转，请稍候...</p>
    </div>
  </div>
</template>

<script>
  import types from "@/store/mutation-types";

  export default {
    name: "shop",
    created: function () {
      const shopId = this.$route.params.shopId;
      this.$http.post(`${this.$apihost}/ms/shop/shop_${shopId}`)
        .then((curShop) => {
          this.$store.commit(types.oauth.updateCurShop, curShop);
          this.$store.commit(types.oauth.updateRole, "USER");

          const curUser = this.$store.getters[types.oauth.getCurUser];
          if (curUser !== null) {
            const mobile = curUser.mobile;
            //console.log("当前用户手机号码: " + mobile);
            if (mobile === null || mobile === "") {
              this.$router.replace("/bind/mobile");
            } else {
              let _query = this.$route.query;
              if(_query && _query.entry) {
                let _type = _query.entry;
                let _url = '/home';
                if(_type === 'profile') {
                  _url = '/my/edit';
                } else if(_type === 'devices') {
                  _url = '/devices';
                } else if(_type === 'registDevice') {
                  _url = '/devices/choose';
                } else if(_type === 'orders') {
                  _url = '/serviceorder';
                } else if(_type === 'lease') {
                  _url = '/lease';
                } else if(_type === 'payLease') {
                  _url = '/leaseScan';
                }
                if(_url) {
                  let _href = location.href.split('#')[0];
                  this.$store.commit(types.common.setEnterURL, _href);
                  this.$router.replace(_url);
//                  window.location.href = '/home';
                }
              } else {
                // 兼容ios微信
//                this.$router.replace("/home");
                window.location.href = '/home';
              }
            }
          } else {
            // 兼容ios微信
            window.location.href = '/home';
//            this.$router.replace("/home");
          }
        });
    },
  };
</script>
