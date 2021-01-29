import { LocalStorage } from 'quasar';
import setAxiosHeaders from './helpers';

export const LOGIN = (state, user) => {
  console.log('state in mutations', state, user);
  state.user = user;
  LocalStorage.set('user', user);
  setAxiosHeaders(state);
};

export const LOGOUT = (state) => {
  state.user = null;
  LocalStorage.clear();
  setAxiosHeaders(state);
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
// export const UPDATEBLOG = (state, data) => {
//   const index = state.adminBlogs.findIndex((i) => i.id === data.id);
//   if (index !== -1) {
//     state.adminBlogs.splice(index, 1, data);
//   }
// };
