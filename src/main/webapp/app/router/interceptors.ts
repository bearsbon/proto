import axios from 'axios';
import { useRouter } from 'vue-router';
import { removeLocalStorage } from '@/shared/helpers/storage';

const router = useRouter();
const errorsList = [401, 403];

const requestInterceptor = () => {
  axios.interceptors.request.use(request => {
    const token = localStorage.getItem('token') || undefined;

    if (token) {
      // @ts-ignore
      request.headers = {
        ...request.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    return request;
  });
};

const responseInterceptor = () => {
  axios.interceptors.response.use(null, error => {
    if (errorsList.includes(error.response.status)) {
      removeLocalStorage('token');
      window.location.href = '/auth';
    }

    return Promise.reject(error);
  });
};

export { requestInterceptor, responseInterceptor };
