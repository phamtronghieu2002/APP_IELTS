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
import { CircularProgress } from 'react-native-svg-circular-progress';
import Button from '../../components/Button/Button';
import { LinearGradient } from 'expo-linear-gradient';
const PracticeTest = ({ navigation }) => {
    return (
        <MainLayout>
            <Pressable className="ml-1 mt-7 mb-6 flex flex-row items-center">
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
            <View className="flex justify-center items-center">
                <View
                    className="w-[300px] h-[320px] items-center justify-center"
                    style={{
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 3,
                    }}
                >
                    <CircularProgress
                        percentage={75} // giá trị phần trăm của tiến trình
                        donutWidth={1} // độ rộng của vòng tròn
                        size={214}
                        progressWidth={70} // kích thước của vòng tròn
                        children={
                            <View className="flex justify-center items-center">
                                <Text
                                    style={{ fontSize: 15, color: '#999999' }}
                                >
                                    Progress
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 25,
                                        color: 'black',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    75%
                                </Text>
                            </View>
                        } // hiển thị phần trăm
                        blankColor="#FFBF00" // màu của vòng tròn
                        donutColor="#008080" // màu của vòng tròn tiến trình
                    />
                    <Pressable className="mt-4">
                        <LinearGradient
                            colors={[
                                '#040EFA',
                                '#A90859',
                                '#B7084B',
                                '#E10623',
                                '#FF0505',
                            ]} // Define your colors
                            start={{ x: 0, y: 0 }} // Top
                            end={{ x: 1, y: 0 }} // Bottom
                            style={{
                                width: 194,
                                height: 43,
                                borderRadius: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Text className="text-xs">Practice now</Text>
                        </LinearGradient>   
                    </Pressable>
                </View>
            </View>
            <View className=" justify-center items-center mt-5">
              <Pressable 
              style={{
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 3,
            }}
              className="w-[300px] h-[50px] rounded-2xl bg-white flex flex-row justify-between items-center pl-2 pr-2" onPress={()=>{}}>
                <Text className="text-lg">
                Correct
                </Text>
                <View className="flex-row justify-between items-center">
                <Text className="text-2xl font-bold text-green-500 mr-10">
                0
                </Text>
                <Text className="text-base">
                No questions
                </Text>
                </View>
              </Pressable>
            </View>
            <View className=" justify-center items-center mt-5">
              <Pressable 
              style={{
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 3,
            }}
              className="w-[300px] h-[50px] rounded-2xl bg-white flex flex-row justify-between items-center pl-2 pr-2" onPress={()=>{}}>
                <Text className="text-lg">
                Incorrect
                </Text>
                <View className="flex-row justify-between items-center">
                <Text className="text-2xl font-bold text-red-500 mr-11">
                0
                </Text>
                <Text className="text-base text-red-600">
                Practice now
                </Text>
                </View>
              </Pressable>
            </View>
            <View className=" justify-center items-center mt-5">
              <Pressable 
              style={{
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 3,
            }}
              className="w-[300px] h-[50px] rounded-2xl bg-white flex flex-row justify-between items-center pl-2 pr-2" onPress={()=>{}}>
                <Text className="text-lg">
                New
                </Text>
                <View className="flex-row justify-between items-center">
                <Text className="text-2xl font-bold text-yellow-500 mr-11">
                0
                </Text>
                <Text className="text-base text-red-600">
                Practice now
                </Text>
                </View>
              </Pressable>
            </View>
            <View className=" justify-center items-center mt-5">
              <Pressable 
              style={{
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 3,
            }}
              className="w-[300px] h-[50px] rounded-2xl bg-white flex flex-row justify-between items-center pl-2 pr-2" onPress={()=>{}}>
                <Text className="text-lg">
                Marked
                </Text>
                <View className="flex-row justify-between items-center">
                <Text className="text-2xl font-bold text-purple-500 mr-10">
                0
                </Text>
                <Text className="text-base">
                No questions
                </Text>
                </View>
              </Pressable>
            </View>
            
        </MainLayout>
    );
};

PracticeTest.propTypes = {};
export default PracticeTest;
