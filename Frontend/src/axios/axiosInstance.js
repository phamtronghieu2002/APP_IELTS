import axios from "axios";
import axiosRetry from "axios-retry";
axios.defaults.withCredentials = true;

const instance = axios.create({
  baseURL: "",
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
instance.interceptors.request.use(function (config) {
  const token = "jwtToken";
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export default instance;