import axios from 'axios';
// import { message } from './functions';
import api from './api';
/* eslint no-shadow: ["error", { "allow": ["state"] }] */
const state = {
  videos: [],
  filterVideos: [],
  activeClasses: [],
  activeSubjects: [],
};

const getters = {
  videos: (state) => state.videos,
  filterVideos: (state) => state.filterVideos,
  activeClasses: (state) => state.activeClasses,
  activeSubjects: (state) => state.activeSubjects,
};

const actions = {
  async videos({ commit }, form) {
    const res = await axios.get(api.videos);
    commit('VIDEOS', res.data);
    commit('FILTERVIDEOS', form);
  },
  async subjects({ commit }, form) {
    const res = await axios.get(api.subjects + form);
    commit('SUBJECTS', res.data.data);
    commit('FILTERVIDEOSBYCLASS', form);
  },
  async filterBySubject({ commit }, form) {
    commit('FILTERVIDEOSBYSUBJECT', form);
  },
};

const mutations = {
  VIDEOS: (state, data) => {
    state.videos = data.data;
    state.filterVideos = data.data;
    state.activeClasses = data.classes;
  },
  SUBJECTS: (state, data) => {
    state.activeSubjects = data;
  },
  FILTERVIDEOS: (state, form) => {
    if (form.id !== 'All') {
      state.filterVideos = state.videos.filter((i) => i.video_class === form.id);
    }
  },
  FILTERVIDEOSBYCLASS: (state, form) => {
    state.filterVideos = state.videos.filter((i) => i.video_class === form);
  },
  FILTERVIDEOSBYSUBJECT: (state, form) => {
    state.filterVideos = state.videos.filter((i) => i.video_class === form.classx).filter((i) => i.video_sub === form.subject);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
