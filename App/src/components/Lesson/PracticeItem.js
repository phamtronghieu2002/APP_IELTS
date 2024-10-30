import React from 'react';
import PropTypes from 'prop-types'
import {
    View,
    Text,

    Pressable,
} from 'react-native';
import IconO from 'react-native-vector-icons/Octicons';
import configs from '../../configs';
const PraticeItem = ({
    navigation,
    onPress,
    isDoing,
    _id,
    name_test,
    percent_correct,
    refresh


}) => {



    const handlePress = () => {

        onPress?.();
    }
    const colorPercent = percent_correct??0 > 0 ? percent_correct??0?.toFixed(0) < 100 ? 'border-red-400 text-red-500':"border-green-500 text-green-500" : 'bg-light-200';
    return (
        <View
            onPressIn={(e) => e.stopPropagation()}  // Stop the event from reaching parent
            onPressOut={(e) => e.stopPropagation()}

            className='p-3 pb-0 pt-0'>
            <Pressable
                 style={
                    {
                        borderBottomColor: '#f9f1f3',
                         borderBottomWidth: 1,
                    }
                 }
                onPress={handlePress}
                className="pt-3 pb-3 flex flex-row items-center min-h-[40px]">
                <IconO
                    color={'#f9f1f3'}
                    name='dot-fill'
                    size={20}
                />
                <Text
                    numberOfLines={2} // Giới hạn số dòng là 2
                    ellipsizeMode="tail" // Thêm dấu "..." nếu vượt quá số dòng
                    className="ml-3">
                    {name_test}
                </Text>
                <View className="flex flex-row flex-1 justify-end">
                    <View

                        className={`pl-3 pr-3 rounded-full ${colorPercent}  flex items-center`}
                        style={{
                            borderWidth: 1,

                        }}
                    >
                        <Text className={`${colorPercent}`}>
                            {`${percent_correct?.toFixed(0)}%`}
                        </Text>
                    </View>
                </View>
            </Pressable>
        </View>
    );
};

PraticeItem.propTypes = {
};
export default PraticeItem;