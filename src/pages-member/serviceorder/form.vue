<style lang="scss" type="text/scss">
  @import "~variables";

  .imgs-box {
    flex-wrap: wrap;
    .img-item {
      position: relative;
      width: rem(70px);
      height: rem(70px);
      @include border(all);
    }
    .close-btn {
      position: absolute;
      top: -8px;
      right: -8px;
    }
    .file-input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 5;
      opacity: 0;
    }
  }
</style>
<style scoped lang="scss" type="text/scss">
  @import "~variables";

  .product-img-box {
    width: 20%;
    padding-top: 20%;
    position: relative;

    .product-img {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      height: 100%;
      justify-content: center;
      overflow: hidden;

      img-thumbnail {
        width: auto;
        max-width: fit-content;
        height: 100%;
      }
    }
  }
  .problem{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;

    .btn{
      position: relative;
      flex: 2;

      &.cancel{
        @include border(top);
        flex: 1;
      }
    }
  }
  .add-img{
    @include border;
    width: rem(70px);
    height: rem(70px);
    justify-content: center;
    font-size: $font-size-xl;
    position: relative;

    .iconfont{
      position: absolute;
      top: rem(-8px);
      right: rem(-8px);
      cursor: pointer;
    }
  }
  .cancel{
    background: $white;
    color: $font-light;
  }
  .submit{
    flex: 2;
  }
</style>
<template>
  <div>
    <app-view :hasFooter="true">
      <div class="padding-m bg-white flex" style="align-items: flex-start">
        <div class="product-img-box">
          <div class="product-img">
            <img class="img-thumbnail" v-lazy=" $filters.img(userDevice.productImage, '!wh100') "/>
          </div>
        </div>
        <div class="flex-item padding-left-m">
          <div class="font-bold font-m font-title text-wrapper-overline"> {{userDevice.deviceName}} </div>
          <div class="font-s font-light margin-top">
            <div class="margin-bottom-s">产品货号：{{userDevice.itemCode}}</div>
            <div v-if="userDevice.deviceType !== 'L'">购买日期：{{ userDevice.purchasedDate }}</div>
          </div>
        </div>
      </div>

      <div class="form-group margin-top">
        <v-selector class="form-field required" name="shopServiceId" label="服务类型" placeholder="请选择预约服务"
                    v-model="formData.shopServiceId"
                    :data="shopServiceData"
                    v-validate="'required'"
                    data-vv-as="服务类型"
                    :error-msg="errors.first('shopServiceId')"
                    valKey="value"
                    labelKey="name"></v-selector>

        <v-date-picker class="form-field required" label="预约日期" placeholder="请选择预约日期"
                       name="serviceDate"
                       v-model="formData.serviceDate"
                       :startDate="startDate"
                       :endDate="endDate"
                       :defaultVal="defaultDate"></v-date-picker>

        <v-selector class="form-field required" name="serviceTime" label="预约时间段" placeholder="请选择预约时间段"
                    v-model="formData.serviceTime"
                    v-validate="'required'"
                    data-vv-as="预约时间段"
                    :error-msg="errors.first('serviceTime')"
                    :data="serviceTimeData"></v-selector>

        <v-input type="textarea" class="form-field required" name="customerMemo" label="预约说明" placeholder="请填写设备异常状况"
                 rows="4"
                 v-model.trim="formData.customerMemo"
                 v-validate="'required'"
                 data-vv-as="预约说明"
                 :error-msg="errors.first('customerMemo')"></v-input>
        <!--暂时隐藏-->
        <v-input type="text"
                 class="form-field"
                 name="productProblem"
                 label="产品问题"
                 placeholder="请选择产品问题"
                 v-model="productProblem"
                 :readonly="true"
                 @click.native="showProblem()" style="display: none">
          <i class="fa fa-angle-right font-lighter"></i>
        </v-input>
        <!--<div class="imgs-box flex padding-top-m">-->
          <div class="margin-bottom-m margin-right-m square-uploadimg">
            <v-image className="img-item"
                     btnText="十"
                     :crop="false"
                     :changeImg="imagechanged"
                     :delImg="deleteImg"
                     :isOnly="false"
                     errorTips="请选择图片"
                     :uploadImg="uploadImg"
                     :uploadErr="uploadErr"></v-image>
          </div>
        <!--</div>-->
      </div>

      <div class="form-group margin-top">
        <v-input type="text" class="form-field required" name="fullAddress" label="联系地址" placeholder="请选择联系地址"
                 v-model="addressData.fullAddress"
                 :readonly="true"
                 v-validate="'required'"
                 data-vv-as="联系地址"
                 :error-msg="errors.first('fullAddress')"
                 @click.native="selectAddress()">
          <i class="fa fa-angle-right font-lighter"></i>
        </v-input>

        <v-input type="text" class="form-field required" name="contactName" label="联系人" placeholder="联系人"
                 v-model.trim="addressData.contactName"
                 v-validate="'required'"
                 data-vv-as="联系人"
                 :error-msg="errors.first('contactName')">
        </v-input>
        <v-input type="text" class="form-field required" name="contactMobile" label="手机号码" placeholder="手机号码"
                 v-model.trim="addressData.contactMobile"
                 v-validate="'required|mobile'"
                 data-vv-as="手机号码"
                 :error-msg="errors.first('contactMobile')">
          <v-btn-smscode :mobile="addressData.contactMobile" :disabled="canSendCode"></v-btn-smscode>
        </v-input>

        <v-input class="form-field required" type="number" name="smsCode" label="验证码" placeholder="请输入验证码"
                 v-model.trim="smsCode"
                 v-validate="'required|numeric|min:4|max:4'"
                 data-vv-as="验证码"
                 :error-msg="errors.first('smsCode')">
        </v-input>
      </div>

      <div class="footer flex" slot="footer">
        <div class="flex-item">
          <button class="btn btn-block cancel" @click="$router.go(-1)">取消</button>
        </div>
        <div class="flex-item submit">
          <button type="button" class="btn btn-block btn-primary" @click="submit()">立即提交</button>
        </div>
      </div>
    </app-view>

    <address-selector></address-selector>

    <!--产品问题-->
    <mt-popup v-model="isShowProblem" position="right" class="leases">
      <slot>
        <div class="title padding-left-m padding-right-m">
          <span>产品问题</span>
          <i class="iconfont icon-iot-guanbi" @click="hideProblem()"></i>
          <div>
            <v-checklist :options="problemData" v-model="problem" class="problemArr"></v-checklist>
          </div>
          <div class="problem flex">
            <button type="button" class="btn btn-block cancel" @click="hideProblem()">取消</button>
            <button class="btn btn-block btn-primary" @click="hideProblem()">确定</button>
          </div>
        </div>
      </slot>
    </mt-popup>
  </div>
