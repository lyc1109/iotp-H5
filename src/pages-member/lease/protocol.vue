<style scoped lang="scss" type="text/scss">
  @import '~variables';
</style>
<template>
  <div class="full-height">
    <div v-if="protocol" class="ouath-box bg full-height padding-bottom-xxl">
      {{ $filters.unEscape(protocol) }}
    </div>
    <div v-else class="device-page-box valign-center" style="justify-content: center">暂无协议数据</div>
    <div class="page-footer align-center" @click="cancel()">
      <div class="padding-m btn-primary color-white">关闭</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "oauth-protocol",
    data() {
      return {
        // 设备授权申请数据
        protocol: {}
      }
    },
    created() {
      // 获取设备授权数据
      this.$http.get(`${this.$apihost}/userdevices/pending-approvals`)
        .then((data) => {
          this.protocol = data;
        })
    },
    methods: {
      /**
       * 取消
       */
      cancel() {
        this.$router.go(-1);
      }
    },
  }
</script>

