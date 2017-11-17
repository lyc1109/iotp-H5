<style scoped lang="scss" type="text/scss">
  @import "~variables";

  .detailStatus{
    background: $primary;

    .status{
      height: 120px;
      position: relative;
      display: flex;

      &>div{
        flex: 1;
        text-align: center;
      }
      &:before {
        content: '';
        display: inline-block;
        width: 100%;
        height: 1px;
        background: linear-gradient(left,rgba(255,255,255,.2),rgba(255,255,255,.6),#fff,rgba(255,255,255,.6),rgba(255,255,255,.2));
        position: absolute;
        top: 50px;
        left: 0;
      }
      .prevStatus,.nextStatus{
        position: relative;

        span{
          color: rgba(255,255,255,.7);
          font-size: $font-size;
          display: block;
        }
        &:before{
          width: 5px;
          height: 5px;
          content: '';
          display: inline-block;
          background: rgba(255,255,255,.6);
          @include border-radius(50%);
          position: absolute;
          top: 48px;
          margin-left: -2px;
        }
        &:after{
          width: 12px;
          height: 12px;
          content: '';
          display: inline-block;
          background: rgba(255,255,255,.2);
          @include border-radius(50%);
          position: absolute;
          top: 45px;
          margin-left: -6px;
        }
      }
      .doingStatus{
        position: relative;

        div,span{
          color: #fff;
          font-size: $font-size-l;
          display: block;
        }
        &:before{
          width: 8px;
          height: 8px;
          content: '';
          display: inline-block;
          background: #fff;
          @include border-radius(50%);
          position: absolute;
          top: 46.5px;
          margin-left: -2px;
        }
        &:after{
          width: 20px;
          height: 20px;
          content: '';
          display: inline-block;
          background: rgba(255,255,255,.3);
          @include border-radius(50%);
          position: absolute;
          top: 41px;
          margin-left: -8px;
        }
      }
    }
    .statusInfo {
      i,span {
        color: #fff;
      }
      span {
        width: 81%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .clientInfo{
    p{
      margin-bottom: 0;
      /*line-height: rem(25px);*/

      span{
        font-size: $font-size-m;
        color: #333;
        font-weight: normal;
      }
      &.clientAddress{
        i{
          color: $primary;
          margin-right: rem(3px);
          position: relative;
          top: rem(-2px);
        }
        span{
          font-size: $font-size;
          font-weight: 100;
          width: 100%;
        }
      }
    }
  }
  .orderInfo{
    .basicInfo{
      display: flex;
      @include border(bottom);

      .orderImg{
        flex:0 0 20%;
        height: 20%;

        &>div{
          width: 100%;
          height: 0;
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
          padding-bottom: 100%;
        }
      }
      .bacsicInfoText{
        flex: 2;
        overflow: hidden;

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
          padding-bottom: rem(4px);

          .deposit {
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
          .rental{
            position: absolute;
            right: 0;
          }
        }
        .active-code{
          font-size: rem(14px);
        }
      }
    }
    /*.check{*/
    /*padding-right: 0;*/
    /*}*/
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
  .operateBtn{
    text-align: right;
    @include border(top);
  }
  .copy-btn{
    @include border-radius(3px);
  }
</style>

<template>
  <div>
    <app-view :hasFooter="true">
      <div class="detailStatus">
        <div class="status">
          <div class="prevStatus padding-top-xxl" v-if="prevStatus">
            <span class="margin-top-m">{{ statusList.prev }}</span>
          </div>
          <div class="doingStatus padding-top-xxl">
            <span class="margin-top-m">{{ nowStatus }}</span>
            <!--<status class="margin-top-m" :order="orderDetail" type="view"></status>-->
          </div>
          <div class="nextStatus padding-top-xxl" v-show="nextStatus">
            <span class="margin-top-m">{{ statusList.next }}</span>
          </div>
        </div>
        <div class="statusInfo padding-m valign-center flex" @click="orderOpen()">
          <div class="flex-item padding-right-m">
            <i class="iconfont icon-iot-tongzhi1 font-s"></i>
            <span>{{ $filters.formatTime(orderState.created) }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ orderState.log }}</span>
          </div>
          <i class="iconfont icon-iot-youjiantou1 font-s"></i>
        </div>
      </div>
      <div class="bg-white clientInfo padding-m">
        <p><span class="margin-right-l">{{ orderDetail.contactName}}</span>
          <!--<span>{{ orderDetail.contactMobile}}</span>-->
          <span>
            <a class="margin-left-m" :href="'tel:'+ orderDetail.contactMobile">
              <i class="icon iconfont color-primary margin-right icon-IOT-dh"></i>{{ orderDetail.contactMobile }}
            </a>
            <a v-if="orderDetail.contactTelephone" class="margin-left-m" :href="'tel:'+ orderDetail.contactTelephone">
              <i class="icon iconfont color-primary margin-right icon-IOT-dh"></i>{{ orderDetail.contactTelephone }}</a>
          </span>
        </p>
        <p class="clientAddress margin-top-s"><i class="iconfont icon-IOT-dz"></i><span>{{ orderDetail.serviceAddress }}</span></p>
      </div>
      <div class="margin-top bg-white orderInfo">
        <div class="basicInfo padding-m">
          <div class="orderImg border border-radius margin-right-m">
            <div class="border-radius" :style="{ 'background-image': `url(${$filters.img(orderDetail.productImage,'!wh100')})` }" v-lazy="$filters.img(orderDetail.productImage,'!wh100')"></div>
          </div>
          <div class="bacsicInfoText">
            <h3 class="text-wrapper-overline">{{ orderDetail.productName ? orderDetail.productName : '无产品名称' }}</h3>
            <p v-if="orderDetail.itemCode">{{ orderDetail.itemCode }}</p>
            <div class="valign-center">
              <span v-if="isActiveCode" class="color-primary active-code">激活码：{{ activeCode }}</span>
              <button type="button"
                      class="btn btn-primary-outline btn-xs copy-btn"
                      v-if="isActiveCode"
                      @click="copyAddress(activeCode)">复制</button>
            </div>
            <div class="font-light">产品型号：{{ orderDetail.leaseProduct && orderDetail.leaseProduct.productItemCode ? orderDetail.leaseProduct.productItemCode : '无产品型号' }}</div>
            <!--<div class="money" v-if="ifLease" style="display: none1">
              <div class="deposit font-s border-radius flex">
                <span class="tag-name font-s">押</span>
                <span class="tag-value font-s font-bold-500">¥ {{ orderDetail.leaseProduct && orderDetail.leaseProduct.deviceDeposit ? Number(orderDetail.leaseProduct.deviceDeposit/100).toFixed(2) : 0 }}</span>
              </div>
              <div class="rental">
                <b class="color-primary font-l font-bold-500">¥ {{ Number(orderDetail.leaseProduct.lowestRental/100).toFixed(2) }}</b>
                <span class="color-primary">起/月</span>
              </div>
            </div>-->
          </div>
        </div>
        <!--<v-cell title="产品型号" :value="orderDetail.leaseProduct.productItemCode" class="margin-left-m padding-right-m" v-if="orderDetail.leaseProduct !== null"></v-cell>-->
        <v-cell title="服务类型" :value="orderDetail.shopServiceName" class="margin-left-m padding-right-m"></v-cell>
        <!--个人租赁-->
        <v-cell title="预约时间" :value="`${$filters.formatDate(orderDetail.serviceDate)} ${orderDetail.serviceTime}`" class="margin-left-m padding-right-m" v-if="!orderDetail.leaseCompany"></v-cell>
        <div v-if="orderDetail.images && orderDetail.images.length > 0">
          <div class="flex padding-m padding-left-zero margin-left-m border-bottom">
            <div class="title">问题图片</div>
          </div>
          <div class="flex padding-left-m padding-right-m border-bottom">
            <div class="square-uploadimg">
              <v-image :imgShowList="orderDetail.images" :isUpload="false" :imgRight="true"></v-image>
            </div>
          </div>
        </div>

        <!--企业租赁-->
        <v-cell title="租赁数量" :value="orderDetail.leaseCount" class="margin-left-m padding-right-m" v-if="orderDetail.leaseCompany !== null"></v-cell>
        <v-cell title="租赁公司" :value="orderDetail.leaseCompany" class="margin-left-m padding-right-m" v-if="orderDetail.leaseCompany !== null"></v-cell>
        <v-cell isLink="true" class="margin-left-m padding-right-m" v-if="ifLease" @click.native="leasesOpen()" >
          <div slot="title" style="width: 100%">
            <div class="flex">
              <div class="flex-item">租赁协议</div>
              <span class="margin-left-m color-primary">查看协议</span>
            </div>
          </div>
        </v-cell>
        <!--个人租赁-->
        <v-cell title="备注说明" :value="orderDetail.customerMemo" class="margin-left-m padding-right-m" v-if="orderDetail"></v-cell>

        <div class="secondInfo padding-m padding">
          <p>订单编号: {{ orderDetail.orderId }}</p>
          <p>创建日期: {{ $filters.formatTime(orderDetail.created) }}</p>
        </div>
      </div>
      <div v-if="orderDetail.paidTime && orderDetail.payType" class="bg-white orderInfo padding-left-m" :class="{ 'margin-top': orderFee.length > 0 }">
        <v-cell class="padding-right-m" v-for="item in orderFee" :key="item.subTotal" :title="item.feeTypeDesc" :value="'¥ ' + Number(item.subTotal/100).toFixed(2)"></v-cell>
        <v-cell class="add-num padding-right-m" title="总计" :value="'¥ ' + Number(orderFees/100).toFixed(2)" v-if="orderFee.length > 0"></v-cell>
      </div>
      <!--租赁协议-->
      <mt-popup v-model="leases" position="bottom" class="leases">
        <slot>
          <div class="title padding-m bg-yellow-4">
            <span class="font-default">租赁协议</span>
            <!--<i class="iconfont icon-iot-guanbi" @click="leasesClose()"></i>-->
          </div>
          <p class="padding-m" v-html="rentalDeal ? rentalDeal : '暂无协议内容'">{{ rentalDeal ? rentalDeal : '暂无协议内容' }}</p>
          <button class="btn btn-block btn-primary" @click="leasesClose()">确定</button>
        </slot>
      </mt-popup>

      <!--订单处理日志-->
      <mt-popup v-model="orderLog" position="bottom" class="orderLog">
        <div class="log-box">
          <div class="log-item-box">
            <div class="title padding-m bg-yellow-4">
              <span class="font-default">订单处理日志</span>
            </div>
            <div class="detail-box">
              <div class="order-log-detail padding-m">
                <ul class="padding-bottom-xxl">
                  <li v-for="(item, index) in orderStatus" :key="item.text"
                      class="padding-bottom padding-left-l"
                      :class="{ 'active': index === 0 }">
                    <i class="iconfont" :class="{ 'icon-iot-time': index === 0,'done': index > 0 }"></i>
                    <div class="text-wrapper-overline">{{ item.log }}</div>
                    <div class="margin-top-s">{{ $filters.formatTime(item.created) }}</div>
                  </li>
                </ul>
              </div>
            </div>
            <button class="btn btn-block btn-primary" @click="orderClose()">确定</button>
          </div>
        </div>
      </mt-popup>

      <!-- 按钮组 -->
      <div slot="footer" class="padding-right-m align-right border-top page-footer bg-white" style="height: 50px;line-height: 50px;">
        <action :order="orderDetail" type="view" :isBack="isBack"></action>
      </div>
    </app-view>
  </div>
</template>

<script>
  import VCell from '@/components/ui/v-cell'
  import Action from '@/pages-member/tpl/tpl-action'
  import Status from '@/pages-member/tpl/tpl-status'
  import VImage from '@/components/ui/v-image';
  import Vue from 'vue'
  import VueClipboard from 'v-clipboard'
  Vue.use(VueClipboard)

  export default {
    name: "serviceorder-view",
    data() {
      return {
        orderDetail: {
          contactMobile: '',
          contactName: '',
          productImage: '',
          leaseProduct: {
            lowestRental: 0,
            deviceDeposit: 0,
            productItemCode: ''
          },
          serviceAddress: '',
          productName: '',
          itemCode: '',
          serviceDate: '',
          serviceTime: '',
          orderId: '',
          created: ''
        },
        statusList: {
          prev: '',
          next: ''
        },
        nowStatus: '',
        prevStatus: true,
        nextStatus: true,
        leases: false,
        orderLog: false,
        orderState: {
          created: '',
          log: ''
        },
        orderStatus: [],
        rentalDeal: '',
        statusArr: [],
        ifLease: false,
        cancelBtn: false,
        payBtn: false,
        evaluateBtn: false,
        activeCode: '',
        isActiveCode: false,
        orderFee: [],
        orderFees: 0,
        cur_type: '',
        isBack: false,
      }
    },
    created() {
      this.fetchData()
    },
    beforeRouteEnter(to,from,next) {
      next((vm) => {
        if(from.path === '/serviceorder/create' || from.path === '/lease/order/create') {
          vm.isBack = false
        } else {
          vm.isBack = true
        }
      })
    },
    mounted() {
      this.$nextTick(() => {
        window.onpopstate = () => {
          let _hash = window.location.hash;
          if(_hash) {
            if(_hash.indexOf('win') > -1) {
              this.leases = false;
              this.orderLog = true;
            } else if(_hash.indexOf('lease') > -1) {
              this.leases = true;
              this.orderLog = false;
            }
          }
        }
      })
    },
    methods: {
      /**
       * 拉取数据
       */
      fetchData() {
        // 获取订单详情
        this.$http.get(`${this.$apihost}/serverorders/${this.$route.params.id}`)
          .then((res) => {
            this.orderDetail = res;
            // 判断是否为租赁订单
            if(this.orderDetail.orderType === 'common' || this.orderDetail.orderType === 'returnDeposit') {
              this.ifLease = false;
            } else {
              this.ifLease = true;
            }

            // 获取订单状态列表
            this.$http.get(`${this.$apihost}/serverorders/const/status`)
              .then((res) => {
                this.statusArr = res;
                this.statusArr.forEach((value,index,array) => {
                  // 判断顶部状态
                  if(Number(array[index].name) === Number(this.orderDetail.status)) {
                    this.nowStatus = array[index].value;
                  }
                })
              })

            if(res && res.leaseActivationCode) {
              this.activeCode = res.leaseActivationCode;
              this.isActiveCode = true;
            }

            // 判断操作按钮的显示隐藏
            if(this.orderDetail.status < 40 && this.orderDetail.orderType === 'lease' && this.orderDetail.paidTime === null) {
              this.payBtn = true
              this.evaluateBtn = false
            } else if(this.orderDetail.status === 70) {
              this.payBtn = false
              this.evaluateBtn = true
            }
          })
        // 获取订单日志
        this.$http.get(`${this.$apihost}/serviceorders/${this.$route.params.id}/logs`)
          .then((res) => {
            this.orderStatus = res;
            this.orderState = this.orderStatus[0];
          })
        // 获取订单费用详情
        this.$http.get(`${this.$apihost}/serverorders/${this.$route.params.id}/fees`)
          .then((res) => {
            this.orderFee = res
            this.orderFee.forEach((value,index,array) => {
              this.orderFees += value.subTotal
            })
          })
        this.$store.commit("hideLoading");
      },
      /**
       * 查看租赁协议
       */
      leasesOpen() {
        this.leases = true;
        window.location.hash = 'lease';
        this.$http.get(`${this.$apihost}/lease/products/${this.orderDetail.leaseProduct.id}/agreements`)
          .then((res) => {
            if(res && res.agree) {
              this.rentalDeal = res.agree;
            }
          })
      },
      /**
       * 关闭租赁协议页面
       */
      leasesClose() {
        this.leases = false;
        this.$router.go(-1);
      },
      /**
       * 查看订单日志
       */
      orderOpen() {
        this.orderLog = true;
        window.location.hash = 'win';
      },
      /**
       * 关闭订单日志弹窗
       */
      orderClose() {
        this.orderLog = false;
        this.$router.go(-1);
      },
      /**
       * 复制地址
       * @param val
       */
      copyAddress(val){
        this.$nextTick(() => {
          this.$clipboard(val)
          this.$messenger.success('复制成功')
        })
      }
    },
    components: {
      VCell,
      Action,
      Status,
      VImage
    }
  }
</script>
