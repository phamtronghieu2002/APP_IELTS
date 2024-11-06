import axios from '../axios/axiosInstance'

// lấy danh sách category theo group (skills, prepare, practices)
export const createLearningTime = async (
    minutes,
) => {
    return axios.post(`/learning_time`, {
        minutes
    });
};

export const getLearningTime = async () => {
    return axios.get(`/learning_time/getByTime`);
};