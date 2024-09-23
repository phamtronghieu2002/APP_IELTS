import React, { useEffect } from 'react';
import { View, Text, Image, Pressable, SafeAreaView } from 'react-native';

import HeaderScreen from '../../components/Header/HeaderScreen';
import configs from '../../configs';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession(); // Hoàn tất phiên đăng nhập nếu cần thiết

const webClientId = "1013873615823-cl9jhtcai95mcuhenqp2j5kvg8nvpekr.apps.googleusercontent.com";
const androidClientId = "1013873615823-0r8ku736ooi3fiuaghi2bsrtfjfabv78.apps.googleusercontent.com";

const Login = ({ navigation }) => {

    const config = {
        // webClientId,
        androidClientId,
    };

    const [request, response, promptAsync] = Google.useIdTokenAuthRequest(config); // Yêu cầu đăng nhập Google
    console.log("request: ", request);
    console.log("response: ", response);
    console.log("promptAsync: ", promptAsync);

    const handleToken = async () => {
        console.log("response: ", response);

        if (response?.type === 'success') {
            const { authentication } = response;
            const token = authentication?.idToken; // Thay đổi accessToken thành idToken
            console.log("Token: ", token);
        }
    };

 useEffect(() => {
        handleToken();
    }
    , [response]);

    return (
        <SafeAreaView style={{ flex: 1 }} className="p-5 pt-5">
            <HeaderScreen navigationTo={configs?.screenName?.home} navigation={navigation} label="Sign In" />
            <View className='flex-1 items-center justify-center'>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text className="">
                        123
                    </Text>
                    <View className="absolute bottom-5" style={{ marginTop: 20 }}>
                        <Pressable
                            onPress={() => { 
                                promptAsync();
                             }}  // Gọi promptAsync() khi người dùng nhấn
                            style={({ pressed }) => [
                                {
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 300,
                                    height: 52,
                                    padding: 10,
                                    borderWidth: 1,
                                    borderColor: 'red',
                                    borderRadius: 8,
                                    backgroundColor: pressed ? '#E8E8E8' : '#fff',
                                    shadowColor: 'red',
                                    shadowOffset: { width: 0, height: 4 },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 4.65,
                                    elevation: 8,
                                }
                            ]}
                        >
                            <Image
                                source={require('../../../assets/logos/google.png')}
                                style={{ width: 30, height: 30, marginRight: 12 }}
                            />
                            <Text style={{ fontWeight: 'bold', color: '#4285F4', fontSize: 16 }}>
                                Sign in with Google
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Login;
