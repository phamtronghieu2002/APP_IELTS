import React, { useEffect, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
} from "react-native";
import * as Progress from "react-native-progress";
import HeaderScreen from "../../Header/HeaderScreen";
import { getTestById } from "../../../services/testService";
import ExpandableText from "../../ExpandableText/ExpandableText";
import { useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";
import AnswerInputArea from "../../AnswerInput/AnswerInput";
import { _testTypes } from "../../../utils/constant";
import MainButton from "../../Button/MainButton";
import RadioButtonForm from "../../RadioButton/RadioButtonForm";
import { useDispatch, useSelector } from "react-redux";
import configs from "../../../configs";
import { use } from "i18next";
const ReadingTest = ({ navigation, route }) => {
  const { width } = useWindowDimensions();

  const [test, setTest] = React.useState({});
  const [questions, setQuestions] = React.useState({});
  const [answers, setAnswers] = React.useState([]);
  const [choiceQuestions, setChoiceQuestions] = React.useState([]);

  const test_id = route?.params?.test_id;
  const refresh = route?.params?.cb;
  // hieu viet them
  const name_test = route?.params?.nameTest;
  const type = route?.params?.type;
  const testResults = route?.params?.testResults;
  const [is_doing, setIsDoing] = React.useState(false);
  // 
  const fetchTestById = async () => {
    try {
      const response = await getTestById(test_id);
      const data = response.data;
      setTest(data);
      setQuestions(data.questions[0]);
      const choices = data.questions[0].questions.filter(
        (item) => item.question_type === "choice"
      );
      setChoiceQuestions(choices);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchTestById();
  }, []);

  useEffect(() => {


    const count_total_question = (questions) => {
      let total = 0;
      questions?.questions?.map((item) => {
        if (item.question_type == "choice") {
          total += 1;
        } else {
          total += item.options.length;
        }
      })
      return total;
    }
    const sub_questions = questions?.questions;
    if (sub_questions?.length > 0) {
      if (testResults?.length > 0 && !is_doing) {
        const question_filter = sub_questions.filter((item) => testResults?.some((a) => a.question_id === item.question_id || a.parrent_question_id === item.question_id));

        if (question_filter?.[0]?.question_type == "fill_in_blank") {
          setPartQuestion(1);
        }


        questions.questions = question_filter;
        questions.total_question = count_total_question(questions);
        setChoiceQuestions(questions?.questions?.filter(item => item.question_type == "choice"));


        setQuestions({ ...questions });
        setIsDoing(true);
      }


    }
  }, [questions]);





  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [partQuestion, setPartQuestion] = React.useState(0);
  const [countProgress, setCountProgress] = React.useState(0);
  const [showNextQuestion, setShowNextQuestion] = React.useState(false);
  const [currentQuestion_fill_in_blank, setCurrentQuestion_fill_in_blank] = React.useState(0);
  const [isShowExplain, setIsShowExplain] = React.useState(true);

  // hieu viet
  const testStore = useSelector((state) => state.test);
  const dispatch = useDispatch();



  const handleProgressUpdate = () => {
    setCountProgress((prevCount) => prevCount + 1);
  };
  const handelShowNextQuestion = () => {
    setShowNextQuestion(true);
  };





  return (
    <SafeAreaView>
      <HeaderScreen
        onPress={refresh}
        label={route?.params?.nameTest}
        navigation={navigation} />
      <View className="flex flex-row justify-center items-center pl-5 pr-5">
        <Text className="font-bold mr-3 text-red-600">
          {countProgress + "/" + questions.total_question}
        </Text>
        <Progress.Bar
          style={{
            backgroundColor: "white",
            borderColor: "white",
          }}
          progress={countProgress / questions.total_question || 0}
          color="red"
          width={300}
          height={10}
          borderRadius={15}
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
          <ExpandableText text={questions?.question_text} type={"text"} />
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
          {partQuestion == 0 && (
            <Text className="mb-10">
              Lựa chọn các đáp án sau sao cho phù hợp
            </Text>
          )}

          <View className="mb-5 border-b-2 border-gray-200 pb-3">
            {/* {question_type == "fill_in_blank" && (
                  <Text className="">{questions?.questions?.[currentQuestion].description}</Text>
                )}
                <RenderHtml
                  contentWidth={width}
                  source={{
                    html: questions?.questions?.[currentQuestion].question_text,
                  }}
                /> */}
            {questions?.questions?.filter(item => item.question_type == "choice")?.map((item, index) => {
              return partQuestion == 0 ? <View key={index}>
                <RadioButtonForm
                  item={item}
                  test_id={test_id}
                  test={test}
                  onProgressUpdate={handleProgressUpdate}
                  onShowNextQuestion={handelShowNextQuestion}
                />
              </View> : <></>
            })}


            {questions?.questions?.filter(item => item.question_type == "fill_in_blank")?.map((item, index) => {
              if (partQuestion == 1) {

                
                return index == currentQuestion_fill_in_blank ? (
                  <View>
                    <Text className="mb-10">
                      {item.description}
                    </Text>
                    <RenderHtml
                      contentWidth={width}
                      source={{
                        html: item.question_text || ""
                      }}
                    />
                    <AnswerInputArea
                      parrent_question={item}
                      key={currentQuestion_fill_in_blank} // Adding a unique key for each question
                      currentquestion={currentQuestion_fill_in_blank}
                      data={item?.options}
                      test_id={test_id}
                      is_doing={test?.is_doing}
                      is_correct={answers.find((a) => a.question_id === item.question_id)?.options.is_correct}
                      explain={item.explain}
                      anwser={item.options.find((a) => a.is_correct)?.text}
                      isShow={isShowExplain}
                      onProgressUpdate={handleProgressUpdate}
                      onShowNextQuestion={handelShowNextQuestion}
                    />
                  </View>
                ) : <></>

              }
              return <></>
            })}


          </View>

          {showNextQuestion && (
            <MainButton
              title={"Next question"}
              roundedfull
              onPress={() => {
                // hieu them
                console.log("currentQuestion  >>>", currentQuestion);
                console.log(" questions?.questions?.length  >>>",  questions?.questions?.length);
                console.log("choiceQuestions.length  >>>", choiceQuestions.length);
                
                if (countProgress == questions.total_question) {
                  navigation?.navigate(configs?.screenName?.overview, { test_id, name_test, type, testResults: [testStore?.testResults] })

                }
                // 
                if (
                  currentQuestion <
                  questions?.questions?.length - choiceQuestions.length
                ) {

                  console.log("co lot vao ");
                  
                  setPartQuestion(1);
                  setCurrentQuestion(currentQuestion + 1);
                }
                if (
                  currentQuestion <
                  questions?.questions?.length - choiceQuestions.length &&
                  partQuestion == 1
                ) {
                  console.log("choice_question2", choiceQuestions.length);
                  setCurrentQuestion_fill_in_blank(
                    currentQuestion_fill_in_blank + 1
                  );
                }
                setShowNextQuestion(false);
              }}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReadingTest;
