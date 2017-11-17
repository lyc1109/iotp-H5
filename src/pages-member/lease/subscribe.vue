<style scoped type="text/scss" lang="scss">
  @import '~variables';

  .subscribe-page {
    position: relative;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    overflow: hidden;
    height: auto!important;
  }
  .product-create {
    .basic {
      align-items: flex-start;
      .product-img-box {
        flex: 0 0 20%;
        padding-top: 20%;
        position: relative;

        .product-img {
          position: absolute;
          top: 0;
          width: 100%;
          height: 100%;
          justify-content: center;
          overflow: hidden;

          .img-thumbnail {
            width: auto;
            max-width: fit-content;
            height: 100%;
          }
        }
      }
      .product-info-box {
        align-items: flex-start;

        .product-info {
          min-height: 100%;
          width: 100%;
          overflow: auto;
          flex-direction: column;

          .deposit {

            .tag-name {
              color: $white;
              background: $yellow-3;
              text-align:center;
              padding: 0 rem(3px);
              border: 1px solid rgba($yellow-3,.5);
              border-radius: 3px 0 0 3px;
            }

            .tag-value {
              font-weight: 100;
              color: $yellow-3;
              padding: rem(1px) rem(5px);
              border: 1px solid rgba($yellow-3,.5);
              border-left: none;
              border-radius: 0 3px 3px 0;
            }
          }
        }
      }
    }
  }
  .lease-info,.book-info{
    padding-bottom: 0!important;
    padding-top: 0!important;
  }
  .cancel {
    background: $white;
    color: $font-light;
  }
  .submit {
    flex: 2;
  }
  .agree-box {
    .mint-cell-checkbox {
      position: relative;
      .mint-checkbox-input {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 10;
        opacity: 0;
        display: inline-block;
      }
    }
    .agree-btn {
      width: $m;
      height: $m;
      background: $primary;
      justify-content: center;
    }
  }
</style>

