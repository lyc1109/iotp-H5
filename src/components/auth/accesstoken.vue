<style scoped lang="scss" type="text/scss">
</style>

<template>
  <div class="full-height valign-center">
    <div class="align-center block-center font-light">
      <div class="inline-block">
        <mt-spinner type="double-bounce" color="#bbbec4" :size="28"></mt-spinner>
      </div>
      <p class="margin-top">正在处理授权登录信息，请稍候...</p>
    </div>
  </div>
</template>

<script>
  import App from "scripts/app";
  import Utils from "scripts/utils";
  import MutationTypes from "@/store/mutation-types";

  export default {
    name: "accesstoken",
    created: function () {
      const accessTokenCode = Utils.parseUrlParam("code");
      if (accessTokenCode !== null && accessTokenCode !== "") {
//        console.log("AccessTokenCode: " + accessTokenCode);
        this.accessToken(accessTokenCode);
      }
    },
    methods: {
      accessToken: function(accessTokenCode) {
        let _params = {
          "client_id": App.appId,
          "client_secret": App.appSecret,
          "code": accessTokenCode
        };

        this.$http.post(`${this.$basehost}/oauth2/token`, {
          "client_id": App.appId,
          "client_secret": App.appSecret,
          "code": accessTokenCode
        })
          .then((authToken) => {
            this.$store.commit(MutationTypes.oauth.updateAuthToken, authToken);

             // 获取当前用户信息
            this.getCurUser();
          });
      },

      getCurUser: function() {
        this.$http.get(this.$apihost + "/user")
          .then((user) => {
            this.$store.commit(MutationTypes.oauth.updateCurUser, user);
            // 获取当前店铺信息
            this.bindShop()
            this.redirect();
          });
      },

      bindShop(){
//        const curShop = this.$store.getters[MutationTypes.oauth.getCurShop]
        const curShop = 'n6ZR6p'
        this.$http.post(`${this.$apihost}/ms/shop/${curShop}`)
          .then((res) => {
            this.$store.commit(MutationTypes.oauth.updateCurShop,res)
          })
      },

      // 重定向
      redirect: function() {
        const redirectUri = this.$route.query.redirect;
        if (redirectUri !== "undefined" && typeof redirectUri !== undefined) {
          this.$router.replace(redirectUri)
        } else {
          this.$router.replace("/")
        }
      }
    }
  }
</script>
