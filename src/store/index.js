import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'

import user from './user';
import auth from './auth';
import blog from './blog';
import video from './video';
import admin from './admin';
import school from './school';

Vue.use(Vuex);

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      user,
      auth,
      blog,
      video,
      admin,
      school,
    },
    plugins: [createPersistedState()]
  })

  return Store
}
