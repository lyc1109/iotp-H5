import Vue from 'vue';
import Router from 'vue-router';

import memberRoutes from "./member";
import memberProfile from "./shop-member-profile";
import wosRoutes from "./wos";
import uidemoRoutes from "./uidemos";
import oldMemberRouters from './old/member'


Vue.use(Router);

// 滚动条行为
// const scrollBehavior = (to, from, savedPosition) => {
//   if (savedPosition) {
//     return savedPosition
//   } else {
//     const position = {};
//
//     /// 滚动到锚点
//     if (to.hash) {
//       position.selector = to.hash
//     }
//
//     // 判断路由配置中是否需要滚动到顶部
//     if (to.matched.some((m) => m.meta.scrollToTop)) {
//       position.x = 0;
//       position.y = 0;
//       console.log(position.x)
//     }
//
//     // 返回false或空对象则不会发生滚动
//     return position
//   }
// };

let routes = [
  // 登录处理
  {
    path: '/login',
    name: 'login',
    meta: {
      requireAuth: false
    },
    component: function (resolve) {
      require(['@/components/auth/login.vue'], resolve);
    }
  },
  {
    path: '/access/token',
    name: 'accesstoken',
    meta: {
      requireAuth: false
    },
    component: function (resolve) {
      require(['@/components/auth/accesstoken.vue'], resolve);
    },
  },
  {
    path: '/logout',
    name: 'logout',
    component: function (resolve) {
      require(['@/components/auth/logout.vue'], resolve);
    }
  },

  // ===========================
  // 错误页面处理
  {
    path: '*',
    name: '404',
    component: function (resolve) {
      require(['@/components/error/404.vue'], resolve);
    }
  }
];
routes = routes.concat(memberRoutes);
routes = routes.concat(wosRoutes);
routes = routes.concat(uidemoRoutes);
routes = routes.concat(memberProfile);
routes = routes.concat(oldMemberRouters)

export default new Router({
  mode: 'history',
  // scrollBehavior,
  routes
})
