<style scoped lang="scss" type="text/scss">
  @import "~variables";

  .app-nav-tabbar {
    max-width: $max-width;
    @include border(top);
    background: $white none;

    .nav-item {
      color: $font-light;
      padding: rem(7px) 0;
      position: relative;
      overflow: initial;

      .oauth-badge {
        position: absolute;
        top: $xs;
        right: $m;
        width: rem(14px);
        height: rem(14px);
        text-align: center;
        font-size: $font-size-s;
        color: $white;
        border-radius: 50%;
        background-color: $red-2;
      }
    }

    .nav-item.is-selected {
      background-color: $white;
      color: $primary;
    }
  }
</style>

<template>
  <div class="app-nav">
    <mt-tabbar class="app-nav-tabbar" :fixed="true" v-model="currentNavId">
      <mt-tab-item id="home" class="nav-item" @click.native="$router.push('/home')">
        <i class="iconfont icon-iot-shouye-1 icon-l" v-show="navId !== 'home'"></i>
        <i class="iconfont icon-iot-shouye icon-l" v-show="navId === 'home'"></i>
        <div class="margin-top-s">首页</div>
      </mt-tab-item>
      <mt-tab-item id="lease" class="nav-item" @click.native="$router.push('/lease')">
        <i class="iconfont icon-IOT-zl icon-l" v-show="navId !== 'lease'"></i>
        <i class="iconfont icon-IOT-zl-1 icon-l" v-show="navId === 'lease'"></i>
        <div class="margin-top-s">租赁</div>
      </mt-tab-item>
      <mt-tab-item id="devices" class="nav-item" @click.native="$router.push('/devices')">
        <i class="iconfont icon-iot-shebei-1 icon-l" v-show="navId !== 'devices'"></i>
        <i class="iconfont icon-iot-shebei icon-l" v-show="navId === 'devices'"></i>
        <div class="margin-top-s">设备</div>
      </mt-tab-item>
      <mt-tab-item id="market" class="nav-item" @click.native="$router.push('/market')">
        <i class="iconfont icon-iot-shangcheng-1 icon-l" v-show="navId !== 'market'"></i>
        <i class="iconfont icon-iot-shangcheng icon-l" v-show="navId === 'market'"></i>
        <div class="margin-top-s">商城</div>
      </mt-tab-item>
      <mt-tab-item id="my" class="nav-item" @click.native="$router.push('/my')">
        <i class="iconfont icon-iot-wode-1 icon-l" v-show="navId !== 'my'"></i>
        <i class="iconfont icon-iot-wode icon-l" v-show="navId === 'my'"></i>
        <div class="margin-top-s">我的</div>
        <span v-if="approval && approval.length > 0" class="oauth-badge">{{ approval.length }}</span>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
  export default{
    name: "app-nav",
    props: ["navId"],
    data: function () {
      return {
        currentNavId: this.navId,
        // 设备授权消息
        approval: {}
      };
    },
    created() {
      // 获取设备授权数据
      this.$http.get(`${this.$apihost}/userdevices/pending-approvals`)
        .then((data) => {
          this.approval = data;
        })
    },
  }
</script>
