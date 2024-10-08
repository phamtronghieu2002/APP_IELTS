import axios from '..//axios/axiosInstance'

// lấy danh sách lesson theo category
export const getLessonByCategory = async (category) => {
            return axios.get(`/lesson/category/${category}`)
    };