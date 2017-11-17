<style scoped lang="scss" type="text/scss">
  @import '~variables';

  .avatar48{
    width: rem(48px);
    height: rem(48px);
    @include border-radius(50%);
    display: inline-block;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  .avatar-icon{
    position: relative;
    top: rem(-20px);
  }
  .imgBox{
    width: 100%;
    text-align: center;

    img{
      border-radius: 50%;
      border: rem(3px) solid rgba(43, 182, 242, 0.2);
      width: rem(90px);
    }
    .file-input,.wrapper{
      position: absolute;
      top: 0;
      width: 100%;
      left: 0;
      height: rem(94px);
    }
    .file-input{
      opacity: 0;
    }
    .g-core-image-upload-btn{
      padding-top: rem(120px);
    }
    .g-core-image-upload-form{
      height: rem(94px);
    }
  }
</style>
<template>
  <div class="page-content">
    <div class="weui-cells weui-cells-lg margin-top-zero bg-white padding-left padding-right">
      <div class="weui-cell">
        <v-cell title="头像">
          <div class="align-center imgBox">
            <div class="avatar48" :style="{ 'background-image': `url(${$filters.avatar(curUser.avatar)})` }"></div>
            <i class="fa fa-angle-right margin-left avatar-icon"></i>
            <input type="file" class="file-input" multiple="multiple" ref="upload">
            <div class="padding-top font-lighter align-center">
              <div class="wrapper">
                <vue-core-image-upload crop-ratio="1:1"
                                       crop="local"
                                       resize="local"
                                       extensions="png,jpg,svg,gif,jpeg"
                                       text=""
                                       :isXar="false"
                                       v-model="uploadUrl"
                                       ref="inputCheck"
                                       @imagechanged="changeImg"
                                       @imageuploaded="uploadImg"></vue-core-image-upload>
              </div>
            </div>
          </div>
        </v-cell>
      </div>
      <div class="weui-cell user-info-edit" @click="edit()">
        <v-cell title="昵称">
          <span>{{ curUser.nickname }}</span>
          <i class="fa fa-angle-right margin-left"></i>
        </v-cell>
      </div>
      <div class="weui-cell user-info-edit" @click="edit()">
        <v-cell title="性别">
          <span>{{ curUser.sex }}</span>
          <i class="fa fa-angle-right margin-left"></i>
        </v-cell>
      </div>
      <div class="weui-cell user-info-edit" @click="edit()">
        <v-cell title="生日">
          <span>{{ $filters.formatDate(curUser.birthday) }}</span>
          <i class="fa fa-angle-right margin-left"></i>
        </v-cell>
      </div>
    </div>

    <div class="weui-cells weui-cells-lg bg-white padding-left padding-right margin-top">
      <div class="weui-cell">
        <v-cell title="手机号码" :value="curUser.confuseMobile"></v-cell>
      </div>
      <div class="weui-cell user-info-edit" @click="edit()">
        <!--<div class="weui-cell__bd weui_cell_primary">邮箱</div>-->
        <v-cell title="邮箱">
          <span>{{ curUser.confuseEmail }}</span>
          <i class="fa fa-angle-right margin-left"></i>
        </v-cell>
      </div>
    </div>

    <div class="weui-cells weui-cells-lg padding-left padding-right bg-white margin-top" th:if="${#strings.equalsIgnoreCase(role, 'shopMember')}">
      <router-link to="/shop/member/address/manage">
        <div class="weui-cell">
          <v-cell title="我的地址">
            <i class="fa fa-angle-right margin-left"></i>
          </v-cell>
        </div>
      </router-link>
    </div>
    <!--<div class="weui-cells weui-cells-lg" th:if="${#strings.equalsIgnoreCase(role, 'shopMember')}">
        <a class="a-default" th:href="@{/user/suggestion/list}">
            <div class="weui-cell">
                <div class="weui-cell__bd weui_cell_primary">意见反馈</div>
                <div class="weui-cell__ft">
                    <i class="fa fa-angle-right margin-left"></i>
                </div>
            </div>
        </a>
    </div>-->
    <!--<div th:if="${#strings.equalsIgnoreCase(role, 'shopEmployee')}" class="padding-left padding-right bg-white margin-top">-->
    <!--<div class="weui-cells weui-cells-lg" th:if="not ${application.isProduct}">-->
    <!--<a :href="`http://webtest.xohaa.net/helpcenter/service_man?userId=${curUser.id}`">-->
    <!--<div class="weui-cell">-->
    <!--&lt;!&ndash;<div class="weui-cell__bd weui_cell_primary">帮助中心</div>&ndash;&gt;-->
    <!--<v-cell title="帮助中心">-->
    <!--<i class="fa fa-angle-right margin-left"></i>-->
    <!--</v-cell>-->
    <!--</div>-->
    <!--</a>-->
    <!--</div>-->
    <!--<div class="weui-cells weui-cells-lg" th:if="${application.isProduct}">-->
    <!--<a :href="`http://www.xohaa.net/helpcenter/service_man?userId=${curUser.id}`">-->
    <!--<div class="weui-cell">-->
    <!--<v-cell title="帮助中心">-->
    <!--<i class="fa fa-angle-right margin-left"></i>-->
    <!--</v-cell>-->
    <!--</div>-->
    <!--</a>-->
    <!--</div>-->
    <!--</div>-->

  </div>
</template>
<script>
  import types from '@/store/mutation-types'
  import VueCoreImageUpload from 'vue-core-image-upload'

  export default {
    name: '',
    data (){
      return {
        curUser: {
          avatar: '',
          nickname: '',
          name: '',
          sex: '',
          birthday: '',
          confuseMobile: '',
          confuseEmail: ''
        },
        uploadUrl: ''
      }
    },
    created(){
      this.fetch()
      console.log(this.curShop)
    },
    methods: {
      fetch(){
        this.$http.get(`${this.$apihost}/user`)
          .then((res) => {
            this.curUser = res
            if(this.curUser.sex === 'M' || this.curUser.sex === ''){
              this.curUser.sex = '男'
            }else{
              this.curUser.sex = '女'
            }
          })
      },
      edit(){
        this.$router.push('/old/user/edit')
      },
      // 改变头像
      changeImg(res){
        console.log('change')
        this.curUser.avatar = res
        console.log(this.curUser.avatar)
      },
      // 上传头像
      uploadImg(res){
        console.log('upload')
        this.curUser.avatar = res.src
        console.log(res)
      }
    },
    computed: {
      curShop(){
        return this.$store.getters[types.oauth.getCurShop]
      }
    },
    components: {
      VueCoreImageUpload
    }
  }
</script>
