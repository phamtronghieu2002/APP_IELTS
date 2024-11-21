import React, { useEffect } from 'react';
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
import { addAnwserToTestResult, getAllTestResult } from '../../services/testResultServices';
import { _testTypes } from '../../utils/constant';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Circle } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
const OverviewExam = ({ navigation, route }) => {







    const [testResult, setTestResult] = React.useState([]);
    const [data, setData] = React.useState([]);
    const { speakingTest,
        writingTest,
        readingTest,
        listeningTest, } = route?.params;



    // Số câu đúng 15 trên 40 ->4



    // Số câu đúng 23 trên 40 ->5



    // Số câu đúng 30 trên 40 ->6


    // Số câu đúng 34 trên 40 ->7



    // Số câu đúng 38 trên 40  ->8

    const getBandScoreIelts = (total) => {
        if (total >= 38) {
            return 8;
        }
        if (total >= 34) {
            return 7;

        }
        if (total >= 30) {
            return 6;

        }
        if (total >= 23) {
            return 5;
        }
        if (total >= 15) {
            return 4;
        }
        return 3;
    }



    const handleData = (data, type_category) => {
        let total = 0;
        const testResultFilter = testResult?.filter(item => data?.some(i => i?._id === item?.test_id?._id));
        testResultFilter?.map(item => {
            total += item?.total_correct
        })
        setData(prevState => [...prevState, { type_category, total }])

    }

    const fetchTestResult = async () => {
        try {
            const res = await getAllTestResult();
            const testResult = res.data;
            setTestResult(testResult);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchTestResult();
    }
        , [])

    useEffect(() => {
        if (testResult?.length > 0) {
            handleData(readingTest, "Reading");
            handleData(listeningTest, "Listening");

        }
    }, [testResult])



    return (
        <SafeAreaView>
            <HeaderScreen
                onPress={() => {
                    navigation?.goBack()
                }}
                navigation={navigation}
                style="mt-5"
                label={"Overview Exam"}
            />
            <View className="p-7">
                <View className="min-h-[300px] bg-white flex flex-col justify-center items-center p-7 rounded-lg">

                    <AnimatedCircularProgress

                        size={200}
                        width={13}

                        tintColor="red"
                        lineCap='round'
                        onAnimationComplete={() => { }}
                        backgroundColor="#3d5870"

                    >


                        {
                            (fill) => (
                                <View className="">
                                    <Text className="text-center text-xl">
                               Band Score
                                    </Text>
                                

                                </View>
                            )
                        }

                    </AnimatedCircularProgress>

                    <View className="mt-10">

                    </View>
                </View>
                <View className="mt-10">

                    <View className="mb-3">
                        {
                            data?.map((item, index) => (
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
                                            {item?.type_category}
                                        </Text>
                                        <View className="w-0.5 h-1/2 bg-slate-200 absolute top-2 right-0">

                                        </View>

                                    </View>
                                    <View className="flex-1 items-center justify-center flex-row gap-7 pl-10">
                                        <Text className="text-green-500 font-bold text-lg">
                                            Đúng
                                        </Text>
                                        <Text className="text-green-500 font-bold text-lg">
                                            {item?.total}
                                        </Text>
                                        <Text className="">
                                            Band Score: {getBandScoreIelts(item?.total)}
                                        </Text>

                                    </View>
                                </View>
                            ))
                        }
                    </View>

                </View>
            </View>

        </SafeAreaView>
    );
};

OverviewExam.propTypes = {
};
export default OverviewExam;