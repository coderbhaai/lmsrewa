import { LocalStorage } from 'quasar';

export default {
  user: LocalStorage.getItem('user'),
  catOptions: [],
  tagOptions: [],
  basicOptions: [],
  classOptions: [],
  subjectOptions: [],
  adminBasics: [],
  blogMeta: [],
  adminBlogs: [],
  blogMetaOptions: [],
  blogToEdit: [],
  adminVideos: [],
  adminMetas: [],
  blogs: [],
  suggestBlogs: [],
  videos: [],
  activeClasses: [],
};
