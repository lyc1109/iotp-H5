<style scoped lang="scss" type="text/scss">
  @import "~variables";

  .serviceOrder {

    ul {
      li {
        .orderState {

          .order-type {
            justify-content: center;
            padding: rem(1px) rem(3px);
            color: $white;
            background: $primary;
            @include border-radius();
            @extend %valign-center;

            &.type-1 {
              background: $success;
            }
            &.type-2 {
              background: $red-1;
            }
            &.type-3 {
              background: $info;
            }
            &.type-4 {
              background: $danger-light;
            }
            &.type-5 {
              background: $primary;
            }
          }
        }
        .order-status {
          position: relative;
          min-width: rem(46px);
        }
        .orderInfos {
          display: flex;

          .orderImg {
            width: rem(50px);
            height: rem(50px);
            justify-content: center;
            overflow: hidden;

            img {
              height: 100%;
              width: auto;
              max-width: fit-content;
            }
          }

          .orderInfoBox {
            white-space: inherit;
            flex-direction: column;
            align-items: flex-start;
            min-height: rem(50px);

            .deposit,.rent {
              background: $white;

              .tag-name {
                color: $white;
                background: $yellow-3;
                text-align:center;
                padding: 0 rem(3px);
                border: 1px solid rgba($yellow-3,.3);
                border-radius: 3px 0 0 3px;
              }

              .tag-value {
                font-weight: 100;
                color: $yellow-3;
                padding: rem(1px) rem(5px);
                border: 1px solid rgba($yellow-3,.3);
                border-left: none;
                border-radius: 0 3px 3px 0;
              }
            }
          }
        }
      }
    }
  }
  .orderbasicInfo{
    &>span{
      width: 100%;
      line-height: rem(25px);
      display: inline-block;
      height: rem(25px);

      .iconfont{
        color: $font-light;
      }
      .btn{
        @include border-radius(3px);
      }
    }
  }
  .orderOperate {
    justify-content: flex-end;
    display: flex;
  }
</style>

