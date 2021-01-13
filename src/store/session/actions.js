import axios from 'axios';
// import { Notify } from 'quasar';
import { message } from './functions';
import api from '../api';
import setAxiosHeaders from './helpers';

export function init({ state }) {
  setAxiosHeaders(state);
}

export async function register({ commit, state }, form) {
  const res = await axios.post(api.register, form);
  console.log('res', res);
  if (res.data.success) {
    commit('LOGIN', res.data.user);
    setAxiosHeaders(state);
  }
  message(res.data.message);
}

export function login({ commit, dispatch, getters }, form) {
  if (getters.isAuthenticated) return dispatch('validate');
  return axios.post('auth/login', form)
    .then((res) => {
      const { user } = res.data.user;
      commit('LOGIN', user);
      return user;
    });
}

export function validate({ commit, state }) {
  if (!state.user) return Promise.resolve(null);
  return axios.get('auth/user')
    .then((res) => {
      const { user } = res.data.user;
      commit('LOGIN', user);
      return user;
    }).catch((error) => {
      if (error.res.status === 401) {
        commit('LOGOUT');
      }
      return null;
    });
}

export function logout({ commit }) {
  commit('LOGOUT');
}
