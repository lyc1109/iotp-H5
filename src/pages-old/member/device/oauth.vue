<style scoped type="text/scss" lang="scss">
  @import "~variables";

  .oauth-manage{
    overflow: hidden;

    .oauth-bg{
      flex: 0 0 20%;

      &>div{
        width: 100%;
        height: 0;
        padding-bottom: 50%;
        background: linear-gradient(to bottom,#2f8cfc,#03a9f4);
        background-size: cover;

        .oauth-img {
          justify-content: center;

          .flex-item {
            flex: 0 0 30%;

            .device-image {
              width: 100%;
              @include border-radius(rem(5px));
            }
          }
        }
      }
    }
    .oauth-list{
      ul{
        display: inline-block;
        width: 100%;

        li{
          display: flex;

          .avatar{
            flex: 0 0 16%;
            text-align: center;

            img{
              width: 80%;
              @include border-radius(50%);
            }
            .avatar-info{
              background: $primary;
              color: #fff;
              text-align: center;
              @include border-radius(20px);
              font-style: inherit;
              font-size: $font-size-s;
              position: relative;
              top: -12px;
              width: 90%;
              display: inline-block;
              line-height: 25px;
            }
          }
          .info{
            flex: 0 0 30%;

            h3{
              font-weight: normal;
              color: $font-title;
              width: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            b{
              color: $font-light;
              font-size: $font-size-m;
              display: inline-block;
              width: 100%;
              font-weight: normal;
            }
            span{
              color: $font-light;
              font-size: $font-size-s;
              display: inline-block;
              width: 100%;

              i{
                font-size: $font-size-s;
              }
            }
          }
          .operate-btn{
            flex: 0 0 50%;
            text-align: center;
          }
        }
      }
    }
  }
  .add-oauth{
    width: 100%;
    height: 100%;
    background: #fff;

    .title{
      background: #f0f0f0;
      line-height: rem(40px);
      @include border;
      height:rem(40px);
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;

      span{
        color: #444;
        font-size: $font-size-m;
      }
      i{
        color: #ccc;
        position: fixed;
        right: 1.15385rem;
      }
    }
    .oauth-mobile{
      margin-top: rem(40px);
    }
    .btn{
      position: fixed;
      bottom: 0;
      left: 0;
      height: rem(50px);
    }
  }
</style>
<template>
  <app-view>
    <div class="oauth-manage">
      <div class="oauth-bg">
        <div>
          <div class="flex oauth-img padding-top-l">
            <div class="flex-item">
              <img :src="$filters.img(device.productImage)" class="device-image" />
            </div>
          </div>
          <div class="flex flex-center margin-top-m">
            <span class="font-m color-white">{{ device.productName }}</span>
          </div>
        </div>
      </div>
      <div class="oauth-list">
        <div class="divider">
          <span>授权人信息</span>
          <div class="pull-right" style="margin-top: -6px;">
            <button type="button" class="btn btn-link" style="background: 0 none;border: 0 none;" @click="addOauths()">添加授权</button>
          </div>
        </div>
        <ul class="bg-white padding-m">
          <!--授权者-->
          <li class="padding-top-m padding-bottom-m">
            <div class="avatar">
              <img :src="$filters.avatar(avatar)" alt="">
            </div>
            <div class="info padding-left">
              <h3>
                {{ curUser.nickname }}
                <b>({{ curUser.mobile }})</b>
              </h3>
              <span>
              <i class="iconfont icon-iot-wode color-red-1"></i>
                拥有者
                <i class="iconfont icon-iot-time margin-right-s margin-left"></i>
                {{ $filters.formatTime(curUser.joinDate,'MM-DD HH:mm') }}
              </span>
            </div>
          </li>
          <!--被授权者-->
          <li class="padding-top-m padding-bottom-m" v-for="item in oauthList" :key="item.name">
            <div class="avatar">
              <img :src="$filters.avatar(item.userAvatar)">
            </div>
            <div class="info padding-left">
              <h3>
                {{ item.userNick }}
              <b>{{ item.userMobile }}</b>
              </h3>
              <span>
              <i class="iconfont icon-iot-wode color-red-1"></i>
                使用者
                <i class="iconfont icon-iot-time margin-right-s"></i>
                {{ $filters.formatTime(item.authorizationTime) }}
              </span>
            </div>
            <div class="operate-btn margin-top-l" v-if="item.isOauth">
              <button type="button" class="btn btn-round btn-primary-outline" @click="relieveOauth(item.id)">解除授权</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <mt-popup v-model="addOauth" position="bottom" class="add-oauth">
      <slot>
        <div class="title padding-left-m padding-right-m">
          <span>填写授权人手机号码</span>
          <i class="iconfont icon-iot-guanbi" @click="closeOauth()"></i>
        </div>
        <v-input class="oauth-mobile padding-left padding-right" type="text"
                 v-model="oauthMobile"
                 label="授权人"
                 name="oauthMobile"
                 placeholder="请填写授权人手机号码"
                 v-validate="'required|mobile'"
                 data-vv-as="手机号码"
                 :error-msg="errors.first('oauthMobile')"></v-input>
        <button type="button" class="btn btn-block btn-primary" @click="addSure()">确定</button>
      </slot>
    </mt-popup>
  </app-view>
</template>
<script>
  import AppView from '@/components/layouts/app-view'
  import MessageBox from '@/assets/scripts/message-box'
  import Messenger from '@/assets/scripts/messenger'
  import types from '@/store/mutation-types'

  export default {
    name: 'devices-oauth',
    data(){
      return {
        oauthList: [],
        addOauth: false,
        oauthMobile: '',
        avatar: '/static/images/avatar.png',
        device: {
          productName: '',
          productImage: ''
        }
      }
    },
    created(){
      this.fetchData()
    },
    mounted(){
      this.$nextTick(() => {
        window.onpopstate = () => {
          if(window.location.hash.indexOf('oauth') <= -1){
            this.addOauth = false
          }
        }
      })
    },
    computed: {
      curUser(){
        return this.$store.getters[types.oauth.getCurUser]
      }
    },
    methods: {
      fetchData(){
        this.device.productName = this.$route.query.productName
        this.device.productImage = this.$route.query.productImage
        this.$http.get(`${this.$apihost}/userdevices/${this.$route.params.id}/authorizations`)
          .then((res) => {
            this.oauthList = res
            this.oauthList.forEach((value,index,array) => {
              value.isOauth = true
            })
          })
      },
      addOauths(){
        this.addOauth = true
        window.location.hash = 'oauth'
      },
      addSure(){
        this.$validator.validateAll().then((result) => {
          if(result){
            MessageBox.confirm('确定授权?').then(() => {
              this.$http.post(`${this.$apihost}/userdevices/${this.$route.params.id}/authorization`,
                {
                  mobile_nos: this.oauthMobile
                })
                .then((res) => {
                  Messenger.success('授权成功')
                  this.addOauth = false
                  this.$router.go(-1)
                  this.fetchData()
                })
            })
          }
        })
      },
      relieveOauth(id){
        MessageBox.confirm('确定解除授权？').then(() => {
          this.$http.del(`${this.$apihost}/userdevices/${id}/authorization`)
            .then((res) => {
              if(res){
                Messenger.success('解除成功')
                this.fetchData()
              }
            })
        })
      },
      closeOauth(){
        this.addOauth = false
        this.$router.go(-1)
      }
    },
    components: {
      AppView
    }
  }
</script>
