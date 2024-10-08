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

const ResultBar = ({
    total_question,
    total_correct,
}) => {
    const is_full_correct = total_question === total_correct;

    return (
        <View className='h-40 bg-red-600  absolute bottom-0 right-0 left-0 rounded-t-lg'>
            <Text className="">
                123
            </Text>
        </View>
    );
};

ResultBar.propTypes = {
};
export default ResultBar;