import { LocalStorage } from 'quasar';
import axios from 'axios';
import setAxiosHeaders from './helpers';
import api from './api';
import { message } from './functions';

/* eslint no-shadow: ["error", { "allow": ["state"] }] */
const state = {
  user: LocalStorage.getItem('user'),
  isLoggedIn: false,
  role: ''
};

const getters = {
  user: (state) => state.user,
  isLoggedIn: (state)=>state.isLoggedIn,
  role: (state)=>state.role,
  schoolOptions: (state) => state.schoolOptions
};

const actions = {
  async schoolOptions({ commit }) {
    const res = await axios.get(api.schoolOptions);
    commit('SCHOOLOPTIONS', res.data.data);
  },
  async register({ commit }, form) {
    const res = await axios.post(api.register, form);
    if (res.data.success) {
      this.$router.push({ name: 'login' });
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
  async logout({ commit }, form) {
    const res = await axios.post(api.logout, form);
    if (res.data.success) {
      commit('LOGOUT', res.data.message);
    }
    message(res.data.message);
    this.$router.push({ name: 'login' });
  },
};

const mutations = {
  LOGIN: (state, user) => {
    state.user = user;
    state.isLoggedIn = true;
    state.role = user.role;
    LocalStorage.set('user', user);
    setAxiosHeaders(state);
  },
  LOGOUT: (state) => {
    state.user = null;
    state.isLoggedIn = false;
    state.role = '';
    LocalStorage.clear();
    setAxiosHeaders(state);
  },
  SCHOOLOPTIONS: (state, data) => {
    state.schoolOptions = data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
