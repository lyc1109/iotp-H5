<style scoped lang="scss" type="text/scss">
  @import '~variables';

  #userInfoForm{
    margin-top: rem(42px);
  }
</style>
<template>
  <app-view :hasFooter="true">
    <div class="leases">
      <div class="title padding-left-m padding-right-m">
        <span>编辑个人信息</span>
        <i class="iconfont icon-iot-guanbi" @click="editClose()"></i>
      </div>
      <div id="userInfoForm">
        <div class="padding-left padding-right bg-white margin-top">
          <v-input class="form-field"
                   v-model="userInfo.name"
                   name="contactTrueName"
                   label="真实姓名"
                   placeholder="请输入真实姓名"
                   v-validate="'required'"
                   data-vv-as="真实姓名"
                   :error-msg="errors.first('contactTrueName')"></v-input>
          <v-input class="form-field"
                   v-model="userInfo.nickname"
                   name="contactName"
                   label="昵称"
                   placeholder="请输入昵称"
                   v-validate="'required'"
                   data-vv-as="昵称"
                   :error-msg="errors.first('contactName')"></v-input>
          <v-cell title="性别" class="sexTit">
            <v-radio :options="sexOptions" v-model="userInfo.sex" @radio="sexChange" :class="{ 'maleBox': sex.isMale,'femaleBox': sex.isFemale }"></v-radio>
          </v-cell>
          <v-date-picker class="form-field" label="生日" placeholder="请选择生日日期"
                         v-model="userInfo.birthday"
                         :startDate="startDate"
                         :endDate="endDate"
                         :defaultVal="$filters.formatDate(userInfo.birthday)"
                         :error-msg="errors.first('birthday')"></v-date-picker>
        </div>
        <div class="padding-left padding-right bg-white margin-top">
          <v-input class="form-field"
                   v-model="userInfo.mobile"
                   name="contactMobile"
                   label="手机号码" :disabled="disabled"></v-input>
          <v-input class="form-field"
                   v-model="userInfo.email"
                   name="contactEmail"
                   label="邮箱"
                   placeholder="请填写有效邮箱"></v-input>
        </div>
      </div>
    </div>

    <div slot="footer" class="footer">
      <button type="button" class="btn-block btn-primary btn" @click="save()">保存</button>
    </div>
  </app-view>
</template>
<script>
  import types from '@/store/mutation-types'
  import VRadio from '@/components/ui/v-radio'
  import VDatePicker from '@/components/ui/v-date-picker'
  import moment from 'moment'
  import Messenger from '@/assets/scripts/messenger'

  export default {
    name: 'personal-edit',
    data (){
      return {
        disabled: true,
        userInfo: {
          name: '',
          nickname: '',
          sex: '',
          birthday: '',
          mobile: '',
          email: ''
        },
        sex: {
          isMale: true,
          isFemale: false
        },
        sexOptions: [
          {
            label: '男',
            value: 'M',
          },
          {
            label: '女',
            value: 'F'
          }
        ]
      }
    },
    created(){
      this.fetchData()
    },
    methods: {
      fetchData(){
        this.$http.get(`${this.$apihost}/user`)
          .then((res) => {
            this.userInfo = res
            if(this.userInfo.sex === 'M' || this.userInfo.sex === null){
              this.sex.isMale = true
              this.sex.isFemale = false
            }else{
              this.sex.isMale = false
              this.sex.isFemale = true
            }
          })
      },
      // 性别切换
      sexChange(val){
        this.userInfo.sex = val
        if(val === 'M'){
          this.sex.isMale = true
          this.sex.isFemale = false
        }else{
          this.sex.isMale = false
          this.sex.isFemale = true
        }
      },
      // 保存信息
      save(){
        this.$validator.validateAll().then((res) => {
          if(res){
            this.$http.post(`${this.$apihost}/user`,{
              nickname: this.userInfo.nickname,
              sex: this.userInfo.sex,
              birthday: this.userInfo.birthday,
              email: this.userInfo.email
            })
              .then((res) => {
                if(res){
                  Messenger.success('保存成功')
                  setTimeout(() => {
                    this.$router.push('/old/user/personal')
                  },1000)
                }
              })
          }
        })
      },
      editClose(){
        this.$router.go(-1)
      }
    },
    computed: {
      curUser(){
        return this.$store.getters[types.oauth.getCurUser]
      },
      // 最小可选择日期
      startDate(){
        const date = moment([1920,0,1])
        return date.toDate()
      },
      // 最大日期默认今天
      endDate(){
        const date = moment()
        return date.toDate()
      }
    },
    components: {
      VRadio,
      VDatePicker
    }
  }
</script>
