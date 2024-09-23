import React from 'react';
import PropTypes from 'prop-types';
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
import MainLayout from '../../layouts/MainLayout';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AboutChosen from '../../components/AboutChosen/AboutChosen';
import DropdownSection from '../../components/DropdownSection/DropdownSection';

const Practice = ({ navigation }) => {
    const data1 = [
        { key: '1', title: 'practice test 1', progress: 0 },
        { key: '2', title: 'practice test 1', progress: 0 },
        { key: '3', title: 'practice test 1', progress: 0 },
        { key: '4', title: 'practice test 1', progress: 0 },
    ];
    const data2 = [
        { key: '1', title: 'practice test 1', progress: 0 },
        { key: '2', title: 'practice test 1', progress: 0 },
        { key: '3', title: 'practice test 1', progress: 0 },
        { key: '4', title: 'practice test 1', progress: 0 },
    ];
    return (
        <SafeAreaView>
            <Pressable className="ml-3 mt-7 mb-6 flex flex-row items-center">
                <AntDesign
                    name="arrowleft"
                    size={20}
                    color="black"
                    style={{}}
                />
                <Text className="text-black-600 text-x font-bold ml-3">
                    Practice
                </Text>
            </Pressable>
            {/* <View className="flex flex-col"> */}
            <ScrollView nestedScrollEnabled={true}>
                <DropdownSection
                    nameSection={'Section 1'}
                    numquestions={20}
                    percent={30}
                    dataSection={data2}
                />
                <DropdownSection
                    nameSection={'Section 2'}
                    numquestions={200}
                    percent={50}
                    dataSection={data2}
                />
                <DropdownSection
                    nameSection={'Section 3'}
                    numquestions={200}
                    percent={50}
                    dataSection={data1}
                />
                <DropdownSection
                    nameSection={'Section 4'}
                    numquestions={200}
                    percent={50}
                    dataSection={data2}
                />
                <DropdownSection
                    nameSection={'Section 4'}
                    numquestions={200}
                    percent={50}
                    dataSection={data2}
                />
                <DropdownSection
                    nameSection={'Section 4'}
                    numquestions={200}
                    percent={50}
                    dataSection={data2}
                />
            </ScrollView>
            {/* </View> */}
        </SafeAreaView>
    );
};

Practice.propTypes = {};
export default Practice;
