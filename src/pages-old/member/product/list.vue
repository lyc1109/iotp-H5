<style scoped lang="scss" type="text/scss">
  @import '~variables';

  .lease-products{
    @extend %padding-bottom-m;
    align-items: flex-start;

    .product-info{
      //padding-left: 110px;

      .title{
        font-weight: 300;
        line-height: normal !important;
        /*height: 38px;*/
      }

      .subtitle{
        font-size: 12px;
        color: $font-light;
        /*height: 40px;*/
        /*overflow: hidden;*/
        font-weight: 200;
        white-space: normal;
      }

      .product-prices{
        .currency{
          color: $primary;
          font-size: 16px;
        }

        .cmd-book,
        .btn-disable{
          margin-top: 1px;
          padding: 2px 5px;
        }

        .btn-disable{
          color: $font-light;
        }
      }
    }
    .btn{
      @include border-radius(3px);
    }
  }

  .img-box {
    flex: 0 0 20%;

    .img-thumbnail {
      width: 100%;
      height: 100%;
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
</style>
<template>
  <app-page :url="page.url" :params="page.params" :storeMutation="page.storeMutation" :storeGetter="page.storeGetter" @loaded="onPageLoaded">
    <div v-if="leaseProductList && leaseProductList.length > 0">

      <!-- 列表信息 -->
      <div class="list-item bg-white flex lease-products padding" v-for="item in leaseProductList">

        <router-link :to="{ pa: `/lease/${item.id}` }" class="img-box">
          <img class="img-thumbnail" :src="$filters.img(item.productCoverImg,'!wh100')" />
        </router-link>

        <div class="product-info padding-left flex-item">
          <router-link :to="{ path: `/lease/${item.id}` }">
            <div class="title">{{ item.name }}</div>
            <div class="subtitle">{{ item.briefIntroduction }}</div>
          </router-link>

          <div class="product-prices margin-top">
            <div class="pull-left">
              <span class="currency"><span class="currency-int">{{ $filters.formatCurrency(item.lowestRental/100) }}</span></span>
              <span class="text-second text-s">/月起</span>
            </div>

            <button class="btn btn-primary-outline btn-xs pull-right cmd-book" v-if="item.status === 0" @click="chooseCombo(item.id)">立即预约</button>
            <button class="btn btn-disable btn-xs pull-right" v-if="item.status === 1">暂不可预约</button>
          </div>
        </div>
        <div class="clearfix"></div>
      </div>
    </div>

    <!--选择套餐-->
    <mt-popup v-model="orderPopup" position="bottom" class="combo-page padding-bottom-xxl" style="height: 80%">
      <div v-if="comboPopup" style="height: 100%;overflow: auto">
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
        <div class="page-footer padding-m color-white align-center bg-primary" :class="{ 'bg-green-7': leaseSet && leaseSet.supportCreditRent }" @click.stop="book()">
          确定
        </div>
      </div>
    </mt-popup>
  </app-page>
</template>
<script>
  import types from '@/store/mutation-types'
  import AppPage from '@/components/layouts/app-page'

  export default {
    name: '',
    data (){
      return {
        // 实体对象id
        entityId: '',
        page: {
          url: `${this.$apihost}/lease/products`,
          params: {
            page_size: 15,
            scenario: 'standard'
          },
          storeMutation: types.leaseProducts.setPageData,
          storeGetter: types.leaseProducts.getPageData
        },
        leaseProductList: [],
        orderPopup: false,
        // 套餐选择是否显示
        comboPopup: false,
        // 产品数据
        entity: {},
        hasUsed: '',
        annualCard: '',
        leaseSet: [],
        rentList: [],
        // 可选套餐的选中值
        checkCard: [],
      }
    },
//    mounted(){
//      this.fetch()
//    },
    methods: {
      onPageLoaded(fileList){
        this.leaseProductList = fileList
      },
      fetch(){
        this.$http.get(`${this.$apihost}/lease/products/${this.entityId}`)
          .then((res) => {
            this.initData(res);
          })
      },
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
       * 立即预约
       * @param isFree
       */
      chooseCombo(id,isFree) {
        let that = this;
        that.entityId = id
        this.$http.get(`${this.$apihost}/lease/products/${id}`)
          .then((res) => {
            this.initData(res);
            // 获取租退策略数据
            that.$http.get(`${that.$apihost}/lease/products/${id}/scenario`)
              .then((lease) => {
                that.leaseSet = lease;
              })
            // 获取体验卡数据
            that.$http.get(`${that.$apihost}/lease/rechargeorders/freepackage/used`, {
              leaseProductId: id
            })
              .then((free) => {
                that.hasUsed = free;
              })
          })
        let _chargeType = this.leaseSet && this.leaseSet.firstChargeStategy;

        if(isFree) {
          that.isCredit = true;
        }
        if(_chargeType !== 'OD') {
          that.orderPopup = true;
          that.creditPopup = false;
          that.comboPopup = true;
        } else if(_chargeType === 'OD') {
          that.rentMonth = '';
          that.book();
        }
      },
      /**
       * 确定预约
       */
      book() {
        let _data = this.leaseSet;
        let _type = _data && _data.leaseProcess;
        let _entity = this.entity;
        let _params = _data;

        if(_type && _data && _entity) {
          if(_type === 'standard') {
            _params.id = this.entityId;

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
       * 关闭套餐选择弹窗
       */
      closeCombo() {
        this.orderPopup = false;
        this.comboPopup = false;
      },
    },
    computed: {},
    components: {
      AppPage
    }
  }
</script>
