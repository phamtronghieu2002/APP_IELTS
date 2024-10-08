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
import Header from '../components/Header/HeaderDraw';
import MainBackground from '../components/MainBackground/MainBackground';

const MainLayout = ({ children }) => {
    return (
        <>
            <ScrollView className="relative z-30">
                <View className="p-5 pt-3">
                    {children}
                </View>
            </ScrollView>
        </>

    );
};


export default MainLayout;