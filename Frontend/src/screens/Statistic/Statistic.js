import React from 'react';
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

const Statistic = () => {
    return (

        <MainLayout >
            <View className=''>
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