<template>
  <div>
    <mt-navbar v-model="serviceOrderValue">
      <mt-tab-item v-for="(item,index) in serviceOrderList" :key="item.id" :id="item.id" @click.native="toggleStatus(item.id)" class="service-order-nav">
        {{ item.label }}
        <span class="font-family-num" v-if="index < 3">({{ item.num }})</span>
      </mt-tab-item>
    </mt-navbar>
    <app-view :hasPullRefresh="true" :pullRefresh="pullRefresh" class="has-nav">
      <app-page :url="page.url"
                :params="page.params"
                :storeMutation="page.storeMutation"
                :storeGetter="page.storeGetter"
                @loaded="onPageLoaded"
                class="padding-top-xxl">
        <div class="serviceOrder bg">
          <ul>
            <li v-for="item in serviceOrderData" v-if="item.orderType && item.orderType !== 'install'" class="margin-top bg-white ripple" @click="detail(item.id)">
              <div class="orderState padding-m valign-center flex border-bottom">
                <div class="flex-item flex">
                  <span class="border-radius font-s color-white">
                    <span class="order-type type-1" v-if="item.orderType && item.orderType === 'common'">修</span>
                    <span class="order-type type-2" v-else-if="item.orderType && item.orderType === 'business'">商</span>
                    <span v-else-if="item.orderType && item.orderType === 'lease'">
                      <span class="order-type type-3" v-if="item.leaseFeature === 'company'">商</span>
                      <span class="order-type type-4" v-if="item.leaseFeature === 'personal'">个</span>
                    </span>
                    <span class="order-type type-5" v-else-if="item.orderType && item.orderType === 'returnDeposit'">退</span>
                  </span>

                  <div class="valign-center margin-left-s font-light margin-right-m flex-item">
                    <span class="text-wrapper"
                          v-if="item.orderType && item.orderType === 'install'">装机订单</span>
                    <span class="text-wrapper" v-else-if="item.orderType && item.orderType === 'common'">服务预约订单</span>
                    <span class="text-wrapper" v-else-if="item.orderType && item.orderType === 'business'">商务租赁申请订单</span>
                    <span class="text-wrapper" v-else-if="item.orderType && item.orderType === 'lease'">
                      <span v-if="item.leaseFeature === 'company'">商务租赁订单</span>
                      <span v-if="item.leaseFeature === 'personal'">个人租赁订单</span>
                    </span>
                    <span class="text-wrapper" v-else-if="item.orderType && item.orderType === 'returnDeposit'">{{ item.shopServiceName }}</span>
                  </div>
                </div>
                <div class="order-status">
                  <!--<b class="finish iconfont icon-IOT-wc font-bold-400" v-if="item.status === '已完成'"></b>-->
                  <!--<i v-if="item.status !== '已完成'" :class="{'statusImg': statusColor.isNormal,'blueStatusImg': statusColor.isBlue,'redStatusImg': statusColor.isRed,'yellowStatusImg': statusColor.isYellow}"></i>-->
                  <!--<span v-if="item.status !== '已完成'" :class="{ 'statusText': statusTexts.isNormal,'blueText': statusTexts.isBlue,'redText': statusTexts.isRed,'yellowText': statusTexts.isYellow }">{{ item.status }}</span>-->
                  <status :order="item" type="list" :statusList="statusList"></status>
                </div>
              </div>
              <div class="orderbasicInfo padding-m">
                <div v-if="item.shopServiceName && item.shopServiceName.indexOf('租') > -1 && item.assignee !== null"
                     class="font-bold-400 font-m flex font-family-num margin-bottom-m">
                  <span class="font-bold-500" @click.stop="" @click.prevent="">{{ item.assignee ? item.assignee.name : '无联系人名称' }}</span>
                  <div class="margin-left-l color-primary">
                    <i class="iconfont icon-IOT-dh margin-right-s font-default"></i>
                    <span class="color-blue-2 font-bold-400" @click.prevent="phoneCall(item.assignee)">{{ item.assignee ? item.assignee.mobile : '' }}</span>
                  </div>
                </div>
                <div class="font-family-num">
                  <i class="iconfont icon-IOT-time font-s font-light"></i>
                  <span class="margin-left-s">{{ $filters.formatDate(item.serviceDate) }}</span>
                  <span class="margin-left-l">{{ item.serviceTime }}</span>
                </div>
                <div class="margin-top-m flex" v-if="item.serviceAddress">
                  <div class="flex-item text-wrapper">
                    <i class="iconfont icon-IOT-dz font-s"></i>
                    <!--<strong class="font-bold-400">-->
                      <!--<span v-if="item.leaseFeature === 'company'">公司</span>-->
                      <!--<span v-else-if="item.leaseFeature !== 'company'">家里</span>-->
                    <!--</strong>&nbsp;&nbsp;&nbsp;-->
                    <span class="margin-left-s font-bold-400">{{ item.serviceAddress }}</span>
                  </div>
                  <div style="display: none1;">
                    <!--<actions type="copy-btn" :address="order.serviceAddress || order.newAddress"></actions>-->
                  </div>
                </div>
              </div>
              <div class="padding-m padding-top-zero" @click.stop="detail(item.id)">
                <div class="orderInfos bg-light padding flex">
                  <div class="orderImg flex margin-right-m bg-white border-radius">
                    <img v-lazy="$filters.img(item.productImage,'!wh100')">
                  </div>
                  <div class="orderInfoBox flex-item flex">
                    <div class="orderInfo text-title font-default text-wrapper-2line">
                      {{ item.productName ? item.productName : '无产品名称' }}
                    </div>
                    <div class="flex-item"></div>
                    <div class="font-light font-s font-family-num flex">
                      <div class="deposit font-s border-radius flex" v-if="item.orderType === 'lease' || item.orderType === 'business'">
                        <span class="tag-name font-s">押</span>
                        <span class="tag-value font-s font-bold-500">¥ {{ (item.leaseProduct && item.leaseProduct.deviceDeposit ? format(item.leaseProduct.deviceDeposit/100) : 0) }}</span>
                      </div>
                      <div class="rent font-s border-radius margin-left flex"
                           v-if="item.leasePackage !== null && item.leasePackage !== '' && item.leasePackage !== undefined && (item.orderType === 'lease' || item.orderType === 'business')">
                          <span class="tag-name font-s">
                            <span v-if="item.leasePackage === '0'">体验</span>
                            <span v-if="item.leasePackage === '1'">月</span>
                            <span v-if="item.leasePackage === '3'">季</span>
                            <span v-if="item.leasePackage === '6'">半年</span>
                            <span v-if="item.leasePackage === '12'">年</span>
                          </span>
                        <span class="tag-value font-s font-bold-500">¥ {{ (item.leaseRentalAmount ? format(item.leaseRentalAmount/100) : 0) }}</span>
                      </div>
                    </div>
                  </div>
                  <!--<div class="orderInfoBox flex-item">-->
                    <!--<div class="orderInfo flex" @click.stop="detail(item.id)">-->
                      <!--<div class="font-bold-500 text-wrapper-2line">{{ item.productName ? item.productName : '无产品名称' }}</div>-->
                      <!--<div class="flex margin-top">-->
                        <!--<div class="deposit font-s border-radius flex" v-if="item.orderType === 'lease' || item.orderType === 'business'">-->
                          <!--<span class="tag-name font-s">押</span>-->
                          <!--<span class="tag-value font-s font-bold-500">¥ {{ (item.leaseProduct && item.leaseProduct.deviceDeposit ? format(item.leaseProduct.deviceDeposit/100) : 0) }}</span>-->
                        <!--</div>-->
                        <!--<div class="rent font-s border-radius margin-left flex"-->
                             <!--v-if="item.leasePackage !== null && item.leasePackage !== '' && item.leasePackage !== undefined && (item.orderType === 'lease' || item.orderType === 'business')">-->
                          <!--<span class="tag-name font-s">-->
                            <!--<span v-if="item.leasePackage === '0'">体验</span>-->
                            <!--<span v-if="item.leasePackage === '1'">月</span>-->
                            <!--<span v-if="item.leasePackage === '3'">季</span>-->
                            <!--<span v-if="item.leasePackage === '6'">半年</span>-->
                            <!--<span v-if="item.leasePackage === '12'">年</span>-->
                          <!--</span>-->
                          <!--<span class="tag-value font-s font-bold-500">¥ {{ Number(item.leaseRentalAmount/100).toFixed(2) }}</span>-->
                        <!--</div>-->
                      <!--</div>-->
                    <!--</div>-->
                  <!--</div>-->
                </div>
              </div>
              <div class="orderOperate padding-left-m padding-right-m padding-bottom bg-white"
                   v-if="((Number(item.status) === 40 || Number(item.status) === 60) && item.orderType === 'lease' && item.paidTime === null) || (Number(item.status) === 70)">
                <!--<button type="button" class="btn btn-primary btn-sm btn-round" @click.stop="recharge(item.id)" v-if="item.payDeposit">支付押金</button>-->
                <!--<button type="button" class="btn btn-primary btn-sm btn-round" @click.stop="evaluating(item)" v-if="item.evaluates">评价</button>-->
                <action :order="item" type="list" :statusList="statusList" :isBack="true"></action>
              </div>
            </li>
          </ul>
        </div>
      </app-page>
    </app-view>
  </div>
