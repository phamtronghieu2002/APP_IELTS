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
import HeaderScreen from '../../Header/HeaderScreen';

const WritingTest = ({ navigation, route }) => {
    return (
        <SafeAreaView>
            <HeaderScreen
                label={route?.params?.nameTest}
                navigation={navigation}
            />
            <ScrollView className="p-7">
                <Text>Writing</Text>
            </ScrollView>
        </SafeAreaView>
    );
};

WritingTest.propTypes = {
};
export default WritingTest;