import axios from '../axios/axiosInstance'

export const AiVoiceTest = async (url) => {
    try {
        const res = await axios.post('/gpt/speaking', url);
       
        if(res){
            return res;
        }
    } catch (error) {
         throw error;
    }

}