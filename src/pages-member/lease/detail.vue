<style scoped type="text/scss" lang="scss">
  @import "~variables";

  .app-view {
    overflow: hidden;
  }
  .product-detail {

    .product-img {
      @include border(bottom);

      &>div{
        width: 100%;
        height: 0;
        padding-bottom: 60%;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
      }
    }
    .product-info {
      .basic {
        .product-info {
          font-weight: 100;
        }
        .credit-tag {
          display: inline-block;
          padding: rem(2px) rem(8px);
          background: rgba($green-7,.2);
        }
      }
    }
  }
  .footer {
    height: 100%;
    .service {
      .iconfont {
        color: $primary;
        font-size: $font-size-l;
        position: relative;
        top: rem(2px);
      }
    }
    .btn-item {
      height: 100%;
      justify-content: center;
      &.btn-1 {
        background: $green-7;
      }
      &.btn-2 {
        background: $primary;
      }
    }
  }
  .bookLeaseWay{
    width: 100%;

    .main{
      width: 100%;

      ul{
        width: 100%;
        display: inline-block;

        li{
          width: 100%;
          display: block;
          text-align: center;
          font-size: $font-size-m;
          color: $font-title;
          line-height: rem(40px);

          &:last-child{
            button {
              border-bottom: 0 none;
            }
          }
        }
      }
    }
  }
  .checkBtn {
    position: relative;
    font-style: inherit;

    &:after,&:before{
      content: '';
      display: inline-block;
      width: 0;
      height: 0;
      font-size: 0;
      border: 7px solid transparent;
      border-left: 7px solid #fff;
      position: absolute;
      right: -3px;
      top: 4px;
    }
    &:before{
      border-left-color: $gray;
      right: -5px;
    }
  }
  .imageList{
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
  }
  .leases{
    .agreement {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;

      .agree{
        flex: 1;
      }
      .btn {
        position: relative;
        flex: 2;
        height: rem(52px);
      }
    }
  }
  .combo-main {
    position: relative;
    .combo-box {
      flex-wrap: wrap;
      overflow: initial;
    }

    .combo-item-box {
      position: relative;
      width: 47.5%;
      height: rem(92px);

      .mint-cell-checkbox {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        align-items: flex-end;
        justify-content: center;
      }

      &:nth-child(odd) {
        margin-right: 5%;
      }
      .combo-content {
        height: rem(92px);
        border: 1px solid rgba($border, .9);
        position: relative;
        top: -.5px;
        box-shadow: 0 10px 5px -8px $gray;
        @include border-radius(8px);

        .center-box {
          flex-direction: column;
        }

        .combo-title {
          background: $font-lighter;
          text-align: center;
          border-radius: 5px 5px 0 0;
        }

        .combo-detail {
          position: relative;
          top: 0;
          height: rem(62px);
          justify-content: center;
          border-top: 1px dashed $font-lighter;

          .price-color {
            color: $font-lighter;
          }

          .del-color {
            color: $font-lighter;
          }
        }
      }

      &.has-label {
        height: rem(120px);
        .combo-content {
          height: rem(92px);
          .combo-detail {
            height: rem(62px);
          }
        }
      }

      //覆盖
      .combo-1 {
        .combo-title {
          background: $yellow-3!important;
        }
        .combo-detail {
          border-top: 1px dashed $yellow-3!important;

          .price-color {
            color: $yellow-3;
          }
        }
      }
      .combo-2 {
        .combo-title {
          background: $green-5!important;
        }
        .combo-detail {
          border-top: 1px dashed $green-5!important;
          .price-color {
            color: $green-5;
          }
        }
      }
      .combo-3 {
        .combo-title {
          background: $green-6!important;
        }
        .combo-detail {
          border-top: 1px dashed $green-6!important;
          .price-color {
            color: $green-6;
          }
        }
      }
      .combo-4 {
        .combo-title {
          background: $primary;
        }
        .combo-detail {
          border-top: 1px dashed $primary;

          .price-color {
            color: $primary;
          }
        }
      }
      .combo-5 {
        .combo-title {
          background: $orange-1;
        }
        .combo-detail {
          border-top: 1px dashed $orange-1;

          .price-color {
            color: $orange-1;
          }
        }
      }
    }
  }
  .credit-page {
    .credit-top {
      justify-content: center;
      .iconfont {
        font-size: 50px;
      }
    }
    .credit-info {
      .flex {
        line-height: 1.5;
        align-items: flex-start;
      }
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
      .mint-checkbox-input:checked + .mint-checkbox-core {
        background: $green-7;
        border-color: $green-7;
      }
      .agree-btn {
        width: $m;
        height: $m;
        background: $primary;
        justify-content: center;
      }
    }
  }
  .combo-page {
    top: initial!important;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    overflow: hidden;
    height: auto!important;
    -webkit-transform: initial!important;
    transform: initial!important;

    .btn-close {
      position: absolute;
      right: $m;
      top: $m;
    }
    .flex-item-2 {
      flex: 0 0 25%;
      padding-top: 25%;
      position: relative;
    }
    .text-wrapper-2line {
      white-space: initial;
    }
    .line-top {
      background: $page_bg;
    }
    .product-image {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      overflow: hidden;
      justify-content: center;

      img {
        height: 100%;
        width: auto;
        max-width: initial;
      }
    }
    .product-info-box {
      position: relative;
      padding-top: 25%;
      width: 100%;
      .product-info {
        position: absolute;
        top: 0;
        width: 80%;
        height: 100%;
        align-items: flex-start;
        flex-direction: column;
      }
    }
    .bg-primary {
      background: $primary;
    }
    .bg-green-7 {
      background: $green-7;
    }
  }
