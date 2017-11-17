<style scoped lang="scss" type="text/scss">
  @import "~variables";

  .date {
    font-size: 72px;
    font-weight: bold;
    padding-left: rem(5px);
  }
  .article-title {
    background: rgba(#000,.3);
    color: $white;
    @extend %text-wrapper;
    position: absolute;
    z-index: 999;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .bulletin-item,.community-item {
    position: relative;
    .image-item {
      width: 100%;
      height: 100%;
      justify-content: center;
      position: absolute;
      top: 0;
      overflow: hidden;
      /*img {*/
        /*width: 100%;*/
        /*height: auto;*/
        /*min-height: 100%;*/
      /*}*/
    }
  }
  .bulletin-item {
    padding-top: 46%;
  }
  .community-item {
    padding-top: 30%;
  }
  .bulletin {
    display: flex;
    position: relative;

    .bulletin-title {
      padding: rem(6px);
      background-image: url("/static/images/home/bulletin.png");
      background-repeat:  no-repeat;
      background-size: 100%;
      background-position: center;
      padding-left: rem(20px);
    }
    .bulletin-body {
      width: 100%;
      height: rem(25px);

      ul {
        flex-direction: column;
        list-style: outside none none;
        height: 19px;
        padding: 2px 0;
        overflow: hidden;

        li {
          /*display: block;*/
          width: 100%;
          height: 19px;
          /*margin: 5px 0;*/
        }
      }
    }
  }
  .right-status {
    .flex{
      justify-content: flex-end;
    }
    .air-quality {
      background: $yellow-3;
    }
    .temperature, .tds, .quality {
      & > i {
        position: relative;
        top: rem(2px);
        margin-right: rem(2px);
      }
    }
  }
</style>

<template>
  <div>
    <app-view class="has-footer">
      <div class="fadeIn">
        <div class="bg-box padding-m font-white font-m" style="background-image: url(/static/images/home/home_bg.png)">
          <div class="flex" style="align-items: flex-end">
            <div class="flex-item">
              <div class="font-bold-400">
                <i class="iconfont icon-iot-dingwei color-white icon-m"></i>
                {{currentCity}}
              </div>
              <div class="date">{{ curDate.date }}</div>
              <div>「{{ curDate.month }}」 {{ curDate.weekday }} </div>
            </div>
            <div class="flex-item right-status">
              <div class="flex margin-bottom-s">
              </div>
              <div class="quality flex" v-show="weather">
                <!-- 颜色暂时固定一个值 -->
                <span :style="{background:color[1]}" class="air-quality font-warn btn-round padding-left-m padding-right-m">{{weather.weatherQuality}}</span>
              </div>
              <div class="temperature flex margin-top-s" v-show="weather">
                <i class="iconfont icon-iot-tianqi"></i>
                <span>{{weather.lowTemperature}}° ~ {{weather.highTemperature}}°</span>
              </div>
              <div class="tds flex margin-top-s" @click="waterMap" v-show="curCityTDS">
                <i class="iconfont icon-iot-shuizhi"></i>
                <span>TDS {{curCityTDS}}</span>
              </div>
            </div>
          </div>
        </div>
        <!--公告-->
        <div class="bg-white padding-m bulletin flex valign-center">
          <div class="flex-item flex">
            <div class="bulletin-title font-bold-400 align-center margin-right-m color-white align-center">
              公告
            </div>
            <div class="bulletin-body font-bold-400 flex">
              <ul id="rolltxt" class="flex-item">
                <li v-for="item in noticeList" class="valign-center text-wrapper" @click.stop="bulletinDetail(item.id)">
                  {{ item.title }}
                </li>
              </ul>
            </div>
          </div>
          <i class="iconfont icon-iot-youjiantou1 font-light"></i>
        </div>
        <!--品智生活-->
        <router-link :to="{ path: `/community/shop_${this.curShop.id}/article_undefined/view`, query: { type: `notice` } }">
          <div class="panel margin-top">
            <div class="panel-title flex">
              <div class="flex-item">
                品智生活
              </div>
              <i class="iconfont icon-iot-youjiantou1 font-light"></i>
            </div>
            <div class="panel-body">
              <ul v-show="bulletins.length > 0">
                <li class="bg-box bulletin-item"
                    v-for="item in bulletins">
                  <div class="valign-center image-item">
                    <img v-lazy="$filters.img('http://shmedias.oss-cn-shenzhen.aliyuncs.com/dev-medias/vue-test/20171108/1017/e68252d39b6dde4894b5d6ddc8f0268f.jpg','@380w_180h_1e_1c')">
                    <div class="article-title padding">每天四个时刻必须喝水，如何喝水最养生?</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </router-link>
        <!--社区生活-->
        <div class="margin-top panel bg-white">
          <router-link :to="'/community/shop_' + this.curShop.id + '/index'">
            <div class="panel-title flex">
              <div class="flex-item">
                社区生活
              </div>
              <i class="iconfont icon-iot-youjiantou1 font-light"></i>
            </div>
          </router-link>
          <div class="panel-body">
            <ul v-if="community && community.length > 0" class="flex">
              <li class="bg-box community-item flex-item"
                  v-for="item in community"
                  @click.stop="articleDetail(item.id)">
                <div class="valign-center image-item">
                  <img v-lazy="$filters.img((item.coverImage ? item.coverImage : ''),'@200w_120h_1e_1c')">
                  <div class="article-title padding-s font-s">
                    {{ item.title }}
                  </div>
                </div>
              </li>
            </ul>
            <div v-else-if="comTotal === 0" class="valign-center align-center padding-m" style="justify-content: center">
              暂无社区内容
            </div>
          </div>
        </div>
      </div>
    </app-view>
    <!-- 百度地图 -->
    <baidu-map class="bm-view" @ready="handler">
    </baidu-map>
    <app-nav navId="home"></app-nav>
  </div>
</template>

<script>
  import App from '@/assets/scripts/app';
  import AppNav from '@/pages-member/nav';
  import types from "@/store/mutation-types";

  import {BaiduMap} from 'vue-baidu-map'
  import moment from "moment";
  moment.locale("zh-cn");

  import sysApi from "@/apis/sys";

  export default {
    name: 'member',
    components: {
      AppNav,
      BaiduMap
    },
    data: function () {
      return {
        bulletins: [
          {
            title: '换一种喝水方式，你的健康也有保质期你的健康也有保质期你的健康也有保质期你的健康也有保质期',
            created: '2017-09-12',
            coverImagePath: '/static/images/home/smart-live.png'
          }
        ],
        community: {},
        currentCity: '',
        weather: '',
        curCityTDS: '',
        color: [
          '#6BCB0F',
          '#ffc33c',
          '#FF5722',
          '#FF0000',
          '#FF8702',
          '#980355',
        ],
        weatherStatus: 0,
        comTotal: 0,
        noticeList: {},
        T: undefined,
        settime: 0,
      }
    },
    computed: {
      welcome () {
        let welcome = "早上好";
        let curMoment = moment();
        let startDate = moment();
        let endDate = moment();
        if(curMoment.isBetween(startDate.hour(0).minute(0), endDate.hour(6).minute(0))) {
          welcome = "凌晨好"
        } else if(curMoment.isBetween(startDate.hour(7).minute(0), endDate.hour(12).minute(0))) {
          welcome = "上午好"
        } else if(curMoment.isBetween(startDate.hour(12).minute(0), endDate.hour(14).minute(0))) {
          welcome = "中午好"
        } else if(curMoment.isBetween(startDate.hour(14).minute(0), endDate.hour(19).minute(0))) {
          welcome = "下午好"
        } else if(curMoment.isBetween(startDate.hour(19).minute(0), endDate.hour(23).minute(59))) {
          welcome = "晚上好"
        }
        return welcome;
      } ,

      curDate () {
        let curMoment = moment();
        return {
          month: curMoment.format("MMMM"),
          date: curMoment.format("DD"),
          weekday: curMoment.format("dddd")
        };
      },

      curUser () {
        return this.$store.getters[types.oauth.getCurUser];
      },
      curShop () {
        return this.$store.getters[types.oauth.getCurShop];
      }
    },
    created() {
      this.$store.commit("showLoading");

      let _href = location.href.split('#')[0];
      this.$store.commit(types.common.setEnterURL, _href);
    },
    beforeRouteLeave (to, from, next) {
      clearInterval(this.T);
      this.T = null;
      next();
    },
    mounted(){
      this.$nextTick(() => {
        clearInterval(this.T);
        this.T = null;
        this.fetchData()
      })
    },
    methods: {
      fetchData(){
        this.$store.commit("hideLoading")

        // 社区
        this.$http.get(`${this.$apihost}/community/topic`, {
          page_no: 1,
          page_size: 2,
          tenant_id: this.curShop.id
        })
          .then((res) => {
            this.community = res.fileList;
            this.comTotal = res.totalElements;
          })
        this.$http.get(`${this.$apihost}/bulletin/top`,{
          bulletin_type: 'H'
        }).then((noticeList) => {
            this.$store.commit("hideLoading");
            this.noticeList = noticeList;

            this.$nextTick(() => {
              this.scroll();
            })
          })
      },
      waterMap(){
        this.$router.push({
          path: '/water-map'
        })
      },
      handler({BMap, map}){
        // 根据浏览器定位
        var that = this
        var geolocation = new BMap.Geolocation();

        if(window.sessionStorage.getItem('currentCity') === null){
          geolocation.getCurrentPosition(function(r){
            if(this.getStatus() === BMAP_STATUS_SUCCESS){
              that.currentProv = r.address.province
              that.currentCity = r.address.city
              window.sessionStorage.setItem('currentProv',that.currentProv)
              window.sessionStorage.setItem('currentCity',that.currentCity)
              that.$http.get(`${that.$basehost}/api/v1/water/tds/${that.currentProv}/${that.currentCity}`).then((res) => {
                that.curCityTDS = res.tds
              })
              that.$http.get(`${that.$basehost}/api/v1/weather/${that.currentProv}/${that.currentCity}`).then((res) => {
                that.weather = res
                that.weatherStatus = that.choseColor(res.weatherQuality)
              })
            }else {
              alert('failed'+this.getStatus());
            }
          },{
            enableHighAccuracy: true,
            maximumAge: 0,
          })
        }else {
          that.currentProv = window.sessionStorage.getItem('currentProv')
          that.currentCity = window.sessionStorage.getItem('currentCity')
          that.$http.get(`${that.$basehost}/api/v1/water/tds/${that.currentProv}/${that.currentCity}`).then((res) => {
            that.curCityTDS = res.tds
          })
          that.$http.get(`${that.$basehost}/api/v1/weather/${that.currentProv}/${that.currentCity}`).then((res) => {
            that.weather = res
            that.weatherStatus = that.choseColor(res.weatherQuality)
          })
        }

      },
      choseColor(status){
        let flag = 0
        if(status === '优') {
          flag = 0;
        }else if(status === '良'){
          flag = 1;
        }else if(status === '轻度污染'){
          flag = 2;
        }else if(status === '中度污染'){
          flag = 3;
        }else if(status === '重度污染'){
          flag = 4;
        }else if(status === '严重污染'){
          flag = 5;
        }
        return flag
      },
      /**
       * 公告
       */
      articleDetail(id) {
        this.$router.push(`/community/shop_${this.curShop.id}/article_${id}/view`);
      },
      /**
       * 定时滚动
       */
      rollText() {
        let that = this;
        let obj = document.getElementById("rolltxt");
        if(obj) {
          if(obj.scrollTop % (obj.clientHeight - 3) === 0) {
            that.settime += 1;
            if(that.settime === 70) {
              obj.scrollTop += 1;
              that.settime = 0;
            }
          } else {
            obj.scrollTop += 1;
            if(obj.scrollTop === (obj.scrollHeight - obj.clientHeight)) {
              obj.scrollTop = 0;
            }
          }
        }
      },
      /**
       * 处理显示数据
       */
      scroll() {
        let extractNodes = function(pNode) {
          if(pNode.nodeType === 0) {
            return false;
          }
          let node = null;
          let nodes = [];
          for(let i = 0, len = pNode.childNodes.length; i<len; i++) {
            node = pNode.childNodes[i];
            if(node.nodeType === 1) {
              nodes.push(node);
            }
          }
          return nodes;
        }
        let obj = document.getElementById("rolltxt");
        for(let i = 0; i < obj.childNodes.length; i++) {
          obj.appendChild(extractNodes(obj)[i]);
        }
        this.T = setInterval(this.rollText,70);
      },
      /**
       * 跳转至公告详细
       * @param id
       */
      bulletinDetail(id) {
        this.$router.push({
          path: `/community/shop_${this.$route.params.shopId}/article_${id}/view`,
          query: {
            type: 'bulletin'
          }
        });
      }
    }
  }
</script>
