import React, { useEffect } from 'react';
import PropTypes from 'prop-types'
import {
    View,
    Text,
    Image,
    ScrollView,
    SafeAreaView,
    FlatList,
    SectionList,
    TextInput,
    TouchableOpacity,
    Pressable,
} from 'react-native';
import MainLayout from '../../layouts/MainLayout';
import Loading from '../../components/Loading/Loading';
import token from '../../utils/token';
import showToast from '../../components/Toast/Toast';
const Statistic = () => {


    // useEffect(() => {
    //     const getToken = async () => {
    //         const res = await token.getToken('accessToken')
    //         console.log(res)
    //     }
    //     getToken()
    //     showToast('success', 'ahihi')
    // }, [])
    return (

        <MainLayout >
            <View className='flex-1'>
                <Loading />
                <Text className="">
                    statistic
                </Text>
            </View>
        </MainLayout>

    );
};

Statistic.propTypes = {
};
export default Statistic;