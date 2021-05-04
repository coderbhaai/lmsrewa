import axios from 'axios';
import { message } from './functions';
import api from './api';
/* eslint no-shadow: ["error", { "allow": ["state"] }] */
const state = {
  adminBasics: [],
  basicOptions: [],
  catOptions: [],
  tagOptions: [],
  blogMeta: [],
  adminBlogs: [],
  blogMetaOptions: [],
  adminVideos: [],
  adminMetas: [],
  adminInstitutes: [],
  boardOptions : [],
  classOptions : [],
  subjectCopy:  [],
  subjectOptions : [],
  modeOptions : [],
  topicOptions : [],
  subtopicOptions : [],
  difficultyOptions : [],
  paperOptions: [],
  basicSubjectFilter: [],
  basicTopicFilter: [],
  basicSubTopicFilter : [],
  typeOptions: [],
  adminQuestions: [],
  questSummary: [],
  questSummaryFilter: [],
  questCount: '',
  testSubTopicFilter: []  
};

const getters = {
  adminBasics: (state) => state.adminBasics,
  basicOptions: (state) => state.basicOptions,
  classOptions: (state) => state.classOptions,
  subjectOptions: (state) => state.subjectOptions,
  blogMeta: (state) => state.blogMeta,
  adminMetas: (state) => state.adminMetas,
  catOptions: (state) => state.catOptions,
  tagOptions: (state) => state.tagOptions,
  adminBlogs: (state) => state.adminBlogs,
  blogMetaOptions: (state) => state.blogMetaOptions,
  adminVideos: (state) => state.adminVideos,
  adminInstitutes: (state) => state.adminInstitutes,
  boardOptions : (state) => state.boardOptions,
  classOptions : (state) => state.classOptions,
  subjectCopy : (state) => state.subjectCopy,
  subjectOptions : (state) => state.subjectOptions,
  modeOptions : (state) => state.modeOptions,
  topicOptions : (state) => state.topicOptions,
  subtopicOptions : (state) => state.subtopicOptions,
  difficultyOptions : (state) => state.difficultyOptions,
  paperOptions : (state) => state.paperOptions,
  basicSubjectFilter : (state) => state.basicSubjectFilter,
  basicTopicFilter : (state) => state.basicTopicFilter,
  basicSubTopicFilter : (state) => state.basicSubTopicFilter,
  typeOptions : (state) => state.typeOptions,
  adminQuestions : (state) => state.adminQuestions,
  questSummary : (state) => state.questSummary,
  questSummaryFilter : (state) => state.questSummaryFilter,
  questCount : (state) => state.questCount,
  testSubTopicFilter : (state) => state.testSubTopicFilter,  
};

