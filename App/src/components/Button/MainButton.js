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

const MainButton = ({
     onPress, title, style, classNames, width, height, roundedfull, disabled,backgroundColor='red',classNamesText}) => {
    return (
        <Pressable
            className={[roundedfull ? 'rounded-full' : 'rounded-lg', classNames]}
            style={[{
                backgroundColor,
                padding: 10,
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
                width,
                height,
            }, style]}
            disabled={disabled}
            onPress={onPress}>
            <Text className={`text-lime-50 text-[16px] ${classNamesText}`}>{title}</Text>
        </Pressable>
    );
};

MainButton.propTypes = {
    disabled: PropTypes.bool,
    onPress: PropTypes.func,
    title: PropTypes.string,
    style: PropTypes.object,
    className: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    roundedfull: PropTypes.bool,
    
};
export default MainButton;