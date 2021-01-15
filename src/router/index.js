import Vue from 'vue';
import VueRouter from 'vue-router';

import routes from './routes';

Vue.use(VueRouter);

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE,
  });

  Router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.noAuth)) {
      if (localStorage.getItem('user') != null) {
        next({ name: 'home' });
      } else {
        next();
      }
    } else if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (localStorage.getItem('jwt').token == null) {
        next({
          path: '/login',
          params: { nextUrl: to.fullPath },
        });
      } else {
        const user = JSON.parse(localStorage.getItem('user'));
        if (to.matched.some((record) => record.meta.is_admin)) {
          if (user.is_admin === 1) {
            next();
          } else {
            next({ name: 'userboard' });
          }
        } else {
          next();
        }
      }
    } else {
      next();
    }
  });

  return Router;
}
