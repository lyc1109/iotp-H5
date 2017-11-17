<template>
  <div class="full-height valign-center">
    <div class="align-center block-center font-light">
      <div class="inline-block">
        <mt-spinner type="double-bounce" color="#bbbec4" :size="28"></mt-spinner>
      </div>
      <p class="margin-top">系统正在授权登录，请稍候...</p>
    </div>
  </div>
</template>

<script>
  import App from '@/assets/scripts/app';
  import MutationTypes from "@/store/mutation-types";

  export default{
    name: "login",
    created: function () {

      // 清理授权信息
      this.$store.commit(MutationTypes.oauth.updateAuthToken, "");
      this.$store.commit(MutationTypes.oauth.updateCurUser, null);

      // 登录后重定向URL
      const redirect = this.$route.query.redirect;
      const appId = App.appId;

      // 接收access code地址
      let accessHost = "http://localhost:8000";
      // 授权地址
      let authUrl = this.$basehost;
      if (App.isLocal) {
        accessHost = process.env.LOCAL_HOST + ":8000";
        authUrl = process.env.LOCAL_HOST + ":8310";
      }else if (App.isDev) {
        accessHost = process.env.LOCAL_HOST + ":8000";
        authUrl = "http://192.168.0.26:8310";
      } else if (App.isTest) {
        accessHost = "http://192.168.0.26:8500";
        authUrl = "http://192.168.0.26:8310";
      }  else if (App.isStage) {
        accessHost = "http://t.m.xohaa.net";
        authUrl = this.$basehost;
      } else if (App.isProduct) {
        accessHost = "http://m.xohaa.net";
        authUrl = this.$basehost;
      }
      accessHost += "/access/token?redirect=" + redirect;
      window.open(authUrl + "/oauth2/authorize?client_id=" + appId + "&redirect_uri=" + encodeURI(accessHost), "_self");
    }
  }
</script>
