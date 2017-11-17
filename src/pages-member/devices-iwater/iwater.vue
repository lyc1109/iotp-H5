<style scoped lang="scss" type="text/scss">
  @import "~variables";

  .iWater-main {
    position: absolute;
    left: 0;
    right: 0;

    .i-water-nav {
      background: $primary;
      border: 0 none;

      .mint-tab-item {
        color: #fff;

        &.is-selected {
          color: #fff;
          border-bottom-color: #fff;
          margin-bottom: 0;
        }
      }
    }
    .purest-box {
      .purest {
        background-color: $primary!important;
        background: url("/static/images/devices/bg.png") #fff no-repeat;
        background-size: 100% rem(290px);
        padding: rem(50px) 0;
        background-position: 0 rem(50px);

        .title {
          font-weight: 100;
        }
        .pay-btn-box {
          position: relative;
          .pay-box {
            position: absolute;
            right: 0;
            top: -9px;

            .flex-item {
              background-color: $yellow-6;
              background-image: -webkit-linear-gradient(left, $yellow-5, $yellow-6);
              background-image: linear-gradient(to right, $yellow-5, $yellow-6);
              padding: rem(5px) rem(5px) rem(5px) rem(20px);
              border-radius: 30px 0 0 30px;
              .color-brown {
                color: $brown-1;
              }
            }
          }
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

            .font-opacity {
              color: rgba($white,.7);
            }
          }
          .pursetCircle {
            flex: 2;
            text-align: center;
          }
        }
      }
      .operate-box {
        .btn-gruop-box {
          .btn-box {
            .operate-btn {
              width: rem(50px);
              height: rem(50px);
              text-align: center;
              justify-content: center;
              background: $font-light;
              @include border-radius(50%);

              .iconfont {
                font-size: $font-size-l;
                color: $white;
              }
            }
            .icon-box {
              justify-content: center;
            }
            span {
              width: 100%;
              display: inline-block;
              line-height: rem(25px);
              margin-top: rem(5px);
              color: #888;
            }

            .operate-btn {
              &.operate-1 {
                background: $success;
              }
              &.operate-2 {
                background: $primary;
              }
              &.operate-3 {
                background: $warning;
              }
              &.operate-4 {
                background: $danger-light;
              }
              &.operate-5 {
                background: $primary-light;
              }
              &.operate-6 {
                background: $info;
              }
            }
          }
        }
      }
    }
    .statistics {
      background: url("/static/images/devices/bg.png") #fff no-repeat;
      background-size: 100% rem(400px);
      padding-top: rem(50px);
      background-position: 0 rem(50px);

      .toggleStatistics {
        width: rem(200px);
        margin: $m auto;
        background: #fff;
        @include border-radius(rem(20px));

        .mint-tabbar {
          position: relative;
          background-color: #fff;
          background-image: none;
          border-radius: 20px;
          padding: rem(5px);

          .mint-tab-item {
            color: $primary;
            width: 21%;
            text-align: center;
            @include border-radius(rem(20px));
            min-width: inherit;
            border: none;
            padding: rem(10px);
            /*height: rem(35px);*/
            /*line-height: rem(35px);*/

            .mint-tab-item-label {
              /*line-height: rem(35px);*/
            }

            &.is-selected {
              color: #fff;
              background: $primary;
            }
          }
        }
      }
      #myChart {
        width: 100%;
        height: rem(300px);

        & > div {
          width: 100% !important;
        }
      }
      .realTime {
        /*&>div{*/
        /*width: 100%;*/
        /*height: rem(300px);*/
        /*}*/
        h3 {
          font-weight: normal;
          @include border(bottom);
        }
        ul {
          li {
            display: flex;

            &:first-child {
              .real-logo {
                &:after {
                  height: 50%;
                  position: relative;
                  top: 50%;
                }
              }
            }
            &:last-child {
              .real-data {
                border-bottom: 0 none;
              }
            }

            .real-logo {
              flex: 0 0 20%;
              position: relative;

              &:after {
                width: rem(1px);
                height: 100%;
                background: $green-6;
                content: '';
                display: inline-block;
              }

              i {
                color: $green-6;
                display: inline-block;
                position: absolute;
                top: 0;

                &.normal {
                  @include border-radius(50%);
                  width: rem(8px);
                  height: rem(8px);
                  background: $green-6;
                  margin-left: -3px;
                  top: 50%;
                  margin-top: rem(-8px);
                }
                &.icon-iot-water {
                  font-size: $font-size-xl;
                  margin-left: rem(-13px);
                  top: 15%;
                  z-index: 999;
                }
              }
            }
          }
        }
      }
    }
      .filter-life {
        background: url("/static/images/devices/bg.png") no-repeat;
        background-size: 100% rem(290px);
        padding-top: rem(50px);
        background-position: 0 rem(50px);

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
              @include border-radius(rem(50px));

              h4 {
                width: 40%;
                display: inline-block;
                float: left;
                font-size: $font-size-m;
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
  .dueDate{
    padding-bottom: rem(80px);
  }
  .recharge{
    @include border-radius(3px);
  }
</style>

<template>
  <app-view>
    <div class="iWater-main bg-white">
      <mt-navbar v-model="iWaterNavs" class="i-water-nav">
        <mt-tab-item v-for="item in iWaterTabs" :id="item.id" :key="item.id">{{ item.label }}</mt-tab-item>
      </mt-navbar>
      <!--智能净水-->
      <div class="purest-box" v-show="iWaterNav === 'purest'">
        <div class="purest">
          <div>
            <div class="pay-btn-box" v-if="iWaterList.deviceType == 'L'">
              <div class="pay-box flex" @click.stop="recharge()">
                <div class="flex-item">
                  <div class="font-m color-white font-bold-700">续费 <i class="iconfont icon-iot-youjiantou1 font-m font-bold-300"></i></div>
                  <div class="font-s font-family-num font-bold-300" style="color: rgba(255,255,255,.8);">到期：{{ $filters.formatDate(iWaterList.leaseDueDate).replace('-','/').replace('-','/').substring(2,10) }}</div>
                </div>
              </div>
            </div>
            <div class="title margin-top-xl margin-bottom-m align-center color-white font-l">
              <span v-if="!isOnline" class="font-m font-bold-700 color-warning">已离线</span>
              <span v-else-if="power">{{ iWaterList.title }}</span>
            </div>
          </div>
          <div class="align-center margin-bottom-m" v-if="!power">
            <span class="font-m font-bold-500 color-warning">已关机</span>
          </div>
          <div class="purestNum padding-left-m padding-right-m margin-top-l">
            <div class="beforePurest valign-center">
              <div>
                <b>{{ iWaterList.inWaterTds }}</b>
                <i class="font-s font-opacity">mg/L</i>
                <span class="font-s font-opacity">净化前TDS值</span>
              </div>
            </div>
            <div class="pursetCircle">
              <canvas id="circle" width="300" height="300"  style="width: 150px;height: 150px;"></canvas>
            </div>
            <div class="afterPurest valign-center">
              <div>
                <b>{{ iWaterList.outWaterTds }}</b>
                <i class="font-s font-opacity">mg/L</i>
                <span class="font-s font-opacity">净化后TDS值</span>
              </div>
            </div>
          </div>
        </div>
        <div class="operate-box margin-top-xl padding-bottom-xl bg-white">
          <ul class="flex align-center btn-gruop-box">
            <li @click.stop="off()" class="flex-item btn-box ripple">
              <div class="flex icon-box">
                <div class="operate-btn valign-center" :class="{ 'operate-1': isOnline }">
                  <i class="iconfont icon-iot-guanji"></i>
                </div>
              </div>
              <span>{{ power }}</span>
            </li>
            <li @click.stop="clean()" class="flex-item btn-box ripple">
              <div class="flex icon-box">
                <div class="operate-btn valign-center"
                     :class="{ 'operate-2': canHandle }">
                  <i class="iconfont icon-iot-chongxi"></i>
                </div>
              </div>
              <span>一键冲洗</span>
            </li>
            <li @click.stop="restoreWiFi()" class="flex-item btn-box ripple">
              <div class="flex icon-box">
                <div class="operate-btn valign-center"
                     :class="{ 'operate-3': canHandle }">
                  <i class="iconfont icon-iot-wifi1"></i>
                </div>
              </div>
              <span>清除WIFI配置</span>
            </li>
          </ul>
          <ul class="flex align-center margin-top btn-gruop-box">
            <li class="flex-item btn-box ripple" @click.stop="detail()">
              <div class="flex icon-box">
                <div class="operate-btn valign-center operate-4">
                  <i class="iconfont icon-iot-setting"></i>
                </div>
              </div>
              <span>设备详情</span>
            </li>
            <li @click.stop="oauthManage()" class="flex-item btn-box ripple" v-if="isOwner">
              <div class="flex icon-box">
                <div class="operate-btn valign-center operate-5">
                  <i class="iconfont icon-iot-shouquan"></i>
                </div>
              </div>
              <span>授权管理</span>
            </li>
            <li @click.stop="book()" class="flex-item btn-box ripple">
              <div class="flex icon-box">
                <div class="operate-btn valign-center operate-6">
                  <i class="iconfont icon-iot-yuyue"></i>
                </div>
              </div>
              <span>服务预约</span>
            </li>
            <!--布局需要-->
            <li v-if="!isOwner" class="flex-item"></li>
            <!--<li @click="resets()">-->
            <!--<div class="operate-btn">-->
            <!--<i class="iconfont icon-iot-huifu"></i>-->
            <!--</div>-->
            <!--<span>恢复出厂设置</span>-->
            <!--</li>-->
          </ul>
        </div>
      </div>
      <!--净水统计-->
      <div class="statistics" v-show="iWaterNav === 'acount'">
        <div class="toggleStatistics">
          <mt-tabbar v-model="statisticsBtn" :value="statisticsBtn">
            <mt-tab-item v-for="item in statisticsBtnList" :id="item.value" :key="item.value" @click.native="statisticsToggle(item.value)">{{ item.label }}</mt-tab-item>
          </mt-tabbar>
        </div>
        <div class="bar" id="myChart" :style="barStyle" ref="myBarChart"></div>
        <div class="realTime margin-top-xl bg-white align-center padding-bottom-xl">
          <h3 class="align-left padding-m margin-bottom-zero">实时用水</h3>
          <ul>
            <li v-for="item in realWaterList" :key="item.outWaterFlow">
              <div class="real-logo">
                <i :class="item.logoStyle"></i>
              </div>
              <div class="real-data align-left padding-top padding-bottom">
                <h4 class="font-m">净水{{ item.outWaterFlow/1000 }}L</h4>
                <span class="font-light">2017-09-01 10:50:22</span></div>
            </li>
          </ul>
          <app-empty-view v-if="realWaterList.length === 0 ? showEmpty : hideEmpty" :isFullHeight="false"></app-empty-view>
        </div>
      </div>
      <!--滤芯寿命-->
      <div class="filter-life" v-show="iWaterNav === 'filter'">
        <div class="perhaps-filter padding-l">
          <ul>
            <li><span>设备共有滤芯 <i>{{ filters.num }}</i> 根</span></li>
            <li><span>将过期滤芯 <i>{{ filters.overdueNum }}</i> 根</span></li>
          </ul>
        </div>
        <div class="fresh-filter padding" @click="freshFilter()">
          <i class="iconfont icon-iot-shuaxin"></i>
          <span class="margin-top-s">刷新状态</span>
        </div>
        <i class="before-circle"></i>
        <i class="after-circle"></i>
        <div class="filter-list margin-top-xl padding-m">
          <ul>
            <li v-for="(item,index) in filterProgress" class="padding-top-m padding-bottom-s margin-top" @click="filterDetail(item,index)">
              <h4 class="margin-left margin-top">{{ item.name }}</h4>
              <div class="filter-num margin-right margin-top">
                <mt-progress :value="item.availablePercentage" :bar-height="10" :class="item.progressColor"></mt-progress>
                <span>预计可用{{ item.estimatedDays }}</span>
              </div>
            </li>
          </ul>
          <app-empty-view v-if="filterProgress && filterProgress.length === 0 ? showEmpty : hideEmpty" :isFullHeight="false"></app-empty-view>
        </div>
      </div>
    </div>
  </app-view>
</template>

<script>
  import AppView from '@/components/layouts/app-view'
  import CircleBar from '@/assets/scripts/circle-bar'
  import moment from 'moment'
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
        barStyle: {
          width: '100%'
        },
        iWaterNav: 'purest',
        iWaterTabs: [
          {
            id: 'purest',
            label: '智能净水'
          },
          {
            id: 'acount',
            label: '净水统计'
          },
          {
            id: 'filter',
            label: '滤芯寿命'
          }
        ],
        iWaterList: {
          title: '',
          inWaterTds: '',
          outWaterTds: '',
          leaseDueDate: '',
          deviceType: '',
          company: '',
          leaseProductId: ''
        },
        circleProgress: 100,
        statisticsBtn: 'w',
        statisticsBtnList: [
//          {
//            label: '日',
//            value: ''
//          },
          {
            label: '周',
            value: 'w'
          },
          {
            label: '月',
            value: 'm'
          },
          {
            label: '年',
            value: 'y'
          }
        ],
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
        realWaterList: [],
        showEmpty: true,
        hideEmpty: false,
        isOnline: false,
        deviceId: this.$route.params.deviceId,
        usrDeviceId: this.$route.params.id,
        isOwner: true,
        entity: {}
      }
    },
    created () {
      document.getElementById('app').style.background = '#fff';
      this.$store.state.showLoading = false;
      this.fetchData();
    },
    mounted(){
      this.$nextTick(() => {
        this.waterFetch();
      })
    },
    beforeRouteLeave(to,from,next) {
      document.getElementById('app').style.background = 'initial';
      next();
    },
    computed: {
      iWaterNavs: {
        get() {
          return this.iWaterNav
        },
        set(val) {
          this.iWaterNav = val
        }
      },
      curUser() {
        return this.$store.getters[types.oauth.getCurUser];
      },
      // 根据设备的开关机状态和是否离线状态
      canHandle() {
        return this.isOnline && this.iWaterList.iotDevice && this.iWaterList.iotDevice.powerOn !== 'false';
      }
    },
    methods: {
      /**
       * 初始化拉取数据
       */
      fetchData() {
        this.$http.get(`${this.$apihost}/userdevices/${this.usrDeviceId}`)
          .then((data) => {
            this.entity = data;
            if(data && data.userRole && data.userRole !== 'Owner') {
              this.isOwner = false;
            }
          })
        // 智能净水
        this.$http.get(`${this.$apihost}/waterdevices/${this.deviceId}`)
          .then((res) => {
            this.$nextTick(() => {
              // 净水率
              if(res.iotDevice && res.iotDevice.outWaterTds > 0) {
                this.circleProgress = parseInt((1 - (res.iotDevice.outWaterTds / res.iotDevice.inWaterTds)) * 100)
              }
              if(document.querySelector('#circle').getContext('2d') !== null) {
                CircleBar.draw('#circle', this.circleProgress)
              }
            })
            if(res.iotDevice && res.iotDevice.powerOn){
              this.power = '关机'
            }else{
              this.power = '开机'
            }

            if(res.iotDevice && res.iotDevice.online) {
              this.isOnline = res.iotDevice.online;
            }

            // 租赁到期日
            this.iWaterList.leaseDueDate = res.leaseDueDate

            // 充值按钮判断条件
            this.iWaterList.deviceType = res.deviceType
            this.iWaterList.company = res.company
            this.iWaterList.leaseProductId = res.leaseProductId

            // 产品预约参数
            this.bookQuery.id = this.usrDeviceId
            this.bookQuery.deviceId = this.deviceId
            this.bookQuery.deviceName = res.deviceName
            this.bookQuery.productId = res.productId
            this.bookQuery.productImage = res.productImage
            this.bookQuery.itemCode = res.itemCode
            this.bookQuery.purchaseDate = res.purchaseDate

            // 滤芯
            if(res.iotDevice && res.iotDevice.parts) {
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
              this.filters.overdueNum = overFilters
            }

            this.iWaterList.inWaterTds = res.iotDevice && res.iotDevice.inWaterTds
            this.iWaterList.outWaterTds = res.iotDevice && res.iotDevice.outWaterTds
            if(res.iotDevice && res.iotDevice.outWaterTds !== null) {
              if(res.iotDevice.outWaterTds < 60){
                this.iWaterList.title = '水质极好'
              }else if(res.iotDevice.outWaterTds > 59 && res.iotDevice.outWaterTds < 100){
                this.iWaterList.title = '水质很好'
              }else if(res.iotDevice.outWaterTds > 99 && res.iotDevice.outWaterTds < 300){
                this.iWaterList.title = '水质一般'
              }else if(res.iotDevice.outWaterTds > 299){
                this.iWaterList.title = '水质污染'
              }
            }
          })
        this.realWaterData()
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
      /**
       * 实时用水
       */
      realWaterData(){
          this.$http.get(`${this.$apihost}/waterdevices/${this.deviceId}/datanodes`)
            .then((res) => {
            this.realWaterList = res.fileList
              this.realWaterList.forEach((value,index,array) => {
              if(index === 0){
                array[index].logoStyle = {
                  'iconfont': true,
                  'icon-iot-water': true,
                  'normal': false
                }
              }else{
                array[index].logoStyle = {
                  'iconfont': false,
                  'icon-iot-water': false,
                  'normal': true
                }
              }
              })
            })
      },
      /**
       * 切换净水统计
       */
      statisticsToggle(val){
        this.$http.get(`${this.$apihost}/waterdevices/${this.deviceId}/report`,{
          report_type: val
        })
          .then((res) => {
            this.barData = []
            this.barXData = []
            switch (val){
              case 'w':
                for(let i = 0, len = res.length; i < len; i++) {
                  let curWeekDay = moment(res[i].date).locale('zh-cn').format('dddd').substr(2,3);
                  this.barData.push(curWeekDay);
                  this.barXData.push(res[i].outWaterFlow);
                }
//                res.forEach((value,index,array) => {
//                  this.barData.push(curWeekDay);
//                  this.barXData.push(array[index].outWaterFlow)
//                })
                this.waterBar(this.barData,this.barXData)
                break
              case 'm':
                res.forEach((value,index,array) => {
                  this.barData.push(this.$filters.formatDate(array[index].date, 'MM-DD'))
                  this.barXData.push(array[index].outWaterFlow)
                })
                this.waterBar(this.barData,this.barXData)
                break
              case 'y':
                res.forEach((value,index,array) => {
                  this.barData.push(this.$filters.formatDate(array[index].date, 'YYYY-MM'))
                  this.barXData.push(array[index].outWaterFlow)
                })
                this.waterBar(this.barData,this.barXData)
                break
              // no default
            }
          })
      },
      /**
       * 设备详情
       */
      detail() {
        this.$store.commit("showLoading")
        this.$router.push({
          path: `/devices/${this.$route.params.id}/view`
        });
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
        this.$http.get(`${this.$apihost}/waterdevices/${this.deviceId}/instruction/${this.instruct}`)
          .then((res) => {
            if(this.i < index){
              if(res !== undefined){
                if(res.executed){
                  clearTimeout(this.timer)
                  this.$store.commit('hideLoading')
                  this.$messenger.success(`${this.instructText}成功`)
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
                  this.$messenger.success(`${this.instructText}成功`)
                  setTimeout(() => {
                    this.$router.go(0)
                  },1000)
                }else{
                  clearTimeout(this.timer)
                  this.$store.commit('hideLoading')
                  this.$messenger.error(`${this.instructText}失败`)
                  setTimeout(() => {
                    this.$router.go(0)
                  },1000)
                }
              }else{
                clearTimeout(this.timer)
                this.$store.commit('hideLoading')
                this.$messenger.error(`${this.instructText}失败`)
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
      /**
       * 一键冲洗
       */
      clean() {
        if(this.canHandle) {
          this.$messagebox.confirm('确定一键冲洗？').then(() => {
            this.$store.commit("showLoading")
            this.cleanSure()
          })
        }
      },
      /**
       * 关机
       */
      off() {
        if(this.isOnline) {
          this.$messagebox.confirm(`确定${this.power}？`).then(() => {
            this.$store.commit("showLoading")
            this.offSure();
          })
        }
      },
      /**
       * 重新配网
       */
      restoreWiFi() {
        if(this.canHandle) {
          this.$messagebox.confirm('确定重新配网？').then(() => {
            this.$store.commit("showLoading")
            this.restoreWiFiSure()
          })
        }
      },
      /**
       * 确定一键冲洗
       */
      cleanSure(){
        this.$http.post(`${this.$apihost}/waterdevices/${this.deviceId}/instruction/flush`)
          .then((res) => {
            this.instruct = res
            this.instructText = '一键冲洗'
            this.executeInstruction(15)
          })
      },
      /**
       * 确定关机
       */
      offSure(){
        this.$http.post(`${this.$apihost}/waterdevices/${this.deviceId}/instruction/onoff`)
          .then((res) => {
            this.instruct = res
            this.instructText = this.power
            this.executeInstruction(15)
            if(this.instructText === '关机') {
              this.circleProgress = 0
            }
        })
      },
      /**
       * 确定恢复出厂设置
       */
      resetSure(){
        this.$http.post(`${this.$apihost}/waterdevices/${this.deviceId}/instruction/restore`)
          .then((res) => {
            this.instruct = res
            this.instructText = '恢复出厂设置'
            this.executeInstruction(15)
          })
      },
      /**
       * 确定重新配网
       */
      restoreWiFiSure(){
        this.$http.post(`${this.$apihost}/waterdevices/${this.deviceId}/instruction/restoreWiFi`)
          .then((res) => {
            this.instruct = res
            this.instructText = '重新配网'
            this.executeInstruction(15)
          })
      },
      /**
       * 授权管理
       */
      oauthManage() {
        if(this.isOwner) {
          this.$router.push(`/devices/${this.deviceId}/oauth`);
        }
      },
      /**
       * 净水统计报表初始化数据
       */
      waterFetch(){
        this.$http.get(`${this.$apihost}/waterdevices/${this.deviceId}/report`,{
          report_type: this.statisticsBtnList[0].value
        })
          .then((res) => {
            for(let i = 0, len = res.length; i < len; i++) {
              let curWeekDay = moment(res[i].date).locale('zh-cn').format('dddd').substr(2,3);
              this.barData.push(curWeekDay);
              this.barXData.push(res[i].outWaterFlow);
            }
//            res.forEach((value,index,array) => {
//              this.barData.push(this.$filters.formatDate(array[index].date,'ddd'))
//              this.barXData.push(array[index].outWaterFlow)
//            })
            this.waterBar(this.barData,this.barXData)
          })
      },
      /**
       * 用水统计
       * @param barData
       * @param barXData
       */
      waterBar(barData,barXData){
        this.myBarChart = echarts.init(document.getElementById('myChart'))
        this.myBarChart.setOption({
          title: '',
          tooltip: {},
          xAxis: {
            data: barData,
            axisLine: {
              lineStyle: {
                color: ['rgba(255,255,255,.1)']
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff',
                fontSize: '12'
              }
            },
            splitLine: {
              show: false
            }
          },
          yAxis: {
            show: false
          },
          series: [{
            name: '今日用水',
            type: 'bar',
            itemStyle: {
              normal: {
                color: '#fff',
                borderRadius: '20%'
              }
            },
            data: barXData,
            barWidth: 20
          }]
        })
        this.myBarChart.resize({
          width: document.getElementById('app').clientWidth
        })
      },
      /**
       * 刷新滤芯状态
       */
      freshFilter(){
        this.$store.commit("showLoading")
        this.$http.get(`${this.$apihost}/waterdevices/${this.deviceId}`)
          .then((res) => {
              this.$store.commit("hideLoading")
              if (res.iotDevice.parts !== null) {
                this.filterProgress = res.iotDevice.parts;
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
                this.filters.overdueNum = overFilters;
              }
          })
      },
      filterDetail(filter,index) {
        this.$router.push({
          path: `/devices/${this.deviceId}/filter`,
          query: {
            power: this.isOnline && this.power,
            partProductId: filter.partProductId,
            index: index,
            availablePercentage: filter.availablePercentage,
            estimatedDays: filter.estimatedDays
          }
        })
      },
      /**
       * 个人租赁设备续费
       */
      recharge() {
        let _company = this.iWaterList && this.iWaterList.company;
        if(!_company) {
          this.$store.commit("showLoading");
          this.$router.push({
            path: '/userdevices/pay/deposit/' + this.deviceId,
            query: { orderId: this.iWaterList.leaseProductId }
          });
        } else {
          this.$messagebox.alert('请联系商家续费哦~');
        }
      }
    },
    components: {
      AppView,
      AppEmptyView
    }
  }
</script>
