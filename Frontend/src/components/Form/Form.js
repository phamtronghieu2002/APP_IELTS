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
import InputCustom from '../InputCustom/InputCustom';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';
const Form = ({ formFields, title, onSubmit, profile }) => {
    const [formData, setFormData] = useState({});

    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    }
    const handleSubmit = () => {
        onSubmit(formData);
    }

    return (
        <View className='flex items-center'>
            {
                formFields.map((field, index) => {
                    return (
                        <InputCustom
                            key={index}
                            placeholder={field.placeholder}
                            name={field.name}
                            value={formData[field.name]}
                            Icon={field.Icon}
                            isPassword={field.isPassword}
                            onChange={handleChange}
                        />
                    )
                })
            }


            <Pressable

                className="w-[303px] h-[43px] p-3  bg-red-600 rounded-full  mt-20"
                onPress={handleSubmit}>
                <Text className="text-lime-50 text-center">
                    {title}
                </Text>
            </Pressable>
            {
                profile && <View className="mt-20">
                    <Text className="text-center font-bold mb-10">
                        ---Or---
                    </Text>
                    <Pressable className=" flex flex-row  items-center justify-center w-[200px] h-[52px] p-3   border border-black" onPress={() => { }}>
                        <Image className="mr-4"
                            source={require('..//..//../assets/logos/google.png')}
                            style={{
                                width: 30,
                                height: 30,

                            }} />
                        <Text className="text-center font-bold">
                            Sign in with google
                        </Text>
                    </Pressable>
                    <Text className="text-center font-bold mt-5">
                        Do you have any account?   <Text className="text-blue-500">Login</Text>
                    </Text>
                </View>

            }

        </View>
    );
};

Form.propTypes = {
    title: PropTypes.string.isRequired
};
export default Form;