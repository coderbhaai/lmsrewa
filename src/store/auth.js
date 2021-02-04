import { LocalStorage } from 'quasar';
import axios from 'axios';
import setAxiosHeaders from './helpers';
import api from './api';
import { message } from './functions';

/* eslint no-shadow: ["error", { "allow": ["state"] }] */
const state = {
  user: LocalStorage.getItem('user'),
};

const getters = {
  user: (state) => state.user,
};

const actions = {
  async register({ commit }, form) {
    const res = await axios.post(api.register, form);
    if (res.data.success) {
      commit('LOGIN', res.data.user);
      setAxiosHeaders(state);
      this.$router.push({ name: 'home' });
    }
    message(res.data.message);
  },
  async login({ commit }, form) {
    const res = await axios.post(api.login, form);
    if (res.data.success) {
      commit('LOGIN', res.data.user);
      setAxiosHeaders(state);
      this.$router.push({ name: 'home' });
    }
    message(res.data.message);
  },
  async logout({ commit }) {
    commit('LOGOUT');
    // message(res.data.message);
  },
};

const mutations = {
  LOGIN: (state, user) => {
    state.user = user;
    LocalStorage.set('user', user);
    setAxiosHeaders(state);
  },
  LOGOUT: (state) => {
    state.user = null;
    LocalStorage.clear();
    setAxiosHeaders(state);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
