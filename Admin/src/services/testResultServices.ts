import axios from './axiosInstance'

// thêm test result
export const addTestResult = async (data:any) => {
     return  axios.post('/testResult', data);

}