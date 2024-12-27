import axios from '../axios/axiosInstance'

// thêm test result


// data  = {
//      "test_id":"66fd603e5b85cd6ba68394a1"
// }
export const createTestResult = async (data) => {
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
// http://{{host}}:8080/api/v1/testResult?test_id=6720e79748888bd16daf215e
export const getTestResult = async (test_id) => {
     return axios.get('/testResult?test_id='+test_id);

}

export const deleteQuestionInTestResult = async (test_id, question_id) => {
     return axios.delete(`/testResult?test_id=${test_id}&question_id=${question_id}`) ;
}

export const getAllTestResult = async () => {
     return axios.get('/testResult/all');

}
export const addBookmark = async (test_id,note_bookmark,status=true) => {
     return axios.post('/testResult/bookmark', {
          test_id,
          note_bookmark,
          status
     });

}