const actions = {
  async adminBasics({ commit }) { const res = await axios.get(api.adminBasics); commit('ADMINBASICS', res.data.data); },
  async addBasic({ commit }, form) {
    const res = await axios.post(api.addBasic, form);
    if (res.data.success) { commit('ADDBASIC', res.data.data); }
    message(res.data.message);
  },
  async updateBasic({ commit }, form) {
    const res = await axios.post(api.updateBasic, form);
    if (res.data.success) { commit('UPDATEBASIC', res.data.data); }
    message(res.data.message);
  },
  async adminBlogMeta({ commit }) { const res = await axios.get(api.adminBlogMeta); commit('BLOGMETA', res.data.data); },
  async addBlogMeta({ commit }, form) {
    const res = await axios.post(api.addBlogMeta, form);
    if (res.data.success) {
      commit('ADDBLOGMETA', res.data.data);
    }
    message(res.data.message);
  },
  async updateBlogMeta({ commit }, form) {
    const res = await axios.post(api.updateBlogMeta, form);
    if (res.data.success) {
      commit('UPDATEBLOGMETA', res.data.data);
    }
    message(res.data.message);
  },
  async adminBlogs({ commit }) { const res = await axios.get(api.adminBlogs); commit('ADMINBLOGS', res.data.data); },
  async blogMetaOptions({ commit }) { const res = await axios.get(api.blogMetaOptions); commit('BLOGMETAOPTIONS', res.data); },
  async addBlog({ commit }, form) {
    const res = await axios.post(api.addBlog, form);
    if (res.data.success) {
      commit('ADDBLOG', res.data.data);
      this.$router.push({ name: 'adminBlogs' });
    }
    message(res.data.message);
  },
  async updateBlog({ commit }, form) {
    const res = await axios.post(api.updateBlog, form);
    if (res.data.success) {
      commit('UPDATEBLOG', res.data.data);
      this.$router.push({ name: 'adminBlogs' });
    }
    message(res.data.message);
  },
  async adminVideos({ commit }) { const res = await axios.get(api.adminVideos); commit('ADMINVIDEOS', res.data.data); },
  async addVideo({ commit }, form) {
    const res = await axios.post(api.addVideo, form);
    if (res.data.success) {
      commit('ADDVIDEO', res.data.data);
    }
    message(res.data.message);
  },
  async updateVideo({ commit }, form) {
    const res = await axios.post(api.updateVideo, form);
    if (res.data.success) {
      commit('UPDATEVIDEO', res.data.data);
    }
    message(res.data.message);
  },
  async adminMetas({ commit }) { const res = await axios.get(api.adminMetas); commit('ADMINMETAS', res.data.data); },
  async addMeta({ commit }, form) {
    const res = await axios.post(api.addMeta, form);
    if (res.data.success) {
      commit('ADDMETA', res.data.data);
    }
    message(res.data.message);
  },
  async updateMeta({ commit }, form) {
    const res = await axios.post(api.updateMeta, form);
    if (res.data.success) {
      commit('UPDATEMETA', res.data.data);
    }
    message(res.data.message);
  },
  async adminInstitutes({ commit }) { const res = await axios.get(api.adminInstitutes); commit('ADMININSTITUTES', res.data.data); },
  async addInstitute({ commit }, form) {
    const res = await axios.post(api.addInstitute, form); if (res.data.success) { commit('ADDINSTITUTE', res.data.data); }
    message(res.data.message);
  },
  async updateInstitute({ commit }, form) {
    const res = await axios.post(api.updateInstitute, form); if (res.data.success) { commit('UPDATEINSTITUTE', res.data.data); }
    message(res.data.message);
  },
  async changeInstituteStatus({ commit }, form) {
    const res = await axios.post(api.changeInstituteStatus, form); if (res.data.success) { commit('CHANGEINSTITUTESTATUS', res.data.data); }
    message(res.data.message);
  },
  async questionOptions({ commit }) { const res = await axios.get(api.questionOptions); commit('QUESTIONOPTIONS', res.data.data); },
  async basicClassSelected({ commit }, form) { commit('BASICCLASSSELECTED', form); },
  async basicSubjectSelected({ commit }, form) { commit('BASICSUBJECTSELECTED', form); },
  async basicTopicSelected({ commit }, form) { commit('BASICTOPICSELECTED', form); },
  async testTopicSelected({ commit }, form) { commit('TESTTOPICSELECTED', form); },
  async testSubTopicSelected({ commit }, form) { commit('TESTSUBTOPICSELECTED', form); },

  async adminQuestions({ commit }) { const res = await axios.get(api.adminQuestions); commit('ADMINQUESTIONS', res.data.data); },
  async addQuestion({ commit }, form) {
    const res = await axios.post(api.addQuestion, form);
    message(res.data.message);
    if (res.data.success) {
      commit('ADDQUESTION', res.data.data);
      this.$router.push({ name: 'QuestionBank' });
    }
  },
  async updateQuestionFilter({ commit }, form) {
    const res = await axios.get(api.updateQuestionFilter+ form.id);
    if (res.data.success) { commit('UPDATEQUESTIONFILTER', res.data); }
  },
  async updateQuestion({ commit }, form) {
    const res = await axios.post(api.updateQuestion, form);
    message(res.data.message);
    if (res.data.success) {
      commit('UPDATEQUESTION', res.data.data);
      this.$router.push({ name: 'QuestionBank' });
    }
  },
  async changeQuestionStatus({ commit }, form) {
    const res = await axios.post(api.changeQuestionStatus, form);
    if (res.data.success) {
      commit('CHANGEQUESTIONSTATUS', res.data.data);
    }
    message(res.data.message);
  },
  async onlineTestSeries({ commit }) { const res = await axios.get(api.onlineTestSeries); commit('ONLINETESTSERIES', res.data.data); },
  async checkQuestSummary({ commit }, form) { const res = await axios.post(api.checkQuestSummary, form); commit('QUESTSUMMARY', res.data.data); },

  async hireATutor({ commit }) { const res = await axios.get(api.hireATutor); commit('HIREATUTOR', res.data.data); },
  async hireClassSelected({ commit }, form) { commit('HIRECLASSSELECTED', form); },
  async postRequirement({ commit }, form) {
    const res = await axios.post(api.postRequirement, form);
    if (res.data.success) { 
      commit('POSTREQUIREMENT'); 
      this.$router.push({ name: 'About' }); 
    }
    message(res.data.message);
  },
};

