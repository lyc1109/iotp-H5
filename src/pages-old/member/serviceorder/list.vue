<style scoped lang="scss" type="text/scss">
  @import '~variables';

  .img-box {
    flex: 0 0 11.7%;

    .img-thumbnail {
      width: 100%;
      height: 100%;
    }
  }
</style>
<template>
  <app-page :url="page.url"
            :params="page.params"
            :storeMutation="page.storeMutation"
            :storeGetter="page.storeGetter"
            @loaded="onPageLoaded">
    <div v-if="serviceOrderList && serviceOrderList.length > 0">
      <ul class="orders">
        <li v-for="item in serviceOrderList" class="bg-white padding">
          <router-link
            :to="{ path: `/old/serviceOrder/${item.id}` }">
            <div class="order-info flex">
              <div class="img-box">
                <img class="img-thumbnail" :src="$filters.img(item.productImage)"/>
              </div>

              <div class="product-info flex-item">
                <div class="margin-left">
                  <div class="text-wrapper">{{ item.productName }}</div>
                  <div class="font-s font-light margin-top" v-if="item.orderType === 'common' || item.orderType === 'returnDeposit'">产品型号：<span>{{ item.productItemCode }}</span></div>
                  <div class="font-s font-light margin-top" v-if="item.orderType === 'lease' || item.orderType === 'business'">产品代码：<span>{{ item.leaseProduct.code }}</span></div>
                </div>
              </div>
            </div>

            <div class="order-field">
              <div class="pull-right">
                <i class="fa fa-clock-o font-lighter fa-lg"></i>
                <div class="font-s" style="margin-top: 4px;">
                  <status :order="item"></status>
                </div>
              </div>
              <div class="product-field-info">
                服务类型：
                <span :class="{ 'color-green-1': item.orderType !== 'lease','color-yellow-1': item.orderType === 'lease' }">{{ item.shopServiceName }}</span>
                <div class="padding-top-s" v-if="item.orderType !== 'business'">
                  预约时间：<span>{{ $filters.formatDate(item.serviceDate,'MM-DD') }}</span> <span class="margin-left-s">{{ item.serviceTime }}</span>
                </div>
                <div class="padding-top-s" v-if="item.orderType === 'business'">
                  公司名称：<span>{{ item.leaseCompany }}</span>
                </div>
              </div>
            </div>
          </router-link>

          <div class="order-foot padding-top">
            <div class="pull-right" style="width: auto;">
              <action :order="item" type="list"></action>
              <!--<div th:include="layouts-tpl/tplActions::serviceOrder(${item}, 'list')"/>-->
            </div>
            <div class="font-light font-s">订单号：{{ item.orderId }}</div>
          </div>
        </li>
      </ul>
    </div>
  </app-page>
</template>
<script>
  import AppPage from '@/components/layouts/app-page'
  import types from '@/store/mutation-types'
  import Status from '@/pages-member/tpl/tpl-status'
  import Action from '@/pages-member/tpl/tpl-action'

  export default {
    name: 'serviceOrder-list',
    data (){
      return {
        page: {
          url: `${this.$apihost}/serviceorders`,
          params: {
            page_size: 5
          },
          storeMutation: types.serviceOrders.setPageData,
          storeGetter: types.serviceOrders.getPageData
        },
        serviceOrderList: []
      }
    },
    methods: {
      onPageLoaded(fileList){
        this.serviceOrderList = fileList
      }
    },
    computed: {},
    components: {
      AppPage,
      Status,
      Action
    }
  }
</script>
