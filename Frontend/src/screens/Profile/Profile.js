import React from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    FlatList,
    SectionList,
    TextInput,
    TouchableOpacity,
    Pressable,
    SafeAreaView
} from 'react-native';

const Profile = ({ navigation, route }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}> 
            <ScrollView>
                    <Text className="">
                      this is profile screen
                    </Text>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Profile;