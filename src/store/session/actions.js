import axios from 'axios';
import { message } from './functions';
import api from '../api';
import setAxiosHeaders from './helpers';

export function init({ state }) {
  setAxiosHeaders(state);
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
  // console.log('res', res);
  // commit('ADMINBLOGS', []);
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

// export function validate({ commit, state }) {
//   if (!state.user) return Promise.resolve(null);
//   return axios.get('auth/user')
//     .then((res) => {
//       const { user } = res.data.user;
//       commit('LOGIN', user);
//       return user;
//     }).catch((error) => {
//       if (error.res.status === 401) {
//         commit('LOGOUT');
//       }
//       return null;
//     });
// }

export function logout({ commit }) {
  commit('LOGOUT');
}

export function auth() {
  const user = 'hi';
  return user;
}
