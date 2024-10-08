import axios from '../axios/axiosInstance'

// thêm test result
export const addTestResult = async (data) => {
     return  axios.post('/testResult', data);

}