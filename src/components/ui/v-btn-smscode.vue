<style scoped lang="scss" type="text/scss">
  @import "~variables";

  .btn-smscode {
    border: none;
    padding-left: rem(20px);
    @include border(left);
  }

  .btn-smscode.disabled{
    color: $font-light;
  }
  .btn-smscode.enable{
    color: $primary;
  }
</style>

<template>
  <div>
    <button type="button" class=""
            :class="{'btn btn-default btn-smscode disabled': isDisabled, 'btn btn-default btn-smscode enable': !isDisabled}"
            :disabled="isDisabled"
            @click="sendSmsCode">
      {{btnSmsCodeText}}
    </button>
  </div>
</template>

<script>
  import App from "scripts/app";

  export default{
    name: "btnSmsCode",
    props: ["mobile", "disabled"],
    data: function () {
      return {
        btnSmsCodeText: "获取验证码",
        smsSec: 60,
        smsInterval: 0
      };
    },
    methods: {
      sendSmsCode: function () {
        if (this.mobile === "") {
          this.$toast.error("手机号码不能为空哟");
          return;
        }

        this.$loading.show();

        setTimeout(() => {
          this.$http.post(this.$apihost + "/sms/sendCode", {mobile: this.mobile})
            .then((respData) => {
              if (respData && !App.isProduct) {
                this.$toast.success("验证码：" + respData);
              }

              this.startInterVal();
              this.$loading.hide();
            });
        }, 1000)
      },

      startInterVal: function () {
        this.smsInterval = setInterval(() => {
          this.smsSec--;
          this.btnSmsCodeText = this.smsSec + "s";
          if (this.smsSec <= 0) {
            this.resetInterVal();
          }
        }, 1000);
      },

      resetInterVal: function () {
        clearInterval(this.smsInterval);
        this.smsSec = 60;
        this.smsInterval = 0;
        this.btnSmsCodeText = "重新获取";
      }
    },
    computed: {
      isDisabled: function () {
        return !(this.disabled && this.smsSec === 60);
      }
    }
  }
</script>
