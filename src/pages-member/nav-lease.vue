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
  .lease-box {
    padding-top: rem(50px);
  }
  .lease-image-box {
    width: 100%;
    /*padding-top: 60%;*/
    /*position: relative;*/

    .lease-image {
      width: 100%;
      height: 100%;
      justify-content: center;
      /*position: absolute;*/
      /*top: 0;*/
      /*overflow: hidden;*/

      /*img {*/
        /*width: 100%;*/
        /*height: auto;*/
        /*min-height: 100%;*/
      /*}*/
    }
  }

  .brief {
    -webkit-box-orient: vertical;
    color: $font-light;
    font-size: $font-size-s;
  }
  .shop-nav{
    border-top: 0 none;
    border-left: 0 none;
    border-right: 0 none;
    .is-selected {
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

      .agree {
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
  <div>
    <mt-navbar v-model="sceneType" v-if="shopNavList && shopNavList.length > 1" class="shop-nav">
      <mt-tab-item v-for="(item,index) in shopNavList"
                   :id="item"
                   :key="item"
                   @click.native="changeTab(item)"
                   :class="{ 'is-selected': (item === sceneType) }">{{ (item === 'standard' ? '标准' : (item === 'apartment' ? '公寓' : (item === 'commercial' ? '商务' : ''))) }}租赁</mt-tab-item>
    </mt-navbar>
    <app-view class="has-nav lease-main" :hasPullRefresh="true" :pullRefresh="pullRefresh">
      <app-page :url="page.url"
                :params="page.params"
                :storeMutation="page.storeMutation"
                :storeGetter="page.storeGetter"
                @loaded="onPageLoaded"
                class="lease-box bg">
        <div class="ripple bg-white border-bottom padding-m"
             v-if="leaseProducts && leaseProducts.length > 0"
             v-for="item in leaseProducts"
             @click="book(item,false)">
          <div class="lease-image-box">
            <div class="lease-image valign-center">
              <img v-lazy="item.productCoverImg ? $filters.img(item.productCoverImg, '@200h_385w_1e_1c') : '/static/images/market/banner2.jpg'" />
            </div>
          </div>
          <div class="flex-item margin-top-m">
            <div class="text-title text-wrapper"> {{item.name}} </div>
            <div class="brief text-wrapper-2line margin-top-s" v-if="item.briefIntroduction">
              {{ item.briefIntroduction }}
            </div>
            <div class="flex margin-top">
              <div class="flex-item">
                <span class="color-primary font-m font-bold-500 font-l">¥ {{ Number(item.lowestRental/100).toFixed(2) }}</span>
                <span class="color-primary font-m font-bold-500 font-l">{{ this.$filters }}</span>
                <span class="color-primary font-s">起/月</span>
              </div>
              <!--<div class="flex-item align-right">-->
              <!--<button class="btn btn-sm btn-round btn-primary" @click.stop="book(item,true)">一键预约</button>-->
              <!--</div>-->
            </div>
          </div>
        </div>
      </app-page>
    </app-view>

    <app-nav navId="lease"></app-nav>
  </div>
</template>

<script>
  import AppNav from '@/pages-member/nav';
  import AppPage from '@/components/layouts/app-page';
  import types from "@/store/mutation-types";
  import AppEmptyView from '@/components/layouts/app-empty-view'

  import sysApi from "@/apis/sys";

  export default {
    name: "nav-lease",
    data: function () {
      return {
        // 租赁产品分页数据
        leaseProducts: [],
        // tab默认选中的标签
        sceneType: this.$route.query.id ? this.$route.query.id : 'standard',
        // tab标签数据
        shopNavList: [],
        // 下拉刷新数据
        pullRefresh: {
          events: {
            topStatusFresh: this.getListData
          }
        },
      }
    },
    beforeRouteLeave(to,from,next) {
      this.$bus.off('page-refresh');
      let position = window.scrollY;
      this.$store.commit('saveMarketPosition',position);
      next();
    },
    created() {
      this.$store.commit("hideLoading");
      this.tabFetch();
    },
    computed: {
      page () {
        return {
          url: this.$apihost + "/lease/products",
          params: {
            status: 0,
            page_size: 5,
            scenario: this.$route.query.id ? this.$route.query.id : 'standard',
          },
          storeMutation: types.leaseProducts.setPageData,
          storeGetter: types.leaseProducts.getPageData
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        let position = this.$store.state.market_position;
        window.scroll(0, position);
      })
    },
    methods: {
      /**
       * 获取分页数据
       */
      getListData() {
        let that = this;
        let _params = {
          status: 0,
          page_size: 5,
          scenario: that.sceneType
        };
        that.$bus.emit('page-refresh', _params);
      },
      /**
       * 拉取tab数据
       */
      tabFetch() {
        this.$http.get(`${this.$apihost}/lease/scenarios`)
          .then((res) => {
            this.shopNavList = res;
          })
      },
      /**
       * 页面加载后操作
       * @param fileList
       */
      onPageLoaded (fileList) {
        this.leaseProducts = fileList;
      },
      /**
       * tab切换操作
       * @param id
       */
      changeTab(id) {
        this.$router.replace({
          path: `/lease`,
          query: {
            id: id
          }
        });
        this.getListData();
      },
      /**
       * 跳转至产品详情
       * @param product
       * @param isCombo
       */
      book(product, isCombo) {
//        let _type = '';
//        this.$http.get(`${this.$apihost}/lease/products/${product.id}/scenario`)
//          .then((res) => {
//            _type = res.leaseProcess;
////            _type = this.sceneType;
//            if(_type === 'standard') {
//              this.$router.push({
//                path: `/lease/${product.id}`,
////                query: {
////                  leaseScenes: _type,
////                  entity: product && JSON.stringify(product),
////                  leaseSet: res,
////                  isCombo: isCombo,
////                }
//              })
//            } else if(_type === 'commercial') {
//              let _params = {};
//              _params.id = this.$route.params.id;
//              _params.entity = JSON.stringify(product);
//              _params.leaseScenes = 'commercial';
//
//              this.$router.push({
//                path: `/lease/order/create`,
//                query: _params
//              })
//            } else if(_type === 'apartment') {
//              this.scanLease();
//            }
//          })
        this.$router.push({
          path: `/lease/${product.id}`,
        })
      },
      /**
       * 公寓租赁
       */
      scanLease() {
        let that = this;
        that.addDevices = false;

        let nav = navigator && navigator.userAgent.toLowerCase();
        if(nav && nav.match(/MicroMessenger/i) && nav.match(/MicroMessenger/i)[0] === 'micromessenger') {
          that.$wechat.deviceScan(that, types);
        } else if(nav && nav.match(/Alipay/i) && nav.match(/Alipay/i)[0] === 'alipay') {
          that.$alipay.deviceScan(that, types);
        } else {
          that.$messenger.error('请在微信或支付宝内打开此页面!');
        }
      },
    },
    components: {
      AppNav,
      AppPage,
      AppEmptyView,
    },
  };
</script>
