import axios from '..//axios/axiosInstance'


// lấy danh sách test theo id
export const getTestById = async (test_id) => {
      return axios.get(`/test/${test_id}`);
}

export const updateIsDoing = async (test_id,data) => {
      return axios.put(`/test/${test_id}`,data);
}