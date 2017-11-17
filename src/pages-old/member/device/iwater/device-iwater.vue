<style scoped lang="scss" type="text/scss">
  @import "~variables";

  .iWater-main {
    background: url("/static/images/devices/bg.png") no-repeat;
    background-size: 100% rem(400px);

    .i-water-nav {
      background: $primary-light;
      border: 0 none;
      display: block;
      margin: 0 auto;
      width: 50%;
      position: relative;
      @include border-radius(rem(30px));

      .mint-tab-item {
        color: #fff;
        width: 50%;
        display: inline-block;

        &.is-selected {
          color: #fff;
          border-bottom-color: #fff;
          margin-bottom: 0;
        }
      }
    }
    .purest {
      /*padding-top: rem(80px);*/
      /*background-position: center;*/

      h2.title {
        width: 100%;
        color: #fff;
        text-align: center;
        font-weight: 100;
      }
      .purestNum {
        display: flex;

        .beforePurest, .afterPurest {
          flex: 1;
          color: #fff;
          text-align: center;

          b {
            font-size: $font-size-l;
          }
          i {
            font-style: inherit;
          }
          span {
            width: 100%;
            display: inline-block;
          }
        }
        .pursetCircle {
          flex: 2;
          text-align: center;
        }
      }
      .purseDate{
        padding-bottom: rem(100px);
      }
      .operate-box {
        ul {
          width: 100%;
          display: inline-block;

          li {
            width: 32%;
            display: inline-block;
            float: left;
            text-align: center;
            margin-bottom: rem(20px);

            .operate-btn {
              background: $yellow-3;
              /*padding-top: rem(10px);*/
              /*padding-bottom: rem(10px);*/
              @include border-radius(50%);
              width: rem(50px);
              height: rem(50px);
              text-align: center;
              margin: 0 auto;

              i {
                font-size: $font-size-l;
                color: #fff;
                position: relative;
                top: 30%;
              }
            }
            span {
              width: 100%;
              display: inline-block;
              line-height: rem(25px);
              margin-top: rem(5px);
              color: #888;
            }
            &:nth-child(2) {
              .operate-btn {
                background: $green-6;
              }
            }
            &:nth-child(3) {
              .operate-btn {
                background: $blue-1;
              }
            }
            &:nth-child(4) {
              .operate-btn {
                background: $green-5;
              }
            }
            &:nth-child(5) {
              .operate-btn {
                background: $primary;
              }
            }
            &:last-child {
              .operate-btn {
                background: #999;
              }
            }
          }
        }
      }
    }
    .toggleStatistics {
      width: rem(200px);
      margin: 0 auto;
      @include border-radius(rem(20px));
      height: rem(35px);
      line-height: rem(35px);

      .mint-navbar {
        position: relative;
        background-color: $primary-light;
        background-image: none;
        border-radius: 20px;
        padding: rem(5px);
        border: 0 none;

        .mint-tab-item {
          color: $white;
          width: 21%;
          text-align: center;
          @include border-radius(rem(20px));
          min-width: inherit;
          border: none;
          padding: rem(10px);
          /*height: rem(35px);*/
          /*line-height: rem(35px);*/

          &.is-selected {
            color: $primary;
            background: $white;
          }
        }
      }
    }

    .filter-life {
      /*background: url("/static/images/devices/bg.png") no-repeat;*/
      /*background-size: 100% rem(350px);*/
      /*padding-top: rem(80px);*/
      /*background-position: 0 rem(50px);*/

      .perhaps-filter {
        ul {
          display: inline-block;
          width: 100%;

          li {
            width: 50%;
            display: inline-block;
            float: left;
            text-align: center;

            span {
              color: #fff;

              i {
                background: rgba(85, 85, 85, 0.5);
                font-size: $font-size-l;
                @include border-radius(50%);
                font-style: inherit;
                width: rem(25px);
                height: rem(25px);
                display: inline-block;
                line-height: rem(25px);
              }
            }
          }
        }
      }
      .fresh-filter {
        width: 90px;
        height: 90px;
        @include border-radius(50%);
        background: #fff;
        border: rem(8px) solid rgba(6, 123, 198, 0.68);
        margin: 0 auto;
        text-align: center;

        i {
          margin-top: 20%;
          display: inline-block;
          width: 100%;
          color: $primary;
          font-size: $font-size-l;
        }

        span {
          color: $primary;
          display: inline-block;
        }
      }
      .before-after {
        content: '';
        background: #fff;
        @include border-radius(50%);
        display: block;
        margin: 0 auto;
        position: relative;
      }
      .before-circle {
        &:before, &:after {
          @extend .before-after;
        }
        &:before {
          width: rem(30px);
          height: rem(10px);
          top: rem(-15px);
        }
        &:after {
          width: rem(20px);
          height: rem(10px);
          top: rem(-8px);
        }
      }
      .after-circle {
        &:before, &:after {
          @extend .before-after;
        }
        &:before {
          width: rem(15px);
          height: rem(7px);
          top: rem(5px);
        }
        &:after {
          width: rem(10px);
          height: rem(4px);
          top: rem(20px);
        }
      }
      .filter-list {
        ul {
          display: inline-block;
          width: 100%;

          li {
            width: 100%;
            background: #fff;
            @include border-radius(rem(5px));

            h4 {
              width: 35%;
              display: inline-block;
              float: left;
              font-size: rem(14px);
              font-weight: normal;
              margin-bottom: 0;
              overflow: hidden;
            }
            .filter-num {
              width: 53%;
              display: inline-block;

              .mt-progress {
                height: rem(25px);
                line-height: rem(25px);
              }
              span {
                color: #888;
                font-size: $font-size-s;
              }
            }
          }
        }
      }
    }
    .point {
      transform: rotate(120deg);
    }
  }
  .image-main {
    justify-content: center;
    .img-box {
      flex: 0 0 30%;
      .image-rounded {
        width: 100%;
        height: 100%;
        @include border-radius(rem(5px));
      }
    }
  }
