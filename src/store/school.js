import axios from 'axios';
import { message } from './functions';
import api from './api';
/* eslint no-shadow: ["error", { "allow": ["state"] }] */
const state = {
  schoolBasics: [],
  schoolBasicsCopy: [],
  schoolBasicOptions: [],
  schoolClassOptions:  [],
  schoolStudentOptions:  [],
};

const getters = {
  schoolBasics: (state) => state.schoolBasics,
  schoolBasicsCopy: (state) => state.schoolBasicsCopy,
  schoolBasicOptions: (state) => state.schoolBasicOptions,
  schoolClassOptions: (state) => state.schoolClassOptions,
  schoolStudentOptions: (state) => state.schoolStudentOptions,
};

const actions = {
  async schoolBasics({ commit }, form) { const res = await axios.get(api.schoolBasics); commit('SCHOOLBASICS', res.data.data); },
  async addSchoolBasic({ commit }, form) {
    const res = await axios.post(api.addSchoolBasic, form);
    if (res.data.success) { commit('ADDSCHOOLBASIC', res.data.data); }
    message(res.data.message);
  },
  async updateSchoolBasic({ commit }, form) {
    const res = await axios.post(api.updateSchoolBasic, form);
    if (res.data.success) { commit('UPDATESCHOOLBASIC', res.data.data); }
    message(res.data.message);
  },
  async filterSchoolBasic({ commit }, form) {
    commit('FILTERSCHOOLBASIC', form);
    message('Data filtered successfully');
  },
};

const mutations = {
  SCHOOLBASICS: (state, data) => {
    state.schoolBasics = data;
    state.schoolBasicsCopy = data;
    state.schoolBasicOptions = data.filter((i) => i.type === 'Basic' );
    state.schoolClassOptions = data.filter((i) => i.type === 'Class' );
    state.schoolStudentOptions = data.filter((i) => i.type === 'Class' );
  },
  ADDSCHOOLBASIC: (state, data) => { 
    state.schoolBasics.unshift(data); 
    if(data.type=='Basic'){ state.schoolBasicOptions.unshift(data) }
    if(data.type=='Class'){ state.schoolClassOptions.unshift(data) }
    if(data.type=='Student'){ state.schoolStudentOptions.unshift(data) }
  },
  UPDATESCHOOLBASIC: (state, data) => {
    const index = state.schoolBasics.findIndex((i) => i.id === data.id);
    if (index !== -1) { state.schoolBasics.splice(index, 1, data); }
  },
  FILTERSCHOOLBASIC: (state, data) => {
    var xx = state.schoolBasicsCopy.filter((i) => data.filterBy.includes(i.id) );
    var filter = [];
    xx.forEach(i => { filter.push(i.name) });
    if(filter.length){
      state.schoolBasics = state.schoolBasicsCopy.filter((i) => filter.includes(i.type) );
    }else{
      state.schoolBasics = state.schoolBasicsCopy;
    }
  },
};

export default { state, getters, actions, mutations, };
