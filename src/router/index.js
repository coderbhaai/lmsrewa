import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import store from '../store'
import { message } from '../store/functions';

Vue.use(VueRouter);

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function ( {store} /* { store, ssrContext } */) {
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
    // console.log('to.matched.some((i)', to.matched)
    // console.log(`store.getters.isLoggedIn`, store.getters.user.role)

    if (to.matched.some((i) => i.meta.noAuth)) {
      if(store.getters.user && store.getters.user.auth){ 
        message('You are already logged in'); next({ path: '/blog' }); return; 
      }
    }

    if (to.matched.some((i) => i.meta.auth)) {
      if(!store.getters.user || !store.getters.user.auth){ 
        message('You are not logged in'); next({ path: '/blog' }); return; 
      }
    }

    if (to.matched.some((i) => i.meta.school)) {
      if(store.getters.user.role== 'School' || store.getters.user.role== 'Owner'){
      }else{
        message('You are not Allowed to Enter'); next({ path: '/blog' }); return;
      }
    }

    if (to.matched.some((i) => i.meta.ss)) {
      if(store.getters.user.role== 'Admin' || store.getters.user.role== 'SS'){
      }else{
        message('You are not from SS'); next({ path: '/blog' }); return;
      }
    }

    next();
  })
  return Router;
}