import React from 'react';
import PropTypes from 'prop-types'
import {
    View,
    Text,
    Image,
    ActivityIndicator, StyleSheet,
} from 'react-native';

const Loading = () => {
    return (
        <View className='flex-1 items-center justify-center bg-white'>
            <Image
                className='w-[200px] h-[200px] mb-20'
                source={require('../../../assets/logos/IELTS.png')}
            />
              <ActivityIndicator   size={'large'} color={"pink"}/>
        </View>
    );
};

Loading.propTypes = {
};
export default Loading;