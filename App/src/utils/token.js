import { getData } from "./asyncStore"
export const getToken = async () => {
    const data = await getData('user');
    if (data) {

        return data?.accessToken
    }
    return ""

}