</style>

<template>
  <app-view>
    <div class="iWater-main">
      <div class="toggleStatistics padding-top-m">
        <mt-navbar v-model="iWaterNavs">
          <mt-tab-item v-for="item in iWaterTabs" :id="item.id" :key="item.id">{{ item.label }}</mt-tab-item>
        </mt-navbar>
      </div>
      <!--智能净水-->
      <div class="purest margin-top-l" v-show="iWaterNav === 'purest'">
        <h2 class="title">{{ iWaterList.title }}</h2>
        <div class="purestNum margin-top-m">
          <div class="beforePurest margin-left margin-top-xl">
            <b>{{ iWaterList.inWaterTds }}</b>
            <i>mg/L</i>
            <span>净化前TDS值</span>
          </div>
          <div class="pursetCircle">
            <canvas id="circle" width="150" height="150"></canvas>
          </div>
          <div class="afterPurest margin-left margin-top-xl padding-right">
            <b>{{ iWaterList.outWaterTds }}</b>
            <i>mg/L</i>
            <span>净化后TDS值</span>
          </div>
        </div>
        <div class="purseDate align-center margin-top">
          <span class="color-white padding-top padding-bottom">租赁到期日：{{ $filters.formatDate(iWaterList.leaseDueDate) }}</span>
        </div>
        <div class="operate-box">
          <ul>
            <li @click="detail()">
              <div class="operate-btn">
                <i class="iconfont icon-iot-setting"></i>
              </div>
              <span>设备详情</span>
            </li>
            <!--<router-link :to="{ path: '/serviceorder/create',query: getDeviceQuery() }"></router-link>-->
            <li @click="book()">
              <div class="operate-btn">
                <i class="iconfont icon-iot-yuyue"></i>
              </div>
              <span>服务预约</span>
            </li>
            <router-link :to="{ path: `/old/devices/${this.$route.params.id}/report` }">
              <li>
                <div class="operate-btn">
                  <i class="iconfont icon-iot-jingshuitongji"></i>
                </div>
                <span>净水统计</span>
              </li>
            </router-link>
            <li @click="oauthManage(iWaterList)">
              <div class="operate-btn">
                <i class="iconfont icon-iot-shouquan"></i>
              </div>
              <span>授权管理</span>
            </li>
            <li @click="clean()">
              <div class="operate-btn">
                <i class="iconfont icon-iot-chongxi"></i>
              </div>
              <span>一键冲洗</span>
            </li>
            <li @click="resets()">
              <div class="operate-btn">
                <i class="iconfont icon-iot-huifu"></i>
              </div>
              <span>恢复出厂设置</span>
            </li>
            <li @click="restoreWiFi()">
              <div class="operate-btn">
                <i class="iconfont icon-iot-wifi"></i>
              </div>
              <span>重新配网</span>
            </li>
            <li @click="off()">
              <div class="operate-btn">
                <i class="iconfont icon-iot-guanji"></i>
              </div>
              <span>{{ power }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!--滤芯寿命-->
      <div class="filter-life" v-show="iWaterNav === 'filter'">
        <div class="flex margin-top-xl margin-bottom">
          <div class="flex-item align-center color-white"><b class="font-xl font-bold-500">{{ iWaterList.outWaterTotalFlow/1000 }}</b><div class="font-s">总净水量(L)</div></div>
          <div class="flex-item align-center color-white"><b class="font-xl font-bold-500">{{ iWaterList.outWaterTodayFlow/1000 }}</b><div class="font-s">今日净水(L)</div></div>
          <div class="flex-item align-center color-white"><b class="font-xl font-bold-500">{{ iWaterList.outWaterAvgFlow/1000 }}</b><div class="font-s">日均用水(L)</div></div>
        </div>
        <div class="flex image-main">
          <div class="padding img-box">
            <img class="image-rounded flex-item" :src="$filters.img(iWaterList.productImage)" alt="">
          </div>
        </div>
        <div class="perhaps-filter padding-l">
          <ul>
            <li><span>设备共有滤芯 <i>{{ filters.num }}</i> 个</span></li>
            <li><span>将过期滤芯 <i>{{ filters.overdueNum }}</i> 个</span></li>
          </ul>
        </div>
        <div class="filter-list margin-top padding-m">
          <ul>
            <li v-for="(item,index) in filterProgress" class="padding-top-m padding-bottom-s margin-top" @click="filterDetail(item,index)">
              <h4 class="margin-left margin-top margin-right">{{ item.name }}</h4>
              <div class="filter-num margin-right margin-top">
                <mt-progress :value="item.availablePercentage" :bar-height="10" :class="item.progressColor"></mt-progress>
                <span>预计可用：{{ item.estimatedDays }}</span>
              </div>
            </li>
          </ul>
          <app-empty-view v-if="filterProgress.length === 0 ? showEmpty : hideEmpty"></app-empty-view>
        </div>
      </div>
    </div>
  </app-view>
</template>

<script>
  import AppView from '@/components/layouts/app-view'
  import { NavBar,TabItem } from 'mint-ui'
  import CircleBar from '@/assets/scripts/circle-bar'
  import MessageBox from '@/assets/scripts/message-box'
  import moment from 'moment'
  import Messenger from '@/assets/scripts/messenger'
  import AppEmptyView from '@/components/layouts/app-empty-view'

  export default{
    name: "devices-iwater",
    data () {
      return {
        myBarChart: null,
        myLineChart: null,
        lineStyle: {
          width: '100%'
        },
        iWaterNav: 'purest',
        iWaterTabs: [
          {
            id: 'purest',
            label: '智能净水'
          },
          {
            id: 'filter',
            label: '滤芯寿命'
          }
        ],
        iWaterList: {
          productName: '',
          title: '',
          inWaterTds: '',
          outWaterTds: '',
          productImage: '',
          outWaterTotalFlow: 0,
          outWaterTodayFlow: 0,
          outWaterAvgFlow: 0
        },
        circleProgress: 100,
        barXData: [],
        filterProgress: [],
        filters: {
          num: 0,
          overdueNum: 0
        },
        barData: [],
        lineData: [],
        bookQuery: {
          id: '',
          deviceId: '',
          deviceName: '',
          productId: '',
          productImage: '',
          itemCode: '',
          purchaseDate: ''
        },
        i: 0,
        timer: null,
        power: '开机',
        instruct: '',
        instructText: '',
        showEmpty: true,
        hideEmpty: false
      }
    },
    created () {
      this.fetchData()
    },
//    mounted(){
//      this.$nextTick(() => {
//        this.waterFetch()
////        this.waterBar()
//      })
//    },
    computed: {
      iWaterNavs: {
        get(){
          return this.iWaterNav
        },
        set(val){
          this.iWaterNav = val
        }
      },
    },
    methods: {
      fetchData(){
//          // 智能净水
        this.$http.get(`${this.$apihost}/waterdevices/${this.$route.params.id}`)
          .then((res) => {
            this.$nextTick(() => {
              // 净水率
              if(res.iotDevice.outWaterTds > 0){
                this.circleProgress = parseInt((1 - (res.iotDevice.outWaterTds / res.iotDevice.inWaterTds)) * 100)
              }
              if(document.querySelector('#circle').getContext('2d') !== null) {
                CircleBar.draw('#circle', this.circleProgress)
              }
            })
            if(res.iotDevice.powerOn){
              this.power = '关机'
            }else{
              this.power = '开机'
            }
            // 产品预约参数
            this.bookQuery.id = this.$route.query.id
            this.bookQuery.deviceId = this.$route.params.id
            this.bookQuery.deviceName = res.deviceName
            this.bookQuery.productId = res.productId
            this.bookQuery.productImage = res.productImage
            this.bookQuery.itemCode = res.itemCode
            this.bookQuery.purchaseDate = res.purchaseDate

            // 滤芯
            if(res.iotDevice.parts !== null) {
              this.filterProgress = res.iotDevice.parts
              this.filters.num = res.iotDevice.parts.length
              this.filterProgress.forEach((value, index, array) => {
//                  array[index].id = res.id
                if(array[index].estimatedDays === -1){
                  array[index].estimatedDays = '估算中...'
                }else {
                  array[index].estimatedDays = `${array[index].estimatedDays}天`
                }
              })
              let overFilters = this.filterProgress.filter((r) => r.availablePercentage < 5)
              this.filters.overdueNum = overFilters.length
              console.log(typeof overFilters)
            }

            this.iWaterList.inWaterTds = res.iotDevice && res.iotDevice.inWaterTds
            this.iWaterList.outWaterTds = res.iotDevice && res.iotDevice.outWaterTds
            if(res.iotDevice.outWaterTds < 60){
              this.iWaterList.title = '水质极好'
            }else if(res.iotDevice.outWaterTds > 59 && res.iotDevice.outWaterTds < 100){
              this.iWaterList.title = '水质很好'
            }else if(res.iotDevice.outWaterTds > 99 && res.iotDevice.outWaterTds < 300){
              this.iWaterList.title = '水质一般'
            }else if(res.iotDevice.outWaterTds > 299){
              this.iWaterList.title = '水质污染'
            }

            this.iWaterList.productName = res.productName
            this.iWaterList.productImage = res.productImage
            this.iWaterList.outWaterTotalFlow = res.iotDevice.outWaterTotalFlow
            this.iWaterList.outWaterTodayFlow = res.iotDevice.outWaterTodayFlow
            this.iWaterList.outWaterAvgFlow = res.iotDevice.outWaterAvgFlow
          })
        this.filterProgress.forEach((value,index,array) => {
          if((index%3) === 0){
            array[index].progressColor = {
              'redProgress': true,
              'greenProgress': false,
              'yellowProgress': false
            }
          }else if((index+2)%3 === 0){
            array[index].progressColor = {
              'redProgress': false,
              'greenProgress': true,
              'yellowProgress': false
            }
          }else if((index+4)%3 === 0){
            array[index].progressColor = {
              'redProgress': false,
              'greenProgress': false,
              'yellowProgress': true
            }
          }
        })
      },
//        设备详情
      detail(){
        this.$router.push(`/old/devices/${this.$route.query.id}/view`)
      },
//        服务预约
      book(){
        this.$router.push({
          path: '/serviceorder/create',
          query: {
            id: this.bookQuery.id,
            deviceId: this.bookQuery.deviceId,
            deviceName: this.bookQuery.deviceName,
            productId: this.bookQuery.productId,
            productImage: this.bookQuery.productImage,
            itemCode: this.bookQuery.itemCode,
            purchaseDate: this.bookQuery.purchaseDate
          }
        })
      },
      // 轮询指令状态
      executeInstruction(index){
        this.i ++
        this.$http.get(`${this.$apihost}/waterdevices/${this.$route.params.id}/getInstructionResult/${this.instruct}`)
          .then((res) => {
            if(this.i < index){
              if(res !== undefined){
                if(res.executed){
                  clearTimeout(this.timer)
                  this.$store.commit('hideLoading')
                  Messenger.success(`${this.instructText}成功`)
                  setTimeout(() => {
                    this.$router.go(0)
                  },1000)
                }
              }
            }else if(this.i === index){
              if(res !== undefined){
                if(res.executed){
                  clearTimeout(this.timer)
                  this.$store.commit('hideLoading')
                  Messenger.success(`${this.instructText}成功`)
                  setTimeout(() => {
                    this.$router.go(0)
                  },1000)
                }else{
                  clearTimeout(this.timer)
                  this.$store.commit('hideLoading')
                  Messenger.error(`${this.instructText}失败`)
                  setTimeout(() => {
                    this.$router.go(0)
                  },1000)
                }
              }else{
                clearTimeout(this.timer)
                this.$store.commit('hideLoading')
                Messenger.error(`${this.instructText}失败`)
                setTimeout(() => {
                  this.$router.go(0)
                },1000)
              }
            }
          })
        this.timer = setTimeout(() => {
          this.executeInstruction(index)
        },1000)
      },
//        一键冲洗
      clean(){
        MessageBox.confirm('确定一键冲洗？').then(() => {
          this.$store.commit("showLoading")
          this.cleanSure()
        })
      },
//        关机
      off(){
        MessageBox.confirm(`确定${this.power}？`).then(() => {
          this.$store.commit("showLoading")
          this.offSure()
        })
      },
//        恢复出厂设置
      resets(){
        MessageBox.confirm('确定恢复出厂设置？').then(() => {
          this.$store.commit("showLoading")
          this.resetSure()
        })
      },
      restoreWiFi(){
        MessageBox.confirm('确定重新配网？').then(() => {
          this.$store.commit("showLoading")
          this.restoreWiFiSure()
        })
      },
//        确定一键冲洗
      cleanSure(){
        this.$http.post(`${this.$apihost}/waterdevices/${this.$route.params.id}/executeInstruction/flush`)
          .then((res) => {
            this.instruct = res
            this.instructText = '一键冲洗'
            this.executeInstruction(15)
          })
      },
//        确定关机
      offSure(){
        this.$http.post(`${this.$apihost}/waterdevices/${this.$route.params.id}/executeInstruction/onoff`)
          .then((res) => {
            this.instruct = res
            this.instructText = this.power
            this.executeInstruction(15)
            if(this.instructText === '关机'){
              this.circleProgress = 0
            }
          })
      },
//        确定恢复出厂设置
      resetSure(){
        this.$http.post(`${this.$apihost}/waterdevices/${this.$route.params.id}/executeInstruction/restore`)
          .then((res) => {
            this.instruct = res
            this.instructText = '恢复出厂设置'
            this.executeInstruction(15)
          })
      },
      restoreWiFiSure(){
        this.$http.post(`${this.$apihost}/waterdevices/${this.$route.params.id}/executeInstruction/restoreWiFi`)
          .then((res) => {
            this.instruct = res
            this.instructText = '重新配网'
            this.executeInstruction(15)
          })
      },
//        授权管理
      oauthManage(device){
        this.$router.push({
          path: `/old/devices/${this.$route.params.id}/oauth`,
          query: {
            productName: device.productName,
            productImage: device.productImage
          }
      })
      },
      // 刷新滤芯状态
      freshFilter(){
        this.$store.commit("showLoading")
        this.$http.get(`${this.$apihost}/waterdevices/${this.$route.params.id}`)
          .then((res) => {
            this.$store.commit("hideLoading")
            if (res.iotDevice.parts !== null) {
              this.filterProgress = res.iotDevice.parts
              this.filters.num = res.iotDevice.parts.length
              this.filterProgress.forEach((value, index, array) => {
//                  array[index].id = res.id
                if (array[index].estimatedDays === -1) {
                  array[index].estimatedDays = '估算中...'
                } else {
                  array[index].estimatedDays = `${array[index].estimatedDays}天`
                }
              })
              let overFilters = this.filterProgress.filter((r) => r.availablePercentage < 5)
              this.filters.overdueNum = overFilters
            }
          })
      },
      filterDetail(filter,index){
        this.$router.push({
          path: `/old/devices/${this.$route.params.id}/filter`,
          query: {
            partProductId: filter.partProductId,
            index: index,
            availablePercentage: filter.availablePercentage,
            estimatedDays: filter.estimatedDays
          }
        })
      }
    },
    components: {
      AppView,
      AppEmptyView
    }
  }
</script>
