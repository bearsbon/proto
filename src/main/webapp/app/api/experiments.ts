import axios from 'axios';
import { pageToEndPointDependencies } from '@/shared/helpers/variables';

const getExperimentsList = page => {
  // const endPoint = pageToEndPointDependencies[page].experimentsListEndPoint;
  // return axios.get(`${endPoint}`);
  return axios.get('https://user1698999532954.requestly.dev/getall');
};

const getNextSimulationTitle = (page, type) => {
  const endPoint = pageToEndPointDependencies[page].nextTitle;
  return axios.get(`${endPoint}?model_type=${type}`);
};

export { getExperimentsList, getNextSimulationTitle };
