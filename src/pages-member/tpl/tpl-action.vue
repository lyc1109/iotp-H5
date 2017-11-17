<style scoped lang="scss" type="text/scss">
  @import '~variables';

  /*.btn-box {*/
    .btn-round {
      @include border-radius(20px);
      border: rem(1px) solid $font-lighter;
      width: auto!important;
      &:last-child {
        background: $primary;
        background-color: $primary;
        color: $white;
        @include border(all,$primary);
      }
    }
  /*}*/
</style>
<template>
  <div>
    <!--订单操作-->
    <div v-if="order">
      <button v-if="type === 'view'"
              type="button"
              class="btn btn-sm btn-round"
              @click="back()">返回</button>
      <button v-if="order.status < 70 && type === 'view' && (order.orderType === 'business' || (order.orderType === 'lease' && order.leaseFeature !== 'company'))"
              type="button"
              class="btn btn-sm btn-round"
              @click="cancelOrder(order)">取消订单</button>
      <button v-if="order.status < 60 && type === 'view' && order.orderType === 'common'"
              type="button"
              class="btn btn-sm btn-round"
              @click="cancelOrder(order)">取消订单</button>
      <button v-if="order.status === 70"
              type="button"
              class="btn btn-sm btn-round"
              :class="{ 'btn-primary': type === 'list','btn-primary-outline': type === 'view','btn-sm': type === 'view' }"
              @click.stop="$router.push({ path: `/serviceorder/${order.id}/evaluate`,query: orderItem })">去评价</button>
      <button v-if="(order.status === 0 || order.status === 40 || order.status === 60) && order.orderType === 'lease' && !order.paidTime"
              type="button"
              class="btn btn-sm btn-round"
              :class="{ 'btn-primary': type === 'list','btn-primary-outline': type === 'view','btn-sm': type === 'view' }"
              @click.stop="recharge(order)">支付订单</button>
    </div>
    <!--<div v-if="deviceData" class="flex">
      <button type="button" class="btn btn-sm btn-round margin-right" @click.stop="editDevice(deviceData.id)">编辑信息</button>
      <button type="button" class="btn btn-sm btn-round margin-right" @click.stop="repair(deviceData.device)">一键报修</button>
      <button v-if="deviceData.device && deviceData.device.deviceType == 'L' && deviceData.userRole" style="display: none;"
              type="button" class="btn btn-sm btn-round margin-right btn-primary">退租</button>
      <button v-if="deviceData.device && deviceData.device.deviceType == 'L' && !deviceData.device.company"
              type="button" class="btn btn-sm btn-round margin-right btn-primary"
              @click.stop="recharge(deviceData)">续费</button>
      <button v-if="type === 'view'"
              type="button"
              class="btn btn-sm btn-round btn-primary-outline"
              @click="back()">返回</button>
    </div>-->
    <div v-if="type === 'oauth'">
      <button class="btn btn-sm btn-round margin-left-m" @click.stop="reject(order.id)">拒绝</button>
      <button class="btn btn-sm btn-round" @click.stop="approve(order.id)">同意</button>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'member-action',
    props: ['order','type','isBack','deviceData','backPath'],
    data (){
      return {
        cancelBtn: true
      }
    },
    computed: {
      // 当前订单数据
      orderItem() {
        let _temp = this.order;
        let _data = {
          id: _temp.id,
          productImage: _temp.productImage,
          productName: _temp.productName,
          shopServiceName: _temp.shopServiceName,
          orderId: _temp.orderId,
          assignee: _temp.assignee,
        }
        return {
          order: encodeURIComponent(JSON.stringify(_data))
        }
      }
    },
    methods: {
      // 取消订单
      cancelOrder(order) {
        let that = this;
        let options = {
          showInput: true,
          showCancelButton: true,
          inputPlaceholder: "请填写取消原因",
          inputValidator(value) {
            if(value === null || value.replace(/^\s+|\s+$/g,"").length === 0){
              return "请填写内容";
            }
          }
        };
        that.$messagebox.prompt(" ","请填写取消原因",options).then(({ value, action }) => {
          if(action === 'confirm') {
            that.$http.post(`${that.$apihost}/serviceorders/${order.id}/cancel`,{
              cancel_info: value
            })
              .then((res) => {
                if(res){
                  that.$messenger.success('取消成功');
                  setTimeout(() => {
                    that.$store.state.refresh = true;
                    that.$router.push('/serviceorder');
                  },1000)
                }
              })
          }
        })
      },
      /**
       * 返回
       */
      back() {
        if(this.order) {
          if(this.isBack) {
            this.$router.go(-1);
          } else {
            this.$router.push({ path: '/serviceorder', query: { id: '' } });
          }
        } else if(this.deviceData) {
          if(this.backPath === 'bindPath') {
            this.$router.push('/devices');
          } else {
            this.$router.go(-1);
          }
        }
      },
      /**
       * 编辑设备信息
       */
      editDevice(id) {
        this.$router.push(`/devices/${id}/edit`);
      },
      /**
       * 一键报修
       */
      repair(device) {
        let _temp = device;
        this.$router.push({
          path: `/serviceorder/create`,
          query: {
            id: _temp.id,
            deviceId: _temp.deviceId,
            deviceName: _temp.deviceName,
            productId: _temp.productId,
            productImage: _temp.productImage,
            itemCode: _temp.itemCode,
            purchasedDate: this.$filters.formatDate(_temp.purchasedDate)
          }
        });
      },
      /**
       * 支付押金
       */
      recharge(order) {
        let _temp = order;
        this.$router.push({
          path: `/serviceorders/pay/deposit/${_temp.id}`,
          query: {
            leaseProductId: _temp.leaseProduct && _temp.leaseProduct.id,
            isOrderPay: true
          }
        });
      },
      /**
       * 同意授权
       * @param id
       */
      approve(id) {
        let that = this;
        this.$http.post(`${this.$apihost}/userdevices/${id}/approve-authorization`)
          .then((res) => {
            that.$toast.success('授权成功！');
            setTimeout(function () {
              that.$router.go(0);
            },500);
          })
      },
      /**
       * 拒绝授权申请
       * @param id
       */
      reject(id) {
        let that = this;
        this.$http.post(`${this.$apihost}/userdevices/${id}/reject-authorization`)
          .then((res) => {
            that.$toast.success('已拒绝授权申请！');
            setTimeout(function () {
              that.$router.go(0);
            },500);
          })
      }
    },
  }
</script>
