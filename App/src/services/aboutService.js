import axios from '../axios/axiosInstance'

// lấy danh sách category theo group (skills, prepare, practices)
export const getAbout = async (cate_id) => {
    return axios.get(`toturial?cate_id=${cate_id}`);
};