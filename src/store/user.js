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
    disable: false,
    allowPractice: false,
    startPractice: false,
    dpSubject: [],
    dpTopic: [],
    dpSubTopic: [],
    dpTopicFilter: [],
    dpSubTopicFilter: [],
    dpData: [],
    dpAnswerList: [],
    dpSolutionList: [],
    activeData: '',
    activeIndex: -1,
    dpSolved: false,
    dpIsDisabled: false,
    dpFilters: ''
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
    allowPractice: (state) => state.allowPractice, 
    startPractice: (state) => state.startPractice, 
    dpSubject: (state) => state.dpSubject, 
    dpTopic: (state) => state.dpTopic, 
    dpSubTopic: (state) => state.dpSubTopic, 
    dpTopicFilter: (state) => state.dpTopicFilter, 
    dpSubTopicFilter: (state) => state.dpSubTopicFilter,
    dpData: (state) => state.dpData, 
    dpAnswerList: (state) => state.dpAnswerList,
    dpSolutionList: (state) => state.dpSolutionList,
    activeData: (state) => state.activeData,
    activeIndex: (state) => state.activeIndex,
    dpSolved: (state) => state.dpSolved,
    dpIsDisabled: (state) => state.dpIsDisabled,
    dpFilters: (state) => state.dpFilters,
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
    async dailyPracticeData({ commit }, form) {
        const res = await axios.post(api.dailyPracticeData, form);
        if (res.data.success) { commit('DAILYPRACTICEDATA', res.data); }
        message(res.data.message);
    },
    async dpSubjectSelected({ commit }, form) { commit('DPSUBJECTSELECTED', form); },
    async dpTopicSelected({ commit }, form) { commit('DPTOPICSELECTED', form); },
    async endPractice({ commit }) { commit('ENDPRACTICE'); },
    async startDailyPractice({ commit }, form) {
        const res = await axios.post(api.startDailyPractice, form);
        console.log('res.data', res.data)
        if (res.data.success) {
            commit('SETDPFILTERS', form);
            commit('STARTDAILYPRACTICE', res.data);
            commit('SETDPDATA', res.data.details);
        }
        message(res.data.message);        
    },
    async dpSubmitOption({ commit }, form) { commit('DPSUBMITOPTION', form); },
    async dpSubmitAnswer({ commit }, form) { 
        console.log('form', form)
        const res = await axios.post(api.submitAnswer, form);
        console.log('res.data', res.data)
        commit('DPSUBMITANSWER'); 
        commit('SETDPDATA', res.data.details);
        message(res.data.message);
    },
    async dpNextQuestion({ commit }, form) { 
        console.log('form', form)
        const res = await axios.post(api.nextQuestion, form);
        console.log('res.data', res.data)
        if (res.data.success) { commit('DPNEXTQUESTION', res.data); }
        // message(res.data.message);
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
    DAILYPRACTICEDATA: (state, data) => {
        console.log('data.data', data.data)
        state.allowPractice = true;
        state.dpSubject = data.data.filter(i=>i.type=='Subject');
        state.dpTopic = data.data.filter(i=>i.type=='Topic');
        state.dpSubTopic = data.data.filter(i=>i.type=='SubTopic');
        state.dpTopicFilter = [];
        state.dpSubTopicFilter = [];
    },
    DPSUBJECTSELECTED: (state, data) => { state.dpTopicFilter = state.dpTopic.filter(i=>parseInt(i.tab2)==data.subject); },
    DPTOPICSELECTED: (state, data) => { 
        console.log('data', data)
        state.dpSubTopicFilter = state.dpSubTopic.filter(i=>parseInt(i.tab2)==data.subject && data.topic.includes(parseInt(i.tab3))); 
    },
    ENDPRACTICE: (state) => { 
        state.allowPractice = false; 
        state.startPractice = false; 
    },
    STARTDAILYPRACTICE: (state, data) => { 
        console.log('data in STARTDAILYPRACTICE', data)
        state.activeData = data.data;
        state.startPractice = true;
        state.activeIndex = state.activeIndex+1;
        state.dpFilters.id = data.id;
    },
    SETDPFILTERS: (state, data) => { 
        console.log('data', data)
        state.dpFilters = data;
    },
    DPSUBMITOPTION: (state, data) => {
        console.log('data in DPSUBMITOPTION', data)
        console.log('state.activeIndex', state.activeIndex)
        var xx = state.dpAnswerList
        xx[state.activeIndex] = data
        state.dpAnswerList = xx;
    },
    DPSUBMITANSWER: (state) => {
        console.log('data in DPSUBMITANSWER')
        state.dpIsDisabled = true
        state.dpSolved = true
        // state.activeData = data.data;

    },
    DPNEXTQUESTION: (state, data) => {
        console.log('data in DPNEXTQUESTION', data)
        state.dpIsDisabled = true
        state.dpSolved = true
    },
    SETDPDATA: (state, data) => { 
        console.log('data in SETDPDATA', data)
        state.dpData = data.questions;
        state.dpSolutionList = data.solution;
        if(data.answer){
            state.dpAnswerList = data.answer;
        }else{
            state.dpAnswerList = [];
        }
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
  };
