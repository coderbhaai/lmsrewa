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
    dpQuestions: [],
    dpAnswerList: [],
    dpSolutionList: [],
    activeData: '',
    dpActiveIndex:0,
    dpSolved: false,
    dpIsDisabled: false,
    dpFilters: '',
    dpTotal: '',
    dpScore: ''
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
    dpQuestions: (state) => state.dpQuestions, 
    dpAnswerList: (state) => state.dpAnswerList,
    dpSolutionList: (state) => state.dpSolutionList,
    activeData: (state) => state.activeData,
    dpActiveIndex: (state) => state.dpActiveIndex,
    dpSolved: (state) => state.dpSolved,
    dpIsDisabled: (state) => state.dpIsDisabled,
    dpFilters: (state) => state.dpFilters,
    dpTotal: (state) => state.dpTotal,
    dpScore: (state) => state.dpScore,
};

const actions = {
    async initializeDp({ commit }, form) {
        const res = await axios.post(api.initializeDp, form);
        if (res.data.success) {
            commit('INITIALIZEDP', res.data.data);
        }
    },
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
        if (res.data.success) {
            form.id = res.data.id
            commit('SETDPFILTERS', form);
            commit('STARTDAILYPRACTICE', res.data);
            commit('SETDPDATA', res.data.details);
        }
        message(res.data.message);        
    },
    async dpSubmitOption({ commit }, form) { commit('DPSUBMITOPTION', form); },
    async dpSubmitAnswer({ commit }, form) { 
        const res = await axios.post(api.submitAnswer, form);
        commit('DPSUBMITANSWER'); 
        commit('SETDPDATA', res.data.details);
        message(res.data.message);
    },
    async dpNextQuestion({ commit }, form) { 
        const res = await axios.post(api.nextQuestion, form);
        if (res.data.success) {
            commit('DPNEXTQUESTION', res.data.data); 
            commit('SETDPDATA', res.data.details);
        }
        message(res.data.message);

    },
    async dpPreview({ commit }, form) {
        const res = await axios.post(api.dpPreview, form);
        if (res.data.success) { 
            commit('DPPREVIEW', res.data.data); 
            commit('DPREVIEW', form); 
        }
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
        state.solved = data.solved;
        state.answer = JSON.parse(data.answer);
        state.score = data.score;
        state.disable = true
    },
    DAILYPRACTICEDATA: (state, data) => {
        state.allowPractice = true;
        state.dpSubject = data.data.filter(i=>i.type=='Subject');
        state.dpTopic = data.data.filter(i=>i.type=='Topic');
        state.dpSubTopic = data.data.filter(i=>i.type=='SubTopic');
        state.dpTopicFilter = [];
        state.dpSubTopicFilter = [];
    },
    DPSUBJECTSELECTED: (state, data) => { state.dpTopicFilter = state.dpTopic.filter(i=>parseInt(i.tab2)==data.subject); },
    DPTOPICSELECTED: (state, data) => {
        state.dpSubTopicFilter = state.dpSubTopic.filter(i=>parseInt(i.tab2)==data.subject && data.topic.includes(parseInt(i.tab3))); 
    },
    ENDPRACTICE: (state) => { 
        state.allowPractice = false; 
        state.startPractice = false; 
    },
    STARTDAILYPRACTICE: (state, data) => { 
        state.activeData = data.data;
        state.startPractice = true;
        state.dpIsDisabled = false
        state.dpSolved = false
    },
    SETDPFILTERS: (state, data) => { 
        state.dpFilters = data;
    },
    DPSUBMITOPTION: (state, data) => {
        var xx = state.dpAnswerList
        xx[state.dpActiveIndex-1] = data
        state.dpAnswerList = xx;
    },
    DPSUBMITANSWER: (state) => {
        state.dpIsDisabled = true
        state.dpSolved = true
    },
    DPNEXTQUESTION: (state, data) => {
        state.dpIsDisabled = false
        state.dpSolved = false
        state.activeData = data;
    },
    DPPREVIEW: (state, data) => {
        // state.dpIsDisabled = true
        state.dpSolved = true
        state.activeData = data;
    },
    SETDPDATA: (state, data) => { 
        state.dpQuestions = JSON.parse(data.questions);
        state.dpActiveIndex = JSON.parse(data.questions).length;
        state.dpSolutionList = JSON.parse(data.solution);
        state.dpTotal = data.total;
        state.dpScore = data.score;
        if(data.answer){
            state.dpAnswerList = JSON.parse(data.answer);
        }else{
            state.dpAnswerList = [];
        }
    },
    DPREVIEW: (state, data) => {
        state.dpActiveIndex = data.index;
    },
    INITIALIZEDP: (state, data) => {
        state.dpQuestions = JSON.parse(data.questions);
        state.dpActiveIndex = JSON.parse(data.questions).length;
        state.dpSolutionList = JSON.parse(data.solution);
        state.dpTotal = data.total;
        state.dpScore = data.score;
        if(state.dpQuestions.length != state.dpAnswerList.length){
            state.dpIsDisabled = false
        }
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
  };
