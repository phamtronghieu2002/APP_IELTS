import axios from '../axios/axiosInstance'

export const uploadFileToClound = async (url) => {
     return axios.post('/upload/dinarycloud', url);
}