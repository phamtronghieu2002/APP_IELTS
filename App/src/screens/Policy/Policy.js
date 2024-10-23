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
import HeaderScreen from '../../components/Header/HeaderScreen';

const Policy = ({ navigation }) => {
    return (
        <SafeAreaView className="">
            <HeaderScreen
                label={'Policy'}
                navigation={navigation}
            />
            <View className="p-5">
                <Text className="">
                    xin chao
                </Text>
            </View>

        </SafeAreaView>
    );
};

Policy.propTypes = {
};
export default Policy;