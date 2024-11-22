import React, { useEffect } from 'react';
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
import MainLayout from '../../layouts/MainLayout';
import HeaderScreen from '../../components/Header/HeaderScreen';
import ReadingTest from '../../components/Lesson/Test/ReadingTest';
import WritingTest from '../../components/Lesson/Test/WritingTest';
import SpeakingTest from '../../components/Lesson/Test/SpeakingTest';
import { speak } from 'expo-speech';
import { useDispatch, useSelector } from 'react-redux';
import { resetScore } from '../../fetures/examSlice';
import configs from '../../configs';


const Exam = ({ navigation, route }) => {


    const tests = route?.params?.tests;
    const speakingTest = tests?.filter(item => item.type_category === "Speaking");
    const writingTest = tests?.filter(item => item.type_category === "Writing");
    const readingTest = tests?.filter(item => item.type_category === "Reading");
    const listeningTest = tests?.filter(item => item.type_category === "Listening");
    const dataTestFinal = [...listeningTest, ...readingTest, ...writingTest, ...speakingTest];
    const [part, setPart] = React.useState(0);


    const GetComponent = (test, props) => {
        if (test?.type_category === "Reading" || test?.type_category === "Listening") {
            return <ReadingTest {...props} />
        } else if (test?.type_category === "Writing") {
            return <WritingTest {...props} />
        }
        return <SpeakingTest {...props} />


    }

    useEffect(() => {
        if (part == dataTestFinal.length) {
            navigation.navigate(configs?.screenName.overview_exam, {
              speakingTest,
                writingTest,
                readingTest,
                listeningTest,
            })
        }
    }, [part])
    return (
        <MainLayout>
            <HeaderScreen
            
                label={"Exam"} navigation={navigation} />
            <View className="content">

                {
                    part < dataTestFinal.length &&
                    GetComponent(dataTestFinal[part], {
                        isExam: true,
                        part,
                        isFinish: part === dataTestFinal.length - 1,
                        onNextPart: () => {

                            if (part <= dataTestFinal.length - 1) {
                                setPart(part + 1)
                            }
                        }
                        ,
                        headershow: false,
                        dataStasitic: {
                            test_id: dataTestFinal[part]?._id,
                            name_test: dataTestFinal[part]?.name_test,
                            type_category: dataTestFinal[part]?.type_category,
                            testResults: [],
                        }
                    })

                }
            </View>
        </MainLayout>
    );
};

Exam.propTypes = {
};
export default Exam;