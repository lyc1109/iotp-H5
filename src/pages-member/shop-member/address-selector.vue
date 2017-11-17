<style scoped lang="scss" type="text/scss">
  @import "~variables";

  li {
    @extend %padding-m;
    @include border(bottom);
    background-color: $white;
  }

  li:last-child {
    border-bottom: none;
  }

  .form-popup {
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  .flex-right{
    flex: 0 0 rem(30px);
  }

  .selected{
    background-color: rgba($yellow-3,.1);
  }

  .footer-divider{
    height: rem($footer-height);
    @extend %padding;
  }

  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: rem($footer-height);
    z-index: 3000;
    background-color: $page_bg;

    .btn-block {
      height: rem($footer-height);
      border-radius: 0;
      font-size: $font-size-m;
    }

    .flex-left {
      flex: 0 0 rem(100px);
    }
  }
  .save{
    position: fixed;
    bottom: 0;
    left: 0;
  }
</style>

<template>
    <div>
      <mt-popup class="form-popup" v-model="isShowPopup" position="right">
        <div class="form-popup-body">
          <v-spinner v-show="isLoading"></v-spinner>

          <ul>
            <li v-for="item in addressList" v-show="addressList.length > 0 "
                @click="selectItem(item)"
                :class="{'ripple': !item.selected, 'ripple selected': item.selected}">

              <div class="flex">
                <div class="flex-item">
                  <div class="font-bold margin-bottom">
                    <span class="padding-right">{{item.contactName !== null ? item.contactName : '(未知联系人)'}}</span>
                    <span class="margi-left-l">{{item.contactMobile !== null ? item.contactMobile : '(未知号码)'}}</span>
                  </div>
                  <span class="font-light">{{ item.fullAddress }}</span>
                </div>

                <div class="flex-right" v-show="item.selected">
                  <i class="iconfont icon-iot-gou icon-m font-bold-700 color-success"></i>
                </div>
              </div>
            </li>
          </ul>

          <div class="footer-divider"></div>
        </div>
      </mt-popup>

      <div class="footer" v-show="isShowPopup">
        <div class="flex align-center">
          <div class="flex-left padding-top padding-bottom" @click="hideAddressSelector()">
            取消
          </div>
          <div class="flex-item">
            <button type="button" class="btn btn-block btn-info" @click="addNewAddress()">添加新地址</button>
          </div>
        </div>
      </div>
      <!--<mt-popup v-model="showAddress" position="bottom" class="addAddress bg-white">-->
        <!--<slot>-->

        <!--</slot>-->
      <!--</mt-popup>-->
    </div>
</template>

<script>
  import AppView from "@/components/layouts/app-view";
  import VSpinner from "@/components/ui/v-spinner";
  import shopMemberApi from "@/apis/shop-member";
  import types from "@/store/mutation-types";

  export default{
    name: "address-selector",
    props: {
      // 是否需要返回上一页router
      isBack: {
        type: Boolean,
        default: true
      }
    },
    data: function () {
      return {
        addressList: [],
        isLoading: false,
      }
    },
    created: function(){
      this.isLoading = true;
      this.addressList = this.$store.getters[types.shopMember.getAddressList];
      if (this.addressList.length === 0) {
        shopMemberApi.findAllAddress()
          .then((data) => {
            this.isLoading = false;
            this.addressList = data;
            this.$store.commit(types.shopMember.setAddressList, data);
            this.addressList[0].selected = true;
          })
      } else {
        this.isLoading = false;
      }
    },
    computed: {
      isShowPopup: {
        get(){
          return this.$store.getters[types.shopMember.isShowAddressSelector];
        },
        set(value){
          this.$store.commit(types.shopMember.setShowAddressSelector,value)
        }
      },
    },
    methods: {
      selectItem: function (address) {
        for(let item of this.addressList) {
          item.selected = false;
        }
        address.selected = true;
        this.$bus.emit("address-selected", address);
        this.$store.commit(types.shopMember.setAddressSelected, address);
        this.$store.commit(types.shopMember.setShowAddressSelector, false);
        if(this.isBack) {
          this.$router.go(-1);
        }
      },

      hideAddressSelector: function () {
        this.$store.commit(types.shopMember.setShowAddressSelector, false);
        if(this.isBack) {
          this.$router.go(-1);
        }
      },
      addNewAddress(){
//          this.showAddress = true
        this.$router.push(`/shop/member/address/add`)
      },
    },
    components: {
      AppView,
      VSpinner
    },
  }
</script>
