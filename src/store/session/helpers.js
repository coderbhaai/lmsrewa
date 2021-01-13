import axios from 'axios/index';

export default function setAxiosHeaders(state) {
  // console.log('state.user.token', state.user.token);
  axios.defaults.headers.common.Authorization = state.user
    ? `Bearer  + ${state.user.token}`
    : '';
}
