import axios from '../axios/axiosInstance'

// lấy danh sách category theo group (skills, prepare, practices)
export const getTip = async (cate_id) => {
    return axios.get(`tip?cate_id=${cate_id}`);
};