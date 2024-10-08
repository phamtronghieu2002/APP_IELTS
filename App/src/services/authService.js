import axios from '..//axios/axiosInstance'

export const register = async (data) => {
    try {
        const res = await axios.post('/auth/register', data);
    
        if(res?.data && res?.errCode==0){
            return res?.data;
        }
    } catch (error) {
         throw error;
    }

}