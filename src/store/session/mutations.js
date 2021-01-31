import { LocalStorage } from 'quasar';
import setAxiosHeaders from './helpers';

export const LOGIN = (state, user) => {
  state.user = user;
  LocalStorage.set('user', user);
  setAxiosHeaders(state);
};

export const LOGOUT = (state) => {
  state.user = null;
  LocalStorage.clear();
  setAxiosHeaders(state);
};

export const ADMINBASICS = (state, data) => {
  state.adminBasics = data;
  state.basicOptions = data.filter((i) => i.type === 'Basic');
  state.classOptions = data.filter((i) => i.type === 'Class');
  state.subjectOptions = data.filter((i) => i.type === 'Subject');
};
export const ADDBASIC = (state, data) => state.adminBasics.unshift(data);
export const UPDATEBASIC = (state, data) => {
  const index = state.adminBasics.findIndex((i) => i.id === data.id);
  if (index !== -1) {
    state.adminBasics.splice(index, 1, data);
  }
};

export const BLOGMETA = (state, data) => { state.blogMeta = data; };
export const ADDBLOGMETA = (state, data) => state.blogMeta.unshift(data);
export const UPDATEBLOGMETA = (state, data) => {
  const index = state.blogMeta.findIndex((i) => i.id === data.id);
  if (index !== -1) {
    state.blogMeta.splice(index, 1, data);
  }
};

export const ADMINBLOGS = (state, data) => { state.adminBlogs = data; };
export const BLOGMETAOPTIONS = (state, data) => {
  state.catOptions = data.catOptions;
  state.tagOptions = data.tagOptions;
};
export const ADDBLOG = (state, data) => state.adminBlogs.unshift(data);
export const BLOGTOEDIT = (state, data) => { state.blogToEdit = data; };
export const UPDATEBLOG = (state, data) => {
  const index = state.adminBlogs.findIndex((i) => i.id === data.id);
  if (index !== -1) {
    state.adminBlogs.splice(index, 1, data);
  }
};

export const ADMINVIDEOS = (state, data) => { state.adminVideos = data; };
export const ADDVIDEO = (state, data) => state.adminVideos.unshift(data);
export const UPDATEVIDEO = (state, data) => {
  const index = state.adminVideos.findIndex((i) => i.id === data.id);
  if (index !== -1) {
    state.adminVideos.splice(index, 1, data);
  }
};

export const ADMINMETAS = (state, data) => { state.adminMetas = data; };
export const ADDMETA = (state, data) => state.adminMetas.unshift(data);
export const UPDATEMETA = (state, data) => {
  const index = state.adminMetas.findIndex((i) => i.id === data.id);
  if (index !== -1) {
    state.adminMetas.splice(index, 1, data);
  }
};

export const BLOGS = (state, data) => { state.blogs = data; };
export const SUGGESTBLOGS = (state, data) => { state.suggestBlogs = data; };
export const VIDEOS = (state, data) => {
  console.log('data', data);
  state.videos = data.data;
  state.activeClasses = data.classes;
};
