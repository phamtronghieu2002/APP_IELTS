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
import AnswerInputWriting from "../../AnswerInput/AnswerInputWriting";
import { _testTypes } from "../../../utils/constant";

const WritingTest = ({ navigation, route }) => {
    const { width } = useWindowDimensions();

    const [test, setTest] = React.useState({});
  
    const [questions, setQuestions] = React.useState({});
    const test_id = route?.params?.test_id;
  
    const [answers, setAnswers] = React.useState([]);
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
    const [partQuestion, setPartQuestion] = React.useState(1);
    const [countProgress, setCountProgress] = React.useState(0);
  
    const handleProgressUpdate = () => {
      setCountProgress((prevCount) => prevCount + 1);
    };
    const fill_in_blank_question = [];
    const [isShowExplain, setIsShowExplain] = React.useState(true);
    const [currentQuestion_fill_in_blank, setCurrentQuestion_fill_in_blank] = React.useState(0);
    return (
      <SafeAreaView>
        <HeaderScreen label={route?.params?.nameTest} navigation={navigation} />
        <View className="flex flex-row justify-center items-center pl-5 pr-5">
          <Text className="font-bold">
            {countProgress + "/" + questions.total_question}
          </Text>
          <Progress.Bar
            progress={countProgress / questions.total_question || 0}
            className="max-w-full ml-2"
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
                Viết câu trả lời của bạn
              </Text>
            )}
  
            <View className="mb-5 border-b-2 border-gray-200 pb-3">
              {questions?.questions?.map((item, index) => {
                if (item.question_type === "choice" && partQuestion === 0) {
                  return (
                    <View key={index}>
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
                  <AnswerInputWriting
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
                  />
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
export default WritingTest;