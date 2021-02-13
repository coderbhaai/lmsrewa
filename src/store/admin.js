import axios from 'axios';
import { message } from './functions';
import api from './api';
/* eslint no-shadow: ["error", { "allow": ["state"] }] */
const state = {
  adminBasics: [],
  basicOptions: [],
  classOptions: [],
  subjectOptions: [],
  catOptions: [],
  tagOptions: [],
  blogMeta: [],
  adminBlogs: [],
  blogMetaOptions: [],
  // blogToEdit: [],
  adminVideos: [],
  adminMetas: [],
  adminInstitutes: []
};

const getters = {
  adminBasics: (state) => state.adminBasics,
  basicOptions: (state) => state.basicOptions,
  classOptions: (state) => state.classOptions,
  subjectOptions: (state) => state.subjectOptions,
  blogMeta: (state) => state.blogMeta,
  adminMetas: (state) => state.adminMetas,
  catOptions: (state) => state.catOptions,
  tagOptions: (state) => state.tagOptions,
  adminBlogs: (state) => state.adminBlogs,
  blogMetaOptions: (state) => state.blogMetaOptions,
  // blogToEdit: (state) => state.blogToEdit,
  adminVideos: (state) => state.adminVideos,
  adminInstitutes: (state) => state.adminInstitutes
};

const actions = {
  async adminBasics({ commit }) {
    const res = await axios.get(api.adminBasics);
    commit('ADMINBASICS', res.data.data);
  },
  async addBasic({ commit }, form) {
    const res = await axios.post(api.addBasic, form);
    if (res.data.success) {
      commit('ADDBASIC', res.data.data);
    }
    message(res.data.message);
  },
  async updateBasic({ commit }, form) {
    const res = await axios.post(api.updateBasic, form);
    if (res.data.success) {
      commit('UPDATEBASIC', res.data.data);
    }
    message(res.data.message);
  },
  async adminBlogMeta({ commit }) {
    const res = await axios.get(api.adminBlogMeta);
    commit('BLOGMETA', res.data.data);
  },
  async addBlogMeta({ commit }, form) {
    const res = await axios.post(api.addBlogMeta, form);
    if (res.data.success) {
      commit('ADDBLOGMETA', res.data.data);
    }
    message(res.data.message);
  },
  async updateBlogMeta({ commit }, form) {
    const res = await axios.post(api.updateBlogMeta, form);
    if (res.data.success) {
      commit('UPDATEBLOGMETA', res.data.data);
    }
    message(res.data.message);
  },
  async adminBlogs({ commit }) {
    const res = await axios.get(api.adminBlogs);
    commit('ADMINBLOGS', res.data.data);
  },
  async blogMetaOptions({ commit }) {
    const res = await axios.get(api.blogMetaOptions);
    commit('BLOGMETAOPTIONS', res.data);
  },
  async addBlog({ commit }, form) {
    const res = await axios.post(api.addBlog, form);
    if (res.data.success) {
      commit('ADDBLOG', res.data.data);
      this.$router.push({ name: 'adminBlogs' });
    }
    message(res.data.message);
  },
  // async getBlog({ commit }, form) {
  //   const res = await axios.get(api.getBlog + form.id, form);
  //   if (res.data.success) {
  //     commit('BLOGTOEDIT', res.data.data);
  //   }
  // },
  async updateBlog({ commit }, form) {
    const res = await axios.post(api.updateBlog, form);
    if (res.data.success) {
      commit('UPDATEBLOG', res.data.data);
      this.$router.push({ name: 'adminBlogs' });
    }
    message(res.data.message);
  },
  async adminVideos({ commit }) {
    const res = await axios.get(api.adminVideos);
    commit('ADMINVIDEOS', res.data.data);
  },
  async addVideo({ commit }, form) {
    const res = await axios.post(api.addVideo, form);
    if (res.data.success) {
      commit('ADDVIDEO', res.data.data);
    }
    message(res.data.message);
  },
  async updateVideo({ commit }, form) {
    const res = await axios.post(api.updateVideo, form);
    if (res.data.success) {
      commit('UPDATEVIDEO', res.data.data);
    }
    message(res.data.message);
  },
  async adminMetas({ commit }) {
    const res = await axios.get(api.adminMetas);
    commit('ADMINMETAS', res.data.data);
  },
  async addMeta({ commit }, form) {
    const res = await axios.post(api.addMeta, form);
    if (res.data.success) {
      commit('ADDMETA', res.data.data);
    }
    message(res.data.message);
  },
  async updateMeta({ commit }, form) {
    const res = await axios.post(api.updateMeta, form);
    if (res.data.success) {
      commit('UPDATEMETA', res.data.data);
    }
    message(res.data.message);
  },
  async adminInstitutes({ commit }) {
    const res = await axios.get(api.adminInstitutes);
    commit('ADMININSTITUTES', res.data.data);
  },
  async changeInstituteStatus({ commit }, form) {
    const res = await axios.post(api.changeInstituteStatus, form);
    if (res.data.success) {
      commit('CHANGEINSTITUTESTATUS', res.data.data);
    }
    message(res.data.message);
  },
};

