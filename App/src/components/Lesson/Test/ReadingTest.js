import React from "react";
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
const ReadingTest = ({ navigation, route }) => {
  const { width } = useWindowDimensions();

  const [test, setTest] = React.useState({});

  const [questions, setQuestions] = React.useState({});
  const test_id = route?.params?.test_id;

  const [answers, setAnswers] = React.useState([]);

  const [choiceQuestions, setChoiceQuestions] = React.useState([]);
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

  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [partQuestion, setPartQuestion] = React.useState(0);
  const [countProgress, setCountProgress] = React.useState(0);

  const handleProgressUpdate = () => {
    setCountProgress((prevCount) => prevCount + 1);
  };
  const [showNextQuestion, setShowNextQuestion] = React.useState(false);
  const handelShowNextQuestion = () => {
    setShowNextQuestion(true);
  };
  const fill_in_blank_question = [];
  const [isShowExplain, setIsShowExplain] = React.useState(true);
  const [currentQuestion_fill_in_blank, setCurrentQuestion_fill_in_blank] = React.useState(0);
  return (
    <SafeAreaView>
      <HeaderScreen label={route?.params?.nameTest} navigation={navigation} />
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
          <ExpandableText text={questions?.question_text} type={"text"}/>
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
            {questions?.questions?.map((item, index) => {
              if (item.question_type === "choice" && partQuestion === 0) {
                return (
                  <View key={index}>
                    <RadioButtonForm
                      item={item}
                      test_id={test_id}
                      test={test}
                      onProgressUpdate={handleProgressUpdate}
                      onShowNextQuestion={handelShowNextQuestion}
                    />
                  </View>
                );
              } else if (item.question_type === "fill_in_blank") {
                fill_in_blank_question.push(item); // Use push instead of append

                return <View></View>; // Ensure you return something
              }
              return <View></View>; // Return null for cases where no condition matches
            })}
            {fill_in_blank_question.length > 0 && partQuestion == 1 && (
              <View>
                <Text className="mb-10">
                  {
                    fill_in_blank_question[currentQuestion_fill_in_blank]
                      .description
                  }
                </Text>
                <RenderHtml
                  contentWidth={width}
                  source={{
                    html: fill_in_blank_question[currentQuestion_fill_in_blank]
                      .question_text,
                  }}
                />
                <AnswerInputArea
                  key={currentQuestion_fill_in_blank} // Adding a unique key for each question
                  currentquestion={currentQuestion_fill_in_blank}
                  data={
                    fill_in_blank_question[currentQuestion_fill_in_blank]
                      .options
                  }
                  test_id={test_id}
                  is_doing={test?.is_doing}
                  is_correct={
                    answers.find(
                      (a) =>
                        a.question_id ===
                        fill_in_blank_question[currentQuestion_fill_in_blank]
                          .question_id
                    )?.options.is_correct
                  }
                  explain={
                    fill_in_blank_question[currentQuestion_fill_in_blank]
                      .explain
                  }
                  anwser={
                    fill_in_blank_question[
                      currentQuestion_fill_in_blank
                    ].options.find((a) => a.is_correct)?.text
                  }
                  isShow={isShowExplain}
                  onProgressUpdate={handleProgressUpdate}
                  onShowNextQuestion={handelShowNextQuestion}
                />
              </View>
            )}
          </View>

          {showNextQuestion && (
            <MainButton
              title={"Next question"}
              roundedfull
              onPress={() => {
                if (
                  currentQuestion <
                  questions?.questions?.length - choiceQuestions.length
                ) {
                  console.log("choice_question1", choiceQuestions.length);

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
