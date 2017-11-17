<style lang="scss" type="text/scss">
  @import "~variables";

</style>
<template>
  <div>
    <button @click="testAlipay()">支付订单</button>
    <button @click="refundAlipay()">退款</button>
  </div>
</template>

<script>
  export default {
    name: "alipay-test",
    data() {
      return {
        //是否正在上传显示中..
        uploading: false,
        // 弹窗是否显示
        progressPopup: false,
        // 进度条
        value: 0,
        //图片数组
        imgArr: []
      }
    },
    methods: {
      testAlipay() {
        console.log('testAlipay');
        this.$http.post(`${this.$apihost}/alipay/test/serviceorders/3zOxwj/pay`)
          .then((res) => {
            console.log(res);
            const div = document.createElement('div');
            div.innerHTML = res;
            console.log(div);
            document.getElementById('app').appendChild(div);
            document.forms[0].submit();
          })
      },
      refundAlipay() {
        console.log('refund');
        this.$http.post(`${this.$apihost}/alipay/test/serviceorders/3zOxwj/refund`)
          .then((res) => {
            console.log(res);
            const div = document.createElement('div');
            div.innerHTML = res;
            console.log(div);
            document.getElementById('app').appendChild(div);
            document.forms[0].submit();
          })
      }
    }
  }
</script>