const mutations = {
  ADMINBASICS: (state, data) => {
    state.adminBasics = data;
    state.basicOptions = data.filter((i) => i.type === 'Basic');
    state.classOptions = data.filter((i) => i.type === 'Class');
    state.subjectOptions = data.filter((i) => i.type === 'Subject');
  },
  ADDBASIC: (state, data) => { state.adminBasics.unshift(data); },
  UPDATEBASIC: (state, data) => {
    const index = state.adminBasics.findIndex((i) => i.id === data.id);
    if (index !== -1) {
      state.adminBasics.splice(index, 1, data);
    }
  },
  BLOGMETA: (state, data) => { state.blogMeta = data; },
  ADDBLOGMETA: (state, data) => state.blogMeta.unshift(data),
  UPDATEBLOGMETA: (state, data) => {
    const index = state.blogMeta.findIndex((i) => i.id === data.id);
    if (index !== -1) {
      state.blogMeta.splice(index, 1, data);
    }
  },
  ADMINMETAS: (state, data) => { state.adminMetas = data; },
  ADDMETA: (state, data) => state.adminMetas.unshift(data),
  UPDATEMETA: (state, data) => {
    const index = state.adminMetas.findIndex((i) => i.id === data.id);
    if (index !== -1) {
      state.adminMetas.splice(index, 1, data);
    }
  },
  ADMINVIDEOS: (state, data) => { state.adminVideos = data; },
  ADDVIDEO: (state, data) => state.adminVideos.unshift(data),
  UPDATEVIDEO: (state, data) => {
    const index = state.adminVideos.findIndex((i) => i.id === data.id);
    if (index !== -1) {
      state.adminVideos.splice(index, 1, data);
    }
  },
  ADMINBLOGS: (state, data) => { state.adminBlogs = data; },
  BLOGMETAOPTIONS: (state, data) => {
    state.catOptions = data.catOptions;
    state.tagOptions = data.tagOptions;
  },
  ADDBLOG: (state, data) => state.adminBlogs.unshift(data),
  // BLOGTOEDIT: (state, data) => { state.blogToEdit = data; },
  UPDATEBLOG: (state, data) => {
    const index = state.adminBlogs.findIndex((i) => i.id === data.id);
    if (index !== -1) {
      state.adminBlogs.splice(index, 1, data);
    }
  },
  ADMININSTITUTES: (state, data) => { state.adminInstitutes = data; },
  CHANGEINSTITUTESTATUS: (state, data) => {
    const index = state.adminInstitutes.findIndex((i) => i.id === data.id);
    if (index !== -1) { state.adminInstitutes.splice(index, 1, data); }
  },


};

export default {
  state,
  getters,
  actions,
  mutations,
};