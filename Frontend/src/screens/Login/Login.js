import React from 'react';
import { View, Text, Image, Pressable, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Use for a gradient effect
import HeaderScreen from '../../components/Header/HeaderScreen';
import configs from '../../configs';

const Login = ({ navigation }) => {

    


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
                            onPress={() => { }}
                            style={({ pressed }) => [
                                {
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 300,
                                    height: 52,
                                    padding: 10,
                                    borderWidth: 1,
                                    borderColor: 'red', // Google brand color
                                    borderRadius: 8,
                                    backgroundColor: pressed ? '#E8E8E8' : '#fff', // Change color on press
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
    )


};

export default Login;
