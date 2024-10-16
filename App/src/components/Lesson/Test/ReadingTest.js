import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  ProgressBarAndroid,
  Pressable,
} from "react-native";
import * as Progress from "react-native-progress";
import HeaderScreen from "../../Header/HeaderScreen";
import { getTestById, updateIsDoing } from "../../../services/testService";
import ExpandableText from "../../ExpandableText/ExpandableText";
import RadioButton from "../../RadioButton/RadioButton";
import Explain from "../../Explain/Explain";
import { useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";
import WebView from "react-native-webview";
import { TextInput } from "react-native";
import AnswerInputArea from "../../AnswerInput/AnswerInput";
import ResultBar from "../../ResultBar/ResultBar";
import {
  addAnwserToTestResult,
  addTestResult,
} from "../../../services/testResultServices";
import { _testTypes } from "../../../utils/constant";
import MainButton from '../../Button/MainButton';
const ReadingTest = ({ navigation, route }) => {
  const { width } = useWindowDimensions();

  const [test, setTest] = React.useState({});

  const [questions, setQuestions] = React.useState({});
  const test_id = route?.params?.test_id;

  const [answers, setAnswers] = React.useState([]);
  console.log("answers >>>", answers);

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
          is_doing: true,
        });
      }

      setAnswers((prev) => {
        const isExits = prev.some((a) => a.question_id === question_id);
        if (isExits) {
          return prev;
        } else {
          addAnwserToTestResult(test_id, _testTypes?.new, {
            anwser: {
              question_id,
              is_correct: options.is_correct,
            },
          })
            .then((fb) => {})
            .catch((err) => {
              console.log("error >>>>", err);
            });
          return [
            ...prev,
            {
              question_id,
              options,
            },
          ];
        }
      });
    } catch (error) {
      console.log("error >>>>", error);
    }
  };
  console.log("totel >>>", questions.total_question);
  
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const listQuestion = questions?.questions || [];
  const question_type = questions?.questions?.[currentQuestion].question_type;
  const [countProgress, setCountProgress] = React.useState(1);

  const handleIncreaseProgress = () => {
    const questionType = questions?.questions?.[currentQuestion].question_type;
    if (questionType === "fill_in_blank") {
      setCountProgress(countProgress + questions?.questions?.[currentQuestion].options.length);
    } else {
      setCountProgress(countProgress + 1);
    }
  };

  
  return (
    <SafeAreaView>
      <HeaderScreen label={route?.params?.nameTest} navigation={navigation} />
      <View className="flex flex-col justify-center items-center pl-5 pr-5">
        <Progress.Bar
          progress={countProgress / questions.total_question || 0}
          className="max-w-full mb-3"
          width={150}
          color="#FF0505"
        />
      </View>
      <ScrollView className="p-7">
        <View
          style={{
            shadowColor: "#000",
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
        <View
          style={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
          className="rounded-md bg-white p-5 pb-32"
        >
          <Text className="mb-10">{questions?.description}</Text>
          
              <View
                className="mb-5 border-b-2 border-gray-200 pb-3"
              >
                {question_type == "fill_in_blank" && (
                  <Text className="">{questions?.questions?.[currentQuestion].description}</Text>
                )}
                <RenderHtml
                  contentWidth={width}
                  source={{
                    html: questions?.questions?.[currentQuestion].question_text,
                  }}
                />

                {question_type === "choice" && (
                  questions?.questions?.[currentQuestion]?.options.map((a, index) => (
                    <RadioButton
                      isShowAnswer={answers?.some(
                        (ans) => ans.question_id === questions?.questions?.[currentQuestion].question_id
                      )}
                      is_correct={a.is_correct}
                      incorrectAnswerId={
                        answers?.find(
                          (ans) => ans.question_id === questions?.questions?.[currentQuestion].question_id
                        )?.options?.option_id
                      }
                      optionId={a.option_id}
                      onPress={() => handleChooseAnswer(questions?.questions?.[currentQuestion].question_id, a)}
                      key={index}
                      label={a.text}
                    />
                  ))
                )}
                {question_type === "fill_in_blank" && (
                   <AnswerInputArea
                   data={questions?.questions?.[currentQuestion].options}
                   test_id={test_id}
                   is_doing={test?.is_doing}
                 />
                )}

                {answers?.some((a) => a.question_id === questions?.questions?.[currentQuestion].question_id) && (
                  <Explain
                    is_correct={
                      answers.find((a) => a.question_id === questions?.questions?.[currentQuestion].question_id)
                        .options.is_correct
                    }
                    explain={questions?.questions?.[currentQuestion].explain}
                    anwser={questions?.questions?.[currentQuestion].options.find((a) => a.is_correct)?.text}
                  />
                )}
              </View>
            
          <MainButton
        title={"Next question"}
        roundedfull
        onPress={()=>{
            console.log("currentQuestion >>>", currentQuestion);
            if (currentQuestion < questions?.questions?.length - 1) {
              setCurrentQuestion(currentQuestion + 1);
              handleIncreaseProgress();
            }
        }}
        disabled={false}
      />
        </View>
      </ScrollView>
      {/* <ResultBar /> */}
    </SafeAreaView>
  );
};

export default ReadingTest;
