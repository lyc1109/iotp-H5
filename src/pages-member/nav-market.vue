<style scoped lang="scss" type="text/scss">
  @import "~variables";

  .swipe {
    height: rem(170px);

    .bar {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.2);
      font-size: $font-size-s;
      color: $white;
      overflow: hidden;
      @extend %padding-s;

      .flex-right {
        flex: 0 0 rem(100px);
        text-align: right;
      }
    }
  }

  .flex-left{
    /*flex: 0 0 rem(100px);*/
    width: 100%;

    img{
      min-width: inherit;
      width: 100%;
      height: rem(180px);
      border: 0 none;
    }
  }

  .brief{
    /*height: rem(44px);*/
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    padding: rem(7px) 0;
    margin-bottom: rem(4px);
    color: $font-light;
    font-size: $font-size-s;
  }
  .shop-nav{
    border-top: 0 none;
    border-left: 0 none;
    border-right: 0 none;
    .is-selected{
      border-bottom-color: $primary;
      color: $primary;
    }
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
  .ripple{
    padding-top: rem(65px)!important;
  }
  .market-empty-page {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    justify-content: center;

    .flex {
      flex-direction: column;
      overflow: hidden;

      .tips {
        width: auto;
        max-width: 150px;
      }
    }
  }
</style>

<template>
  <div>
    <mt-navbar v-model="shopNav" class="shop-nav" style="display: none">
      <mt-tab-item v-for="(item,index) in shopNavList" :key="item.id" :id="item.id">{{ item.name }}</mt-tab-item>
    </mt-navbar>
    <app-view class="has-nav market" :hasPullRefresh="true" :pullRefresh="pullRefresh" style="display: none">
      <!-- 宣传公告栏 -->
      <!--<mt-swipe class="swipe" :data="bulletins" :auto="5000" :showIndicators="false" v-if="bulletins.length > 0">-->
      <!--<mt-swipe-item class="swipe-item bg-box"-->
      <!--v-for="(item, index) in bulletins"-->
      <!--:key="item.id"-->
      <!--:style="{'background-image': 'url(' + $filters.img(item.coverImagePath, '!w300') + ')'}">-->
      <!--<div class="bar flex">-->
      <!--<div class="flex-item text-wrapper">{{ item.title }}</div>-->
      <!--<div class="flex-right">{{ index + 1 }}/{{ bulletins.length }}</div>-->
      <!--</div>-->
      <!--</mt-swipe-item>-->
      <!--</mt-swipe>-->

      <!--<div class="padding-top-m border-bottom" v-if="bulletins.length > 0"></div>-->

      <!--<app-page :url="page.url"-->
      <!--:params="page.params"-->
      <!--:storeMutation="page.storeMutation"-->
      <!--:storeGetter="page.storeGetter"-->
      <!--@loaded="onPageLoaded">-->
      <div class="ripple bg-white border-bottom padding-m"
           v-for="item in leaseProducts" v-show="leaseProducts.length > 0" @click="detail(item)">
        <div class="flex-left">
          <img class="img-thumbnail" :src=" $filters.img(item.productCoverImg, '!wh400') " v-lazy="$filters.img(item.productCoverImg, '!wh400')" />
        </div>
        <div class="flex-item margin-top-s">
          <div class="text-title text-wrapper"> {{item.name}} </div>
          <div class="brief">
            {{ item.briefIntroduction }}
          </div>
          <div class="flex">
            <div class="flex-item">
              <span class="color-primary font-m font-bold-500 font-l">{{ $filters.formatCurrency(item.lowestRental/100.0) }}</span>
              <span class="color-primary font-s">/月起</span>
            </div>
            <div class="flex-item align-right">
              <button class="btn btn-sm btn-round btn-warn">去购买</button>
            </div>
          </div>
        </div>
      </div>
      <!--</app-page>-->
    </app-view>

    <div class="market-empty-page bg-white valign-center align-center">
      <div class="flex">
        <img src="/static/images/empty/market.png" class="tips" width="320"/>
        <div>商城暂未开放哟~</div>
      </div>
    </div>

    <app-nav navId="market"></app-nav>
  </div>
</template>

<script>
  import AppNav from '@/pages-member/nav';
  import AppPage from '@/components/layouts/app-page';
  import types from "@/store/mutation-types";
  import AppEmptyView from '@/components/layouts/app-empty-view'
  import Messenger from '@/assets/scripts/messenger'
  import VCheckList from '@/components/ui/v-checklist'
  import { Lazyload } from 'mint-ui'

  import sysApi from "@/apis/sys";

  export default{
    name: "orders",
    components: {
      "app-nav": AppNav,
      "app-page": AppPage,
      AppEmptyView,
      VCheckList,
    },
    data: function () {
      return {
        bulletins: [],
        leaseProducts: [
          {
            id: '06V4zY',
            productId: 'OBgvM6',
            productCoverImg: '/static/images/market/banner1.jpg',
            name: '家用直饮智能纯水机',
            lowestRental: 200000,
            briefIntroduction: "sdfsdf"
          },
          {
            id: '8zxwBd',
            productId: 'k6rnY6',
            productCoverImg: 'http://assets.xohaa.net/dev-medias/shop_n6ZR6p/images/20170810/1406/d0cda9dbd4c65789803e28f2f7490598.jpg',
            name: '沁园（QINYUAN)纯水机',
            lowestRental: 235000,
            briefIntroduction: "反渗透RO膜过滤五级智能显示屏家用净水器，下单立减100！再送299净水伴侣与200元PP棉！模块式纯水机！"
          },
          {
            id: 'V6156x',
            productId: 'Az95Xz',
            productCoverImg: 'http://assets.xohaa.net/stage-medias/shop_n6ZR6p/images/20170221/1953/aefb41585387a9667e73e47c8cc0c277.png',
            name: '智能净水器（扫码租赁）',
            lowestRental: 350000,
            briefIntroduction: "智能净水器（扫码租赁）智能净水器（扫码租赁）智能净水器（扫码租赁）智能净水器（扫码租赁）"
          },
          {
            id: '06V4zY',
            productId: 'OBgvM6',
            productCoverImg: '/static/images/market/banner1.jpg',
            name: '家用直饮智能纯水机',
            lowestRental: 200000,
          },
          {
            id: '8zxwBd',
            productId: 'k6rnY6',
            productCoverImg: 'http://assets.xohaa.net/dev-medias/shop_n6ZR6p/images/20170810/1406/d0cda9dbd4c65789803e28f2f7490598.jpg',
            name: '沁园纯水机',
            lowestRental: 135000,
          },
        ],
        swipeArray: [],
        shopNav: 'new',
        shopNavList: [
          {
            name: '新品上市',
            id: 'new'
          },
          {
            name: '家庭推荐',
            id: 'home'
          },
          {
            name: '顶级净水',
            id: 'top'
          },
          {
            name: '商务净水',
            id: 'business'
          }
        ],
        sceneType: '',
        pullRefresh: {
          events: {
            topStatusFresh: this.topStatusFresh
          }
        },
        leases: false,
        deal: '',
        agree: ['agree'],
        agreeList: [
          {
            label: '同意协议',
            value: 'agree'
          }
        ],
        index: 0
      }
    },
    computed: {
      page () {
//        let curShop = this.$store.getters[types.oauth.getCurShop];
//        if(this.shopNavList.length !== 0) {
          return {
            url: this.$apihost + "/lease/products",
            params: {},
            storeMutation: types.leaseProducts.setPageData,
            storeGetter: types.leaseProducts.getPageData
          }
//        }
      }
    },
    beforeRouteLeave(to,from,next){
      let position = window.scrollY
      this.$store.commit('saveMarketPosition',position)
      next()
    },
    created () {
//      this.$store.commit("showLoading");
//      sysApi.findBulletins("L")
//        .then((bulletins) => {
//          this.bulletins = bulletins;
//        })
    },
    mounted(){
      this.$nextTick(() => {
        let position = this.$store.state.market_position
        window.scroll(0, position)
        window.onpopstate = () => {
          if(window.location.hash.indexOf('leaseCommon') > -1){
            this.leases = true
          }else{
            this.leases = false
          }
        }
      })
    },
    methods: {
      onPageLoaded (fileList) {
        this.$store.commit("hideLoading");
        this.leaseProducts = fileList;
        this.leaseProducts.forEach((value,index,array) => {
            if(array[index].briefIntroduction === ''){
              array[index].briefIntroduction = '(未知)'
            }
            if(array[index].productCoverImg === ''){
              array[index].productCoverImg = '/static/images/market/banner1.jpg'
            }
        })
      },
      detail(product){
            this.$router.push({
              path: `/product/${product.id}`,
              query: {
                productId: product.productId,
                productCoverImg: product.productCoverImg,
                name: product.name,
                lowestRental: product.lowestRental,
                shopNav: this.shopNav,
                leaseScenes: this.sceneType
              }
            })
      },
      topStatusFresh(val){
          if(val === 'loading'){
              this.$http.get(`${this.$apihost}/lease/products`)
                .then((res) => {
                  this.$store.commit("hideLoading");
                  this.leaseProducts = res.fileList
                  this.leaseProducts.forEach((value,index,array) => {
                    if(array[index].briefIntroduction === ''){
                      array[index].briefIntroduction = '(未知)'
                    }
                  })
                })
          }
      },
      isAgree(val){
        this.agree = val
      }
    }
  };
</script>
