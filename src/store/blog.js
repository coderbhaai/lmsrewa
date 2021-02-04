import axios from 'axios';
// import { message } from './functions';
import api from './api';
/* eslint no-shadow: ["error", { "allow": ["state"] }] */
const state = {
  blogs: [],
  suggestBlogs: [],
};

const getters = {
  blogs: (state) => state.blogs,
  suggestBlogs: (state) => state.suggestBlogs,
};

const actions = {
  async blogs({ commit }) {
    const res = await axios.get(api.blogs);
    commit('BLOGS', res.data.data);
  },
  async suggestBlogs({ commit }) {
    const res = await axios.get(api.suggestBlogs);
    commit('SUGGESTBLOGS', res.data.data);
  },
};

const mutations = {
  BLOGS: (state, data) => { state.blogs = data; },
  SUGGESTBLOGS: (state, data) => { state.suggestBlogs = data; },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
