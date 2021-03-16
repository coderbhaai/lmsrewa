import axios from 'axios';

export default function setAxiosHeaders(state) {
  if(state.user){
    axios.defaults.headers.common.Authorization = `Bearer + ${state.user.token}`;
  }
}
