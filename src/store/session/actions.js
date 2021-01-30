import axios from 'axios';
import { message } from './functions';
import api from '../api';
import setAxiosHeaders from './helpers';

export function init({ state }) {
  setAxiosHeaders(state);
}

export async function register({ commit, state }, form) {
  const res = await axios.post(api.register, form);
  if (res.data.success) {
    commit('LOGIN', res.data.user);
    setAxiosHeaders(state);
    this.$router.push({ name: 'home' });
  }
  message(res.data.message);
}

export async function login({ commit, state }, form) {
  const res = await axios.post(api.login, form);
  if (res.data.success) {
    commit('LOGIN', res.data.user);
    setAxiosHeaders(state);
    this.$router.push({ name: 'home' });
  }
  message(res.data.message);
}

export async function fetchUser() {
  return 'hi';
  // const res = await axios.post(api.register, form);
  // if (res.data.success) {
  //   commit('LOGIN', res.data.user);
  //   setAxiosHeaders(state);
  //   this.$router.push({ name: 'home' });
  // }
  // message(res.data.message);
}

export function logout({ commit }) {
  commit('LOGOUT');
}

export function auth() {
  const user = 'hi';
  return user;
}

export async function adminBasics({ commit }) {
  const res = await axios.get(api.adminBasics);
  commit('ADMINBASICS', res.data.data);
}

export async function addBasic({ commit }, form) {
  const res = await axios.post(api.addBasic, form);
  if (res.data.success) {
    commit('ADDBASIC', res.data.data);
  }
  message(res.data.message);
}

export async function updateBasic({ commit }, form) {
  const res = await axios.post(api.updateBasic, form);
  if (res.data.success) {
    commit('UPDATEBASIC', res.data.data);
  }
  message(res.data.message);
}

export async function adminBlogMeta({ commit }) {
  const res = await axios.get(api.adminBlogMeta);
  commit('BLOGMETA', res.data.data);
}

export async function addBlogMeta({ commit }, form) {
  const res = await axios.post(api.addBlogMeta, form);
  commit('ADDBLOGMETA', res.data.data);
}

export async function updateBlogMeta({ commit }, form) {
  const res = await axios.post(api.updateBlogMeta, form);
  if (res.data.success) {
    commit('UPDATEBLOGMETA', res.data.data);
  }
  message(res.data.message);
}

export async function adminBlogs({ commit }) {
  const res = await axios.get(api.adminBlogs);
  commit('ADMINBLOGS', res.data.data);
}

export async function blogMetaOptions({ commit }) {
  const res = await axios.get(api.blogMetaOptions);
  commit('BLOGMETAOPTIONS', res.data);
}

export async function addBlog({ commit }, form) {
  const res = await axios.post(api.addBlog, form);
  if (res.data.success) {
    commit('ADDBLOG', res.data.data);
    this.$router.push({ name: 'blogs' });
  }
  message(res.data.message);
}

export async function getBlog({ commit }, form) {
  const res = await axios.get(api.getBlog + form.id, form);
  if (res.data.success) {
    commit('BLOGTOEDIT', res.data.data);
  }
}

export async function updateBlog({ commit }, form) {
  const res = await axios.post(api.updateBlog, form);
  if (res.data.success) {
    commit('UPDATEBLOG', res.data.data);
    this.$router.push({ name: 'blogs' });
  }
  message(res.data.message);
}

export async function adminVideos({ commit }) {
  const res = await axios.get(api.adminVideos);
  commit('ADMINVIDEOS', res.data.data);
}

export async function addVideo({ commit }, form) {
  const res = await axios.post(api.addVideo, form);
  if (res.data.success) {
    commit('ADDVIDEO', res.data.data);
  }
  message(res.data.message);
}

export async function updateVideo({ commit }, form) {
  const res = await axios.post(api.updateVideo, form);
  if (res.data.success) {
    commit('UPDATEVIDEO', res.data.data);
  }
  message(res.data.message);
}

export async function adminMetas({ commit }) {
  const res = await axios.get(api.adminMetas);
  console.log('res.data.data', res.data.data);
  commit('ADMINMETAS', res.data.data);
}

export async function addMeta({ commit }, form) {
  const res = await axios.post(api.addMeta, form);
  if (res.data.success) {
    commit('ADDMETA', res.data.data);
  }
  message(res.data.message);
}

export async function updateMeta({ commit }, form) {
  const res = await axios.post(api.updateMeta, form);
  if (res.data.success) {
    commit('UPDATEMETA', res.data.data);
  }
  message(res.data.message);
}
