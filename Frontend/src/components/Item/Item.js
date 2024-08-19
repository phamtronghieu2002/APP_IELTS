import React from 'react';
import PropTypes from 'prop-types';
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

const Item = ({ title }) => {
    return (

        <View className="">

            <Text className="">
                {title}
            </Text>
        </View>

    );
};

Item.propTypes = {
    title: PropTypes.string.isRequired,
};
export default Item;