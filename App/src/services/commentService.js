import axios from '../axios/axiosInstance'

export const getCommentByTestId = async (test_id) => {
    return axios.get(`/comment/test/${test_id}`);
}
export const createComment = async (test_id, content) => {
    return axios.post(`/comment`, {
        test_id,
        content
    });
};

export const replyComment = async (test_id, parent_id, content) => {
    console.log("parent_id nhaaaaaaaaaaaaaa", parent_id);
    
    return axios.post(`/comment/reply`, {
        test_id,
        parent_id,
        content
    });
};

export const likeComment = async (comment_id) => {
    return axios.post(`/comment/like`, {
        comment_id
    });
}