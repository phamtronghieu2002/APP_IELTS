import React from 'react';
import {
    View,
    Text,
    ScrollView,
    SafeAreaView
} from 'react-native';
import HeaderScreen from '../../Header/HeaderScreen';
import { getTestById, updateIsDoing } from '../../../services/testService';
import ExpandableText from '../../ExpandableText/ExpandableText';
import RadioButton from '../../RadioButton/RadioButton';
import Explain from '../../Explain/Explain';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import WebView from 'react-native-webview';
import { TextInput } from 'react-native';
import AnswerInputArea from '../../AnswerInput/AnswerInput';
import ResultBar from '../../ResultBar/ResultBar';
import { addAnwserToTestResult, addTestResult } from '../../../services/testResultServices';
import { _testTypes } from '../../../utils/constant';
const ReadingTest = ({ navigation, route }) => {

    const { width } = useWindowDimensions();
    const [questions, setQuestions] = React.useState({});
    const [test, setTest] = React.useState({});
    const [answers, setAnswers] = React.useState([]);

    const test_id = route?.params?.test_id;








    const fetchTestById = async () => {
        try {
            const response = await getTestById(test_id);
            const data = response.data;
            setTest(data);
            setQuestions(data.questions[0]);
        } catch (error) {
            console.error(error);
        }
    };

    React.useEffect(() => {
        fetchTestById();
    }, []);

    console.log("answers >>>", answers);

    const handleChooseAnswer = async (question_id, options) => {
        try {

            const is_doing = test?.is_doing;
            if (!is_doing) {
                await updateIsDoing(test_id, {
                    is_doing: true
                });
            }


            setAnswers(((prev) => {
                const isExits = prev.some((a) => a.question_id === question_id);
                if (isExits) {
                    return prev
                } else {
                    addAnwserToTestResult(
                        test_id, is_doing ? _testTypes?.renew : _testTypes?.new, {
                        anwser: {
                            question_id,
                            is_correct: options.is_correct
                        }
                    }
                    ).then(fb => {

                    }).catch(err => {
                        console.log("error >>>>", err);

                    }
                    )
                    return [...prev, {
                        question_id,
                        options
                    }]
                }
            }));
        } catch (error) {
            console.log("error >>>>", error);

        }
    };

    return (
        <SafeAreaView>
            <HeaderScreen label={route?.params?.nameTest} navigation={navigation} />
            <ScrollView className="p-7">
                <View
                    style={{
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                    }}
                    className="rounded-md bg-white p-5 mb-3"
                >
                    <ExpandableText text={questions?.question_text} />

                </View>
                <View style={{
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                }}
                    className="rounded-md bg-white p-5 pb-32">
                    <Text className="mb-10">
                        {
                            questions?.description
                        }
                    </Text>

                    {
                        questions?.questions?.map((q, index) => {
                            const question_type = q?.question_type;
                            return (
                                <View key={index} className="mb-5 border-b-2 border-gray-200 pb-3">
                                    {
                                        question_type == "fill_in_blank" &&
                                        <Text className="">
                                            {q?.description}
                                        </Text>
                                    }
                                    <RenderHtml
                                        contentWidth={width}
                                        source={{
                                            html: q.question_text
                                        }}
                                    />

                                    {
                                        question_type == "choice" ? q.options.map((a, index) => (
                                            <RadioButton
                                                isShowAnswer={answers?.some((ans) => ans.question_id === q.question_id)}
                                                is_correct={a.is_correct}
                                                incorrectAnswerId={answers?.find((ans) => ans.question_id === q.question_id)?.options?.option_id}
                                                optionId={a.option_id}
                                                onPress={() => handleChooseAnswer(q.question_id, a)}
                                                key={index}
                                                label={a.text} />
                                        )) : <AnswerInputArea
                                            data={q?.options}
                                        />
                                    }

                                    {

                                        answers?.some((a) => a.question_id === q.question_id) &&
                                        <Explain
                                            is_correct={answers.find((a) => a.question_id === q.question_id).options.is_correct}
                                            explain={q.explain}
                                            anwser={q.options.find((a) => a.is_correct)?.text}
                                        />

                                    }



                                </View>
                            )
                        })
                    }
                </View>
            </ScrollView>
            {/* <ResultBar /> */}
        </SafeAreaView>
    );
};

export default ReadingTest;
