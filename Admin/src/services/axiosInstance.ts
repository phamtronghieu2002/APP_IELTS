import axios from "axios";

axios.defaults.withCredentials = true;

const instance = axios.create({
  baseURL: `http://192.168.85.187:8080/api/v1`,
});


instance.interceptors.request.use(async function (config) {


  config.headers.Authorization = `Bearer`;

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




export default instance;