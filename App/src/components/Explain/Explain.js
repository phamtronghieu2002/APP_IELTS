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
import IconA from 'react-native-vector-icons/FontAwesome5';
const Explain = ({ is_correct, explain, anwser }) => {
    const icon = is_correct ? 'https://res.cloudinary.com/dzpj1y0ww/image/upload/v1728032233/ielts/happy-face_1_r8nulh.png' : 'https://res.cloudinary.com/dzpj1y0ww/image/upload/v1728032427/ielts/sad_1_gnhkwx.png';
    const colorText = is_correct ? 'text-green-500' : 'text-red-500';
    const colorIcon = is_correct ? 'yellow' : 'red';
    return (
        <View className="min-h-[100px] border border-gray-200 mt-3  rounded-lg  pl-3 flex-col justify-center pb-3 pt-3" >
            <View className="flex flex-row items-center">
                <View className="w-10 h-10 flex justify-center  flex-row items-center">
                    <Image
                        style={{ width: 30, height: 30 }}
                        source={{
                            uri: icon
                        }}
                    />
                </View>
                <Text className={`ml-3 font-bold text-lg ${colorText} text-g`}>
                    {is_correct ? 'Correct' : 'Incorrect'}
                </Text>
            </View>
            <View className="">
                <View className="flex flex-row gap-3 mb-1 items-center">
                    <Text className="font-bold text-lg">
                        Answers
                    </Text>
                    <Text className="">
                    {anwser}
                    </Text>
                </View>

                <Text className="text-blue-800 text-lg mb-2">
                    Explain
                </Text>
                <Text className="">
                {explain}
                </Text>
            </View>
        </View>
    );
};

Explain.propTypes = {
};
export default Explain;