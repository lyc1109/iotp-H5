<style scoped lang="scss" type="text/scss">
  @import "~variables";

  .btn[disabled] {
    background-color: $font-light;
  }
  .feedback-box {
    padding: rem($m) rem($m) rem(200px);
    .text-box {
      background: lighten($page_bg,3%);
      position: relative;
      textarea {
        width: 100%;
        border: none;
        background: lighten($page_bg,3%);
        resize: none;
      }
      .text-length {
        position: absolute;
        bottom: rem($m);
        right: rem($m);
      }
    }
  }
</style>

<template>
  <app-view :hasFooter="true">
    <div class="feedback-box bg-white">
      <div class="text-title font-m font-bold-500">建议描述</div>
      <div class="margin-top border border-radius padding-m flex text-box">
        <textarea class="" name="feedback-text" maxlength="200" id="" rows="12"
                  placeholder="亲~您的每条建议，我们都会认真对待哟~"
                  v-model="feedbackText" ></textarea>
        <span class="text-length font-light">{{textCount}}/200</span>
      </div>
      <div class="text-title font-m font-bold-500 margin-top-m">联系方式</div>
      <div class="margin-top border border-radius padding-m bg-white flex text-box">
        <textarea class="bg" name="contact-text" rows="1"
                  placeholder="方便我们提供更好的服务"
                  v-model="feedbackContact" ></textarea>
      </div>
    </div>
    <div slot="footer" class="footer">
      <button type="button" class="btn-block btn color-white" :disabled="textCount === 0" :class="{ 'btn-primary': textCount > 0 }" @click="submit()">提交</button>
    </div>
  </app-view>
</template>

<script>
  import AppView from '@/components/layouts/app-view'
  import types from "@/store/mutation-types";

  export default {
    name: 'my-feedback',
    data() {
      return {
        feedbackText: '',
        feedbackContact: '',
        flag: true
      }
    },
    computed: {
      // 字数
      textCount() {
        let _len = this.feedbackText.trim().length;
        return _len === 0 ? 0 : this.feedbackText.length;
      },
      // 当前用户
      curUser() {
        return this.$store.getters[types.oauth.getCurUser];
      },
    },
    components: {
      AppView
    },
    beforeRouteLeave(to,from,next) {
      if(this.textCount > 0 && this.flag) {
        this.$messagebox({
          title: '提示',
          message: '是否放弃编辑反馈建议?',
          showCancelButton: true
        }).then((action) => {
          if(action !== 'confirm') {
            return false;
          } else {
            next();
          }
        });
      } else {
        next();
      }
    },
    methods: {
      submit() {
        let that = this;
        if(that.feedbackText.trim() !== '') {
          let _params = {
            content: that.feedbackText,
            user_id: that.curUser && that.curUser.id,
            mobile: that.feedbackContact
          };
          that.$http.post(`${that.$apihost}/issues`,_params)
            .then((res) => {
              that.$messenger.success('成功提交');
              that.flag = false;
              setTimeout(() => {
                that.$router.push('/my');
              }, 1000);
            })
        } else {
          that.$bus.emit("toast-error",'请输入意见和反馈');
        }
      }
    },
  }
</script>