</template>

<script>
  import AppPage from '@/components/layouts/app-page';
  import types from '@/store/mutation-types'
  import AppView from '@/components/layouts/app-view'
  import moment from 'moment'
  import AppEmptyView from '@/components/layouts/app-empty-view'
  import Action from '@/pages-member/tpl/tpl-action'
  import Status from '@/pages-member/tpl/tpl-status'

  export default {
    name: "serviceOrder-list",
    components: {
      AppPage,
      AppView,
      AppEmptyView,
      Action,
      Status
    },
    data() {
      return {
        // 当前tab值
        serviceOrderValue: '',
        // 订单数据
        serviceOrderData: [],
        // tab数据
        serviceOrderList: [
          {
            id: 'dfk',
            label: '待付款',
            num: 0
          },
          {
            id: 'jxz',
            label: '进行中',
            num: 0
          },
          {
            id: 'dpj',
            label: '待评价',
            num: 0
          },
          {
            id: '',
            label: '全部'
          }
        ],
        // 下拉刷新事件
        pullRefresh: {
          events: {
            topMethod: this.getListData
          }
        },
        // 状态数据
        statusList: {},
        pathName: ''
      }
    },
    computed: {
      page() {
        return {
          url: this.$apihost + "/serviceorders",
          params: {
            page_size: 3,
            type: this.$route.query.id ? this.$route.query.id : '',
            page_sort: 'created_desc',
          },
          storeMutation: types.serviceOrders.setPageData,
          storeGetter: types.serviceOrders.getPageData
        }
      },
    },
    created() {
      this.serviceOrderValue = this.$route.query.id ? this.$route.query.id : '';
      this.getListData();
      this.orderNum();
    },
    beforeRouteEnter(to,from,next){
      next((vm) => {
        vm.pathName = from.path
      })
    },
    beforeRouteLeave(to,from,next) {
      // 离开页面前解绑事件，避免再次进入时多次请求
      this.$bus.off('page-refresh');
      this.$store.commit(types.serviceOrders.setPageData,null);
      // 记录滚动条位置
      let position = window.scrollY;
      this.$store.commit('saveServiceOrderPosition',position);
      next();
    },
    mounted() {
      this.$nextTick(() => {
        let position = this.$store.state.serviceOrder_position
        window.scroll(0, position);

        window.onpopstate = () => {
          if(this.pathName === '/my'){
            this.$router.push('/my');
          }else if(this.pathName === '/jbr/home'){
            this.$router.push('/jbr/home');
          }

        }
      })
    },
    methods: {
      format(money) {
        let _m = money.toString();
        if(_m.indexOf('.') > -1) {
          _m = Number(_m).toFixed(2);
        }
        return Number(_m);
      },
      /**
       * 获取列表数据
       */
      getListData() {
        let that = this;
        let _params = {
          page_size: 3,
          type: '',
          page_sort: 'created_desc'
        };
        if(this.page && this.page.params) {
          _params = this.page.params;
        }
        this.$store.commit("hideLoading");
        that.$bus.emit('page-refresh', _params);
        //获取状态配置数据
        that.$http.get(`${this.$apihost}/serverorders/const/status`)
          .then((status) => {
            that.statusList = status;
          })
      },
      /**
       * 切换页签
       * @param id
       */
      toggleStatus(id) {
        this.$router.replace({
          path: `/serviceorder`,
          query: {
            id: id
          }
        });

        this.getListData();
      },
      /**
       * 订单数量
       */
      orderNum() {
        let _temp = this.serviceOrderList;
        this.$http.get(`${this.$apihost}/serviceorders/dashboard`)
          .then((res) => {
            _temp[0].num = res.tobePaidOrderCount
            _temp[1].num = res.ongoingOrderCount
            _temp[2].num = res.tobeRateOrderCount
          })
      },
      /**
       * 订单列表数据
       * @param fileList
       */
      onPageLoaded(fileList) {
        this.$store.commit("hideLoading");
        this.serviceOrderData = fileList;
      },
      /**
       * 跳转到详情页面
       * @param id
       */
      detail(id) {
        this.$store.commit("showLoading");
        this.$router.push(`/serviceorder/${id}/view`)
      },
      /**
       * 跳转到充值页面
       * @param id
       */
      recharge(id) {
        this.$router.push(`/serviceorders/pay/deposit/${id}`)
      },
      /**
       * 跳转到评价页面
       * @param order
       */
      evaluating(order) {
        this.$router.push({
          path: `/serviceorder/${order.id}/evaluate`,
          query: {
            type: this.$route.query.id,
            productImage: order.productImage,
            productName: order.productName,
            shopServiceName: order.shopServiceName,
            orderId: order.orderId
          }
        })
      },
      /**
       * 拨打电话
       * @param _phone 电话
       */
      phoneCall(_phone) {
        window.location.href = 'tel://' + _phone;
      },
    }
  }
</script>