</style>
<style type="type/scss" lang="scss">
  .lease-product-navbar.mint-navbar {
    top: 0;
    background: rgba(255,255,255,.8);
  }
  .credit-form .mint-cell {
    min-height: 43px!important;
    padding: 0 15px;
  }
</style>
<template>
  <app-view :has-footer="true" class="app-view">

    <!--顶部tabs-->
    <mt-navbar v-model="productDetailNav" class="lease-product-navbar">
      <mt-tab-item v-for="item in productDetailNavList" :key="item.id" :id="item.id">{{ item.label }}</mt-tab-item>
    </mt-navbar>

    <!--产品-->
    <div class="product-detail bg-white margin-top-xxl" v-if="productDetailNav === 'product'">
      <div class="product-img">
        <div :style="{ 'background-image': `url(${$filters.img(entity.productCoverImg,'@200h_385w_1e_1c')})` }" v-lazy="$filters.img(entity.productCoverImg,'@200h_385w_1e_1c')"></div>
      </div>
      <div class="product-info">
        <div class="basic padding-m border-bottom">
          <div class="font-l font-bold-500">{{ entity.name }}</div>
          <div class="font-light margin-top-s">{{ entity.briefIntroduction }}</div>
          <div class="flex margin-top-s">
            <!--<div class="money-detail flex-item color-primary">-->
              <!--<span class="font-bold-500 font-xl font-family-num">{{ Number(entity.lowestRental/100).toFixed(2) }}</span>-->
              <!--<span class="font-s">起/月</span>-->
            <!--</div>-->
            <div class="money-detail color-primary font-bold-700 font-m">
              押金：¥<span class="font-family-num"> {{ Number(entity.deviceDeposit/100).toFixed(2) }}</span>
            </div>
            <del v-if="Number(entity.listDeviceDeposit) > Number(entity.deviceDeposit)" class="font-light font-s margin-left-m">原价：¥ <span class="font-family-num">{{ Number(entity.listDeviceDeposit/100).toFixed(2) }}</span></del>
          </div>
          <div v-if="isAlipay && leaseSet && leaseSet.supportCreditRent && leaseSet.leaseProcess !== 'commercial'" class="margin-top-s">
            <span class="border-radius credit-tag font-s color-green-7 font-bold-500">芝麻信用{{ leaseSet && leaseSet.admittanceScore }}分及以上可免押金</span>
          </div>
        </div>
        <div class="padding-m bg-white padding-bottom-zero" v-if="entity.deviceDepositMemos">
          <div class="bg padding font-s font-light">
            {{ $filters.unEscape(entity.deviceDepositMemos) }}
          </div>
        </div>
        <div class="padding-left-m padding-right-m">
          <div class="combo-main flex">
            <ul class="combo-box flex-item flex">
              <li v-for="(item, index) in rentList"
                  v-if="(item.valueAfter > 0 && item.isFrtSuprt) || (index === 4 && leaseSet && leaseSet.firstFreeDays && leaseSet.firstFreeDays > 0 && !hasUsed)"
                  class="combo-item-box margin-top-m">
                <div class="combo-content" :class="`combo-${index+1}`">
                  <div class="combo-title padding-s">
                    <span class="color-white">{{ item.title }}</span>
                  </div>
                  <div class="combo-detail valign-center">
                    <div class="flex center-box">
                      <div class="present-price font-light align-center">
                        <b class="font-l price-color"> ¥ <span class="font-family-num">{{ item.valueAfter }}</span> </b>
                        <del class="font-family-num" v-if="index < 4 && item.valueAfter < item.delValue">{{ item.delValue }}</del>
                      </div>
                      <div class="original-price align-center">
                        <span v-if="index < 4" class="font-default price-color">(¥ <span class="font-family-num">{{ item.average }}</span>/月)</span>
                        <span v-if="index === 4" class="font-default price-color">(可体验<span class="font-family-num">{{ leaseSet.firstFreeDays }}</span>天)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="padding-m bg-white padding-bottom-zero" v-if="entity.rentalMemos">
          <div class="bg padding font-s font-light">
            {{ $filters.unEscape(entity.rentalMemos) }}
          </div>
        </div>
        <v-cell title="租赁协议" class="padding-left-m padding-right-m" @click.native="checkLease()">
          <slot>
            <i class="checkBtn padding-right-m color-primary">点击查看</i>
          </slot>
        </v-cell>
        <!--<v-cell title="产品描述" :value="$filters.unEscape(entity.description)" class="padding-left-m padding-right-m"></v-cell>-->
      </div>
    </div>

    <!--详情-->
    <div class="bg-white margin-top-xxl" v-if="productDetailNav === 'detail'">
      <div class="imageList" v-for="item in imgList" :key="item.name" :style="{ 'background-image': `url(${$filters.img(item.name,'@420w_420h_1e_1c')})` }"></div>
    </div>

    <!--按钮组-->
    <div class="footer flex" slot="footer">
      <div class="btn-item padding-left-m padding-right-m valign-center border-right color-primary"
           :class="{ 'color-green-7': isAlipay && leaseSet && leaseSet.supportCreditRent && leaseSet.leaseProcess === 'standard' }"
           @click="servicePhone()">
        <i class="iconfont icon-iot-kefu"></i>
        <span>客服</span>
      </div>
      <!--<div v-if="isAlipay && leaseSet && leaseSet.supportCreditRent" class="btn-item color-white padding-left-m padding-right-m valign-center flex-item"-->
           <!--@click.stop="creditFree()">免押金</div>-->
      <!--v-if="isAlipay && leaseSet && leaseSet.supportCreditRent && leaseSet.leaseProcess === 'standard'"-->

      <div v-if="isAlipay && leaseSet && leaseSet.supportCreditRent && leaseSet.leaseProcess === 'standard'"
           class="btn-item btn-1 color-white padding-left-m padding-right-m valign-center flex-item"
           @click.stop="creditFree()">免押金</div>
      <div class="btn-item btn-2 color-white padding-left-m padding-right-m valign-center flex-item"
           @click="chooseCombo()">{{ leaseSet.leaseProcess === 'standard' ? '立即预约' : (leaseSet.leaseProcess === 'apartment' ? '扫码预约' : '立即预约') }}</div>
    </div>
    <!--选择套餐-->
    <mt-popup v-model="orderPopup" position="bottom" class="combo-page padding-bottom-xxl" style="height: 80%">
      <!--信用免押金-->
      <div v-if="creditPopup && !comboPopup" class="credit-page padding-bottom-xxl bg-white">
        <div class="padding-m valign-center credit-top">
          <div class="color-green-7 align-center">
            <i class="iconfont icon-iot-zmxy"></i>
            <div class="font-default">服务授权</div>
          </div>
        </div>
        <div class="credit-info padding-m padding-top-zero">
          <div class="font-s flex">
            <span class="font-default">•</span>
            <div class="font-light margin-left-s flex-item">使用身份信息（姓名、身份证号）办理业务</div>
          </div>
          <div class="font-s flex margin-top-s">
            <span class="font-default">•</span>
            <span class="font-light margin-left-s flex-item text-wrapper-overline">查询你的芝麻分等信用信息，如尚未开通芝麻信用服务，则予以开通</span>
          </div>
        </div>
        <div class="credit-form">
          <div class="margin-m margin-bottom-s border-bottom">
            <v-input class="form-field required padding-right-m"
                     v-model.trim="usrName"
                     type="text"
                     name="usrName"
                     placeholder="真实姓名"
                     v-validate="{ required: true,regex: /^[\u4e00-\u9fa5]{2,5}$/ }"
                     data-vv-as="真实姓名"
                     :error-msg="errors.first('usrName')"></v-input>
          </div>
          <div class="margin-m margin-top-zero border-bottom">
            <v-input class="form-field required padding-right-m"
                     v-model.trim="usrNo"
                     type="number"
                     name="usrNo"
                     placeholder="身份证号码"
                     v-validate="{ required: true,regex: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/ }"
                     data-vv-as="身份证号码"
                     :error-msg="errors.first('usrNo')"></v-input>
          </div>
        </div>
        <div class="padding-m flex agree-box">
          <div class="mint-cell-checkbox">
            <input type="checkbox" class="mint-checkbox-input" v-model="isAgree"/>
            <i class="mint-checkbox-core"></i>
          </div>
          <div class="flex-item text-wrapper margin-left">
            <span class="font-s">授权即表示同意</span>
            <span class="color-green-7 agree-text" @click="checkProtocal()">《用户授权协议》</span>
          </div>
          <!--<div v-if="isAgree" class="valign-center agree-btn border-radius-circle" @click="agree()">-->
          <!--<i class="iconfont icon-iot-gou color-success font-bold-700 font-s"></i>-->
          <!--</div>-->
          <!--<div v-else-if=></div>-->
        </div>
        <div class="page-footer padding-m color-white align-center bg-green-7" @click.stop="authorize()">立即授权</div>
      </div>
      <!--选择套餐-->
      <div v-else-if="!creditPopup && comboPopup" style="height: 100%;overflow: auto">
        <div class="padding-m flex bg-white">
          <div class="flex-item-2 margin-right-m">
            <div class="product-image valign-center border border-radius">
              <img v-lazy="$filters.img((entity.images && entity.images[0] ? entity.images[0] : ''),'!q70')">
            </div>
          </div>
          <div class="product-info-box">
            <div class="product-info flex-item flex">
              <div class="font-m font-title text-wrapper">
                <span class="order-productname font-bold-400 padding-right-xl"> {{ entity.name ? entity.name : '无产品名称' }} </span>
              </div>
              <div class="font-default font-light margin-top text-wrapper">{{ entity.productItemCode ? '产品型号：' + entity.productItemCode : '无产品型号' }} </div>
              <div class="flex-item"></div>
              <div class="font-bold-500">请选择 租赁套餐 类型</div>
            </div>
          </div>
          <i class="iconfont icon-iot-guanbi font-lighter btn-close font-l" @click.stop="closeCombo()"></i>
        </div>
        <div class="padding-m padding-bottom-xxl margin-bottom-m">
          <div class="font-bold-500 font-m">租赁套餐</div>
          <div class="combo-main">
            <ul class="combo-box flex-item flex">
              <li v-for="(item, index) in rentList"
                  v-if="(item.valueAfter > 0 && item.isFrtSuprt) || (index === 4 && leaseSet && leaseSet.firstFreeDays && leaseSet.firstFreeDays > 0 && !hasUsed)"
                  class="combo-item-box margin-top-m has-label">
                <div class="combo-content" :class="`combo-${index+1}`">
                  <div class="combo-title padding-s">
                    <span class="color-white">{{ item.title }}</span>
                  </div>
                  <div class="combo-detail valign-center">
                    <div class="flex center-box">
                      <div class="present-price font-light align-center ">
                        <b class="font-l price-color"> ¥ <span class="font-family-num">{{ item.valueAfter }}</span> </b>
                        <del v-if="index < 4 && item.valueAfter < item.delValue">{{ item.delValue }}</del>
                      </div>
                      <div class="original-price align-center">
                        <span v-if="index < 4" class="font-default price-color">(¥ <span class="font-family-num">{{ item.average }}</span>/月)</span>
                        <span v-if="index === 4" class="font-default price-color">(可体验<span class="font-family-num">{{ leaseSet.firstFreeDays }}</span>天)</span>
                      </div>
                    </div>
                  </div>
                </div>
                <!--续费按钮-->
                <!--可选按钮-->
                <label v-if="leaseSet && leaseSet.firstChargeStategy === 'RO'"
                       class="mint-cell-checkbox valign-center margin-top-s">
                  <input type="radio"
                         :value="index"
                         v-model="checkCard"
                         name="deviceSelect"
                         class="mint-checkbox-input" @click="selectCombo(index)">
                  <i class="mint-checkbox-core"></i>
                </label>
                <!--必选按钮-->
                <label v-if="leaseSet && leaseSet.firstChargeStategy === 'RR'" class="mint-cell-checkbox valign-center margin-top-s">
                  <span class="mint-radio">
                    <input type="radio"
                           :value="index"
                           v-model="annualCard"
                           name="deviceSelect"
                           class="mint-radio-input" @click="selectCombo(index)">
                    <span class="mint-radio-core"></span>
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>
        <div class="page-footer padding-m color-white align-center bg-primary" :class="{ 'bg-green-7': isAlipay && leaseSet && leaseSet.supportCreditRent }" @click.stop="book()">
          确定
        </div>
      </div>
    </mt-popup>

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
  </app-view>
