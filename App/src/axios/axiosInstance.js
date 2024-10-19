import axios from "axios";
import env from "../configs/env";
import { getToken } from "../utils/token";
axios.defaults.withCredentials = true;

const instance = axios.create({
  baseURL: `http://192.168.0.130:8080/api/v1`,
});
console.log(`${env.API_URL}/api/v1`);

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




export default instance;