<template>
  <app-view :has-footer="true">
    <div class="subscribe-page padding-bottom-xxl">
      <div class="product-create full-height bg-white">
        <div class="basic bg-white padding-m flex">
          <div class="product-img-box">
            <div class="product-img border valign-center border-radius">
              <!--<div class="img-thumbnail" :style="{ 'background-image': `url(${$filters.img($route.query.productCoverImg)})` }"></div>-->
              <img class="img-thumbnail" v-lazy="$filters.img(((entity && entity.productCoverImg)  ? entity.productCoverImg : ''), '!w100')"/>
            </div>
          </div>
          <div class="product-info-box flex-item flex margin-left-m">
            <div class="product-info flex">
              <div class="" style="width: 100%">
                <div class="font-m font-bold-500 text-wrapper">{{ entity && entity.name ? entity.name : '无产品名称' }}</div>
                <div class="flex margin-top-s">
                  <span class="font-light font-s">{{ entity && entity.productItemCode }}</span>
                  <!--<span class="deposit flex margin-left-m">-->
                    <!--<span class="tag-name font-s">押</span>-->
                    <!--<span class="tag-value font-s font-bold-500">{{ $filters.formatCurrency(entity.deviceDeposit/100.0) }}</span>-->
                  <!--</span>-->
                </div>
              </div>
              <div class="flex" style="width: 100%;">
                <!--<div class="flex-item deposit flex">-->
                  <!--<span class="font-light">{{ entity && entity.productItemCode }}</span>-->
                  <!--<span class="tag-name font-s">押</span>-->
                  <!--<span class="tag-value font-s font-bold-500"> ¥ {{ Number(entity.deviceDeposit/100.0).toFixed(2) }}</span>-->
                <!--</div>-->
                <div>
                  <span class="font-bold-500 font-l color-primary font-family-num">¥ {{ Number(entity.lowestRental/100.0).toFixed(2) }}</span>
                  <span class="font-s font-light">起/月</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--标准租赁-->
        <div class="book-info bg-white" v-if="leaseScenes === 'standard'">
          <div class="bg padding-top"></div>
          <v-date-picker class="book-date form-field required padding-left-m padding-right-m"
                         name="bookDate"
                         label="预约日期"
                         v-model="bookData.serviceDate"
                         placeholder="请选择预约日期"
                         :startDate="startDate"
                         :endDate="endDate"
                         :defaultVal="defaultDate"></v-date-picker>
          <v-selector class="book-time form-field required padding-left-m padding-right-m"
                      name="bookTime"
                      label="预约时间段"
                      v-model="bookData.serviceTime"
                      placeholder="请选择预约时间段"
                      :data="bookTimeData" v-validate="'required'"
                      data-vv-as="预约时间段"
                      :error-msg="errors.first('bookTime')"></v-selector>
        </div>
        <div class="bg padding-top"></div>
        <div class="lease-info bg-white padding-left-m">
          <!--商务租赁-->
          <div v-if="leaseScenes === 'commercial'">
            <v-input class="form-field required padding-right-m"
                     v-model.trim="bookData.leaseCount"
                     type="number"
                     name="leaseCount"
                     label="租赁数量"
                     placeholder="请填写租赁数量"
                     v-validate="'required|numeric|min_value:1'"
                     data-vv-as="租赁数量"
                     :error-msg="errors.first('leaseCount')"></v-input>
            <v-input class="form-field required padding-right-m"
                     v-model.trim="bookData.leaseCompany"
                     name="leaseCompany"
                     label="公司名称"
                     placeholder="请填写公司名称"
                     v-validate="'required'"
                     data-vv-as="公司名称"
                     :error-msg="errors.first('leaseCompany')"></v-input>
          </div>
          <v-input class="address form-field required padding-right-m"
                   v-model="fullAddress"
                   type="text"
                   name="address"
                   :label="leaseScenes === 'standard' ? '安装地址' : '公司地址'"
                   :placeholder="leaseScenes === 'standard' ? '请选择安装地址' : '请选择公司地址'"
                   :readonly="true"
                   @click.native="selectAddress()"
                   v-validate="'required'"
                   :data-vv-as="leaseScenes === 'standard' ? '安装地址' : '公司地址'"
                   :error-msg="errors.first('address')">
            <i class="fa fa-angle-right fa-lighter"></i>
          </v-input>
          <v-input class="contact-name form-field required padding-right-m"
                   v-model.trim="bookData.contactName"
                   name="contactName"
                   label="联系人"
                   placeholder="请填写联系人"
                   v-validate="'required'"
                   data-vv-as="联系人"
                   :error-msg="errors.first('contactName')"></v-input>
          <v-input class="contactMobile form-field required padding-right-m"
                   v-model.trim="bookData.contactMobile"
                   name="contactMobile"
                   label="手机号码"
                   placeholder="请填写手机号码"
                   v-validate="'required|mobile'"
                   :error-msg="errors.first('contactMobile')"
                   data-vv-as="手机号码">
            <v-btn-smscode :mobile="bookData.contactMobile" :disabled="isSendCode"></v-btn-smscode>
          </v-input>
          <v-input class="sms-code form-field required padding-right-m"
                   type="number"
                   name="smsCode"
                   label="验证码"
                   placeholder="请填写验证码"
                   v-model.trim="smsCode"
                   v-validate="'required|numeric|max: 4|min: 4'"
                   data-vv-as="验证码"
                   :error-msg="errors.first('smsCode')"></v-input>
          <div class="padding-m padding-left-zero flex agree-box">
            <div class="flex-item text-wrapper">
              <span class="color-primary">•</span>
              同意 <span class="color-primary agree-text" @click="checkLease()">《租赁协议》</span>
            </div>
            <!--<div v-if="isAgree" class="valign-center agree-btn border-radius-circle" @click="agree()">-->
              <!--<i class="iconfont icon-iot-gou color-success font-bold-700 font-s"></i>-->
            <!--</div>-->
            <!--<div v-else-if=></div>-->
            <div class="mint-cell-checkbox">
              <input type="checkbox" class="mint-checkbox-input" v-model="isAgree"/>
              <i class="mint-checkbox-core"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--底部按钮-->
    <div class="footer flex border-top" slot="footer">
      <div class="flex-item">
        <button class="btn btn-block cancel" @click="$router.go(-1)">取消</button>
      </div>
      <div class="flex-item submit">
        <button type="button"
                class="btn btn-block btn-primary"
                @click="submitInfo()">提交预约信息</button>
      </div>
    </div>

    <!--租赁协议-->
    <mt-popup v-model="leasesPopup" position="bottom" class="leases">
      <div>
        <div class="title padding-m bg-yellow-4 font-default">
          租赁协议
          <!--<i class="iconfont icon-iot-guanbi" @click="closeLease()"></i>-->
        </div>
        <p class="padding-m" v-html="deal">{{ $filters.unEscape(deal) }}</p>
        <div class="agreement flex">
          <!--<v-check-list :options="agreeList" v-model="agree" class="agree align-center" @checklist="isAgree" v-show="showAgree"></v-check-list>-->
          <button class="btn btn-block btn-primary" @click="closeLease()">确定</button>
        </div>
      </div>
    </mt-popup>

    <!--选择地址-->
    <address-selector></address-selector>
  </app-view>
