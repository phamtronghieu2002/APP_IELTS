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
        <SafeAreaView>
            <ScrollView className="relative">
                <View className="p-5 pt-3">
                    {children}
                </View>
            </ScrollView>
        </SafeAreaView>

    );
};


export default MainLayout;