import { LocalStorage } from 'quasar';

export default {
  user: LocalStorage.getItem('user'),
  blogMeta: [],
  adminBlogs: [],
};