</template>

<script>
  import AppView from '@/components/layouts/app-view'
  import VDatePicker from '@/components/ui/v-date-picker'
  import VSelector from '@/components/ui/v-selector'
  import VCheckList from '@/components/ui/v-checklist'
  import moment from 'moment'
  import _ from 'lodash'
  import types from '@/store/mutation-types'
  import shopMember from '@/apis/shop-member'
  import sys from '@/apis/sys'
  import AddressSelector from '@/pages-member/shop-member/address-selector'

  export default {
    name: 'product-create',
    data () {
      return {
        // 产品信息
        entity: {},
        // 预约信息
        bookData: {
          // 租赁产品id
          leaseProductId: this.$route.query.id,
          // 预约服务日期
          serviceDate: this.$filters.formatDate(moment().add(1, 'days').toDate()),
          // 预约服务时间
          serviceTime: '',
          // 省份
          province: '',
          // 城市
          city: '',
          // 县区
          area: '',
          // 地址
          address: '',
          // 联系人名字
          contactName: '',
          // 联系手机号
          contactMobile: '',
          // 租赁数量
          leaseCount: '',
          // 租赁公司
          leaseCompany: ''
        },
        // 验证码
        smsCode: '',
        // 地址
        fullAddress: '',
        // 租赁场景
        leaseScenes: '',
        // 是否同意协议
        isAgree: false,
        // 租赁协议弹窗是否显示
        leasesPopup: false,
        // 协议内容
        deal: '',
        // 是否信用免押金支付
        isCredit: this.$route.query && this.$route.query.isCredit,
        leaseSet: {}
      }
    },
    created() {
      let that = this;
      this.addressFetch();
      let _data = this.$route && this.$route.query;

      if(_data) {
        if(_data.entity && _data.entity !== '{}') {
          this.entity = JSON.parse(_data.entity);
        }
        // 获取租退策略数据
        that.$http.get(`${that.$apihost}/lease/products/${that.$route.query.id}/scenario`)
          .then((lease) => {
//                lease.firstChargeStategy = 'dd';
            that.leaseSet = lease;
            that.leaseScenes = lease.leaseProcess;
          })
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.$bus.on("address-selected", (address) => {
          this.fullAddress = address.fullAddress;
          this.bookData.province = address.province;
          this.bookData.city = address.city;
          this.bookData.area = address.area;
          this.bookData.address = address.address;
          this.bookData.contactMobile = address.contactMobile;
          this.bookData.contactName = address.contactName;
        });

        //判断url是否有hash值
        window.onpopstate = () => {
          if(window.location.hash.indexOf('address') <= -1) {
            this.$store.commit(types.shopMember.setShowAddressSelector,false)
          }
          if(window.location.hash.indexOf('lease') > -1) {
            this.$router.go(-1)
          }
        }

        // 预约时间段默认值
        this.bookData.serviceTime = this.bookTimeData[0]
      })
    },
    computed: {
      // 默认日期
      defaultDate() {
        return this.$filters.formatDate(moment().add(1, 'days').toDate());
      },
      // 起始日期
      startDate() {
        const after = moment().hour('18').minute('00');
        if(moment().isAfter(after)) {
          return moment().add(1,'d').toDate();
        } else {
          return new Date();
        }
      },
      // 结束日期
      endDate() {
        const end = moment().add(1,'Y');
        return end.toDate();
      },
      //获取可用的时间段
      bookTimeData() {
        let data = ["09:00~11:00", "11:00~13:00", "13:00~15:00", "15:00~18:00"];
        if(this.bookData.serviceDate !== '') {
          // 同一天根据当前时间过滤可用时间段
          if(moment(this.bookData.serviceDate).isSame(new Date(),'d')) {

            // 11:00后
            let end = moment().hour('11').minute('00')
            if(moment().isAfter(end)){
              data = _.reject(data,(n) => n === '09:00~11:00')
            }

            // 13:00后
            end = moment().hour('13').minute('00')
            if(moment().isAfter(end)){
              data = _.reject(data,(n) => n === '11:00~13:00')
            }

            // 15:00后
            end = moment().hour('15').minute('00')
            if(moment().isAfter(end)){
              data = _.reject(data,(n) => n === '13:00~15:00')
            }

            // 18:00后
            end = moment().hour('18').minute('00')
            if(moment().isAfter(end)){
              data = _.reject(data,(n) => n === '15:00~18:00')
            }
          }
        }
        return data;
      },
      // 是否发送验证码
      isSendCode() {
        return !this.errors.has('contactMobile') && (this.fields.contactMobile && this.fields.contactMobile.valid)
      },
    },
    methods: {
      /**
       * 选择地址
       */
      selectAddress() {
        this.$store.commit(types.shopMember.setShowAddressSelector,true);
        window.location.hash = 'address';
      },
      /**
       * 拉取地址数据
       */
      addressFetch() {
        shopMember.findDefaultAddress()
          .then((res) => {
            if(res !== null) {
              this.fullAddress = res.fullAddress;
              this.bookData.province = res.province;
              this.bookData.city = res.city;
              this.bookData.area = res.area;
              this.bookData.address = res.address;
              this.bookData.contactMobile = res.contactMobile;
              this.bookData.contactName = res.contactName;
            }
          })
      },
      /**
       * 查看租赁协议
       */
      checkLease() {
        this.leasesPopup = true;
        let _id = this.$route.query && this.$route.query.id;
        this.$http.get(`${this.$apihost}/lease/products/${_id}/agreements`)
          .then((res) => {
            if(res && res.agreement) {
              this.deal = res.agreement;
            }
          })
      },
      /**
       * 关闭租赁协议弹窗
       */
      closeLease() {
        this.leasesPopup = false;
      },
      /**
       * 是否勾选同意协议
       */
      agree() {
        this.isAgree = !this.isAgree;
      },
      /**
       * 确认下单
       */
      submitInfo() {
        let that = this;
        if(!that.isAgree) {
          that.$messagebox.alert('提交预约信息前需要同意协议内容！');
          return false;
        }

        that.$validator.validateAll().then((result) => {
          if(result) {
            sys.validateSmsCode(that.bookData.contactMobile,that.smsCode)
              .then(() => {
                if (that.bookData.leaseCount < 1 && that.leaseScenes === 'commercial') {
                  that.$messenger.error('租赁数量必须大于0！');
                  return false;
                }
                that.$messagebox.confirm('确定提交预约信息？').then(() => {
                  // 标准租赁
                  if(that.leaseScenes === 'standard') {

                    let _month = that.$route.query && that.$route.query.rentMonth;
                    that.bookData.creditRent = that.isCredit;
                    that.bookData.creditScore = that.leaseSet && that.leaseSet.admittanceScore;
                    that.bookData.leasePackage = _month;

                    that.$http.post(`${this.$apihost}/serviceorders/submit-lease`, {}, true, that.bookData)
                      .then((res) => {
                        if (res) {
                          setTimeout(function () {
                            that.$router.push({
                              path: `/serviceorders/pay/deposit/${res.id}`,
                              query: {
                                rentMonth: _month,
                                isCredit: that.isCredit
                              }
                            })
                          },500);
                        }
                      })
                  } else if(that.leaseScenes === 'commercial') {
                    // 商务租赁
                    that.$http.post(`${this.$apihost}/serviceorders/submit-business-lease`, {}, true, that.bookData)
                      .then((res) => {
                        if (res) {
                          that.$messenger.success('提交成功')
                          setTimeout(() => {
                            that.$router.push({
                              path: `/serviceorder/${res.id}/view`
                            })
                          },500);
                        }
                      })
                  }
                })
              })
          }
        })
      },
    },
    components: {
      AppView,
      VDatePicker,
      VSelector,
      AddressSelector,
      VCheckList
    }
  }
</script>