const mutations = {
  ADMINBASICS: (state, data) => {
    state.adminBasics = data;
    state.basicOptions = data.filter((i) => i.type === 'Basic');
    state.classOptions = data.filter((i) => i.type === 'Class');
    state.subjectOptions = data.filter((i) => i.type === 'Subject');
    state.topicOptions = data.filter((i) => i.type === 'Topic');
    state.paperOptions = data.filter((i) => i.type === 'PaperOptions');
  },
  ADDBASIC: (state, data) => { 
    state.adminBasics.unshift(data); 
    if(data.type=='Basic'){ state.basicOptions.unshift(data) }
    if(data.type=='Class'){ state.classOptions.unshift(data) }
    if(data.type=='Subject'){ state.subjectOptions.unshift(data) }
    if(data.type=='Topic'){ state.topicOptions.unshift(data) }
    if(data.type=='PaperOptions'){ state.paperOptions.unshift(data) }
  },
  UPDATEBASIC: (state, data) => {
    const index = state.adminBasics.findIndex((i) => i.id === data.id);
    if (index !== -1) { state.adminBasics.splice(index, 1, data); }
  },
  BLOGMETA: (state, data) => { state.blogMeta = data; },
  ADDBLOGMETA: (state, data) => state.blogMeta.unshift(data),
  UPDATEBLOGMETA: (state, data) => {
    const index = state.blogMeta.findIndex((i) => i.id === data.id);
    if (index !== -1) {
      state.blogMeta.splice(index, 1, data);
    }
  },
  ADMINMETAS: (state, data) => { state.adminMetas = data; },
  ADDMETA: (state, data) => state.adminMetas.unshift(data),
  UPDATEMETA: (state, data) => {
    const index = state.adminMetas.findIndex((i) => i.id === data.id);
    if (index !== -1) {
      state.adminMetas.splice(index, 1, data);
    }
  },
  ADMINVIDEOS: (state, data) => { state.adminVideos = data; },
  ADDVIDEO: (state, data) => state.adminVideos.unshift(data),
  UPDATEVIDEO: (state, data) => {
    const index = state.adminVideos.findIndex((i) => i.id === data.id);
    if (index !== -1) {
      state.adminVideos.splice(index, 1, data);
    }
  },
  ADMINBLOGS: (state, data) => { state.adminBlogs = data; },
  BLOGMETAOPTIONS: (state, data) => {
    state.catOptions = data.catOptions;
    state.tagOptions = data.tagOptions;
  },
  ADDBLOG: (state, data) => state.adminBlogs.unshift(data),
  UPDATEBLOG: (state, data) => {
    const index = state.adminBlogs.findIndex((i) => i.id === data.id);
    if (index !== -1) {
      state.adminBlogs.splice(index, 1, data);
    }
  },
  ADMININSTITUTES: (state, data) => { state.adminInstitutes = data; },
  ADDINSTITUTE: (state, data) => state.adminInstitutes.unshift(data),
  UPDATEINSTITUTE: (state, data) => {
    const index = state.adminInstitutes.findIndex((i) => i.id === data.id);
    if (index !== -1) { state.adminInstitutes.splice(index, 1, data); }
  },
  CHANGEINSTITUTESTATUS: (state, data) => {
    const index = state.adminInstitutes.findIndex((i) => i.id === data.id);
    if (index !== -1) { state.adminInstitutes.splice(index, 1, data); }
  },

  QUESTIONOPTIONS: (state, data) => {
    state.boardOptions = data.filter(i=>i.type=='Board');
    state.classOptions = data.filter(i=>i.type=='Class');
    state.subjectOptions = data.filter(i=>i.type=='Subject');
    state.topicOptions = data.filter(i=>i.type=='Topic');
    state.subtopicOptions = data.filter(i=>i.type=='SubTopic');
    state.difficultyOptions = data.filter(i=>i.type=='Difficulty');
    state.typeOptions = data.filter(i=>i.type=='Type');
  },
  BASICCLASSSELECTED: (state, data) => { state.basicSubjectFilter = state.subjectOptions.filter(i=>parseInt(i.tab1) == data.classSelected); },
  BASICSUBJECTSELECTED: (state, data) => {
    state.basicTopicFilter = state.topicOptions.filter(i=>parseInt(i.tab1) == data.classSelected && parseInt(i.tab2) == data.subjectSelected); 
  },
  BASICTOPICSELECTED: (state, data) => {
    state.basicSubTopicFilter = state.subtopicOptions.filter(i=>parseInt(i.tab1) == data.classSelected && parseInt(i.tab2) == data.subjectSelected  && parseInt(i.tab3) == data.topicSelected ); 
  },
  TESTTOPICSELECTED: (state, data) => {
    state.testSubTopicFilter = state.subtopicOptions.filter(i=>parseInt(i.tab1) == data.classSelected && parseInt(i.tab2) == data.subjectSelected  && data.topicSelected.includes(parseInt(i.tab3)) ); 
    state.questSummaryFilter = state.questSummary.filter(i=>data.topicSelected.includes(parseInt(i.topic)) );
    var count = 0;
    state.questSummary.filter(i=>data.topicSelected.includes(parseInt(i.topic)) ).map(i=>( count = count + i.count ));
    state.questCount = count
  },
  TESTSUBTOPICSELECTED: (state, data) => {
    var count = 0;
    state.questSummary.filter(i=>data.subTopicSelected.includes(parseInt(i.subTopic)) ).map(i=>( count = count + i.count ));
    state.questCount = count
  },
  ADMINQUESTIONS: (state, data) => { state.adminQuestions = data; },
  ADDQUESTION: (state, data) => { state.adminQuestions.unshift(data) },
  UPDATEQUESTIONFILTER: (state, data) => {
    state.basicSubjectFilter = data.data.filter(i=>i.type == 'Subject' && i.tab1 == data.quest.classes);
    state.basicTopicFilter = data.data.filter(i=>i.type == 'Topic' && i.tab1 == data.quest.classes && i.tab2 == data.quest.subject );
    state.basicSubTopicFilter = data.data.filter(i=>i.type == 'SubTopic' && i.tab1 == data.quest.classes && i.tab2 == data.quest.subject && i.tab3 == data.quest.topic );    
  },
  UPDATEQUESTION: (state, data) => {
    const index = state.adminQuestions.findIndex((i) => i.id === data.id);
    if (index !== -1) {
      state.adminQuestions.splice(index, 1, data);
    }
  },
  CHANGEQUESTIONSTATUS: (state, data) => {
    const index = state.adminQuestions.findIndex((i) => i.id === data.id);
    if (index !== -1) { state.adminQuestions.splice(index, 1, data); }
  },
  ONLINETESTSERIES: (state, data) => {
    state.adminBasics = data;
    state.basicOptions = data.filter((i) => i.type === 'Basic');
    state.boardOptions = data.filter(i=>i.type=='Board');
    state.classOptions = data.filter(i=>i.type=='Class');
    state.subjectOptions = data.filter(i=>i.type=='Subject');
    state.topicOptions = data.filter(i=>i.type=='Topic');
    state.subtopicOptions = data.filter(i=>i.type=='SubTopic');
    state.difficultyOptions = data.filter(i=>i.type=='Difficulty');
    state.typeOptions = data.filter(i=>i.type=='Type');
    state.paperOptions = data.filter(i=>i.type=='PaperOptions');
  },
  QUESTSUMMARY: (state, data) => { 
    state.questSummary = data; 
    state.questSummaryFilter = data;
  },
  HIREATUTOR: (state, data) => {
    state.boardOptions = data.filter(i=>i.type=='Board')
    state.classOptions = data.filter(i=>i.type=='Class')
    state.subjectCopy = data.filter(i=>i.type=='Subject')
    state.modeOptions = data.filter(i=>i.type=='Mode')
  },
  HIRECLASSSELECTED: (state, data) => { state.subjectOptions = state.subjectCopy.filter(i=>parseInt(i.tab1) == data.classSelected); },



};

export default {
  state,
  getters,
  actions,
  mutations,
};
