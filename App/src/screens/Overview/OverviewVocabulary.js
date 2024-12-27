import React from 'react';
import PropTypes from 'prop-types'
import {
    View,
    SafeAreaView,
    Text
} from 'react-native';
import HeaderScreen from '../../components/Header/HeaderScreen';

import { Pressable } from 'react-native';
import IconO from 'react-native-vector-icons/Octicons';
import { _testTypes } from '../../utils/constant';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { addTestResult } from '../../services/testResultServices';
const OverviewVocabulary = ({ navigation, route }) => {

    const name_test = route?.params?.name_test;
    const id_test = route?.params?.test_id;
    const type = route?.params?.type;
    const testResults = route?.params?.testResults;
    const refresh = route?.params?.cb;

    const handlePressTestItem = async (test) => {
        try {
            
                const is_doing = testResults?.[0]?.anwsers?.length > 0 ? true : false;
                if (is_doing) {
                    navigation?.navigate(configs?.screenName?.overview_vocabulary, { test_id: test?._id, name_test: test?.name_test, type: category?.type, testResults: test?.testResults });
                } else {
                    const res = await addTestResult({
                        test_id: id_test,
                    });
                    navigation?.navigate(configs?.screenName?.overview_vocabulary, { nameTest: test?.name_test, test_id: test?._id, type: category?.type, cb: refresh });
                }
            


        } catch (error) {
            console.log('====================================');
            console.log("Error handlePressTestItem: ", error);
            console.log('====================================');
        }


    }

    return (
        <SafeAreaView>
            <HeaderScreen
                onPress={refresh}
                navigation={navigation}
                style="mt-5"
                label={name_test}
            />
            <View className="p-7">
                <View className="min-h-[300px] bg-white flex flex-col justify-center items-center p-7 rounded-lg">


                    <AnimatedCircularProgress

                        size={150}
                        width={13}
                        fill={testResults?.[0]?.percent_test_correct ? Number(testResults?.[0]?.percent_test_correct?.toFixed(0))  : 0}
                        tintColor="red"
                        lineCap='round'
                        onAnimationComplete={() => {}}
                        backgroundColor="#3d5870"

                    >


                        {
                            (fill) => (
                                <View className="">
                                    <Text
                                        className="text-red-400 font-bold text-lg text-center"
                                        style={{ fontSize: 20 }}>
                                        {`${fill?.toFixed(0)??0}%`}
                                    </Text>
                                    <Text className="text-center text-sm">
                                        Correct
                                    </Text>
                                </View>
                            )
                        }

                    </AnimatedCircularProgress>
                    <View className="mt-10">

                        <Pressable
                            className="mb-5 rounded-full w-[250px] h-[50px] bg-red-400 flex items-center justify-center" onPress={() => {

                                navigation.navigate("vocabulary_leaning", {type, nameTest: name_test, test_id: id_test, testResults: testResults?.[0] });
                            }}>
                            <Text className="text-white font-bold text-lg">
                                Leaning now
                            </Text>
                        </Pressable>
                        <Pressable
                            className="rounded-full w-[250px] h-[50px] bg-red-400 flex items-center justify-center" onPress={() => {
                                handlePressTestItem();
                                navigation.navigate("vocabulary_play", {type, nameTest: name_test, test_id: id_test, testResults: testResults?.[0] });
                            }}>
                            <Text className="text-white font-bold text-lg">
                                Play now
                            </Text>
                        </Pressable>
                    </View>
                </View>
                <View className="mt-10">

                    <View className="mb-3">
                        <View
                            style={
                                {
                                    shadowColor: "black",
                                    shadowOffset: {
                                        width: 3,
                                        height: 2,
                                    },
                                }
                            }
                            className="rounded-full bg-white h-[50px] pl-3 pr-7 flex justify-center flex-row ">
                            <View className="flex flex-row items-center justify-start w-[40%] gap-3 relative">
                                <IconO
                                    name='dot-fill'
                                    size={20}
                                    color={'gray'}
                                />
                                <Text className="">
                                    Correct
                                </Text>
                                <View className="w-0.5 h-1/2 bg-slate-200 absolute top-2 right-0">

                                </View>

                            </View>
                            <View className="flex-1 items-center justify-center flex-row gap-7 pl-10">
                                <Text className="text-green-500 font-bold text-lg">
                                    {
                                        testResults?.[0]?.total_correct ?? 0
                                    }
                                </Text>
                    
                            </View>
                        </View>
                    </View>
                    <View className="mb-3">
                        <View
                            style={
                                {
                                    shadowColor: "black",
                                    shadowOffset: {
                                        width: 3,
                                        height: 2,
                                    },
                                }
                            }
                            className="rounded-full bg-white h-[50px] pl-3 pr-7 flex justify-center flex-row ">
                            <View className="flex flex-row items-center justify-start w-[40%] gap-3 relative">
                                <IconO
                                    name='dot-fill'
                                    size={20}
                                    color={'gray'}
                                />
                                <Text className="">
                                    Incorrect
                                </Text>
                                <View className="w-0.5 h-1/2 bg-slate-200 absolute top-2 right-0">

                                </View>

                            </View>
                            <View className="flex-1 items-center justify-center flex-row gap-7 pl-10">
                                <Text className="text-red-600 font-bold text-lg">
                                    {
                                        testResults?.[0]?.total_incorrect ??0

                                    }
                                </Text>
                   
                            </View>
                        </View>
                    </View>
                </View>
            </View>

        </SafeAreaView>
    );
};

OverviewVocabulary.propTypes = {
};
export default OverviewVocabulary;