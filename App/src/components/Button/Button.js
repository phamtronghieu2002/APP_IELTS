import React from 'react';

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

const Button = ({ Icon, onClick, width, height, style }) => {
    return (
        <Pressable
            style={style}
            onPress={onClick}
            className="w-[36px] h-[35px] rounded-lg bg-white flex items-center justify-center">
            {Icon}
        </Pressable>
    );
};

export default Button;