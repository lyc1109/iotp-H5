<style scoped lang="scss" type="text/scss">
  @import '~variables';
  .serviceOrder {
    li {
      border-bottom: 1px solid $border;
      margin-bottom: 0 !important;
      @extend %margin-top;
      &:first-child {
        margin-top: 0 !important;
      }
      &:last-child {
        border-bottom: 0;
      }
    }
    .order-foot {
      @extend %padding-m;
      overflow: hidden;
      line-height: 30px;
    }
    .order-status {
      position: relative;
      min-width: rem(46px);
      .order-status-dot {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: rgba(236, 77, 77, 0.5);
        position: relative;
        &:before {
          content: '';
          position: absolute;
          top: 2px;
          left: 2px;
          width: 4px;
          height: 4px;
          background: red;
          border-radius: 50%;
        }
      }
      .order-status-text {
        display: inline-block;
        padding-left: 2px;
      }
    }
    .contact-info {
      .text-s {
        @extend %padding-top;
      }
      .address-info {
        width: 100%;
        word-wrap:break-word;
        word-break:break-all;
        white-space: normal;
      }
    }
    .bg-light {
      background: lighten($page_bg, 4%);
    }
    .order-item {
      .order-type {
        justify-content: center;
        padding: rem(1px) rem(3px);
        background: $primary;
        @extend %valign-center;
      }
      .image-product {
        width: rem(50px);
        height: rem(50px);
      }
      .copy-tag {
        border: 1px solid $primary;
        padding: rem(1px) rem(3px);
      }
      .money-tag {
        @include border(all,$yellow-2);
        span {
          padding: rem(1px) rem(2px);
        }
        &:first-child {
          background: $yellow-2;
        }
      }
    }
  }
</style>
<template>
  <div>
    <app-page :url="page.url"
              :params="page.params"
              :storeMutation="page.storeMutation"
              :storeGetter="page.storeGetter"
              @loaded="onPageLoaded" v-if="listData && listData.length > 0">
      <ul class="serviceOrder" >
        <li v-for="(order, index) in listData">
          <div class="bg-white order-item padding-zero ripple" :class="{ 'margin-top': index !== 0 }">
            <router-link class="a-default" :to="'/old/serviceorder/' + order.id +'/view'">
              <div class="order-title padding-m flex valign-center border-bottom">
                <div class="order-type border-radius color-white font-s">
                  <span v-if="order.orderType === 'lease'">租</span>
                  <span v-else>{{ (order.shopServiceName && order.shopServiceName != '' ? order.shopServiceName.substring(0,1) : '无') }}</span>
                </div>
                <div class="flex-item"></div>
                <div class="pull-right order-status valign-center">
                  <i class="order-status-dot"></i>
                  <div class="text-s order-status-text font-s margin-left-s">
                    {{ order.statusDesc }}
                    <!--<status :order="order"></status>-->
                  </div>
                </div>
              </div>
              <div class="order-content padding-m">
                <div class="font-light font-bold-500">
                  <div>
                    <i class="icon icon-clock"></i>
                    <span class="margin-left-s">{{ $filters.formatDate(order.serviceDate) }}</span><span class="margin-left-l">{{ order.serviceTime }}</span>
                  </div>
                  <div class="margin-top-s">
                    <i class="icon icon-clock"></i>
                    <span class="margin-left-s" v-if="order.serviceAddress !== null">{{ order.serviceAddress.fullAddress }}</span>
                    <span class="copy-tag font-s margin-left-s color-primary border-radius">复制</span>
                  </div>
                </div>
                <div class="bg-light margin-top border-radius padding flex">
                  <img :src="$filters.img(order.productImage)" alt="" class="image-product border-radius border bg-white">
                  <div class="flex margin-left-m" style="flex-direction: column;align-items: flex-start;">
                    <div class="text-title font-default text-wrapper-2line">
                      <span v-if="order.orderType === 'lease'">{{ order.leaseProduct.name }}</span>
                      <span v-else>{{ order.productName }}</span>
                    </div>
                    <div class="font-light font-s">
                      <span v-if="order.orderType === 'lease'">产品代码：{{ order.leaseProduct.code }}</span>
                      <span v-else-if="order.orderType === 'common'">型号：{{ order.productItemCode }}</span>
                      <span v-else>型号：{{ order.leaseProduct.productItemCode }}</span>
                    </div>
                    <div class="flex-item"></div>
                    <div class="flex">
                  <span class="border border-radius money-tag">
                    <span class="color-white font-s" style="border-radius: 3px 0 0 3px;">押</span>
                    <span class="color-yellow-2 font-s bg-white" style="border-radius: 0 3px 3px 0;">{{ $filters.formatCurrency(order.leaseDepositAmount) }}</span>
                  </span>
                    </div>
                  </div>
                </div>
              </div>
            </router-link>
            <div class="order-footer padding-m padding-top-zero flex" v-if="order.payDeposit || order.evaluates">
              <div class="flex-item"></div>
              <div>
                <button type="button" class="btn btn-primary btn-sm btn-round" @click.stop="recharge(order.id)" v-if="order.payDeposit">支付押金</button>
                <button type="button" class="btn btn-primary btn-sm btn-round" @click.stop="evaluating(order)" v-if="order.evaluates">评价</button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </app-page>
    <div class="flex valign-center align-center" style="min-height: 500px;width: 100%;justify-content: center;flex-direction: column;" v-else>
      没有服务订单哦~
    </div>
  </div>
</template>
<script>
  import types from '@/store/mutation-types'
  import AppPage from "@/components/layouts/app-page";

  export default {
    name: "order-list",
    data() {
      return {
        listData: [],
        page: {
          url: `${this.$apihost}/devices/${this.$route.params.id}/serviceorders`,
          params: {},
          storeMutation: types.serviceOrders.setPageData,
          storeGetter: types.serviceOrders.getPageData
        }
      }
    },
    methods: {
      onPageLoaded(fileList){
        this.listData = fileList
      },
      /**
       * 跳转到充值页面
       * @param id
       */
      recharge(id){
        this.$router.push(`/old/serviceorder/${id}/recharge`)
      },
      /**
       * 跳转到评价页面
       * @param order
       */
      evaluating(order) {
        this.$router.push({
          path: `/old/serviceorder/${order.id}/evaluate`,
          query: {
            type: this.$route.query.id,
            productImage: order.productImage,
            productName: order.productName,
            shopServiceName: order.shopServiceName,
            orderId: order.orderId
          }
        })
      },
    },
    components: {
      AppPage
    }
  }
</script>

