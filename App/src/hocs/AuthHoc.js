import { View, Text } from "react-native";

import { getData, storeData } from "../utils/asyncStore"
import { useDispatch } from "react-redux"
import { loginUser } from "../fetures/userSlice"
import { useEffect, useState } from "react"
import configs from "../configs";
import Loading from "../components/Loading/Loading";



export default function AuthHoc({ children, navigation }) {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const checkData = async () => {
        const data = await getData('user');
    
        if (data) {
            console.log("acessToken>>:",data?.accessToken);
            console.log('====================================');
    
            dispatch(loginUser(data))
            storeData("lang",'vi')
            navigation.navigate(configs?.screenName.initStack, { home: 123 });
            return
        }

        setLoading(false)

    }


    useEffect(() => {
        checkData()
    }, [])


    return (
        loading ? <Loading /> : children
    );



}