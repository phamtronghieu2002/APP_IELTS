import axios from "./axiosInstance"

export const getTips = async (category: string) => {
  return axios.get(`/tip?cate_id=${category}`)
}
