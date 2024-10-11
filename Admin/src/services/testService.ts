import axios from './axiosInstance'


// lấy danh sách test theo id
export const getTestById = async (test_id:any) => {

      return  axios.get(`/test/${test_id}`);

}