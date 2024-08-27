import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View } from 'react-native';
import { CircleFade } from 'react-native-animated-spinkit';

const Loading = () => {
  return (
    <View
      style={{
        position: 'absolute',
        top: -150,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 999, // Đảm bảo overlay nằm trên cùng
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircleFade size={48} color="red" />
    </View>
  );
};

Loading.propTypes = {};

export default Loading;
