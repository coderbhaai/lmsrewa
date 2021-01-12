import axios from 'axios';

// import {LocalStorage} from 'quasar';
import setAxiosHeaders from './helpers';
import api from '../api';

export function init({ state }) {
  setAxiosHeaders(state);
}

export function register({ commit, state }, form) {
  return (axios.post(api.regsiter, form)
    .then((res) => {
      console.log('res, state, commit', res);
      if (res.data.success) {
        commit('LOGIN', res.data.user);
        setAxiosHeaders(state);
      } else {
        console.log('Regsitration failed');
      }
    })
  );
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
