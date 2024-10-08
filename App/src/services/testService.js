import axios from '..//axios/axiosInstance'


// lấy danh sách test theo id
export const getTestById = async (test_id) => {

      return  axios.get(`/test/${test_id}`);

}