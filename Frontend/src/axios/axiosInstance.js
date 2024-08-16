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
    //   if (status === 401) {
    //     axios
    //       .post(`http://localhost:8080/api/v1/auth/refresh_token`)
    //       .then((response) => {

    //       })
    //       .catch((error) => {
    //         console.log(error);
    //         const path = window.location.pathname;
    //         if (path !== "/login") {
    //           window.location.href = "/login";
    //         }
    //       });
    //   }
    }
    return Promise.reject(res || error);
  }
);
axios.interceptors.request.use(function (config) {
    const token = "jwtToken";
    config.headers.Authorization =  token;
     
    return config;
});
// axiosRetry(instance, {
//   retries: 2, // number of retries
//   retryDelay: (retryCount) => {
//     return retryCount * 100; // time interval between retries
//   },
//   retryCondition(error) {
//     return error.status === 401
//   },
// });
export default instance;