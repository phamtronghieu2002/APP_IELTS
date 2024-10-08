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

const LessonItem = ({
    tests,
    icon,
    name_lesson,
    total_question,
    percent_correct,
    category,
    navigation
}) => {
    const [expanded, setExpanded] = useState(false); // Manage dropdown state
    const animation = useRef(new Animated.Value(0)).current; // Animated value for dropdown
    const contentRef = useRef(null);
    const [contentHeight, setContentHeight] = useState(0);

    const colorPercent = percent_correct > 0 ? ' text-red-500' : 'text-gray-500';
  console.log("percent_correct",percent_correct);
  
    const toggleDropdown = () => {
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

    const heightInterpolate = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, contentHeight], // Adjust dropdown height here
    });

    function find_dimesions(layout) {
        const { x, y, width, height } = layout;
        setContentHeight(height);
    }


    return (
        <Pressable
            className=" bg-white p-4 rounded-lg mb-3"
            onPress={toggleDropdown}
        >
            <View className="top flex flex-row justify-between items-center">
                <View className="left flex flex-row gap-3">
                    {icon}
                    <Text className="text-lg font-bold">
                        {name_lesson}
                    </Text>
                </View>
                <View className="right">
                    <Text>{expanded ?
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
                            color='red'
                            borderColor='#f0f0f0'
                            progress={percent_correct /100}
                            width={100}
                        />
                        <Text className={colorPercent}>
                            {percent_correct}%
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
                            tests?.map((item, index) => {
                                return (
                                    <PraticeItem
                                        key={index}
                                        {...item}
                                        category={category}
                                        navigation={navigation}
                                        onPress={() => {
                                            navigation?.navigate(category?.type, { nameTest: item?.name_test, test_id: item?._id });
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
