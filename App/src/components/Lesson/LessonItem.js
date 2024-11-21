import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    Pressable,
    Animated, // Import Animated
} from 'react-native';
import { Icon } from 'react-native-elements';
import * as Progress from 'react-native-progress';
import IconE from 'react-native-vector-icons/Entypo';
import PraticeItem from './PracticeItem';
import configs from '../../configs';
import { addTestResult, createTestResult } from '../../services/testResultServices';

const LessonItem = ({
    isExam = false,
    tests,
    icon,
    name_lesson,
    total_question,
    percent_correct,
    category,
    navigation,
    refresh,
    onPress
}) => {


    const [expanded, setExpanded] = useState(false); // Manage dropdown state
    const animation = useRef(new Animated.Value(0)).current; // Animated value for dropdown
    const contentRef = useRef(null);
    const [contentHeight, setContentHeight] = useState(0);

    const colorPercent = percent_correct ?? 0 > 0 ? ((percent_correct ?? 0?.toFixed(0) == 100) ? "border-green-500 text-green-500" : 'border-red-400 text-red-500') : 'bg-light-200';

    const heightInterpolate = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, contentHeight], // Adjust dropdown height here
    });

    const toggleDropdown = () => {
        if (isExam) {

            onPress?.();
            return;
        }
        if (expanded) {
            // Collapse
            Animated.timing(animation, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
            }).start(() => setExpanded(false));
        } else {
            setExpanded(true);
            setContentHeight(contentHeight + 1);

            // Expand
            Animated.timing(animation, {
                toValue: 1,
                duration: 300,
                useNativeDriver: false,
            }).start();
        }
    };


    const find_dimesions = (layout) => {
        const { x, y, width, height } = layout;
        setContentHeight(height);
    }

    const handlePressTestItem = async (test) => {
        try {

            const is_doing = test?.testResults?.[0]?.anwsers?.length > 0 ? true : false;
            if (!is_doing) {
                const res = await createTestResult({
                    test_id: test?._id,
                });
            }


            if (category?.type == 'Vocabulary') {

                navigation?.navigate(configs?.screenName?.overview_vocabulary, { test_id: test?._id, name_test: test?.name_test, type: category?.type, testResults: test?.testResults });
            } else {

                if (is_doing && category?.type != 'Speaking' && category?.type != 'Writing') {
                    navigation?.navigate(configs?.screenName?.overview, { test_id: test?._id, name_test: test?.name_test, type: category?.type, testResults: test?.testResults });
                } else {

                    navigation?.navigate(category?.type, { nameTest: test?.name_test, test_id: test?._id, type: category?.type, cb: refresh });
                }

            }


        } catch (error) {
    
        }


    }

    return (
        <Pressable
            className=" bg-white p-4 rounded-lg mb-3"
            onPress={toggleDropdown}
        >
            <View className=" flex flex-row justify-between items-center">
                <View className="left flex flex-row items-center gap-5 ">
                    {icon}
                    <Text className="text-lg font-bold  w-[80%]">
                        {name_lesson}
                    </Text>
                </View>
                <View className="right">

                    {
                        isExam ? <></> : <Text>{expanded ?
                            <IconE
                                name='chevron-thin-up'
                                size={13}
                            />
                            :
                            <IconE
                                name='chevron-thin-down'
                                size={13}
                            />
                        }</Text>
                    }

                </View>
            </View>

            <View className="bottom flex flex-row items-center mt-2">
                <Text className="flex-1 ml-7 text-sm text-gray-500">
                    {total_question} questions
                </Text>
                <View className="">
                    <View className="flex gap-2 flex-row items-center">
                        <Text className="text-gray-500">
                            Correct
                        </Text>
                        <Progress.Bar
                            backgroundColor='#f0f0f0'
                            color={
                                percent_correct ?? 0?.toFixed(0) == 100 ? '#4caf50' : '#f44336'
                            }
                            borderColor='#f0f0f0'
                            // chỉ  lấy 2 chử số thập phân
                            progress={(percent_correct / 100)}
                            width={100}
                        />
                        <Text className={`${colorPercent}`}>
                            {percent_correct?.toFixed(0)}%
                        </Text>
                    </View>
                </View>
            </View>

            {/* Animated Dropdown Content */}
            <Animated.View style={{ overflow: 'scroll', height: heightInterpolate }}>
                {expanded && (
                    <View
                        ref={contentRef}
                        onLayout={(event) => { find_dimesions(event.nativeEvent.layout) }}
                        className="dropdown-content  mt-2 rounded-lg">
                        {/* Place your dropdown content here */}

                        {

                            (tests?.[0]?._id ? tests : []).map((item, index) => {

                                return (
                                    <PraticeItem
                                        key={index}
                                        {...item}

                                        percent_correct={item?.testResults?.[0] ? item?.testResults?.[0]?.percent_test_correct : 0}
                                        category={category}
                                        navigation={navigation}
                                        onPress={() => {
                                            handlePressTestItem(item)
                                        }}

                                    />
                                )
                            })
                        }
                    </View>
                )}

            </Animated.View>
        </Pressable>
    );
};

export default LessonItem;
