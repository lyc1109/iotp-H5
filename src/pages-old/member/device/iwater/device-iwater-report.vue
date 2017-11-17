<style scoped lang="scss" type="text/scss">
  @import '~variables';

  .statistics {
    /*background: url("/static/images/devices/bg.png") #fff no-repeat;*/
    background-size: 100% rem(400px);
    background-position: 0 rem(50px);

    .oldToggleStatistics {
      /*width: rem(200px);*/
      margin: 0 auto;
      height: rem(35px);
      line-height: rem(35px);

      .mint-tabbar {
        position: relative;
        background-color: #fff;
        background-image: none;
        @include border-radius(rem(3px));
        border: 1px solid $primary;
        top: rem(-4px);

        .mint-tab-item {
          color: $primary;
          width: 21%;
          text-align: center;
          min-width: inherit;
          padding: rem(8px);
          border-right: 1px solid $primary;

          &:first-child{
            border-top-left-radius: rem(3px);
            border-bottom-left-radius: rem(3px);
          }
          &:last-child{
            border-top-right-radius: rem(3px);
            border-bottom-right-radius: rem(3px);
            border: 0 none;
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
</style>
<template>
  <!--净水统计-->
  <div class="statistics bg-white" id="app">
    <div class="divider">
      用水统计
      <div class="oldToggleStatistics pull-right margin-right-s">
        <mt-tabbar v-model="statisticsBtn" :value="statisticsBtn">
          <mt-tab-item v-for="item in statisticsBtnList" :id="item.value" :key="item.value" @click.native="statisticsToggle(item.value)">{{ item.label }}</mt-tab-item>
        </mt-tabbar>
      </div>
    </div>
    <div class="bar" id="myChart" :style="barStyle" ref="myBarChart"></div>
    <div class="realTime margin-top-xl bg-white align-center padding-bottom">
      <!--<div id="my-line-chart" :style="lineStyle"></div>-->
      <h3 class="divider padding-bottom align-left padding-left-m">实时用水</h3>
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
      <app-empty-view v-if="realWaterList.length === 0 ? showEmpty : hideEmpty"></app-empty-view>
    </div>
  </div>
</template>
<script>
  import echarts from 'echarts'
  import AppEmptyView from '@/components/layouts/app-empty-view'

  export default {
    name: 'device-iwater-report',
    data (){
      return {
        statisticsBtn: 'w',
        statisticsBtnList: [
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
        realWaterList: [],
        barStyle: {
          width: '100%'
        },
        showEmpty: true,
        myBarChart: null,
        barData: [],
        barXData: []
      }
    },
    created(){
      this.realWaterData()
    },
    mounted(){
      this.$nextTick(() => {
        this.waterFetch()
      })
    },
    methods: {
      // 实时用水
      realWaterData(){
        this.$http.get(`${this.$apihost}/waterdevices/${this.$route.params.id}/datanodes`)
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
      statisticsToggle(val){
        this.$http.get(`${this.$apihost}/waterdevices/${this.$route.params.id}/report`,{
          report_type: val
        })
          .then((res) => {
            this.barData = []
            this.barXData = []
            switch (val){
              case 'w':
                res.forEach((value,index,array) => {
                  this.barData.push(this.$filters.formatDate(array[index].date, 'ddd'))
                  this.barXData.push(array[index].outWaterFlow)
                })
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
      // 净水统计报表初始化数据
      waterFetch(){
        this.$http.get(`${this.$apihost}/waterdevices/${this.$route.params.id}/report`,{
          report_type: this.statisticsBtnList[0].value
        })
          .then((res) => {
            res.forEach((value,index,array) => {
              this.barData.push(this.$filters.formatDate(array[index].date,'ddd'))
              this.barXData.push(array[index].outWaterFlow)
            })
            this.waterBar(this.barData,this.barXData)
          })
      },
      // 用水统计
      waterBar(barData,barXData){
        this.myBarChart = echarts.init(document.getElementById('myChart'))
        this.myBarChart.setOption({
          title: '',
          tooltip: {},
          xAxis: {
            data: barData,
            axisLine: {
              lineStyle: {
                color: ['#999']
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#999',
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
                color: '#999',
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
    },
    computed: {},
    components: {
      AppEmptyView
    }
  }
</script>
