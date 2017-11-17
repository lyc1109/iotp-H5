<style scoped type="text/scss" lang="scss">
  @import "~variables";

  .app-view{
    overflow: hidden;
  }
  .product-detail{
    .product-img{
      @include border(bottom);

      &>div{
        width: 100%;
        height: 0;
        padding-bottom: 100%;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
      }
    }
    .product-info{


      .basic{
        @include border(bottom);

        h3{
          font-weight: normal;
          font-size: $font-size-l;
          margin-bottom: 0;
          line-height: rem(40px);
        }
        &>b{
          font-weight: 100;
          color: $font-light;
          display: inline-block;
          width: 100%;
        }
        span{
          color: $primary;
          display: inline-block;
          width: 100%;

          b{
            color: $primary;
            font-size: $font-size-xl;
            font-weight: bold;
          }
        }
        i{
          color: $yellow-1;
          font-size: $font-size-s;
          display: inline-block;
          width: 100%;
          font-style: inherit;
          font-weight: 300;
        }
      }
    }
  }
  .footer{
    .service{
      width: 20%;
      float: left;
      text-align: center;
      line-height: 50px;

      i{
        color: $primary;
        font-size: $font-size-l;
        position: relative;
        top: rem(2px);
      }
      span{
        color: $primary;
      }
    }
    .btn{
      flex: 0 0 80%;
      width: 80%;
      float: left;
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
  .rent{
    width: 100%;

    ul{
      width: 100%;
      display: inline-block;

      li{
        width: 50%;
        display: inline-block;
        float: left;
        text-align: center;
        line-height: rem(20px);
        height: rem(20px);

        &:nth-child(n+3){
          margin-top: $m;
          margin-bottom: 0;
        }

        .rent-box{
          width: 80%;
          border: 1px solid #eee;
          @include border-radius(3px);
          display: inline-block;

          span{
            display: inline-block;
            width: rem(35px);
            float: left;
            height: rem(20px);
          }
          b{
            display: inline-block;
            float: left;
          }

          &.blue{
            border-color: $primary-light;

            span{
              background: $primary-light;
              color: $white;
            }
            b{
              color: $primary-light;
            }
          }
          &.light-green{
            border-color: $green-6;

            span{
              background: $green-6;
              color: $white;
            }
            b{
              color: $green-6;
            }
          }
          &.green{
            border-color: $green-5;

            span{
              background: $green-5;
              color: $white;
            }
            b{
              color: $green-5;
            }
          }
          &.yellow{
            border-color: $yellow-3;

            span{
              background: $yellow-3;
              color: $white;
            }
            b{
              color: $yellow-3;
            }
          }
        }
      }
    }
  }
  .checkBtn{
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
</style>
<template>
  <app-view :has-footer="true" class="app-view">

    <!--顶部tabs-->
    <mt-navbar v-model="productDetailNav">
      <mt-tab-item v-for="item in productDetailNavList" :key="item.id" :id="item.id">{{ item.label }}</mt-tab-item>
    </mt-navbar>

    <!--产品-->
    <div class="product-detail bg-white" v-if="productDetailNav === 'product'">
      <div class="product-img padding-xxl">
        <div :style="{ 'background-image': `url(${$filters.img(productDetail.productCoverImg,'!wh300')})` }" v-lazy="$filters.img(productDetail.productCoverImg,'!wh300')"></div>
      </div>
      <div class="product-info">
        <div class="basic padding-m">
          <h3>{{ productDetail.name }}</h3>
          <b>{{ productDetail.briefIntroduction }}</b>
          <span class="margin-top-s"><b class="font-bold-500">{{ $filters.formatCurrency(productDetail.lowestRental/100) }}</b></span>
        </div>
        <v-cell title="产品描述" :value="$filters.unEscape(productDetail.description)" class="padding-left padding-right"></v-cell>
      </div>
    </div>

    <!--详情-->
    <div class="bg-white" v-if="productDetailNav === 'detail'">
      <div class="imageList" v-for="item in imgList" :key="item.name" :style="{ 'background-image': `url(${$filters.img(item.name,'!wh400')})` }"></div>
    </div>

    <!--购买按钮-->
    <div class="footer" slot="footer">
      <div class="service" @click="kefuPhone()">
        <i class="iconfont icon-iot-kefu"></i>
        <span>客服</span>
      </div>
      <button class="btn btn-block btn-primary" type="button" @click="buyProduct()">购买产品</button>
    </div>
  </app-view>
</template>
<script>
  import AppView from '@/components/layouts/app-view'
  import VCell from '@/components/ui/v-cell'
  import VCheckList from '@/components/ui/v-checklist'
  import Messenger from '@/assets/scripts/messenger'
  import { Lazyload } from 'mint-ui'

  export default {
    name: 'product-detail',
    data () {
      return {
        bookLeaseWay: false,
        bookLeaseList: [],
        productDetailNav: 'product',
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
        rentList: [
          {
            title: '月',
            value: '99.99'
          },
          {
            title: '季',
            value: '269.99'
          },
          {
            title: '半年',
            value: '519.99'
          },
          {
            title: '年',
            value: '899.99'
          }
        ],
        productDescribe: '产品描述',
        leases: false,
        productDetail: {
          productCoverImg: '',
          name: '加贝尔净水器',
          description: '我是描述哦',
          deviceDeposit: 100,
          briefIntroduction: '我才是描述咧'
        },
        imgList: [],
        deal: '',
        agree: ['agree'],
        agreeList: [
          {
            label: '同意协议',
            value: 'agree'
          }
        ],
        showAgree: false
      }
    },
    created(){
      this.fetchData()
    },
    methods: {
      fetchData(){
        this.$http.get(`${this.$apihost}/lease/products/${this.$route.params.id}`)
          .then((res) => {
            this.productDetail = res
            this.rentList[0].value = this.productDetail.listMonthlyRental
            this.rentList[1].value = this.productDetail.listQuarterlyRental
            this.rentList[2].value = this.productDetail.listHalfyearlyRental
            this.rentList[3].value = this.productDetail.listYearlyRental
            this.imgList = res.imageList
            if(this.productDetail.productCoverImg === ''){
              this.productDetail.productCoverImg = '/static/images/market/banner1.jpg'
            }
          })

        this.$http.get(`${this.$apihost}/lease/scenes`)
          .then((res) => {
            this.bookLeaseList = res
          })
        this.rentList.forEach((value,index,array) => {
          if(index % 4 === 0){
            array[index].className = {
              'blue': true
            }
          }else if((index + 3) % 4 === 0){
            array[index].className = {
              'light-green': true
            }
          }else if((index + 6) % 4 === 0){
            array[index].className = {
              'green': true
            }
          }else if((index + 9) % 4 === 0){
            array[index].className = {
              'yellow': true
            }
          }
        })
      },
      buyProduct(){
        Messenger.error('暂时无法购买产品')
      },
      kefuPhone(){
          window.location.href = 'tel:13512753278'
      },
      isAgree(val){
          this.agree = val
      }
    },
    components: {
      AppView,
      VCell,
      VCheckList,
      'v-lazy': Lazyload
    }
  }
</script>
