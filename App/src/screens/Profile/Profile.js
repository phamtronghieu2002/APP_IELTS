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
import LoginLayout from '../../layouts/LoginLayout';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Form from '../../components/Form/Form';
const formFields = [
    {
        name: "displayname",
        placeholder: "Display Name",
        Icon: <FontAwesome name="user" size={20} color="#000" />,
        isPassword: false
    }, {
        name: "yourPhone",
        placeholder: "yourphone",
        Icon: <FontAwesome name="phone" size={20} color="#000" />,
        isPassword: false
    }, {
        name: "yourBirthDay",
        placeholder: "your birth day",
        Icon: <FontAwesome name="birthday-cake" size={20} color="#000" />,
        isPassword: true
    },
]
const Profile = ({ navigation, route }) => {
    const handeUpdateProfile = () => {

    }
    return (

        <View className="">
            <Text className="">
                xin chao
            </Text>
        </View>
        // <LoginLayout
        //     profile
        //     Image={<Image className=""
        //         source={require('..//..//..//assets//avatar.png')}
        //         style={{
        //             width: 150,
        //             height: 150,
        //             marginBottom: 20
        //         }} />}

        // >
        //     <Form
        //         formFields={formFields}
        //         onSubmit={handeUpdateProfile}
        //         title='update'
        //     />
        // </LoginLayout>


    );
};

export default Profile;