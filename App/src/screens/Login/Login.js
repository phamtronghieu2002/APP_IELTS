import React, { useEffect } from 'react';
import { View, Text, Image, Pressable, SafeAreaView, ImageBackground } from 'react-native';
import { StyleSheet } from 'react-native';
import HeaderScreen from '../../components/Header/HeaderScreen';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../../fetures/userSlice';
import configs from '../../configs';
import { storeData, getData } from '../../utils/asyncStore';
import { register } from '../../services/authService';
import Toast from 'react-native-toast-message';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
const webClientId = "1013873615823-cl9jhtcai95mcuhenqp2j5kvg8nvpekr.apps.googleusercontent.com";
const androidClientId = "1013873615823-0r8ku736ooi3fiuaghi2bsrtfjfabv78.apps.googleusercontent.com";


GoogleSignin.configure({
    webClientId, // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
    scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    hostedDomain: '', // specifies a hosted domain restriction
    forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    accountName: '', // [Android] specifies an account name on the device that should be used
    // androidClientId, // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. "GoogleService-Info-Staging"
    openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
    profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
});
const Login = ({ navigation, route }) => {

    const isIntro = route?.params?.isIntro;
    const isGuest = route?.params?.isGuest;

 
    
    const dispatch = useDispatch();
    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const response = await GoogleSignin.signIn();


            if (response) {
                const userStorage = await getData('user');
     
                const userInfo = response?.data?.user;
                const data = {
                    email: userInfo?.email,
                    displayname: userInfo?.name,
                    avatarPicture: userInfo?.photo,
                    user_id: userStorage?._id,
                }
      
                const fb = await register(data);

  
                storeData('user', fb);
                dispatch(loginUser(fb));

                navigation?.navigate(configs?.screenName?.initStack, { screen: "Home" });
            } else {

            }
        } catch (error) {
            console.log("error >>", error);

            if (isErrorWithCode(error)) {
                switch (error.code) {
                    case statusCodes.IN_PROGRESS:
                        // operation (eg. sign in) already in progress
                        break;
                    case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                        // Android only, play services not available or outdated
                        break;
                    default:
                    // some other error happened
                }
            } else {
                // an error that's not related to google sign in occurred
            }
        }
    };



    const handleContinueAsGuest = async () => {
        // fake api tạo user giả
        // save user vao -> redux , async storage


        try {
            const user = await register()

            if (user) {
                dispatch(loginUser(user));
                // lưu user vào async storage
                storeData?.('user', user);
                Toast.show({
                    type: 'success',
                    text1: 'Login success fully !!',
                    text2: 'Enjoy your Journey with 👋'
                });
                navigation?.navigate(configs?.screenName?.initStack, { screen: "Home" });
            }

        } catch (error) {
            console.log('====================================');
            console.log('error >>', error);
            console.log('====================================');
            Toast.show({
                type: 'error',
                text1: error,
            });
        }
    };
    const image = { uri: 'https://images.pexels.com/photos/3475632/pexels-photo-3475632.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' };
    return (
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
            <SafeAreaView style={{ flex: 1 }} className="p-5 pt-5">
                {


                    isIntro ? <></> :
                        <HeaderScreen
                            textMode='light'
                            className={'text-white'}
                            navigation={navigation}
                            label="Sign In"
                        />

                }
                <View className='flex-1 items-center justify-center'>
                    <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                        <View className="mb-52">
                            <Text className="text-white text-center   text-2xl font-bold">
                                Welcome to IELTS APP!
                            </Text>
                            <Text className="text-white">
                                Sign in to track your progress and practice smarter!"
                            </Text>
                        </View>
                        <View className="absolute bottom-5" style={{ marginTop: 20 }}>
                            <Pressable
                                onPress={() => {
                                    signIn?.();
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
                            {/* continute with guest button */}

                            {
                                !isGuest && <Pressable
                                    onPress={() => {
                                        handleContinueAsGuest();

                                    }}
                                    style={({ pressed }) => [
                                        {
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: 300,
                                            height: 52,
                                            padding: 10,
                                            borderWidth: 1,
                                            // borderColor: 'red',
                                            borderRadius: 8,
                                            backgroundColor: pressed ? '#E8E8E8' : '#fff',
                                            shadowColor: 'red',
                                            shadowOffset: { width: 0, height: 4 },
                                            shadowOpacity: 0.3,
                                            shadowRadius: 4.65,
                                            elevation: 8,
                                            marginTop: 10
                                        }
                                    ]}
                                >
                                    <Text style={{ fontWeight: '', color: '#000', fontSize: 16 }}>
                                        Continue as guest
                                    </Text>
                                </Pressable>
                            }


                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 42,
        lineHeight: 84,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#000000c0',
    },
});
export default Login;
