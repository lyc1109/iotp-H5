/**
 * 用户个人中心路由配置
 *
 * @author  hucw
 * @created 2017-06-14
 */

export default [
  {
    path: '/shop_:shopId',
    name: 'shop-index',
    component: function (resolve) {
      require(['@/pages-member/index'], resolve)
    }
  },


  {
    path: '/bind/mobile',
    name: 'bind-mobile',
    meta: {
      requireAuth: false
    },
    component: function (resolve) {
      require(['@/pages-member/bind-mobile'], resolve)
    }
  },

  // ==========================================================
  // 底部5大导航
  {
    path: '/home',
    name: 'home',
    meta: {
      title: '首页'
    },
    component: function (resolve) {
      require(['@/pages-member/nav-home'], resolve)
    }
  },
  {
    path: '/devices',
    name: 'devices',
    meta: {
      title: '我的设备'
    },
    component: function (resolve) {
      require(['@/pages-member/nav-devices.vue'], resolve)
    }
  },
  // 租赁
  {
    path: '/lease',
    name: 'lease',
    meta: {
      title: '租赁中心'
    },
    component (resolve) {
      require(['@/pages-member/nav-lease'],resolve)
    }
  },
  {
    path: '/market',
    name: 'market',
    meta: {
      title: '商城'
    },
    component: function (resolve) {
      require(['@/pages-member/nav-market.vue'], resolve)
    }
  },
  {
    path: '/my',
    name: 'my',
    meta: {
      title: '我的'
    },
    component: function (resolve) {
      require(['@/pages-member/nav-my.vue'], resolve)
    }
  },
  {
    path: '/my/notice',
    name: 'my-notice',
    meta: {
      title: '我的消息'
    },
    component(resolve){
      require(['@/pages-member/person/my-notice.vue'], resolve)
    }
  },
  {
    path: '/my/edit',
    name: 'my-edit',
    meta: {
      title: '修改个人信息'
    },
    component(resolve){
      require(['@/pages-member/person/personal-read.vue'], resolve)
    }
  },
  {
    path: '/my/approval',
    name: 'my-approval',
    meta: {
      title: '设备授权申请'
    },
    component(resolve){
      require(['@/pages-member/person/device-approval.vue'], resolve)
    }
  },
  {
    path: '/my/feedback',
    name: 'my-feedback',
    meta: {
      title: '意见反馈'
    },
    component(resolve){
      require(['@/pages-member/person/my-feedback.vue'], resolve)
    }
  },
  // 设备管理
  {
    path: '/devices/:id/view',
    name: 'devices-view',
    meta: {
      title: '设备详细'
    },
    component: function (resolve) {
      require(['@/pages-member/devices/view.vue'], resolve)
    }
  },
  //编辑设备信息
  {
    path: '/devices/:id/edit',
    name: 'devices-edit',
    meta: {
      title: '编辑设备信息'
    },
    component: function (resolve) {
      require(['@/pages-member/devices/edit.vue'], resolve)
    }
  },
  // 设备服务订单
  {
    path: '/devices/:id/orderlist',
    name: 'order-list',
    meta: {
      title: '设备服务订单'
    },
    component: function (resolve) {
      require(['@/pages-member/devices/order-list.vue'], resolve)
    }
  },
  // 添加设备
  {
    path: '/devices/bind',
    name: 'devices-bind',
    meta: {
      title: '绑定设备'
    },
    component: function (resolve) {
      require(['@/pages-member/devices/bind.vue'], resolve)
    }
  },
  // 选择设备
  {
    path: '/devices/choose',
    name: 'devices-choose',
    meta: {
      title: '选择设备'
    },
    component: function (resolve) {
      require(['@/pages-member/devices/choose.vue'], resolve)
    }
  },
  {
    path: '/devices/usrDevice_:id/device_:deviceId/iwater',
    // path: '/devices/iwater',
    name: 'devices-iwater',
    meta: {
      title: '设备详情'
    },
    component: function (resolve) {
      require(['@/pages-member/devices-iwater/iwater.vue'], resolve)
    }
  },
  {
    path: '/devices/:id/filter',
    name: 'devices-filter',
    meta: {
      title: '滤芯详情'
    },
    component: function (resolve) {
      require(['@/pages-member/devices-iwater/filter.vue'], resolve)
    }
  },
  {
    path: '/devices/:id/oauth',
    // path: '/devices/oauth',
    name: 'devices-oauth',
    meta: {
      title: '授权管理'
    },
    component: function (resolve) {
      require(['@/pages-member/devices-iwater/oauth.vue'], resolve)
    }
  },
  {
    path: '/userdevices/pay/deposit/:id',
    name: 'device-recharge',
    meta: {
      title: '设备充值'
    },
    component (resolve){
      require(['@/pages-member/serviceorder/recharge.vue'],resolve)
    }
  },

  // -----------------------------------
  // 订单管理
  {
    path: '/serviceorder',
    name: 'serviceorder',
    meta: {
      title: '我的订单'
    },
    component(resolve){
      require(['@/pages-member/serviceorder/list.vue'],resolve)
    }
  },
  {
    path: '/serviceorder/create',
    name: 'serviceorder-create',
    meta: {
      title: '提交服务订单'
    },
    component: function (resolve) {
      require(['@/pages-member/serviceorder/form.vue'], resolve)
    }
  },
  {
    path: '/serviceorder/:id/view',
    name: 'serviceorder-view',
    meta: {
      title: '订单详情'
    },
    component: function (resolve) {
      require(['@/pages-member/serviceorder/view.vue'], resolve)
    }
  },
  {
    path: '/serviceorders/pay/deposit/:id',
    name: 'recharge',
    meta: {
      title: '充值缴费'
    },
    component (resolve){
      require(['@/pages-member/serviceorder/recharge.vue'],resolve)
    }
  },
  {
    path: '/serviceorder/recharge/success',
    name: 'recharge-success',
    meta: {
      title: '充值成功'
    },
    component (resolve){
      require(['@/pages-member/serviceorder/recharge-success.vue'],resolve)
    }
  },
  {
    path: '/serviceorder/:id/evaluate',
    name: 'evaluate',
    meta: {
      title: '订单评价'
    },
    component (resolve){
      require(['@/pages-member/serviceorder/evaluate.vue'],resolve)
    }
  },

  //  -----------------------------------
  // 产品管理
  {
    path: '/product/:id',
    name: 'product-detail',
    meta: {
      title: '产品详情'
    },
    component (resolve){
      require(['@/pages-member/product/detail.vue'],resolve)
    }
  },

  // -----------------------------------
  // 租赁
  {
    path: '/lease/:id',
    name: 'lease-detail',
    meta: {
      title: '租赁产品详情'
    },
    component (resolve){
      require(['@/pages-member/lease/detail.vue'],resolve)
    }
  },
  {
    path: '/leaseScan',
    name: 'lease-scan',
    meta: {
      title: '扫码租赁'
    },
    component (resolve){
      require(['@/pages-member/lease/scan.vue'],resolve)
    }
  },
  {
    path: '/lease/:id/protocol',
    name: 'oauth-protocol',
    meta: {
      title: '用户授权协议'
    },
    component (resolve){
      require(['@/pages-member/lease/protocol.vue'],resolve)
    }
  },
  {
    path: '/lease/order/create',
    name: 'lease-order-create',
    meta: {
      title: '租赁产品预约'
    },
    component (resolve){
      require(['@/pages-member/lease/subscribe.vue'],resolve)
    }
  },

  // -----------------------------------
  // 社区模块
  {
    path: '/community/shop_:shopId/index',
    name: 'shop-community',
    meta: {
      title: '社区中心'
    },
    component (resolve){
      require(['@/pages-member/community/index'],resolve)
    }
  },
  //文章详情
  {
    path: '/community/shop_:shopId/article_:id/view',
    name: 'community-detail',
    meta: {
      title: '文章详情'
    },
    component (resolve){
      require(['@/pages-member/community/view'],resolve)
    }
  },
  //发帖
  {
    path: '/community/shop_:shopId/post',
    name: 'community-post',
    meta: {
      title: '文章详情'
    },
    component (resolve){
      require(['@/pages-member/community/post'],resolve)
    }
  },
  // -----------------------------------
  // 水质地图模块
  // 百度地图
  {
    path: '/water-map',
    name: 'water-map',
    meta: {
      title: '水质地图'
    },
    component (resolve){
      require(['@/pages-member/map/water-map'],resolve)
    },
  },
  // test
  {
    path: '/alipay',
    name: 'alipay-test',
    meta: {
      title: '测试支付宝支付'
    },
    component (resolve){
      require(['@/pages-member/community/alipay'],resolve)
    }
  },

  // test
  {
    path: '/scan',
    name: 'scan-test',
    meta: {
      title: '测试支付宝支付'
    },
    component (resolve){
      require(['@/pages-member/nav-scan'],resolve)
    }
  },
]
