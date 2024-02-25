import axios from 'axios';
import { pageToEndPointDependencies } from '@/shared/helpers/variables';

const downloadZipFile = (simulationId, page) => {
  const endPoint = pageToEndPointDependencies[page].zipDownloadingEndPoint;
  const postFix = pageToEndPointDependencies[page].endpointPostfix;
  return axios.get(`${endPoint}${simulationId}${postFix}`, { responseType: 'blob' });
};

const downloadPdfFile = (page, id) => {
  const endPoint = pageToEndPointDependencies[page].pdfDownloadingEndPoint;
  return axios.get(`${endPoint}${id}/raw`, { responseType: 'blob' });
};

const downloadCsvFile = (page, fileName) => {
  const endPoint = pageToEndPointDependencies[page].csvDownloadingEndPoint;
  return axios.get(`${endPoint}${fileName}`, { responseType: 'blob' });
};

export { downloadZipFile, downloadPdfFile, downloadCsvFile };
