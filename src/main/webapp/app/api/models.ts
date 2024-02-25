import axios from 'axios';

const getModels = type => {
  return axios.get(`models?model_type=${type}`);
};

export { getModels };
