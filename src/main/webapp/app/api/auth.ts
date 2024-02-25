import axios from 'axios';

const authEndpoint = 'auth/login';
const getUserEndpoint = 'auth/user';

const onAuth = request => {
  return axios.post(authEndpoint, request);
};

const getUser = () => {
  return axios.get(getUserEndpoint);
};

export { onAuth, getUser };
