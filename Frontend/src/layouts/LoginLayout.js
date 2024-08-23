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


const LoginLayout = ({ children, profile, imgURL, Image }) => {
    return (
        <SafeAreaView style={{ flex: 1 }} className="p-5 pt-5">
            <View className='flex-1 items-center justify-center'>
                {
                    Image
                }
                {
                    profile && <Text className="">
                        {profile}
                    </Text>
                }
                {children}

            </View>
        </SafeAreaView>
    );
};

LoginLayout.propTypes = {
    navigation: PropTypes.object,
    route: PropTypes.object
};
export default LoginLayout;