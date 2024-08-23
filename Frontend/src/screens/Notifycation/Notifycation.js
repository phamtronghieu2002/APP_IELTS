import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    Image,
    SafeAreaView,
    TouchableOpacity,
    Platform,
} from 'react-native';

import MainButton from '../../components/Button/MainButton';
import Notify from '../../components/Notify/Notify';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const Notifycation = () => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View className='flex-1 items-center justify-center pr-5 pl-5'>
                <View className="flex items-center gap-16 mb-14">
                    <Text className="text-3xl">
                        Notifycation
                    </Text>
                    <Image
                        className="mr-4"
                        source={require('..//..//..//assets//notify.png')}
                        style={{
                            width: 275,
                            height: 183,
                        }}
                    />
                </View>
                <Notify
                    rounded={'rounded-full'}
                    Icon={<FontAwesome name="bell-o" size={20} color="#000" />}
                />
                <Text className="mt-14 text-lg">
                    Turn on notifications and alarm
                </Text>
                <Text className="text-lg">
                    to keep practice daily !
                </Text>
                <MainButton
                    className={'mt-12 mb-12'}
                    width={177}
                    height={50}
                    title={'Go to learning IELTS !'}
                />
                <Text className="text-lg">
                    Change this in setting if you want
                </Text>
            </View>
        </SafeAreaView>
    );
};

Notifycation.propTypes = {};

export default Notifycation;
