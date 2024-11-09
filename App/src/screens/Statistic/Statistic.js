import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo-linear-gradient';
import SwitchSelector from 'react-native-switch-selector';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {
    View,
    Text,
    ScrollView,

} from 'react-native';
import ProgressSkill from '../../components/ProgressSkill/ProgressSkill';
import Weekquestions from '../../components/WeekQuestions/WeekQuestions';
import Gradient from '../../components/Gradient/Gradient';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { setShowHeaderDraw } from '../../fetures/interfaceSlice';
import Radarchart from './components/RadarChart';
import { _groupCategories } from '../../utils/constant';
import { use } from 'i18next';
import { getCategories } from '../../services/categoryServices';
import configs from '../../configs';
import { i18nContext } from '../../providers/I18nProvider';
import { getAllTestResult } from '../../services/testResultServices';
import Toast from 'react-native-toast-message';
import TimeChar from './components/TimeChar';
import SkeletonStatic from '../../components/Skeleton/SkeletonStatic';

const Statistic = ({ navigation, route }) => {



    const dispatch = useDispatch()

    const { i18n, t } = useContext(i18nContext);

    const { randomKey } = route?.params;

 
    const handleScroll = (event) => {
        // const currentOffset = event.nativeEvent.contentOffset.y;

        // if (currentOffset > scrollOffset && currentOffset > 20) {
        //     dispatch(setShowHeaderDraw(false))
        // } else {


        // }
        // setScrollOffset(currentOffset);
    };



    const [selectedValue, setSelectedValue] = useState(0);
    const options_SwitchSelector = [
        { label: t('statistics.tabLeft'), value: 0 },
        { label: t('statistics.tabRight'), value: 1 },
    ];

    const [categories, setCategories] = React.useState([]);
    const [statisticData, setStatisticData] = React.useState([]);
    const [testResult, setTestResult] = React.useState([]);

    const [loading, setLoading] = useState(true);





    const fetchCategory = async () => {
        try {

            const res = await getCategories(_groupCategories.all);
            setCategories(res?.data);
            const data_statistic = res?.data?.map((item) => {

                const percent = Number(((item?.total_correct / item?.total_question || 0) * 100).toFixed(0))
                return ({
                    label: `${item?.type} - ${percent}%`,
                    value: percent,
                })
            });
            setStatisticData(data_statistic);

        } catch (error) {
            console.log(error);
        }
    };

    const fetchTestResult = async () => {
        try {
            const res = await getAllTestResult();

            setTestResult(res?.data);
        } catch (error) {
            console.log(error);
        }
    };

    const calcTotalCorrect = () => {
        let total = 0;

        testResult?.map((item) => {
            total += item?.total_correct;
        });
        console.log("total", total);

        return total;
    };

    const calcTotalInCorrect = () => {
        let total = 0;


        testResult?.map((item) => {
            total += item?.total_incorrect;
        });
        return total;
    };
    const calcTotalBookmark = () => {
        let total = 0;

        const fb = testResult?.filter((item) => {
            return item?.bookmark;

        });

        return fb?.length;
    };



    useEffect(() => {
        setLoading(true);
        Promise.all([fetchCategory(), fetchTestResult()]).then(() => {
            setLoading(false);
        });
    }, [randomKey]);



    return (
        <View className="flex-row h-75">
                {
                   <ScrollView
                        onScroll={handleScroll} scrollEventThrottle={16}
                        className="relative z-30">
                        <Gradient>
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
                                        {/* =========================================== */}
                                        <Radarchart
                                            dataProps={statisticData}
                                        />
                                    </View>
                                    <View className="flex justify-center pr-5 pl-5 flex-col items-center">
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


                                        <TimeChar
                                            freshkey={randomKey}
                                        />

                                    </View>
                                </View>
                            )}
                            {/* static */}

                        </Gradient>
                        {/* SwitchSelector */}


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
                                    {
                                        categories?.filter(item => item?.group == "skills")?.map((item, index) => (
                                            <ProgressSkill
                                                onPress={() => {
                                                    navigation.navigate(configs?.screenName?.lesson, { category: item })
                                                }}
                                                key={index}
                                                skill={item?.type}
                                                questionDone={item?.total_correct}
                                                allQuestion={item?.total_question}
                                                progress={(item?.total_correct / item?.total_question || 0) * 100}
                                                icon={{ uri: item?.thumb }}
                                            />
                                        ))


                                    }
                                    {
                                        categories?.filter(item => item?.group == "practices")?.map((item, index) => (
                                            <ProgressSkill

                                                onPress={() => {
                                                    navigation.navigate(configs?.screenName?.lesson, { category: item })
                                                }}
                                                key={index}
                                                skill={item?.type}
                                                questionDone={item?.total_correct}
                                                allQuestion={item?.total_question}
                                                progress={(item?.total_correct / item?.total_question || 0) * 100}
                                                icon={{ uri: item?.thumb }}
                                            />
                                        ))
                                    }

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
                                        onPress={
                                            () => {
                                                if (calcTotalInCorrect() > 0) {
                                                    navigation.navigate(configs?.screenName?.review, {
                                                        status: "weak",

                                                    })
                                                } else {
                                                    Toast.show({
                                                        type: 'info',
                                                        text1: 'No data !!',

                                                    });
                                                }
                                            }
                                        }
                                        icon={require('../../../assets/statitics/incorrect.png')}
                                        typeQuestions={t('statistics.item.weakQuetion')}
                                        numQuestion={calcTotalInCorrect()}
                                    />
                                    <Weekquestions
                                        onPress={
                                            () => {
                                                if (calcTotalCorrect() > 0) {
                                                    navigation.navigate(configs?.screenName?.review, {
                                                        status: "familiar",

                                                    })
                                                } else {
                                                    Toast.show({
                                                        type: 'info',
                                                        text1: 'No data !!',

                                                    });
                                                }
                                            }
                                        }
                                        icon={require('../../../assets/statitics/correct.png')}
                                        typeQuestions={t('statistics.item.familiarQuestion')}
                                        numQuestion={calcTotalCorrect()}
                                    />
                                    <Weekquestions
                                        onPress={() => {
                                            if (calcTotalBookmark() > 0) {
                                                navigation.navigate(configs?.screenName?.review, {
                                                    status: "bookmark",

                                                })
                                            }
                                            else {
                                                Toast.show({
                                                    type: 'info',
                                                    text1: 'No data !!',

                                                });
                                            }


                                        }}
                                        icon={require('../../../assets/statitics/bookmark.png')}
                                        typeQuestions={t('statistics.item.bookmarkQuestion')}
                                        numQuestion={calcTotalBookmark()}
                                    />
                                </View>
                            </View>
                        )}
                    </ScrollView> 
                }

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

export default Statistic;
