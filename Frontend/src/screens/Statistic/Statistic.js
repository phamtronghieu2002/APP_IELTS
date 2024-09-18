import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo-linear-gradient';
import SwitchSelector from 'react-native-switch-selector';
import AntDesign from 'react-native-vector-icons/AntDesign';
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
import ProgressSkill from '../../components/ProgressSkill/ProgressSkill';
import Weekquestions from '../../components/WeekQuestions/WeekQuestions';

const Statistic = () => {
    const [selectedValue, setSelectedValue] = useState(0);
    const options_SwitchSelector = [
        { label: 'Progress', value: 0 },
        { label: 'Activity', value: 1 },
    ];
    return (
        <View className="flex-row h-75">
            <ScrollView className="relative z-30">
                <LinearGradient
                    colors={['#FAC6C6', '#F42525']} // Define your colors
                    start={{ x: 0, y: 0 }} // Top
                    end={{ x: 0, y: 1 }} // Bottom
                    style={styles.background}
                >
                    <View className="mt-7 mb-2 flex flex-row justify-between flex-wrap">
                        <View className="flex flex-row items-center">
                            <AntDesign
                                name="arrowleft"
                                size={20}
                                color="black"
                                style={{}}
                            />
                            <Text className="text-black-600 text-x font-bold ml-3">
                                IELTS Practice Test
                            </Text>
                        </View>
                        <View className="">
                            <Text className="text-black-600 text-x font-bold">
                                IELTS Practice Test
                            </Text>
                        </View>
                    </View>
                    {/* SwitchSelector */}
                    <View className="pr-5 pl-5 h-16 justify-center">
                        <View className="bg-white shadow h-14 justify-center rounded-3xl px-2.5 shadow-lg">
                            <SwitchSelector
                                options={options_SwitchSelector}
                                initial={0}
                                onPress={(value) => setSelectedValue(value)}
                                textColor={'#9F9F9F'} //'#7a44cf'
                                selectedColor={'#F75656'}
                                fontSize={16}
                                style={{ paddingHorizontal: 3 }} // Thay thế bằng padding trực tiếp nếu cần thiết
                                buttonColor={'#FAE6E6'}
                                borderColor={'#000000'}
                            />
                        </View>
                    </View>
                    {/* Text */}
                    {selectedValue === 0 && (
                        <View className="">
                            <View className="flex justify-center pr-5 pl-5 flex-col items-center">
                                <Text
                                    className="text-x font-bold ml-3"
                                    style={{ color: '#FF6B00' }}
                                >
                                    Completion Rate
                                </Text>
                                <Text
                                    className="text-xs ml-3"
                                    style={{ color: '#FFFFFF' }}
                                >
                                    The chart reflects your completion progress
                                    by skills
                                </Text>
                            </View>
                            <View className="flex justify-center pr-5 pl-5 flex-col items-center">
                                {/* Radar Chart */}
                                {/* notthing */}
                            </View>
                        </View>
                    )}
                    {selectedValue === 1 && (
                        <View className="">
                            <View className="flex justify-center pr-5 pl-5 flex-row justify-between items-center">
                                <View className="">
                                    <Text
                                        className="text-x font-bold ml-3"
                                        style={{ color: '#FF6B00' }}
                                    >
                                        Learning time
                                    </Text>
                                    <Text
                                        className="text-xs ml-3"
                                        style={{ color: '#FFFFFF' }}
                                    >
                                        Awr. Per day: 00m00s
                                    </Text>
                                </View>
                                <View className="">
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
                                            width: 74,
                                            height: 19,
                                            borderRadius: 10,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Text className="text-xs">
                                            7 days ago
                                        </Text>
                                    </LinearGradient>
                                </View>
                            </View>
                            <View className="flex justify-center pr-5 pl-5 flex-col items-center">
                                {/* Radar Chart */}
                                {/* notthing */}
                            </View>
                        </View>
                    )}
                </LinearGradient>
                {selectedValue === 0 && (
                    <View className="p-5 pt-3 h-33.75">
                        <View className="flex justify-center flex-col mb-2">
                            <Text
                                className="text-x font-bold "
                                style={{ color: '#C45151' }}
                            >
                                Progress Detail
                            </Text>
                            <Text
                                className="text-xs "
                                style={{ color: '#868181' }}
                            >
                                Help you track learning performance and analyze
                                progress through each skill easily
                            </Text>
                        </View>

                        <View className="flex h-31.25 flex-wrap flex-row justify-between">
                            <ProgressSkill
                                skill={'Listening'}
                                questionDone={20}
                                allQuestion={1689}
                                progress={((20 * 100) / 1689).toFixed(0)}
                                icon={require('../../../assets/home/reading.png')}
                            />
                            <ProgressSkill
                                skill={'Listening'}
                                questionDone={20}
                                allQuestion={1689}
                                progress={((20 * 100) / 1689).toFixed(0)}
                                icon={require('../../../assets/home/reading.png')}
                            />
                            <ProgressSkill
                                skill={'Listening'}
                                questionDone={20}
                                allQuestion={1689}
                                progress={((20 * 100) / 1689).toFixed(0)}
                                icon={require('../../../assets/home/reading.png')}
                            />
                            <ProgressSkill
                                skill={'Listening'}
                                questionDone={20}
                                allQuestion={1689}
                                progress={((20 * 100) / 1689).toFixed(0)}
                                icon={require('../../../assets/home/reading.png')}
                            />
                            <ProgressSkill
                                skill={'Listening'}
                                questionDone={20}
                                allQuestion={1689}
                                progress={((20 * 100) / 1689).toFixed(0)}
                                icon={require('../../../assets/home/reading.png')}
                            />
                            <ProgressSkill
                                skill={'Listening'}
                                questionDone={20}
                                allQuestion={1689}
                                progress={((20 * 100) / 1689).toFixed(0)}
                                icon={require('../../../assets/home/reading.png')}
                            />
                        </View>
                    </View>
                )}
                {selectedValue === 1 && (
                    <View className="p-5 pt-3 h-33.75">
                        <View className="flex justify-center flex-col mb-2">
                            <Text
                                className="text-x font-bold "
                                style={{ color: '#C45151' }}
                            >
                                Review Learning
                            </Text>
                            <Text
                                className="text-xs "
                                style={{ color: '#868181' }}
                            >
                                Help you determine what you know and what you
                                still need to work on
                            </Text>
                        </View>

                        <View className="flex h-31.25 flex-wrap flex-row justify-between">
                            <Weekquestions
                                icon={require('../../../assets/home/reading.png')}
                                typeQuestions={'Week Questions'}
                                numQuestion={20}
                            />
                            <Weekquestions
                                icon={require('../../../assets/home/reading.png')}
                                typeQuestions={'Familiar Question'}
                                numQuestion={20}
                            />
                            <Weekquestions
                                icon={require('../../../assets/home/reading.png')}
                                typeQuestions={'Bookmarked Question'}
                                numQuestion={20}
                            />
                        </View>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

Statistic.propTypes = {
    skill: PropTypes.string,
    questionDone: PropTypes.number,
    allQuestion: PropTypes.number,
    progress: PropTypes.number,
    numQuestion: PropTypes.number,
};
const styles = StyleSheet.create({
    background: {
        left: 0,
        right: 0,
        top: 0,
        height: 500,
        width: '100%',
    },
    shadowContainer: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5, // For Android shadow effect
    },
});
export default Statistic;
