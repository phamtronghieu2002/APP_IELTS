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
import IconO from 'react-native-vector-icons/Octicons';
import configs from '../../configs';
const PraticeItem = ({
    navigation,
    onPress,
    isDoing,
    _id,
    name_test,
    percent_correct,
    category

}) => {


    const handleShowPreview = (name, id) => {
        return navigation.navigate(configs?.screenName?.overview, { name_test: name, id });
    }

    const handlePress = () => {
        if (isDoing) {
            handleShowPreview(name_test, _id);
            return
        }
        onPress?.();
    }
    const colorPercent = percent_correct > 0 ? 'border-red-400 text-red-500' : 'bg-gray-200';
    return (
        <View
            onPressIn={(e) => e.stopPropagation()}  // Stop the event from reaching parent
            onPressOut={(e) => e.stopPropagation()}

            className='p-3 pb-0 pt-0'>
            <Pressable
                onPress={handlePress}
                className="border-b-2  border-gray-200 pt-3 pb-3 flex flex-row items-center min-h-[40px]">
                <IconO
                    color={'#f9f1f3'}
                    name='dot-fill'
                    size={20}
                />
                <Text className="ml-3">
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
                            {`${percent_correct}%`}
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