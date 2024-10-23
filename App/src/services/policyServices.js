import axios from '../axios/axiosInstance'

export const getPolicy = async () => {
    return axios.get(`/policy`);
};