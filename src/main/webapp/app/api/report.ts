import axios from 'axios';
const route = 'simulations';

const getReport = id => {
  // return axios.get(`${route}/${id}`);
  return axios.get('http://100.172.30.20:8000/simulations/9c70ba34-8680-4853-9b76-a8a7997bd823', {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ2ZG9sbWF0b3YiLCJleHAiOjE3MDg4NjUwOTF9.IrlMZYobGXU6JRpf4n9EcxMtvgtUL0JSuu760ksPI-g',
    },
  });
};

const saveReport = request => {
  return axios.post(`${route}/savereport`, request);
};

const downloadPdf = name => {
  return axios.get(`${route}/getpdf/${name}`, { responseType: 'blob' });
};

export { getReport, saveReport, downloadPdf };
