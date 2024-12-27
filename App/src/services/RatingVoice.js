import axios from '../axios/axiosInstance'

export const AiVoiceTest = async (topic,url) => {
    try {
        const res = await axios.post('/gpt/speaking', {topic,url});
       
        if(res){
            return res;
        }
    } catch (error) {
         throw error;
    }

}