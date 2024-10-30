import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {

        console.log("error", e);
    }
};

export const getData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        if (jsonValue) {
            return JSON.parse(jsonValue);
        }
        return null;
    } catch (e) {
        console.log("error", e);

    }
};
export const removeData = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (e) {
        console.log("error", e);

    }
};