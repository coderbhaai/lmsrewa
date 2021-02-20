import axios from 'axios';
import { message } from './functions';
import api from './api';
/* eslint no-shadow: ["error", { "allow": ["state"] }] */

const state = {
    testId: '',
    testPaper: '',
    questions: [],
    solution: [],
    answer: [],
    marks: [],
    solved: false,
    total: '',
    score: '',
    disable: false
};

const getters = {
    testId: (state) => state.testId,
    testPaper: (state) => state.testPaper,    
    questions: (state) => state.questions,    
    solution: (state) => state.solution,    
    answer: (state) => state.answer,
    marks: (state) => state.marks,
    solved: (state) => state.solved, 
    total: (state) => state.total, 
    score: (state) => state.score, 
    disable: (state) => state.disable, 
};

const actions = {
    async createTest({ commit }, form) {
        const res = await axios.post(api.createTest, form);
        if (res.data.success) { commit('CREATETEST', res.data.data); }
        message(res.data.message);
        this.$router.push({ path: '/test-paper/'+res.data.data });
    },
    async testPaper({ commit }, form) {
        const res = await axios.post(api.testPaper, form);
        if (res.data.success) { 
            commit('TESTPAPER', res.data); 
        }else{ 
            commit('RESETPAPER'); 
            this.$router.push({ path: '/online-test-series' });
        }
        message(res.data.message);
    },
    async saveAnswer({ commit }, form) { commit('SAVEANSWER', form); },
    async submitTest({ commit }, form) {
        const res = await axios.post(api.submitTest, form);
        if (res.data.success) { commit('SUBMITTEST', res.data); }
        message(res.data.message);
    },
};

const mutations = {
    CREATETEST: (state, data) => { state.testId = data; },
    RESETPAPER: (state) => {
        state.testPaper = '';
        state.questions = [];
        state.solution = [];
        state.solved = false; 
        state.total = '';
        state.score = '';
        state.marks = [];
        state.disable = false;
        state.answer = [];
    },
    TESTPAPER: (state, data) => {
        console.log('data', data)
        state.testPaper = data.data;
        state.questions = data.questions;
        state.solution = JSON.parse(data.data.solution);
        state.solved = data.solved; 
        state.total = data.data.total;
        state.score = data.data.score;
        state.marks = JSON.parse(data.data.marks);
        if(data.data.answer){
            state.answer = JSON.parse(data.data.answer)
            state.disable = true
        }else{
            state.answer = new Array(data.questions.length).fill('blank');
            state.disable = false
        }
    },
    SAVEANSWER: (state, data) => {
        var xx = state.answer
        xx[data.id] = data.answer
        state.answer = xx; 
    },
    SUBMITTEST: (state, data) => {
        console.log('data', data)
        state.solved = data.solved;
        state.answer = JSON.parse(data.answer);
        state.score = data.score;
        state.disable = true
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
  };
