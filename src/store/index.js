import Vue from 'vue';
import Vuex from 'vuex';

import auth from './auth';
import blog from './blog';
import video from './video';
import admin from './admin';

Vue.use(Vuex);

const modules = {
  auth,
  blog,
  video,
  admin,
};

export default new Vuex.Store({ modules });
