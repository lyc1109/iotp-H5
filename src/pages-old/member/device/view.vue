<style scoped lang="scss" type="text/scss">
  @import '~variables';

  .device-bg{
    flex: 0 0 20%;

    &>div{
      width: 100%;
      height: 0;
      padding-bottom: 50%;
      background: linear-gradient(to bottom,#2f8cfc,#03a9f4);
      background-size: cover;

      .device-img {
        justify-content: center;

        .flex-item {
          flex: 0 0 20%;

          .device-image {
            width: 100%;
            @include border-radius(rem(5px));
          }
        }
      }
    }
  }
  .more-icon{
    &:after,&:before{
      position: relative;
    }
    &:before{
      right: rem(-16.5px);
    }
  }
  .oauth-icon{
    position: relative;
    top: rem(5px);
  }
</style>
<template>
  <app-view>
    <div class="device-bg">
      <div>
        <div class="flex device-img padding-top-l">
          <div class="flex-item">
            <img :src="$filters.img(deviceList.device.productImage)" class="device-image" />
          </div>
        </div>
        <div class="flex flex-center margin-top-m">
          <span class="font-m color-white">{{ deviceList.device.productName }}</span>
        </div>
        <div class="flex flex-center margin-top margin-bottom">
          <span class="color-white font-bold-400">{{ deviceList.device.itemCode }}</span>
        </div>
      </div>
    </div>

    <div class="device-details margin-top bg-white padding-left padding-right">
      <v-cell title="设备别名" :value="deviceList.device.deviceName"></v-cell>
      <v-cell title="设备ID" :value="deviceList.device.deviceId" v-if="deviceList.device.deviceType !== 'C'"></v-cell>
      <v-cell title="设备MAC" :value="deviceList.device.iotDevice.deviceMac" v-if="deviceList.device.deviceType !== 'C'"></v-cell>
      <v-cell title="公司名称" :value="deviceList.device.company" v-if="deviceList.device.company !== null"></v-cell>
      <v-cell title="安装地址" :value="deviceList.device.address.fullAddress"></v-cell>
      <v-cell title="商品规格">
        <slot>
          <div v-for="item in specList">
            <span>{{ item.name }}：{{ item.value }}</span>
          </div>
        </slot>
      </v-cell>
    </div>

    <div class="margin-top bg-white padding-left padding-right" v-if="deviceList.device.deviceType === 'L'">
      <div v-if="deviceList.device.activedAt !== null">
        <v-cell title="押金" :value="$filters.formatCurrency(deviceList.device.leaseDeposit/100)"></v-cell>
        <v-cell title="租赁日期" :value="$filters.formatDate(deviceList.device.purchasedDate)"></v-cell>
        <v-cell title="租赁到期日" :value="$filters.formatDate(deviceList.device.leaseDueDate)"></v-cell>
      </div>
      <router-link :to="{ path: `/old/serviceOrder/${deviceList.device.leaseOrderEntityId}` }">
        <v-cell title="租赁订单">
          <slot>
            <i class="icon-iot-youjiantou1 iconfont font-s font-light pull-right"></i>
          </slot>
        </v-cell>
      </router-link>
      <v-cell title="缴费记录" @click.native="rechargeRecord">
        <slot>
          <i class="icon-iot-youjiantou1 iconfont font-s font-light pull-right"></i>
        </slot>
      </v-cell>
    </div>

    <div class="margin-top bg-white padding-left padding-right" v-if="deviceList.device.deviceType !== 'L'">
      <v-cell title="购买日期" :value="$filters.formatDate(deviceList.device.purchasedDate)"></v-cell>
      <v-cell title="发票日期" :value="$filters.formatDate(deviceList.device.invoiceDate)"></v-cell>
      <v-cell title="保修期" :value="$filters.formatDate(deviceList.device.warrantyPeriod)"></v-cell>
      <v-cell title="发票图片">
        <slot>
          <img v-if="deviceList.device.invoiceImagePath !== null" :src="$filters.img(deviceList.device.invoiceImagePath,'!wh100')" />
          <span v-else>无</span>
        </slot>
      </v-cell>
    </div>

    <div class="margin-top bg-white padding-left padding-right">
      <router-link :to="{ path: `/old/devices/${$route.params.id}/serviceOrder` }">
        <v-cell title="设备服务订单">
          <slot>
            <i class="icon-iot-youjiantou1 iconfont font-s font-light pull-right"></i>
          </slot>
      </v-cell>
      </router-link>
      <router-link :to="{ path: `` }">
        <v-cell title="授权管理">
          <slot>
            <span class="inline-block">已授权{{ oauthNum }}人</span>
            <i class="icon-iot-youjiantou1 iconfont font-s font-light pull-right oauth-icon"></i>
          </slot>
        </v-cell>
      </router-link>
    </div>

    <!--缴费记录-->
    <mt-popup v-model="record" position="bottom" class="orderLog">
      <slot>
        <div class="title padding-left-m padding-right-m">
          <span>缴费记录</span>
          <i class="iconfont icon-iot-guanbi" @click="hideRecord()"></i>
        </div>
        <div class="order-log-detail padding-m">
          <ul>
            <li v-for="(item,index) in recordList" :key="item.text" :class="{ 'active': item.isActive, 'padding-bottom': item.paddingBottom }">
              <i :class="{ 'iconfont': item.fa,'icon-iot-time': item.isFa,'done': item.isDone }"></i>
              <span>{{ $filters.formatDate(item.paidAt) }}</span>
              <span class="margin-left">{{ item.leaseProductPackageName }}</span>
              <span class="padding-bottom margin-left">{{ $filters.formatCurrency(item.totalAmount/100) }}</span>
            </li>
          </ul>
        </div>
        <button class="btn btn-block btn-primary" @click="hideRecord()">确定</button>
      </slot>
    </mt-popup>
  </app-view>
</template>
<script>
  export default {
    name: '',
    data (){
      return {
        deviceList: {
          productName: '',
          itemCode: '',
          device: {
            deviceName: '',
            deviceId: '',
            id: '',
            productImage: '',
            iotDevice: {
              deviceMac: ''
            },
            address: {
                fullAddress: ''
            },
            invoiceImagePath: ''
          }
        },
        specList: [],
        record: false,
        recordList: [],
        oauthNum: 0
      }
    },
    created(){
      this.fetchData()
    },
    methods: {
      fetchData(){
        this.$http.get(`${this.$apihost}/userdevices/${this.$route.params.id}`)
          .then((res) => {
            this.deviceList = res
            this.$http.get(`${this.$apihost}/productspecs/${this.deviceList.device.productId}`)
              .then((res) => {
                this.specList = res.specItems
              })
            this.oauthNums()
          })
      },
      // 授权人数
      oauthNums(){
        this.$http.get(`${this.$apihost}/userdevices/${this.deviceList.device.id}/authorizations/count`)
          .then((res) => {
            this.oauthNum = res
          })
      },
      // 缴费记录
      rechargeRecord(){
        this.record = true
        this.$http.get(`${this.$apihost}/lease/devices/${this.deviceList.device.id}/rechargeorders`)
          .then((res) => {
            this.recordList = res
            this.recordList.forEach((value,index,array) => {
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
      },
      hideRecord(){
        this.record = false
      }
    }
  }
</script>
