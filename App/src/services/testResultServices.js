import axios from '../axios/axiosInstance'

// thêm test result


// data  = {
//      "test_id":"66fd603e5b85cd6ba68394a1"
// }
export const addTestResult = async (data) => {
     return axios.post('/testResult', data);

}
// data
// {
//      "anwser":{
//           "question_id":"12121212",
//           "is_correct":false
//      }
// }
export const addAnwserToTestResult = async (test_id, type, data) => {
     return axios.post(`/testResult/addAnwser?test_id=${test_id}&type=${type}`, data);

}