import React, { useEffect, useState } from 'react';
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
import HeaderScreen from '../Header/HeaderScreen';
import configs from '../../configs';
import LessonItem from './LessonItem';
import IconF from 'react-native-vector-icons/Feather';
import { getLessonByCategory } from '../../services/lessonService';
import { getData } from '../../utils/asyncStore';
import { createTestResult } from '../../services/testResultServices';


const IconLesson = [
    {
        type: "Listening",
        icon: "headphones"
    }, {
        type: "Reading",
        icon: "book"
    }, {
        type: "Writing",
        icon: "edit-2"
    }, {
        type: "Speaking",
        icon: "mic"
    },
    {
        type: "Exam",
        icon: "book"
    }
]
const getLessonIcon = (type) => {
    const icon = IconLesson.find(item => item.type === type)
    return icon?.icon
}

const LessonExam = ({ navigation, route }) => {

    const [key, setKey] = useState(Date.now()); // Khởi tạo key với timestamp

    const category = route?.params?.category;// lấy ra category từ route 

    const [lessons, setLessons] = React.useState([]);

    const fetchLesson = async () => {
        try {
            const cate_id = category?._id;
            const user = await getData("user");

            const res = await getLessonByCategory(cate_id, user?._id);
            setLessons(res?.data);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setKey(Date.now()); // Cập nhật lại key khi quay về màn hình A
        });

        return unsubscribe;
    }, [navigation]);


    React.useEffect(() => {

        fetchLesson();
    }, [key])
    return (
        <SafeAreaView
            key={key}
            className="">
            <HeaderScreen
                navigation={navigation}
                style="mt-5"
                label={route?.params?.category?.type}
            />
            <ScrollView
                className="p-4 pl-6 pr-6"
            >
                {
                    lessons?.map((lesson, index) => (
                        <LessonItem
                            onPress={async () => {
                                const tests = lesson?.tests;
                                for (let i = 0; i < tests.length; i++) {
                                    const is_doing = tests[i]?.testResults?.[0]?.anwsers?.length > 0 ? true : false;
                                    if (!is_doing) {
                                        await createTestResult({
                                            test_id: tests[i]?._id,
                                        });
                                    }

                                }
                                navigation.navigate(configs?.screenName?.Exam, { tests })

                            }}
                            isExam
                            key={index}
                            navigation={navigation}
                            refresh={() => {
                                setKey(Date.now());
                            }}
                            total_question={lesson?.total_question}
                            {...lesson}
                            tests={[]}
                            category={category || "Reading"}
                            icon={<IconF
                                name={getLessonIcon(category?.type)}
                                size={20}
                            />}
                        />
                    ))
                }



            </ScrollView>
        </SafeAreaView>
    );
};

LessonExam.propTypes = {
};
export default LessonExam;