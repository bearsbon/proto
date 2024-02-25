import axios from 'axios';
const simulationRoute = 'simulations/';

const initSimulation = (type, request) => {
  return axios.post(`${simulationRoute}${type}`, request);
};

const deleteSimulation = simId => {
  return axios.delete(`${simulationRoute}${simId}`);
};

export { initSimulation, deleteSimulation };
