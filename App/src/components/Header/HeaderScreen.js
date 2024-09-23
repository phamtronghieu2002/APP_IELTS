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
import IconF from 'react-native-vector-icons/Feather';

const HeaderScreen = ({
    navigationTo,
    navigation,
    label
}) => {
    return (

        <View className='gap-1 flex-row justify-start items-center mt-3  h-14 pr-4 pl-4'>
            <Pressable
                className="mr-2"
                onPress={() => {
                    navigation.navigate(navigationTo, { screen: label })
                }}>
                <IconF name="chevron-left" color="black" size={30} />
            </Pressable>
            <Text className="text-lg font-bold">
                {label}
            </Text>
        </View>

    );
};

HeaderScreen.propTypes = {
};
export default HeaderScreen;