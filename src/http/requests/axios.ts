import axios from 'axios';
import { toast } from 'react-hot-toast';
const instance = axios.create({
  baseURL: '/api',
  timeout: 60000,
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response: any) => {
    console.log(response, 'response');
    if (response.status === 200 || response.status === 201) {
      return response;
    } else {
      toast.error('Abnormal service!');
    }
  },
  (err: any) => {
    console.log(err, 'interceptors-error');
    toast.error(
      err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.response?.data?.error?.message ||
        err?.message ||
        'Abnormal service!',
      { duration: 5000, style: { overflow: 'scroll', maxHeight: '500px' } }
    );
    return Promise.reject(err);
  }
);
export default instance;
