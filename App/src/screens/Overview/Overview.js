import React from 'react';
import PropTypes from 'prop-types'
import {
    View,
    SafeAreaView,
    Text
} from 'react-native';
import HeaderScreen from '../../components/Header/HeaderScreen';

import CircularProgress from 'react-native-circular-progress-indicator';
import { Pressable } from 'react-native';
import IconO from 'react-native-vector-icons/Octicons';
import { Icon } from 'react-native-elements';
import { addAnwserToTestResult } from '../../services/testResultServices';
import { _testTypes } from '../../utils/constant';
const Overview = ({ navigation, route }) => {
    const name_test = route?.params?.name_test;
    const id_test = route?.params?.test_id;
    const type = route?.params?.type;

    const practiceNow = async () => {
        try {
            await addAnwserToTestResult(id_test, _testTypes?.renew, {
              anwser: {}
            });
          } catch (error) {
            console.error(error);
          }
    };



    return (
        <SafeAreaView>
            <HeaderScreen
                navigation={navigation}
                style="mt-5"
                label={name_test}
            />
            <View className="p-7">
                <View className="min-h-[300px] bg-white flex flex-col justify-center items-center p-7 rounded-lg">
                    <CircularProgress
                        titleStyle={{ fontSize: 15, fontWeight: '', color: 'gray' }}
                        progressValueColor='red'
                        progressValueFontSize={30}
                        title='Correct'
                        value={90}
                        radius={100}
                        inActiveStrokeOpacity={0.7}
                        activeStrokeWidth={20}
                        inActiveStrokeWidth={20}
                        progressValueStyle={{ fontWeight: 'bold', color: 'black' }}
                        activeStrokeSecondaryColor="red"
                        inActiveStrokeColor="black"
                        duration={500}
                        valueSuffix="%"
                        dashedStrokeConfig={{
                            count: 50,
                            width: 4,


                        }}
                        strokeColorConfig={[
                            { color: '#ff707e', value: 0 },
                            { color: '#db5c69', value: 50 },
                            { color: '#800512', value: 100 },
                        ]}
                    />
                    <View className="mt-10">

                        <Pressable

                            className="rounded-full w-[250px] h-[50px] bg-red-400 flex items-center justify-center" onPress={() => {
                                practiceNow();
                                navigation.navigate(type, { nameTest: name_test, test_id: id_test });
                            }}>
                            <Text className="text-white font-bold text-lg">
                                Practice now
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
                                    2
                                </Text>
                                <Pressable className="" onPress={() => { }}>
                                    <Text className="text-red-400 text-lg">
                                        Practice now
                                    </Text>
                                </Pressable>
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
                                    2
                                </Text>
                                <Pressable className="" onPress={() => {


                                }}>
                                    <Text className="text-red-400 text-lg">
                                        Practice now
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

        </SafeAreaView>
    );
};

Overview.propTypes = {
};
export default Overview;