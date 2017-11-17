/**
 * 旧版H5路由配置
 *
 * @author luoyc
 * @created 2017/9/25.
 */

export default [
  {
    path: '/jbr/shop_:shopId',
    name: 'old-shop-index',
    component (resolve){
      require(['@/pages-old/member/index'],resolve)
    }
  },
  // 首页
  {
    path: '/jbr/home',
    name: 'old-home',
    meta: {
      title: '首页'
    },
    component (resolve){
      require(['@/pages-old/member/home'],resolve)
    }
  },

  // 用户设备列表
  {
    path: '/jbr/devices',
    name: 'old-device',
    meta: {
      title: '我的设备'
    },
    component (resolve){
      require(['@/pages-old/member/device/list'],resolve)
    }
  },
  {
    path: '/jbr/devices/:id',
    name: 'old-device-iwater',
    meta: {
      title: '水机详情'
    },
    component (resolve){
      require(['@/pages-old/member/device/iwater/device-iwater'],resolve)
    }
  },
  {
    path: '/jbr/devices/:id/report',
    name: 'old-device-report',
    meta: {
      title: '净水统计'
    },
    component (resolve){
      require(['@/pages-old/member/device/iwater/device-iwater-report'],resolve)
    }
  },
  {
    path: '/jbr/devices/:id/filter',
    name: 'old-device-filter',
    meta: {
      title: '滤芯详情'
    },
    component (resolve){
      require(['@/pages-old/member/device/iwater/filter'],resolve)
    }
  },
  {
    path: '/jbr/devices/:id/oauth',
    name: 'old-device-oauth',
    meta: {
      title: '设备授权'
    },
    component (resolve){
      require(['@/pages-old/member/device/oauth'],resolve)
    }
  },
  {
    path: '/jbr/devices/:id/view',
    name: 'old-device-detail',
    meta: {
      title: '设备详情'
    },
    component (resolve){
      require(['@/pages-old/member/device/view'],resolve)
    }
  },
  {
    path: '/jbr/devices/:id/serviceOrder',
    name: 'old-device-service-order',
    meta: {
      title: '设备服务订单'
    },
    component (resolve){
      require(['@/pages-old/member/device/order-list'],resolve)
    }
  },

  // 服务订单列表
  {
    path: '/jbr/serviceOrder',
    name: 'old-serviceOrder',
    meta: {
      title: '我的订单'
    },
    component (resolve){
      require(['@/pages-old/member/serviceorder/list'],resolve)
    }
  },
  {
    path: '/jbr/serviceOrder/:id',
    name: 'old-serviceOrder-detail',
    meta: {
      title: '订单详情'
    },
    component (resolve){
      require(['@/pages-old/member/serviceorder/view'],resolve)
    }
  },

  // 租赁中心
  {
    path: '/jbr/lease/product',
    name: 'old-product',
    meta: {
      title: '租赁中心'
    },
    component (resolve){
      require(['@/pages-old/member/product/list'],resolve)
    }
  },

  // 我的
  {
    path: '/jbr/user/personal',
    name: 'old-personal',
    meta: {
      title: '个人信息'
    },
    component (resolve){
      require(['@/pages-old/member/my/personal'],resolve)
    }
  },
  {
    path: '/jbr/user/edit',
    name: 'old-edit',
    meta: {
      title: '编辑个人信息'
    },
    component (resolve){
      require(['@/pages-old/member/my/edit'],resolve)
    }
  },
]
