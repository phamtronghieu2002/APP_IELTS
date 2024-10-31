import axios from '..//axios/axiosInstance'

// lấy danh sách lesson theo category
export const getLessonByCategory = async (category,user_id) => {
            return axios.get(`/lesson/category/${category}?user_id=${user_id}`);
    };