</template>

<script>
  import AppView from "@/components/layouts/app-view";
  import VSelector from "@/components/ui/v-selector";
  import VDatePicker from "@/components/ui/v-date-picker";
  import AddressSelector from "@/pages-member/shop-member/address-selector";
  import VImage from '@/components/ui/v-image';

  import moment from "moment";
  import _ from "lodash";

  import types from "@/store/mutation-types";

  import shopApi from "@/apis/shop";
  import shopMemberApi from "@/apis/shop-member";
  import sysApi from "@/apis/sys";
  import VChecklist from '@/components/ui/v-checklist'

  export default{
    name: "serviceorder-form",
    components: {
      AppView,
      VSelector,
      VDatePicker,
      AddressSelector,
      VChecklist,
      VImage
    },
    data: function () {
      return {
        // 预约信息
        formData: {
          // 设备id
          deviceId: this.$route.query.deviceId,
          // 店铺服务id
          shopServiceId: "",
          // 服务日期
          serviceDate: this.defaultDate,
          // 服务时间
          serviceTime: "",
          // 备注
          customerMemo: "",
//          newAddress: ''
        },
        addressData: {
          // 联系人名字
          contactName: "",
          // 联系电话
          contactMobile: "",
          // 省份
          province: "",
          // 城市
          city: "",
          // 县区
          area: "",
          // 地址
          address: "",
          //
          fullAddress: ''
        },
        // 验证码
        smsCode: "",
        // 店铺服务数据
        shopServiceData: [],
        // 地址
        fullAddress: "",
        // 是否显示地址选择页面
        showAddressSelector: false,
        // 产品问题
        productProblem: '',
        // 是否显示问题
        isShowProblem: false,
        problem: [],
        problemData: [
          {
            label: '问题1',
            value: '1'
          },
          {
            label: '问题2',
            value: '2'
          }
        ],
        // 图片base64数组
        imgArr: [],
        // 图片上传后的数据的数组
        imgIdList: [],
        // 测试用img
        testImg: []
      };
    },
    computed: {
      // 获取用户设备信息
      userDevice () {
        return this.$route.query;
      },
      // 默认日期
      defaultDate() {
        return this.$filters.formatDate(moment().add(1, 'days').toDate());
      },
      // 最小可选择日期
      startDate () {
        let end = moment().hour("18").minute("00");
        if (moment().isAfter(end)) {
          return moment().add(1, 'days').toDate();
        } else {
          return new Date();
        }
      },
      // 最大日期默认一个月后
      endDate () {
        const date = moment().add(1, 'M');
        return date.toDate();
      },
      /**
       * 计算获取可用的时间段
       *
       * @returns {[string,string,string,string]}
       */
      serviceTimeData () {
        let data = ["09:00~11:00", "11:00~13:00", "13:00~15:00", "15:00~18:00"];
        if (this.formData.serviceDate !== "") {
          // 同一天根据当前时间过滤可用时间段
          if (moment(this.formData.serviceDate).isSame(new Date(), 'day')) {
            let now = moment();

            // 是否11:00以后
            let end = moment().hour("11").minute("00");
            if (now.isAfter(end)) {
              data = _.reject(data, (n) => n === "09:00~11:00");
            }

            // 是否13:00以后
            end = moment().hour("13").minute("00");
            if (now.isAfter(end)) {
              data = _.reject(data, (n) => n === "11:00~13:00");
            }

            // 是否15:00以后
            end = moment().hour("15").minute("00");
            if (now.isAfter(end)) {
              data = _.reject(data, (n) => n === "13:00~15:00");
            }

            // 是否18:00以后
            end = moment().hour("18").minute("00");
            if (now.isAfter(end)) {
              data = _.reject(data, (n) => n === "15:00~18:00");
            }
          }
        }
        return data;
      },

      canSendCode () {
        return !this.errors.has("contactMobile") && (this.fields.contactMobile && this.fields.contactMobile.valid);
      }
    },
    created () {
      let end = moment().hour("18").minute("00");
      let form = this.formData;
      if (moment().isAfter(end)) {
        form.serviceDate = this.$filters.formatDate(moment().add(1, "d").toDate());
      } else {
        form.serviceDate = this.$filters.formatDate(new Date());
      }

      shopApi.findAllShopServices()
        .then((data) => {
          this.shopServiceData = data;
        });

      shopMemberApi.findDefaultAddress()
        .then((data) => {
          if (data !== null) {
            this.addressData = data;
            this.$store.commit(types.shopMember.setAddressSelected,data)
          }
        });
      this.$store.commit("hideLoading");
    },
    mounted () {
      this.$nextTick(() => {
        this.$bus.on("address-selected", (address) => {
          this.addressData = address;
        });

        //判断url是否有hash值
        window.onpopstate = () => {
          if(window.location.hash.indexOf('address') <= -1) {
            this.$store.commit(types.shopMember.setShowAddressSelector, false);
            this.isShowProblem = false;
          }
        }

        // 预约时间段默认值
        this.formData.serviceTime = this.serviceTimeData[0];
      })
    },
    methods: {
      /**
       * 提交报修单
       */
      submit () {
        console.log(this.testImg);
        this.$validator.validateAll().then((result) => {
          if(result) {
            // 校验验证码
            sysApi.validateSmsCode(this.addressData.contactMobile,this.smsCode)
              .then(() => {
                // 提交表单
                let _params = Object.assign(this.formData,this.addressData);
                let obj = this.imgIdList;
                _params.imageIds = obj;
                this.$messagebox.confirm('确定提交？').then(() => {
                  this.$http.post(this.$apihost + "/serviceorders/submit",{},true,_params)
                    .then((data) => {
                      if(data){
                        this.$messenger.success('提交成功');
                        // 转到订单详情
                        setTimeout(() => {
                          this.$router.replace({
                            name: "serviceorder-view",
                            params: {
                              id: data.id
                            }
                          })
                        },500)
                      }
                    })
                });
            });
          }
        })
      },
      /**
       *选择地址
       */
      selectAddress () {
        this.$store.commit(types.shopMember.setShowAddressSelector, true);
        window.location.hash = 'address';
      },
      /**
       * 显示问题
       */
//      showProblem() {
//        this.isShowProblem = true
//        window.location.hash = 'address'
//      },
      /**
       * 隐藏问题
       */
      hideProblem() {
        this.isShowProblem = false
        this.$router.go(-1)
      },
      uploadImg(res) {
        let _temp = res && res[0] && res[0].id;
        this.imgIdList.push(_temp);
        this.testImg.push(res);
      },
      /**
       * 上传图片失败的回调
       */
      uploadErr(res) {
        this.$toast.error('上传图片失败');
      },
      /**
       * 选择图片
       * @param res
       */
      imagechanged(res) {
        let that = this;
        let _uploadTemp = [];
        let _temp = res && res.curImg;

        that.imgArr = res && res.imgBase64;
        _uploadTemp.push(_temp);

        setTimeout(function() {
          that.$bus.emit('upload-img', _uploadTemp);
        },500);
      },
      /**
       * 删除图片
       * @param index
       */
      deleteImg(index) {
        this.imgArr.splice(index,1);
        this.imgIdList.splice(index,1);
        this.$bus.emit('delete-img',index);
      },
      /**
       * 放大预览图片
       * @param index
       */
      showImg(index) {
        this.$bus.emit('show-img', {
          imgIndex: index
        });
      }
    }
  }
</script>
