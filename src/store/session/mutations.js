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
