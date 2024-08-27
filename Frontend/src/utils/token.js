import * as SecureStore from 'expo-secure-store';




const setToken = async (key, value) => {
    await SecureStore.setItemAsync(key, value);
};
const getToken = async (key) => {
    return await SecureStore.getItemAsync(key);
}


export default {
    setToken,
    getToken
}