</template>
<script>
  import AppView from '@/components/layouts/app-view'
  import VCell from '@/components/ui/v-cell'
  import vInput from '@/components/ui/v-input';
  import VCheckList from '@/components/ui/v-checklist'
  import types from "@/store/mutation-types";

  export default {
    name: 'product-detail',
    data () {
      return {
        // 实体对象id
        entityId: this.$route.params.id,
//        bookLeaseWay: false,
//        bookLeaseList: [],
        // tab标签
        productDetailNav: 'product',
        // tab数据
        productDetailNavList: [
          {
            id: 'product',
            label: '产品'
          },
//          {
//            id: 'evaluation',
//            label: '评价'
//          },
          {
            id: 'detail',
            label: '详情'
          }
        ],
        // 租赁套餐数据
        rentList: [],
        // 租赁协议弹窗是否显示
        leasesPopup: false,
        // 产品数据
        entity: {},
        // 产品详情图片
        imgList: [],
        // 租赁协议内容
        deal: '',
        // 租退策略
        leaseSet: {},
        // 是否显示套餐弹窗和免押金弹窗
        orderPopup: false,
        // 是否显示信用免押金弹窗
        creditPopup: false,
        // 套餐选择是否显示
        comboPopup: false,
        // 所选套餐信息
        rentMonth: 12,
        // 可选套餐的选中值
        checkCard: [],
        // 必选的套餐索引值
        annualCard: 0,
        // 是否使用过体验卡
        hasUsed: true,
        // 用户信用免押金时填写的身份证
        usrNo: '',
        // 用户信用免押金时填写的姓名
        usrName: '',
        // 是否同意协议
        isAgree: false,
        // 是否免押金支付
        isCredit: false
      }
    },
    created() {
      let that = this;
//      let _temp = {};
//      let _data = this.data;
//      let _entity = _data && _data.entity;

      // 处理产品数据
//      if(_entity && _entity !== '{}') {
//        _temp = JSON.parse(_entity);
//        that.initData(_temp);
//        console.log(_entity);
//      } else {
        that.$http.get(`${that.$apihost}/lease/products/${that.entityId}`)
          .then((res) => {
            that.initData(res);

            // 获取租退策略数据
            that.$http.get(`${that.$apihost}/lease/products/${that.entityId}/scenario`)
              .then((lease) => {
//                lease.firstChargeStategy = 'dd';
                that.leaseSet = lease;
              })
            // 获取体验卡数据
            that.$http.get(`${that.$apihost}/lease/rechargeorders/freepackage/used`, {
              leaseProductId: that.entityId
            })
              .then((free) => {
                that.hasUsed = free;
              })
          });
//      }

      // 处理jssdk签名,兼容history模式
      let _href = location.href.split('#')[0];
      let _temp = this.$store.getters[types.common.getEnterURL];
      if (!_temp) {
        this.$store.commit(types.common.setEnterURL, _href);
      }
    },
    beforeRouteEnter(to,from,next) {
      if(from.path === `/lease/${from.params.id}/protocol`) {
        next((vm) => {
          vm.usrNo = from.query.usrNo;
          vm.usrName = from.query.usrName;
          vm.orderPopup = true;
          vm.creditPopup = true;
          vm.comboPopup = false;
        })
      } else {
        next();
      }
    },
    computed: {
      // 路径所带参
//      data() {
//        return this.$route.query;
//      },
      // 租退策略
//      leaseSet() {
//        return this.data.leaseSet;
//      },
      // 是不是在支付宝环境中
      isAlipay() {
        let _flag = false;
        let nav = navigator && navigator.userAgent.toLowerCase().match(/Alipay/i);
        if(nav && nav[0] === 'alipay') {
          _flag = true;
        }
        return _flag;
      },
    },
    methods: {
      /**
       * 处理产品数据
       * @param res
       */
      initData(res) {
        let that = this;
        that.entity = res;

        let number = function(n) {
          let _n = 0;
          n = n.toString();
          if(n.indexOf('.') > -1) {
            _n = Number(n).toFixed(2);
          } else {
            _n = Number(n);
          }
          return _n;
        };

        // 处理套餐数据
        this.rentList = [
          {
            title: '年',
//            value: number(res.yearlyRental),
            valueAfter: number(res.yearlyRental/100),
            delValue: number(res.listYearlyRental/100),
            average: number(res.yearlyRental/1200),
            isFrtSuprt: res.supportFirstChargeYear,
            month: 12
          },
          {
            title: '半年',
//            value: number(res.halfyearlyRental),
            valueAfter: number(res.halfyearlyRental/100),
            delValue: number(res.listHalfyearlyRental/100),
            average: number(res.halfyearlyRental/600),
            isFrtSuprt: res.supportFirstChargeHalfYear,
            month: 6
          },
          {
            title: '季',
//            value: number(res.quarterlyRental),
            valueAfter: number(res.quarterlyRental/100),
            delValue: number(res.listQuarterlyRental/100),
            average: number(res.quarterlyRental/300),
            isFrtSuprt: res.supportFirstChargeQuarterly,
            month: 3
          },
          {
            title: '月',
//            value: number(res.monthlyRental),
            valueAfter: number(res.monthlyRental/100),
            delValue: number(res.listMonthlyRental/100),
            average: number(res.monthlyRental/100),
            isFrtSuprt: res.supportFirstChargeMonth,
            month: 1
          },
          {
            title: '体验卡',
            valueAfter: 0,
            month: 0,
          }
        ];

        // 首充策略
        let _chargeType = that.leaseSet && that.leaseSet.firstChargeStategy;

        // 必选
        if(_chargeType === 'RR') {
          let _temp = that.rentList;
          for(let i = 0; i < 5; i++) {
            if(_temp[i].valueAfter > 0) {
              that.annualCard = i;
              that.rentMonth =_temp[i].month;
              break;
            }
          }
        } else {
          // 可选 或 仅押金
          that.rentMonth = '';
        }

        that.imgList = res.imageList;
      },
      /**
       * 查看租赁协议
       */
      checkLease() {
        this.leasesPopup = true;
        this.$http.get(`${this.$apihost}/lease/products/${this.entityId}/agreements`)
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
       * 立即预约
       * @param isFree
       */
      chooseCombo(isFree) {
        let that = this;
        let _leaseType = this.leaseSet && this.leaseSet.leaseProcess;
        let _chargeType = this.leaseSet && this.leaseSet.firstChargeStategy;

        if(isFree) {
          that.isCredit = true;
        }
        if(_leaseType === 'standard') {
          if(_chargeType !== 'OD') {
            that.orderPopup = true;
            that.creditPopup = false;
            that.comboPopup = true;
          } else if(_chargeType === 'OD') {
            that.rentMonth = '';
            that.book();
          }
        } else if(_leaseType === 'commercial') {
          let _params = {};
          _params.id = that.$route.params.id;
          _params.entity = JSON.stringify(that.entity);
          _params.leaseScenes = 'commercial';

          that.$router.push({
            path: `/lease/order/create`,
            query: _params
          })
        } else {
          that.scanLease();
        }
      },
      /**
       * 关闭套餐选择弹窗
       */
      closeCombo() {
        this.orderPopup = false;
        this.comboPopup = false;
      },
      /**
       * 选择套餐
       * @param index
       */
      selectCombo(index) {
        let that = this;
        let _chargeType = that.leaseSet && that.leaseSet.firstChargeStategy;
        let _month = that.rentList[index].month;
        if(index !== '' && index !== null && index !== undefined) {
          // 可选
          if(_chargeType === 'RO') {
            if (_month === that.rentMonth) {
              that.rentMonth = '';
              that.checkCard = [];
            } else {
              that.rentMonth = that.rentList[index].month;
            }
          } else if(_chargeType === 'RR') {
            // 必选
            that.rentMonth = that.rentList[index].month;
          }
        }
      },
      /**
       * 确定预约
       */
      book() {
        let _data = this.leaseSet;
        let _type = _data && _data.leaseProcess;
//        let _chargeType = this.leaseSet && this.leaseSet.firstChargeStategy;
        let _entity = this.entity;
        let _params = _data;

        if(_type && _data && _entity) {
          if(_type === 'standard') {
            _params.id = this.$route.params.id;

            let _json = {
              productCoverImg: _entity.productCoverImg,
              name: _entity.name,
              productItemCode: _entity.productItemCode,
              deviceDeposit: _entity.deviceDeposit,
              lowestRental: _entity.lowestRental,
            };
            _params.entity = JSON.stringify(_json);
            _params.rentMonth = this.rentMonth;
            _params.leaseScenes = _type;
            _params.isCredit = this.isCredit;

            this.comboPopup = false;
            this.$router.push({
              path: `/lease/order/create`,
              query: _params
            })
          }
        } else {
          this.$toast.error('数据有误，请退出后重新进入');
        }
      },
      /**
       * 公寓租赁
       */
      scanLease() {
        let that = this;
        that.addDevices = false;

        let nav = navigator && navigator.userAgent.toLowerCase();
        if(nav && nav.match(/MicroMessenger/i) && nav.match(/MicroMessenger/i)[0] === 'micromessenger') {
          that.$wechat.deviceScan(that);
        } else if(nav && nav.match(/Alipay/i) && nav.match(/Alipay/i)[0] === 'alipay') {
          that.$alipay.deviceScan(that);
        } else {
          that.$messenger.error('请在微信或支付宝内打开此页面!');
        }
      },
      /**
       * 联系客服
       */
      servicePhone() {
        window.location.href = 'tel:13512753278';
      },
      /**
       * 信用免押金支付
       */
      creditFree() {
        this.creditPopup = true;
        this.comboPopup = false;
        this.orderPopup = true;
      },
      /**
       * 查看协议
       */
      checkProtocal() {
        this.$router.push({
          path: `/lease/${this.entityId}/protocol`,
          query: {
            usrNo: this.usrNo,
            usrName: this.usrName
          }
        });
      },
      /**
       * 立即授权
       */
      authorize() {
        let that = this;
        if(!that.isAgree) {
          that.$messagebox.alert('授权需同意协议内容！');
          return false;
        }
        if(!that.usrNo) {
          that.$messagebox.alert('请输入真实姓名！');
          return false;
        }
        if(!that.usrName) {
          that.$messagebox.alert('请输入身份证号码！');
          return false;
        }

        let _score = that.leaseSet && that.leaseSet.admittanceScore;
        let _params = {
          cert_no: that.usrNo,
          name: that.usrName,
          credit_score: _score,
        };
        that.$http.get(`${that.$apihost}/zhima/isaccord`,_params)
          .then((res) => {
            if(res) {
              that.$messagebox({
                title: '提示',
                message: '操作成功！'
              });
              setTimeout(function () {
                that.chooseCombo(true);
              }, 1000);
            } else {
              that.$toast.error('抱歉，您不符合信用免押金条件！');
            }
          })
          .catch((errMsg) => {
            that.$toast.error('抱歉'+ errMsg);
          })
      }
    },
    components: {
      AppView,
      VCell,
      VCheckList,
      vInput
    }
  }
</script>
