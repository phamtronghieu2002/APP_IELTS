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
import LoginLayout from '../../layouts/LoginLayout';
import Form from '../../components/Form/Form';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Icon } from 'react-native-elements';
const Login = () => {

    const formFields = [{
        name: "username",
        placeholder: "Username",
        Icon: <FontAwesome name="user" size={20} color="#000" />,
        isPassword: false
    }, {
        name: "password",
        placeholder: "Password",
        Icon: <FontAwesome name="lock" size={20} color="#000" />,
        isPassword: true
    }]
    const handleLogin = (formData) => {
        console.log
    }
    return (
        <LoginLayout>
            <Form
                formFields={formFields}
                onSubmit={handleLogin}
                title='Đăng Nhập'
            />

        </LoginLayout>
    );
};

Login.propTypes = {
};
export default Login;