import axios from 'axios';
import { message } from './functions';
import api from './api';
/* eslint no-shadow: ["error", { "allow": ["state"] }] */
const state = {
  blogs: [],
  suggestBlogs: [],
  singleBlog: [],
  blogList: [],
  comments: [],
  response: [],
  catList: [],
  tagList: [],
};

const getters = {
  blogs: state =>{ return state.blogs},
  suggestBlogs: (state) => state.suggestBlogs,
  singleBlog: (state) => state.singleBlog,
  blogList: (state) => state.blogList,
  comments: (state) => state.comments,
  response: (state) => state.response,
  catList: (state) => state.catList,
  tagList: (state) => state.tagList,
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
  async singleBlog({ commit }, form) {
    const res = await axios.get(api.singleBlog + form.url);
    commit('SINGLEBLOG', res.data);
  },
  async addComment({ commit }, form) {
    const res = await axios.post(api.addComment, form);
    commit('ADDCOMMENT', res.data.message);
    message(res.data.message);
  },
};

const mutations = {
  BLOGS: (state, data) => { state.blogs = data; },
  SUGGESTBLOGS: (state, data) => { state.suggestBlogs = data; },
  SINGLEBLOG: (state, data) => {
    state.singleBlog = data.data;
    state.suggestBlogs = data.blogs;
    state.blogList = data.blogList;
    state.comments = data.comments;
    state.response = data.response;
    state.catList = data.cats;
    state.tagList = data.tags;
  },
  ADDCOMMENT: (state, mesg) => { state.commentAdded = mesg; },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
