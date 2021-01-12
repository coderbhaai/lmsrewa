// import axios from 'axios';

export function setPath({ commit, dispatch }, path) {
  commit('SET_PATH', path);
  dispatch('refresh');
}
