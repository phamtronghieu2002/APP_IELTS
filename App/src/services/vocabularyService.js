import axios from '..//axios/axiosInstance'


// lấy danh sách test theo id
export const getVocabularyByTestId = async (test_id) => {
      return axios.get(`/voc/test/${test_id}`);
}
