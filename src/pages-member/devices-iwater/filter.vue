<style lang="scss" type="text/scss" scoped>
  @import "~variables";

  .btn-gray {
    background: $gray;
  }
  .filter-detail{
    .filter-img{
      padding: rem(70px);

      div{
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100%;
        width: 100%;
        padding-bottom: 90%;
        height: 0;
      }
    }
    .filter-info{
      @include border(top);

      .filter-basic{
        @include border(bottom);

        h2{
          font-size: $font-size-l;
          font-weight: normal;
          margin-bottom: 0;
        }
        &>span{
          width: 100%;
          display: block;
          color: #888;
        }
        b{
          color: $primary;
          font-weight: normal;
          font-size: $font-size-l;
          display: inline-block;
          line-height: 40px;
          height: 40px;
        }
      }
    }
  }
  .footer{
    @include border(top);

    .available-date,.available-operate{
      width: 50%;
      float: left;

      .mt-progress{
        height: 15px;
        line-height: 15px;

        .mt-progress-progress{
          background-color: red;
        }
      }
      &>span{
        color: #999;
      }
    }
    .available-operate{
      text-align: right;
    }
  }
</style>

<template>
  <app-view :has-footer="true" class="bg-white">
    <div class="filter-detail bg-white">
      <div class="filter-img valign-center">
        <div :style="{ backgroundImage: `url(${$filters.img(availableFilter.productImage,'!wh400')})` }"
             v-lazy="$filters.img(availableFilter.productImage,'!wh400')"></div>
      </div>
      <div class="filter-info">
        <div class="filter-basic padding-top padding-bottom padding-left-m padding-right-m">
          <h2>{{ availableFilter.name }}</h2>
          <span>{{ availableFilter.productDesc }}</span>
          <b>{{ $filters.formatCurrency(availableFilter.price/100) }}</b>
        </div>
        <div class="filter-detail-main padding-left padding-right">
          <v-cell v-for="item in filterList" :key="item.value" :title="item.title" :value="item.value"></v-cell>
        </div>
      </div>
    </div>
    <div class="footer padding" slot="footer">
      <div class="available-date">
        <mt-progress :value="availableFilter.value" :bar-height="10"></mt-progress>
        <span>预计可用{{ availableFilter.date }}</span>
      </div>
      <div class="available-operate">
        <button v-if="isShowCancel" type="button" class="btn btn-primary btn-round btn-sm" @click="cancel()">取消</button>
        <button v-else-if="!isShowCancel" type="button"
                class="btn btn-round btn-sm"
                :class="{ 'btn-primary': power === 'true', 'btn-gray': power === 'false' }"
                @click="filterReset()">滤芯复位</button>
      </div>
    </div>
  </app-view>
</template>

<script>
  import AppView from '@/components/layouts/app-view'
  import VCell from '@/components/ui/v-cell'

  export default {
    name: 'devices-filter',
    data () {
      return {
        filterList: [
          {
            title: '品牌',
            value: '佳贝尔'
          },
          {
            title: '类型',
            value: '净水机原装'
          },
          {
            title: '启用日期',
            value: '2017-08-22'
          }
        ],
        availableFilter: {
          value: 60,
          date: 30,
          productImage: '',
          productDesc: '',
          price: 0
        },
        isShowCancel: false,
      }
    },
    computed: {
      power() {
        let _power = 'true';
        if(this.$route.query && this.$route.query.power !== '' && this.$route.query.power !== null&& this.$route.query.power !== undefined) {
          _power = this.$route.query.power.toString();
        }
        return _power;
      }
    },
    created(){
      this.fetchData()
    },
    methods: {
        // 初始化数据
      fetchData(){
        this.availableFilter.value = this.$route.query.availablePercentage
        this.availableFilter.date = this.$route.query.estimatedDays
        this.$http.get(`${this.$apihost}/products/${this.$route.query.partProductId}`)
          .then((res) => {
            this.availableFilter.productImage = res.coverImage
            this.availableFilter.name = res.name
            this.availableFilter.productDesc = res.productDesc
            this.availableFilter.price = res.price
            this.filterList[0].value = res.bandName
            this.filterList[1].value = res.productTypeTitle
            this.filterList[2].value = this.$filters.formatDate(res.createdTime)
          })
      },
      // 取消复位
      cancel(){
        if(this.power === 'true') {
          this.$messagebox.confirm('确定取消滤芯复位?').then(() => {
            this.$http.post(`${this.$apihost}/waterdevices/${this.$route.params.id}/unresetFilter/${Number(this.$route.query.index) + 1}`)
              .then((res) => {
                this.availableFilter.value = res.availablePercentage
                this.availableFilter.productImage = res.productImage
                this.availableFilter.name = res.name
                if(res.estimatedDays === -1){
                  this.availableFilter.date = '估算中...'
                }else{
                  this.availableFilter.date = `${res.estimatedDays}天`
                }
                this.$messenger.success('已取消复位')
                this.isShowCancel = false;

              })
          })
        }
      },
      // 滤芯复位
      filterReset() {
        if(this.power === 'true') {
          this.$messagebox.confirm('确定进行滤芯复位?').then(() => {
            this.$http.post(`${this.$apihost}/waterdevices/${this.$route.params.id}/resetFilter/${Number(this.$route.query.index) + 1}`)
              .then((res) => {
                this.availableFilter.value = res.availablePercentage
                this.availableFilter.productImage = res.productImage
                this.availableFilter.name = res.name
                if (res.estimatedDays === -1) {
                  this.availableFilter.date = '估算中...'
                } else {
                  this.availableFilter.date = `${res.estimatedDays}天`
                }
                this.$messenger.success('复位成功')
                this.isShowCancel = true;
                setTimeout(() => {
                  this.$router.go(0)
                }, 500)
              })
          })
        }
      }
    },
    components: {
      AppView,
      VCell,
    }
  }
</script>
