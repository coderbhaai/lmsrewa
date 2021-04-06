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
  schoolSubjectOptions: [],
  schoolGroups: [],
  schoolStudents: [],
  schoolStudentFilter: [],
  teacherAttendance: [],
  teacherAttendanceFilter: [],
  teacherClassOptions:  [],
  teacherSubjectOptions:  [],
  present:  [],
  absent:  [],
  leads:  [],
  leadsFilter:  [],
};

const getters = {
  schoolBasics: (state) => state.schoolBasics,
  schoolBasicsCopy: (state) => state.schoolBasicsCopy,
  schoolBasicOptions: (state) => state.schoolBasicOptions,
  schoolClassOptions: (state) => state.schoolClassOptions,
  schoolStudentOptions: (state) => state.schoolStudentOptions,
  schoolSubjectOptions: (state) => state.schoolSubjectOptions,
  schoolGroups: (state) => state.schoolGroups,
  schoolStudents: (state) => state.schoolStudents,
  schoolStudentFilter: (state) => state.schoolStudentFilter,
  teacherAttendance: (state) => state.teacherAttendance,
  teacherAttendanceFilter: (state) => state.teacherAttendanceFilter,
  teacherClassOptions: (state) => state.teacherClassOptions,
  teacherSubjectOptions: (state) => state.teacherSubjectOptions,
  present: (state) => state.present,
  absent: (state) => state.absent,
  leads: (state) => state.leads,
  leadsFilter: (state) => state.leadsFilter,
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

  async schoolAttendance({ commit }, form) { const res = await axios.get(api.schoolAttendance+form.schoolId); commit('SCHOOLATTENDANCE', res.data.data); },
  async attendanceClassSelected({ commit }, form) { commit('ATTENDANCECLASSSELECTED', form); },
  async attendanceSubjectSelected({ commit }, form) { const res = await axios.post(api.schoolAttendanceStudents, form); commit('ATTENDANCESUBJECTSELECTED', res.data.data); },
  async submitAttendance({ commit }, form) { 
    const res = await axios.post(api.submitAttendance, form); 
    if (res.data.success) { commit('SUBMITATTENDANCE'); }
    message(res.data.message);
    this.$router.push({ name: 'TeacherAttendance' });
  },

  async schoolGroups({ commit }, form) { const res = await axios.get(api.schoolGroups+form.schoolId); commit('SCHOOLGROUPS', res.data); },
  async addSchoolGroup({ commit }, form) {
    const res = await axios.post(api.addSchoolGroup, form);
    if (res.data.success) { commit('ADDSCHOOLGROUP', res.data.data); }
    message(res.data.message);
  },
  async updateGroupName({ commit }, form) {
    const res = await axios.post(api.updateGroupName, form);
    if (res.data.success) { commit('UPDATEGROUPNAME', res.data.data); }
    message(res.data.message);
  },
  async updateGroupStudents({ commit }, form) {
    const res = await axios.post(api.updateGroupStudents, form);
    if (res.data.success) { commit('UPDATEGROUPSTUDENTS', res.data.data); }
    message(res.data.message);
  },

  async teacherAttendance({ commit }, form) { const res = await axios.post(api.teacherAttendance, form); commit('TEACHERATTENDANCE', res.data); },
  async filterAttendance({ commit }, form) { commit('FILTERATTENDANCE', form); },
  async resetAttendance({ commit }) { commit('RESETATTENDANCE'); },
  async showAttendance({ commit }, form) { const res = await axios.post(api.showAttendance, form); commit('SHOWATTENDANCE', res.data); },
  async clearPresentAbsent({ commit }) { commit('CLEARPRESENTABSENT'); },
  
  async getLeads({ commit }, form) { const res = await axios.post(api.getLeads, form); commit('GETLEADS', res.data.data); },
  async addLead({ commit }, form) { const res = await axios.post(api.addLead, form); commit('ADDLEAD', res.data.data); },
  async updateLead({ commit }, form) { const res = await axios.post(api.updateLead, form); commit('UPDATELEAD', res.data.data); },
  async uploadExcelUsers({ commit }, form) { 
    const res = await axios.post(api.uploadExcelUsers, form);
    if (res.data.success) { commit('UPLOADEXCELUSERS', res.data.data);  }
    message(res.data.message);    
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
  SCHOOLATTENDANCE: (state, data) => {
    state.schoolStudentFilter = []
    state.schoolBasicsCopy = data
    state.schoolClassOptions = data.filter((i) => i.type === 'Class' );
  },
  ATTENDANCECLASSSELECTED: (state, data) => { 
    state.schoolSubjectOptions = state.schoolBasicsCopy.filter(i => i.tab1 == data.classes && i.type=='Subject' ); 
    state.schoolStudentFilter = []
  },
  ATTENDANCESUBJECTSELECTED: (state, data) => { state.schoolStudentFilter = data },
  SUBMITATTENDANCE: (state) => { 
    state.schoolStudentFilter = []
  },

  SCHOOLGROUPS: (state, data) => {
    state.schoolGroups = data.groups;
    state.schoolStudents = data.students;
  },
  ADDSCHOOLGROUP: (state, data) => { state.schoolGroups.unshift(data); },
  UPDATEGROUPNAME: (state, data) => { const index = state.schoolGroups.findIndex((i) => i.id === data.id); if (index !== -1) { state.schoolGroups.splice(index, 1, data); } },
  UPDATEGROUPSTUDENTS: (state, data) => { const index = state.schoolGroups.findIndex((i) => i.id === data.id); if (index !== -1) { state.schoolGroups.splice(index, 1, data); } },

  TEACHERATTENDANCE: (state, data) => {
    state.teacherAttendanceFilter = data.attendance; 
    state.teacherAttendance = data.attendance; 
    // var classes = []
    // data.attendance.map(i=>(
    //   classes.push({id: i.class, value: i.className})
    // ))
    state.teacherClassOptions = data.classes; 
    state.teacherSubjectOptions = data.subject; 
    state.present = []; 
    state.absent = [];
  },
  FILTERATTENDANCE: (state, data) => {
    if(data.classes && data.subject){ state.teacherAttendanceFilter =  state.teacherAttendance.filter((i) => i.class == data.classes).filter((i) => i.subject == data.subject); }else
    if(data.subject){ state.teacherAttendanceFilter =  state.teacherAttendance.filter((i) => i.subject == data.subject); }else
    if(data.classes){ state.teacherAttendanceFilter =  state.teacherAttendance.filter((i) => i.class == data.classes) }
  },
  RESETATTENDANCE: (state) => {
    state.teacherAttendanceFilter =  state.teacherAttendance
  },
  SHOWATTENDANCE: (state, data) => {
    state.present = data.present; 
    state.absent = data.absent; 
  },
  CLEARPRESENTABSENT: (state) => {
    state.present = []; 
    state.absent = [];
  },

  GETLEADS: (state, data) => {
    state.leads = data;
    state.leadsFilter = data;
  },
  ADDLEAD: (state, data) => {
    // state.leads.unshift(data); 
    state.leadsFilter.unshift(data); 
  },
  UPDATELEAD: (state, data) => {
    // const index = state.leads.findIndex((i) => i.id === data.id); if (index !== -1) { state.leads.splice(index, 1, data); }
    const index2 = state.leadsFilter.findIndex((i) => i.id === data.id); if (index2 !== -1) { state.leadsFilter.splice(index2, 1, data); }
  },
  UPLOADEXCELUSERS: (state, data) => { data.map(i=>( state.leadsFilter.unshift(i) )) },

};

export default { state, getters, actions, mutations, };
