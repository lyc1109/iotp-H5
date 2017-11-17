/**
 * 工单系统路由配置
 *
 * @author  hucw
 * @created 2017-06-14
 */
export default [
  {
    path: '/ui',
    name: 'ui',
    meta: {
      requireAuth: false
    },
    component: function (resolve) {
      require(['@/pages-uidemo/index'], resolve);
    }
  },
  {
    path: '/ui/buttons',
    name: 'ui-buttons',
    meta: {
      requireAuth: false
    },
    component: function (resolve) {
      require(['@/pages-uidemo/buttons'], resolve);
    }
  },
  {
    path: '/ui/forms',
    name: 'ui-forms',
    meta: {
      requireAuth: false
    },
    component: function (resolve) {
      require(['@/pages-uidemo/forms'], resolve);
    }
  },
  {
    path: '/ui/cell',
    name: 'ui-cell',
    meta: {
      requireAuth: false
    },
    component: function (resolve) {
      require(['@/pages-uidemo/cell'], resolve);
    }
  },
  {
    path: '/ui/selector',
    name: 'ui-selector',
    meta: {
      requireAuth: false
    },
    component: function (resolve) {
      require(['@/pages-uidemo/selector'], resolve);
    }
  },
  {
    path: '/ui/oss',
    name: 'ui-oss',
    meta: {
      requireAuth: false
    },
    component: function (resolve) {
      require(['@/pages-uidemo/oss'], resolve);
    }
  }
]
