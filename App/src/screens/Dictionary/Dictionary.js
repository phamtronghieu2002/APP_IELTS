import React from 'react';
import { View, SafeAreaView, StyleSheet, StatusBar, Pressable, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import HeaderScreen from '../../components/Header/HeaderScreen';


const Dictionary = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
         

            <Text className="text-white">
                112222222222222222222222222222222222222

            </Text>

            <View style={styles.webviewContainer}>
                <WebView source={{ uri: 'https://translate.google.com/?hl=vi&sl=en&tl=vi&op=translate' }} style={{ flex: 1 }} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff', // Đặt màu nền để tránh màu đen mặc định phía sau WebView
    },
    webviewContainer: {
        flex: 1,

    },
});

export default Dictionary;
