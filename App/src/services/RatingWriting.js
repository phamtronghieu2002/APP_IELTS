import axios from '..//axios/axiosInstance'

export const AiWritingTest = async (WritingTest) => {
    try {
        const res = await axios.post('/gpt/writing', WritingTest);
       
        if(res){
            return res;
        }
    } catch (error) {
         throw error;
    }

}