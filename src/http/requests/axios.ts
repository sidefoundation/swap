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
    // try {
    toast.error(
      err?.response?.data?.message ||
        err?.response?.data?.error?.message ||
        'Abnormal service!'
    );
    // }
    // catch (error) {
    //   toast.error('Abnormal service!');
    // }
    return Promise.reject(err);
  }
);
export default instance;
