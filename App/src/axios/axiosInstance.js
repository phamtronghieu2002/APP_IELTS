import axios from "axios";
import env from "../configs/env";
import { getToken } from "../utils/token";
import axiosRetry from 'axios-retry';
axios.defaults.withCredentials = true;

const instance = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_API_URL}/api/v1`,
});

instance.interceptors.request.use(async function (config) {
  const token = await getToken?.();

  config.headers.Authorization = `Bearer ${token}`;

  return config;
});
instance.interceptors.response.use(
  function (response) {
    return response.data ? response.data : response;
  },
  function (error) {
    let res;
    if (error.response) {
      res = {
        status: error.response.status,
        data: error.response.data,
        statusText: error.response.statusText,
        headers: error.response.headers,
        config: error.config,
      };
      const status = res.status;

    }
    return Promise.reject(res || error);
  }
);

axiosRetry(instance, {
  retries: 20, retryDelay: (retryCount) => {

    return retryCount * 100; // time interval between retries
  },
});



export default instance;