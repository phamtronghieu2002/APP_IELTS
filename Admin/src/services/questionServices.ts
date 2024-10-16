import axios from "./axiosInstance"

export const createQuestion = async (data: any) => {
  return axios.post("/question", data)
}

export const getQuestionById = async (question_id: any) => {
  return axios.get(`/question/${question_id}`)
}

export const updateQuestionById = async (question_id: any, data: any) => {
  return axios.put(`/question/${question_id}`, data)
}
