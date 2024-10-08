    import axios from '../axios/axiosInstance'

// lấy danh sách category theo group (skills, prepare, practices)
export const getCategories = async (group) => {
    return axios.get(`/category?group=${group}`);
};