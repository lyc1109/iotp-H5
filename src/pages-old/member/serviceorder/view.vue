<style scoped lang="scss" type="text/scss">
  @import '~variables';

  .orderInfo{
    .basicInfo{
      display: flex;
      @include border(bottom);

      .orderImg{
        flex:0 0 20%;
        margin-right: 10px;
        @include border;
        /*padding: 10px;*/
        @include border-radius(5px);
        height: 20%;

        &>div{
          width: 100%;
          height: 0;
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
          padding-bottom: 100%;
          @include border-radius(5px);
        }
      }
      .bacsicInfoText{
        flex: 2;

        h3{
          width: 89%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          display: inline-block;
          font-weight: normal;
        }
        .money{
          display: flex;
          position: relative;

          .rental{
            float: left;
            display: inline-block;

            span{
            }
            b{
              color: $yellow-3;
              display: inline-block;
            }
          }
          .deposit{
            position: absolute;
            right: 0;

            b{
              color: $yellow-3;
              font-size: $l;
              font-weight: 100;
            }
            span{
              color: $font-light;
            }
          }
        }
        .active-code{
          font-size: rem(14px);
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
    .secondInfo{
      p{
        font-size: $font-size-s;
        color: $font-light;

        &:last-child{
          margin-bottom: 0;
        }
      }
    }
  }
  .title{
    font-weight: 400;
  }
  .orderState{
    width: 81%;
  }
</style>
<template>
  <app-view>
    <div>
      <div class="orderInfo bg-white">
        <div class="basicInfo padding">
          <div class="orderImg">
            <div :style="{ 'background-image': `url(${orderDetail.leaseProduct.productCoverImg})` }"></div>
          </div>
          <div class="bacsicInfoText">
            <h3>{{ orderDetail.productName }}</h3>
            <p v-if="ifLease === false">{{ orderDetail.itemCode }}</p>
            <!--<p>{{ orderDetail.purchasedDate }}</p>-->
            <div class="money" v-if="ifLease">
              <div class="rental">
                <b class="color-primary font-l font-bold-500">{{ $filters.formatCurrency(orderDetail.leaseProduct.lowestRental/100) }}</b>
                <span class="font-light">起/月</span>
              </div>
              <div class="deposit">
                <b class="align-center padding-right-s">{{ $filters.formatCurrency(orderDetail.leaseProduct.deviceDeposit/100) }}</b>
                <span class="align-center">押金</span>
              </div>
            </div>
            <div class="active flex" v-if="ifLease">
              <span v-if="isActiveCode" class="color-primary active-code">激活码：{{ activeCode }}</span>
              <button type="button"
                      class="btn btn-primary-outline btn-xs copy-btn"
                      v-if="isActiveCode"
                      @click="copyAddress(activeCode)">复制</button>
            </div>
          </div>
        </div>
        <div class="oldOrderStatus">
          <ul class="padding">
            <li class="flex border-bottom padding-bottom">
              <i class="iconfont icon-iot-list font-light inline-block"></i>
              <span class="flex-item margin-left">订单号：{{ orderDetail.orderId }}</span>
              <status :order="orderDetail"></status>
            </li>
            <li class="margin-top" @click="openLog">
              <i class="iconfont icon-iot-tongzhi1 font-light inline-block"></i>
              <span class="inline-block text-wrapper-line orderState">{{ $filters.formatTime(orderState.created) }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ orderState.log }}</span>
              <i class="iconfont icon-iot-youjiantou1 font-s pull-right font-light inline-block"></i>
            </li>
          </ul>
        </div>
      </div>

      <!--服务详情-->
      <div class="old-service-detail margin-top-m">
        <h3 class="title font-light padding-left">服务详情</h3>
        <div class="service-detail bg-white padding-left padding-right border-top border-bottom">
          <v-cell title="服务类型" :value="orderDetail.shopServiceName"></v-cell>
          <v-cell title="预约服务时间" :value="`${$filters.formatDate(orderDetail.serviceDate)}  ${orderDetail.serviceTime}`"></v-cell>
          <v-cell title="订单创建时间" :value="$filters.formatTime(orderDetail.created)"></v-cell>
          <v-cell title="退款金额" :value="$filters.formatCurrency(orderDetail.refundAmount/100)"
                  v-if="(orderDetail.orderType === 'common' || orderDetail.orderType === 'returnDeposit') && orderDetail.refundAmount > 0"></v-cell>
          <v-cell title="备注说明" :value="orderDetail.customerMemo" v-if="orderDetail.orderType === 'common' || orderDetail.orderType === 'returnDeposit'"></v-cell>
        </div>
      </div>

      <!--图片附件-->
      <div class="margin-top-m" v-if="(orderDetail.orderType === 'common' || orderDetail.orderType === 'returnDeposit') && orderDetail.images.length > 0">
        <h3>图片附件</h3>
        <div class="bg-white padding-left padding-right border-top border-bottom">
          <img v-for="item in orderDetail.images" :src="$filters.img(item.img)" class="img-thumbnail">
        </div>
      </div>

      <!--联系信息-->
      <div class="old-contact margin-top-m">
        <h3 class="title font-light padding-left">联系信息</h3>
        <div class="bg-white padding-left padding-right border-top border-bottom">
          <v-cell title="联系人" :value="orderDetail.contactName"></v-cell>
          <v-cell title="联系电话" :value="orderDetail.contactMobile"></v-cell>
          <v-cell title="联系地址" :value="orderDetail.serviceAddress"></v-cell>
        </div>
      </div>

      <!--租赁协议-->
      <div class="margin-top-m">
        <div class="bg-white padding-left padding-right border-top border-bottom">
          <v-cell title="租赁协议" @click.native="openLeases">
            <span class="font-light">
              点击查看
              <i class="iconfont icon-iot-youjiantou1 font-s"></i>
            </span>
          </v-cell>
        </div>
      </div>

      <!--服务费用-->
      <div class="old-service-fee" :class="{ 'margin-top': orderFee.length > 0 }">
        <div class="bg-white">
          <v-cell class="padding-left padding-right" v-for="item in orderFee" :key="item.feeTypeDesc" :title="item.feeTypeDesc" :value="$filters.formatCurrency(item.subTotal/100)"></v-cell>
          <v-cell class="add-num padding-left padding-right" title="合计" :value="$filters.formatCurrency(orderFees/100)" v-if="orderFee.length > 0"></v-cell>
        </div>
      </div>

      <!--操作按钮-->
      <div class="operate-btn margin-top pull-right margin-right margin-bottom">
        <action :order="orderDetail" type="view"></action>
      </div>
    </div>

    <!--租赁协议弹窗-->
    <mt-popup v-model="leases" position="bottom" class="leases">
      <slot>
        <div class="title padding-left-m padding-right-m">
          <span>租赁协议</span>
          <i class="iconfont icon-iot-guanbi" @click="leasesClose()"></i>
        </div>
        <p class="padding-m" v-html="rentalDeal">{{ rentalDeal }}</p>
        <button class="btn btn-block btn-primary" @click="leasesClose()">确定</button>
      </slot>
    </mt-popup>

    <!--订单处理日志弹窗-->
    <mt-popup v-model="orderLog" position="bottom" class="orderLog">
      <slot>
        <div class="title padding-left-m padding-right-m">
          <span>订单处理日志</span>
          <i class="iconfont icon-iot-guanbi" @click="orderClose()"></i>
        </div>
        <div class="order-log-detail padding-m">
          <ul>
            <li v-for="(item,index) in orderStatus" :key="item.text" :class="{ 'active': item.isActive, 'padding-bottom': item.paddingBottom }">
              <i :class="{ 'iconfont': item.fa,'icon-iot-time': item.isFa,'done': item.isDone }"></i>
              <span class="padding-bottom">{{ item.log }}</span>
              <span>{{ $filters.formatTime(item.created) }}</span>
            </li>
          </ul>
        </div>
        <button class="btn btn-block btn-primary" @click="orderClose()">确定</button>
      </slot>
    </mt-popup>
  </app-view>
</template>
<script>
  import Status from '@/pages-member/tpl/tpl-status'
  import Action from '@/pages-member/tpl/tpl-action'

  export default {
    name: 'serviceOrder-detail',
    data (){
      return {
        orderDetail: {
          purchasedDate: '',
          contactMobile: '',
          contactName: '',
          leaseProduct: {
            productCoverImg: '/static/images/img-default.png',
            lowestRental: 0,
            listDeviceDeposit: 0
          },
          serviceAddress: '',
          productName: '',
          itemCode: '',
          serviceDate: '',
          serviceTime: '',
          orderId: '',
          created: '',
          status: 0
        },
        isActiveCode: false,
        ifLease: false,
        activeCode: '',
        orderState: {
          created: '',
          log: ''
        },
        leases: false,
        orderLog: false,
        rentalDeal: '',
        orderStatus: [],
        orderFee: [],
        orderFees: 0
      }
    },
    created(){
      this.fetchData()
    },
    mounted(){
      this.$nextTick(() => {
        window.onpopstate = () => {
          if(window.location.hash.indexOf('serviceOrderDetail') <= -1){
            this.leases = false
            this.orderLog = false
          }
        }
      })
    },
    methods: {
      fetchData(){
        // 获取订单详情
        this.$http.get(`${this.$apihost}/serverorders/${this.$route.params.id}`)
          .then((res) => {
            this.orderDetail = res
            // 判断是否为租赁订单
            if(this.orderDetail.orderType === 'common' || this.orderDetail.orderType === 'returnDeposit'){
              this.ifLease = false
              this.orderDetail.leaseProduct = res.product
            }else{
              this.ifLease = true
              if(res.leaseProduct.productCoverImg === '' || res.leaseProduct.productCoverImg === null){
                this.orderDetail.leaseProduct.productCoverImg = '/static/images/img-default.png'
              }
            }
            if(this.orderDetail.status >= 70){
              this.cancelBtn = false
            }else{
              this.cancelBtn = true
            }
            // 获取激活码
            if(this.orderDetail.deviceEntityId === '-1' || this.activeCode === ''){
              this.isActiveCode = false
            }else{
              this.isActiveCode = true
              this.getActiveCode()
            }
            // 判断操作按钮的显示隐藏
            if(this.orderDetail.status < 40 && this.orderDetail.orderType === 'lease' && this.orderDetail.paidTime === null){
              this.payBtn = true
              this.evaluateBtn = false
            }else if(this.orderDetail.status === 70){
              this.payBtn = false
              this.evaluateBtn = true
            }
          })
        // 获取订单日志
        this.$http.get(`${this.$apihost}/serviceorders/${this.$route.params.id}/logs`)
          .then((res) => {
            this.orderStatus = res
            this.orderState = this.orderStatus[0]
            this.orderStatus.forEach((value,index,array) => {
              value.paddingBottom = true
              if(index === 0){
                array[index].isActive = true
                array[index].fa = true
                array[index].isFa = true
                array[index].isDone = false
              }else{
                array[index].isActive = false
                array[index].fa = false
                array[index].isFa = false
                array[index].isDone = true
              }
            })
          })
        // 获取订单费用详情
        this.$http.get(`${this.$apihost}/serverorders/${this.$route.params.id}/fees`)
          .then((res) => {
            this.orderFee = res
            this.orderFee.forEach((value,index,array) => {
              this.orderFees += value.subTotal
            })
          })
//        this.$http.get(`${this.$apihost}/userdevices/${this.$route.params.id}`)
//          .then((res) => {
//            this.orderDetail.purchasedDate = res.purchasedDate
//          })
      },
      // 获取激活码
      getActiveCode(){
        this.$http.get(`${this.$apihost}/serviceorders/${this.$route.params.id}/activecode`)
          .then((res) => {
            this.activeCode = res
          })
      },
      openLeases(){
        this.leases = true
        window.location.hash = 'serviceOrderDetail'
        this.$http.get(`${this.$apihost}/lease/products/${this.orderDetail.leaseProduct.id}/lease-agreement`)
          .then((res) => {
            this.rentalDeal = res
          })
      },
      openLog(){
        this.orderLog = true
        window.location.hash = 'serviceOrderDetail'
      },
      leasesClose(){
        this.leases = false
        this.$router.go(-1)
      },
      orderClose(){
        this.orderLog = false
        this.$router.go(-1)
      }
    },
    computed: {},
    components: {
      Status,
      Action
    }
  }
</script>
